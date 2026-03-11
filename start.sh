#!/bin/bash

mkdir -p public

VIDEO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1773235904hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"

AUDIO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1773235904hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"

ffmpeg \
-user_agent "Mozilla/5.0" \
-reconnect 1 \
-reconnect_streamed 1 \
-reconnect_delay_max 5 \
-i "$VIDEO" \
-i "$AUDIO" \
-map 0:v:0 \
-map 1:a:0 \
-c:v copy \
-c:a copy \
-f hls \
-hls_time 4 \
-hls_list_size 6 \
-hls_flags delete_segments \
public/stream.m3u8
