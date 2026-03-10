#!/bin/bash

mkdir -p public

VIDEO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1773235904~acl=%2f*~id=febcca64-28af-4955-bae5-6563ffb1fe33~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMyMzU5MzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"
AUDIO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1773235904~acl=%2f*~id=febcca64-28af-4955-bae5-6563ffb1fe33~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMyMzU5MzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"

ffmpeg \
-user_agent "Mozilla/5.0" \
-fflags +genpts \
-i "$VIDEO" \
-i "$AUDIO" \
-map 0:v:0 \
-map 1:a:0 \
-c:v copy \
-c:a aac -b:a 128k -ar 44100 \
-af "aresample=async=1" \
-f hls \
-hls_time 4 \
-hls_list_size 6 \
-hls_flags delete_segments+append_list \
-start_number 1 \
public/stream.m3u8
