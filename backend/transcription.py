# backend/transcription.py
import whisper

model = whisper.load_model("base")

def transcribe(video_path: str):
    """
    Convert speech → text + timestamps (segment + word level)
    """
    result = model.transcribe(video_path, word_timestamps=True)

    segments = []
    for seg in result["segments"]:
        words = []
        for w in seg.get("words", []):
            words.append({
                "word": w["word"].strip(),
                "start": w["start"],
                "end": w["end"]
            })

        segments.append({
            "start": seg["start"],
            "end": seg["end"],
            "text": seg["text"].strip(),
            "words": words
        })

    return segments
