# backend/rules.py

def apply_rules(segments):
    """
    Decide captions, animations, styles, and highlight words.
    """
    edits = []

    MIN_DURATION = 0.8

    # Define keywords to highlight (you can expand this list)
    keywords = ["AI", "FrameFlow", "edit", "caption", "video"]

    for i, seg in enumerate(segments):
        start = seg["start"]
        end = max(seg["end"], start + MIN_DURATION)

        edit = {
            "start": start,
            "end": end,
            "text": seg["text"],
            "style": "caption",
            "animation": "fade",
            "highlight_words": []
        }

        # First segment = title
        if i == 0:
            edit["style"] = "title"

        # Long sentences get 'pop' animation
        if len(seg["text"].split()) > 8:
            edit["animation"] = "pop"

        # Highlight keywords if they appear in the text
        edit["highlight_words"] = [
            w for w in seg["text"].split() if w.strip(".,!?").capitalize() in keywords
        ]

        edits.append(edit)

    return edits
