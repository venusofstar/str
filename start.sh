#!/bin/bash

mkdir -p public

VIDEO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_3000/chunklist_video.m3u8?hdntl=exp=1773235904~acl=%2f*~id=febcca64-28af-4955-bae5-6563ffb1fe33~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMyMzU5MzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"

AUDIO="https://dice-live-ap.akamaized.net/hls/live/2001903/300024-317970/exchange300024xokvd_300024_4500/chunklist_audio.m3u8?hdntl=exp=1773235904~acl=%2f*~id=febcca64-28af-4955-bae5-6563ffb1fe33~data=hdntl,dWlkPVc5dVJhanxiYjFlZDQ2Ny1hODRhLTQ1Y2EtOGMyNS0wNGI1NmU1NGYzZWEmaXA9MTEyLjIwMS45Ni4xMjYmZXhwPTE3NzMyMzU5MzEmZWlkPTMwMDAyNCZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=32e888338559c3d5c62edf696d6839e035d69097f5108e03c82d355694a1e2b0"

ffmpeg \
-user_agent "Mozilla/5.0" \
-loglevel warning \
-reconnect 1 \
-reconnect_streamed 1 \
-reconnect_delay_max 5 \
-fflags +genpts \
-use_wallclock_as_timestamps 1 \
-thread_queue_size 2048 \
-i "$VIDEO" \
-thread_queue_size 2048 \
-i "$AUDIO" \
-map 0:v:0 \
-map 1:a:0 \
-c:v copy \
-c:a aac \
-b:a 128k \
-ar 48000 \
-af "aresample=async=1" \
-max_muxing_queue_size 4096 \
-f hls \
-hls_time 2 \
-hls_list_size 10 \
-hls_flags delete_segments+append_list+independent_segments+program_date_time \
-hls_segment_type mpegts \
-hls_allow_cache 0 \
public/stream.m3u8
