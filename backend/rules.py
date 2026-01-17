# backend/rules.py

def apply_rules(segments):
    """
    Decide captions, animations, and emphasis
    """
    edits = []

    for i, seg in enumerate(segments):
        words = [w["word"] for w in seg.get("words", []) if len(w["word"]) > 3]

        # Simple emphasis heuristic: longest word
        highlight_word = max(words, key=len) if words else None

        edit = {
            "start": seg["start"],
            "end": seg["end"],
            "text": seg["text"],
            "style": "caption",
            "animation": "fade",
            "highlight": highlight_word
        }

        if i == 0:
            edit["style"] = "title"

        if len(seg["text"].split()) > 8:
            edit["animation"] = "pop"

        edits.append(edit)

    return edits
