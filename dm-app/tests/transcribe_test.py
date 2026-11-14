"""python dm-app/tests/transcribe_test.py  (no GPU and no speech model needed)"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1] / "tools"))
import transcribe_session as T  # noqa: E402

MARKS = {
    "audioFile": "session-2026-11-16-180509.webm",
    "startedIso": "2026-11-16T16:05:09.000Z",
    "durationSec": 400,
    "marks": [
        {"t": 300, "type": "fight", "note": "Fight 1"},
        {"t": 330, "type": "round", "note": "Round 2"},
        {"t": 340, "type": "mark", "note": "Aurora crits"},
        {"t": 380, "type": "fight-end", "note": ""},
    ],
    "tracker": [
        {"t": 60, "type": "fight-start", "title": "Blood on the Ice", "round": 1, "order": ["Dumal", "Drenwal"]},
        {"t": 60, "type": "turn", "round": 1, "who": "Dumal"},
        {"t": 75, "type": "hp", "round": 1, "who": "Drenwal", "change": -22, "hp": 80},
        {"t": 90, "type": "turn", "round": 1, "who": "Drenwal"},
        {"t": 120, "type": "turn", "round": 2, "who": "Dumal"},
        {"t": 150, "type": "hp", "round": 2, "who": "Dumal", "change": 10, "hp": 200},
        {"t": 200, "type": "fight-end", "round": 2},
    ],
}
SEGMENTS = [
    (10.0, 14.0, "Labas, pradedam."),
    (62.0, 66.0, "Dumal puola."),
    (92.0, 97.0, "Stand! Healing word."),
    (125.0, 129.0, "Antras raundas."),
    (210.0, 214.0, "Pertrauka."),
    (305.0, 309.0, "Nauja kova."),
    (335.0, 338.0, "Aurora šauna."),
]


def test_clock() -> None:
    assert T.clock(0) == "0:00:00"
    assert T.clock(3723.9) == "1:02:03"


def test_stamps_are_sorted_and_labelled() -> None:
    stamps = T.stamps(MARKS)
    assert [s.t for s in stamps] == sorted(s.t for s in stamps)
    kinds = [s.kind for s in stamps]
    assert kinds.count("fight") == 2, kinds          # one from the tracker, one from a hand mark
    assert kinds.count("fight-end") == 2, kinds
    rounds = [s.text for s in stamps if s.kind == "round"]
    assert rounds == ["Round 1", "Round 2", "Round 1", "Round 2"], rounds  # tracker 1, 2; hand marks 1, 2
    turns = [s.text for s in stamps if s.kind == "turn"]
    assert turns == ["Dumal", "Drenwal", "Dumal"], turns
    hp = [s.text for s in stamps if s.kind == "note"]
    assert "Drenwal -22 (now 80)" in hp[0] and "tracker" in hp[0], hp
    assert "Dumal +10 (now 200)" in hp[1], hp
    assert "Aurora crits" in hp[2] and "mark" in hp[2], hp


def test_render_puts_speech_under_fight_round_and_turn() -> None:
    md = T.render(SEGMENTS, MARKS)
    lines = md.splitlines()
    at = {key: next(i for i, line in enumerate(lines) if key in line) for key in (
        "Labas", "## Fight: Blood on the Ice", "Dumal puola", "#### Drenwal", "Stand!", "### Round 2",
        "Antras raundas", "## Between fights", "Pertrauka", "## Fight: Fight 1", "Nauja kova", "Aurora šauna", "Aurora crits")}
    assert at["Labas"] < at["## Fight: Blood on the Ice"] < at["Dumal puola"] < at["#### Drenwal"] < at["Stand!"]
    assert at["Stand!"] < at["### Round 2"] < at["Antras raundas"] < at["## Between fights"] < at["Pertrauka"]
    assert at["Pertrauka"] < at["## Fight: Fight 1"] < at["Nauja kova"] < at["Aurora šauna"] < at["Aurora crits"]
    assert "[0:01:02] Dumal puola." in md
    assert "Drenwal -22 (now 80)" in md
    assert md.startswith("# Transcript: session-2026-11-16-180509.webm")


def test_render_without_marks_is_a_plain_transcript() -> None:
    md = T.render(SEGMENTS[:2], None)
    assert "[0:00:10] Labas, pradedam." in md and "## Fight" not in md


def test_vocabulary_prompt_keeps_the_end_of_the_list() -> None:
    words = ["word%d" % i for i in range(400)]
    prompt = T.vocabulary_prompt(words, max_chars=200)
    assert len(prompt) <= 200 and prompt.endswith("word399") and "word0," not in prompt
    assert T.vocabulary_prompt(["  Drenwal ", "", "# a comment", "Or'Henn"]) == "Drenwal, Or'Henn"


if __name__ == "__main__":
    for name, fn in sorted(globals().items()):
        if name.startswith("test_"):
            fn()
    print("transcribe_test.py: all assertions passed")
