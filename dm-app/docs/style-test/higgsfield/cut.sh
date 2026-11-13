#!/usr/bin/env bash
# Scratch: cut one round together by hand from pieces of clips.
# usage: bash cut.sh <out.mp4> <file>:<start s>:<end s> [<file>:<start>:<end> ...]
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:?out file}"; shift
[ "$#" -ge 1 ] || { echo "no segments" >&2; exit 1; }

inputs=(); graph=""; pads=""; i=0
for seg in "$@"; do
  IFS=: read -r f ss to <<< "$seg"
  [ -s "$f" ] || { echo "missing clip: $f" >&2; exit 1; }
  len=$(python -c "print(round($to - $ss, 3))")
  fade=$(python -c "print(max(0, round($to - $ss - 0.08, 3)))")
  inputs+=(-i "$f")
  graph+="[$i:v]trim=start=$ss:end=$to,setpts=PTS-STARTPTS,fps=24,scale=1920:1080,format=yuv420p,setsar=1[v$i];"
  # short audio fades so the hand cuts do not click
  graph+="[$i:a]atrim=start=$ss:end=$to,asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,afade=t=in:d=0.04,afade=t=out:st=$fade:d=0.08[a$i];"
  pads+="[v$i][a$i]"
  echo "  $f  $ss-$to  (${len}s)"
  i=$((i + 1))
done
graph+="${pads}concat=n=$i:v=1:a=1[v][a]"

TMP="${OUT%.mp4}.part.mp4"   # never write over a file that may be open
ffmpeg -nostdin -y -v error "${inputs[@]}" -filter_complex "$graph" -map "[v]" -map "[a]" \
  -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p -threads 4 -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$TMP" < /dev/null
mv -f "$TMP" "$OUT"
echo "$OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT")s"
