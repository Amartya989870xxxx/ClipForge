# backend/renderer.py
import os
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.video.VideoClip import TextClip
from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip


def render_video(video_path, edit_plan):
    clip = VideoFileClip(video_path)
    txt_clips = []

    for e in edit_plan:
        # ----- STYLE DECISIONS -----
        font_size = e.get(
            "fontsize",
            36 if e.get("style") == "title" else 24
        )

        # Positioning baseline
        x_start = clip.w * 0.1
        y_pos = clip.h * 0.85

        words = e["text"].split()
        x_cursor = x_start

        for w in words:
            clean = w.strip(".,!?")
            is_highlight = clean in e.get("highlight_words", [])

            wc = (
                TextClip(
                    text=w + " ",
                    font_size=font_size,
                    font="Arial",
                    color="yellow" if is_highlight else "white",
                    method="caption"
                )
                .with_start(e["start"])
                .with_end(e["end"])
                .with_position((x_cursor, y_pos))
            )

            # ----- ANIMATIONS -----
            if e.get("animation") == "fade":
                wc = wc.fadein(0.3).fadeout(0.3)

            if is_highlight and e.get("animation") == "pop":
                wc = wc.resize(
                    lambda t: 0.9 + 0.2 * min(1, t * 4)
                )

            txt_clips.append(wc)
            x_cursor += wc.w

    final_video = (
        CompositeVideoClip([clip, *txt_clips])
        .with_audio(clip.audio)
    )

    output_path = os.path.join("outputs", os.path.basename(video_path))
    final_video.write_videofile(
        output_path,
        fps=clip.fps,
        codec="libx264",
        audio_codec="aac"
    )

    return output_path
