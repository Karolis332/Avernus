#!/usr/bin/env bash
# Scratch: join the eleven painted rounds into the sky chase film.
# usage: bash join_painted.sh <out.mp4> [crf]
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:?out file}"
CRF="${2:-20}"
CLIPS=(film-v5-r1-trim.mp4 film-v5-r2.mp4 film-v5-r3.mp4 film-v4-engine.mp4 film-v5-r5.mp4 film-v5-r6.mp4
       film-v5-r7.mp4 film-v5-r8-trim.mp4 film-v5-r9.mp4 film-v5-r10.mp4 film-v5-r11.mp4)

inputs=()
graph=""
pads=""
total=0
for i in "${!CLIPS[@]}"; do
  f="${CLIPS[$i]}"
  [ -s "$f" ] || { echo "missing clip: $f" >&2; exit 1; }
  dur=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "$f")
  total=$(python -c "print($total + $dur)")
  fade_out=$(python -c "print(max(0, $dur - 0.15))")
  inputs+=(-i "$f")
  graph+="[$i:v]setpts=PTS-STARTPTS,fps=24,scale=1920:1080,format=yuv420p,setsar=1[v$i];"
  # short audio fades on every clip so the hard cuts do not click
  graph+="[$i:a]asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,afade=t=in:d=0.06,afade=t=out:st=$fade_out:d=0.15[a$i];"
  pads+="[v$i][a$i]"
done
end_fade=$(python -c "print(max(0, $total - 1.2))")
graph+="${pads}concat=n=${#CLIPS[@]}:v=1:a=1[vc][ac];"
graph+="[vc]fade=t=in:d=0.4,fade=t=out:st=$end_fade:d=1.2[v];"
graph+="[ac]loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=out:st=$end_fade:d=1.2[a]"

ffmpeg -nostdin -y -v error "${inputs[@]}" -filter_complex "$graph" -map "[v]" -map "[a]" \
  -c:v libx264 -preset medium -crf "$CRF" -pix_fmt yuv420p -threads 4 \
  -c:a aac -b:a 160k -ar 48000 -movflags +faststart "$OUT" < /dev/null
ffprobe -v error -show_entries format=duration,size -of csv=p=0 "$OUT"
