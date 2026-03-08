#!/bin/bash

VIDEO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1773041611~acl=%2f*~id=6f33ed7d-29b0-4c66-b66b-20ca084afd3c~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMwNDE2NDAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=9d586215be83237dc3796ee4e4d8376e1813c10b24f59f085dcc8c754e87f7a0"
AUDIO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1773041611~acl=%2f*~id=6f33ed7d-29b0-4c66-b66b-20ca084afd3c~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMwNDE2NDAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=9d586215be83237dc3796ee4e4d8376e1813c10b24f59f085dcc8c754e87f7a0"

mkdir -p public

ffmpeg -re \
-i "$VIDEO" \
-i "$AUDIO" \
-map 0:v -map 1:a \
-c:v copy \
-c:a copy \
-f hls \
-hls_time 6 \
-hls_list_size 6 \
-hls_flags delete_segments \
public/stream.m3u8
