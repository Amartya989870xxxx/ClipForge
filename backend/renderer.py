# backend/renderer.py
import os
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.video.VideoClip import TextClip
from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip


def render_video(video_path, edit_plan):
    clip = VideoFileClip(video_path)
    txt_clips = []

    video_w, video_h = clip.size

    for e in edit_plan:
        start = e["start"]
        end = e["end"]
        text = e["text"]
        highlight = e.get("highlight")

        base_y = video_h - 120  # bottom caption area
        base_x = video_w // 2

        if highlight and highlight in text:
            before, word, after = text.partition(highlight)

            # BEFORE TEXT
            before_clip = (
                TextClip(
                    before,
                    font="Arial",
                    font_size=26,
                    color="white",
                    method="label"
                )
                .with_start(start)
                .with_end(end)
            )

            # HIGHLIGHTED WORD
            highlight_clip = (
                TextClip(
                    word,
                    font="Arial-Bold",
                    font_size=32,
                    color="yellow",
                    method="label"
                )
                .with_start(start)
                .with_end(end)
            )

            # AFTER TEXT
            after_clip = (
                TextClip(
                    after,
                    font="Arial",
                    font_size=26,
                    color="white",
                    method="label"
                )
                .with_start(start)
                .with_end(end)
            )

            # Position clips inline
            before_clip = before_clip.with_position(
                (base_x - before_clip.w // 2, base_y)
            )

            highlight_clip = highlight_clip.with_position(
                (before_clip.pos(0)[0] + before_clip.w, base_y)
            )

            after_clip = after_clip.with_position(
                (highlight_clip.pos(0)[0] + highlight_clip.w, base_y)
            )

            txt_clips.extend([before_clip, highlight_clip, after_clip])

        else:
            # Normal caption (no highlight)
            txt = (
                TextClip(
                    text,
                    font="Arial",
                    font_size=26,
                    color="white",
                    method="caption",
                    size=(video_w * 0.8, None)
                )
                .with_start(start)
                .with_end(end)
                .with_position(("center", "bottom"))
            )

            txt_clips.append(txt)

    final_video = CompositeVideoClip([clip, *txt_clips]).with_audio(clip.audio)

    output_path = os.path.join("outputs", os.path.basename(video_path))
    final_video.write_videofile(
        output_path,
        fps=clip.fps,
        codec="libx264",
        audio_codec="aac"
    )

    return output_path
