#!/bin/bash

mkdir -p public

STREAM="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/playlist.m3u8?hdnea=st=1773203874~exp=1773203914~acl=*hls/live/2001903/300024-317970/*!*hls/live/2001903-b/300024-317970-b/*~id=72d4f6fb-e8f7-4ca2-b9d1-9ed081d23b40~data=dWlkPWNGaDZGenw2YzcyNmIzMS03NDAxLTRkMDgtYWM1Zi1jNDFiOWFiYzU0NWUmaXA9MTgwLjE5MC4xNzIuNDEmZXhwPTE3NzMyOTAzMTQmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=8880b1413117c0d089083f6c638aa7533e3aa4d9d92675b24929608ad01b5f7a&opId=325&cc=PH"

ffmpeg \
-user_agent "Mozilla/5.0 (X11; Linux x86_64)" \
-loglevel warning \
-reconnect 1 \
-reconnect_streamed 1 \
-reconnect_delay_max 5 \
-fflags +genpts+igndts \
-thread_queue_size 1024 \
-i "$STREAM" \
-map 0:v:0 \
-map 0:a:0 \
-c:v copy \
-c:a copy \
-f hls \
-hls_time 3 \
-hls_list_size 6 \
-hls_flags delete_segments+append_list+independent_segments \
-hls_segment_type mpegts \
-start_number 1 \
public/stream.m3u8
