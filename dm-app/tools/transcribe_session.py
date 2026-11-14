"""Turn a session recording into a transcript sorted by fight, round and turn.

    python dm-app/tools/transcribe_session.py recordings/session-2026-11-16-180509.webm

The marks file (same name, .marks.json) from the Record page is picked up by itself. It holds the hand
marks and the tracker's fight log, timed from the start of the recording; they become the headings.
Output: recordings/<date>/<name>.transcript.md and <name>.segments.json (the raw text with times, so
the transcript can be rebuilt with --segments without the GPU). Nothing here is ever committed:
recordings/ is gitignored, and the repo is public.

Needs (this PC only):  pip install faster-whisper nvidia-cublas-cu12 nvidia-cudnn-cu12
The GPU path on Windows is unproven until one real clip has run; --device cpu --model small is the fallback.
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Sequence

ROOT = Path(__file__).resolve().parents[2]
VOCABULARY = Path(__file__).with_name("table-vocabulary.txt")
PROMPT_CHARS = 800  # Whisper reads only the last ~224 tokens of the prompt; names cost several tokens each
Segment = tuple[float, float, str]
log = logging.getLogger("transcribe")


@dataclass(frozen=True)
class Stamp:
    """Something that happened at second t of the recording: a heading or a note for the transcript."""

    t: float
    kind: str  # fight | fight-end | round | turn | note
    text: str


def clock(sec: float) -> str:
    s = max(0, int(sec))
    return f"{s // 3600}:{s % 3600 // 60:02d}:{s % 60:02d}"


def stamps(marks: dict | None) -> list[Stamp]:
    """Headings and notes from the marks file: the tracker's fight log first, then the marks set by hand."""
    out: list[Stamp] = []
    data = marks or {}
    last_round = None
    for ev in data.get("tracker") or []:
        t, kind = float(ev.get("t", 0)), ev.get("type")
        if kind == "fight-start":
            out.append(Stamp(t, "fight", ev.get("title") or "Fight"))
            last_round = None
        elif kind == "fight-end":
            out.append(Stamp(t, "fight-end", ""))
            last_round = None
        elif kind == "turn":
            if ev.get("round") != last_round:
                last_round = ev.get("round")
                out.append(Stamp(t, "round", f"Round {last_round}"))
            out.append(Stamp(t, "turn", ev.get("who") or "?"))
        elif kind == "hp":
            out.append(Stamp(t, "note", f"tracker: {ev.get('who', '?')} {int(ev.get('change', 0)):+d} (now {ev.get('hp', '?')})"))
    for mark in data.get("marks") or []:
        t, kind, note = float(mark.get("t", 0)), mark.get("type"), (mark.get("note") or "").strip()
        if kind == "fight":
            out.append(Stamp(t, "fight", note or "Fight"))
            out.append(Stamp(t, "round", "Round 1"))
        elif kind == "round":
            out.append(Stamp(t, "round", note or "Round"))
        elif kind == "fight-end":
            out.append(Stamp(t, "fight-end", ""))
        else:
            out.append(Stamp(t, "note", f"mark: {note or '(no note)'}"))
    return sorted(out, key=lambda s: s.t)  # stable: same-second stamps keep the order above


def _heading(stamp: Stamp) -> str:
    at = clock(stamp.t)
    if stamp.kind == "fight":
        return f"\n## Fight: {stamp.text} ({at})\n"
    if stamp.kind == "fight-end":
        return f"\n## Between fights ({at})\n"
    if stamp.kind == "round":
        return f"\n### {stamp.text} ({at})\n"
    if stamp.kind == "turn":
        return f"\n#### {stamp.text} ({at})\n"
    return f"- *[{at}] {stamp.text}*"


def render(segments: Sequence[Segment], marks: dict | None) -> str:
    """The transcript as markdown: every line of speech under the fight, round and turn it was said in."""
    data = marks or {}
    lines = [f"# Transcript: {data.get('audioFile', 'recording')}", ""]
    if data.get("startedIso"):
        lines.append(f"Started {data['startedIso']}, length {clock(data.get('durationSec', 0))}.")
    lines.append("Times are from the start of the recording. Headings come from the tracker and the hand marks; "
                 "lines in italics are tracker events and notes. The speech is machine-heard: expect wrong words.")
    lines.append("")
    pending = stamps(marks)
    for start, _end, text in sorted(segments):
        while pending and pending[0].t <= start:
            lines.append(_heading(pending.pop(0)))
        lines.append(f"[{clock(start)}] {text.strip()}")
    lines.extend(_heading(s) for s in pending)
    return "\n".join(lines) + "\n"


def vocabulary_prompt(words: Iterable[str], max_chars: int = PROMPT_CHARS) -> str:
    """Names and spells as one line for the model. Too long: the start is dropped, because the end is what it reads."""
    kept = [w.strip() for w in words if w.strip() and not w.strip().startswith("#")]
    while kept and len(", ".join(kept)) > max_chars:
        kept = kept[1:]
    return ", ".join(kept)


def _add_nvidia_dll_dirs() -> None:
    """The pip packages nvidia-cublas-cu12 / nvidia-cudnn-cu12 keep their DLLs where Windows does not look."""
    for base in map(Path, sys.path):
        for folder in base.glob("nvidia/*/bin"):
            os.add_dll_directory(str(folder))
            os.environ["PATH"] = str(folder) + os.pathsep + os.environ.get("PATH", "")


def transcribe(audio: Path, model: str, device: str, language: str, prompt: str) -> list[Segment]:
    try:
        if os.name == "nt" and device == "cuda":
            _add_nvidia_dll_dirs()
        from faster_whisper import WhisperModel
    except ImportError as err:
        raise SystemExit(f"faster-whisper is not installed ({err}). Run: pip install faster-whisper nvidia-cublas-cu12 nvidia-cudnn-cu12") from err
    whisper = WhisperModel(model, device=device, compute_type="float16" if device == "cuda" else "int8")
    # No carry-over of earlier text: on hours of table talk it makes the model repeat itself.
    found, info = whisper.transcribe(str(audio), language=language, initial_prompt=prompt or None,
                                     vad_filter=True, condition_on_previous_text=False, beam_size=5)
    out: list[Segment] = []
    next_report = 300.0
    for seg in found:
        out.append((float(seg.start), float(seg.end), seg.text))
        if seg.end >= next_report:
            log.info("heard up to %s of %s", clock(seg.end), clock(info.duration))
            next_report = seg.end + 300.0
    return out


def main(argv: Sequence[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("audio", type=Path, help="the .webm / .ogg / .m4a from the Record page (or a phone recording)")
    ap.add_argument("marks", type=Path, nargs="?", help="the .marks.json from the Record page (default: next to the audio)")
    ap.add_argument("--segments", type=Path, help="rebuild the transcript from a saved .segments.json instead of listening again")
    ap.add_argument("--model", default="large-v3")
    ap.add_argument("--device", default="cuda", choices=["cuda", "cpu"])
    ap.add_argument("--language", default="lt")
    ap.add_argument("--vocabulary", type=Path, default=VOCABULARY)
    ap.add_argument("--out", type=Path, help="output folder (default: recordings/<date>/)")
    args = ap.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format="%(message)s")

    if not args.audio.is_file() and not args.segments:
        raise SystemExit(f"No such recording: {args.audio}")
    marks_path = args.marks or args.audio.with_name(args.audio.stem + ".marks.json")
    marks = json.loads(marks_path.read_text(encoding="utf-8")) if marks_path.is_file() else None
    if marks is None:
        log.info("no marks file at %s: the transcript will have no fight headings", marks_path)

    date = re.search(r"\d{4}-\d{2}-\d{2}", args.audio.stem)
    out_dir = args.out or ROOT / "recordings" / (date.group(0) if date else "undated")
    out_dir.mkdir(parents=True, exist_ok=True)
    seg_path = out_dir / (args.audio.stem + ".segments.json")

    if args.segments:
        segments = [tuple(s) for s in json.loads(args.segments.read_text(encoding="utf-8"))]
    else:
        words = args.vocabulary.read_text(encoding="utf-8").splitlines() if args.vocabulary.is_file() else []
        segments = transcribe(args.audio, args.model, args.device, args.language, vocabulary_prompt(words))
        seg_path.write_text(json.dumps(segments, ensure_ascii=False), encoding="utf-8")
    transcript = out_dir / (args.audio.stem + ".transcript.md")
    transcript.write_text(render(segments, marks), encoding="utf-8")
    log.info("%d lines of speech -> %s", len(segments), transcript)
    return 0


if __name__ == "__main__":
    sys.exit(main())
