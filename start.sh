#!/bin/bash

mkdir -p public

VIDEO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1773126632~acl=%2f*~id=4a205fdf-7f33-49c2-9451-44d17b805b6a~data=hdntl,dWlkPWNGaDZGenw2YzcyNmIzMS03NDAxLTRkMDgtYWM1Zi1jNDFiOWFiYzU0NWUmaXA9MTgwLjE5MC4xNzIuNDEmZXhwPTE3NzMxMjY2NjAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a903af24095cd86337c5113d0ad0691d0aca55178bdb2022314e61420e32b351"
AUDIO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1773126632~acl=%2f*~id=4a205fdf-7f33-49c2-9451-44d17b805b6a~data=hdntl,dWlkPWNGaDZGenw2YzcyNmIzMS03NDAxLTRkMDgtYWM1Zi1jNDFiOWFiYzU0NWUmaXA9MTgwLjE5MC4xNzIuNDEmZXhwPTE3NzMxMjY2NjAmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=a903af24095cd86337c5113d0ad0691d0aca55178bdb2022314e61420e32b351"

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
