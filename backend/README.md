
# FrameFlow Backend

This is the backend for **FrameFlow**, an AI-powered video editor. It provides APIs to process videos, generate transcripts, apply automated edit rules, and execute AI chat commands that modify the video edits. Built with **FastAPI** and **MoviePy**.

---

## Table of Contents
```
- [Project Overview](#project-overview)  
- [Features](#features)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
- [Requirements](#requirements)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  
```
---

## Project Overview
```
The backend handles:

- Uploading and storing videos.
- Extracting audio and generating transcripts using **Whisper**.
- Applying edit rules for captions, styles, and animations.
- Applying AI chat commands (e.g., “Make captions bolder”, “Remove animation”).
- Rendering final videos with captions and overlays using **MoviePy**.

The frontend communicates with this backend via JSON requests over **FastAPI endpoints**.
```
---

## Features

- **Video Upload & Processing** – Accept videos, transcribe speech, generate edit plans, and render output.  
- **AI Chat Command Integration** – Users can send natural language commands to modify the edit plan.  
- **Video Rendering** – Overlay captions and animations on videos automatically.  
- **Error Handling** – Returns clear messages if a video cannot be processed.  

---

## Folder Structure

```
backend/
│
├─ main.py              # FastAPI application with /process and /chat endpoints
├─ chat.py              # AI chat command parsing and edit modifications
├─ renderer.py          # Video rendering logic using MoviePy
├─ transcription.py     # Video → text transcription using Whisper
├─ rules.py             # Predefined rules for captions, styles, and animations
├─ uploads/             # Directory for uploaded videos
└─ outputs/             # Directory for processed/output videos
```
---

## Getting Started

1. **Clone the repository**

```
git clone https://github.com/your-username/frameflow-backend.git
cd frameflow-backend
```

2. **Create a virtual environment (recommended)**

```
python -m venv venv
source venv/bin/activate   # Linux / macOS
venv\Scripts\activate      # Windows
```

3. **Install dependencies**

```
pip install -r requirements.txt
```

> `requirements.txt` should include:
>
> ```
> fastapi
> uvicorn
> openai-whisper
> moviepy
> torch
> pydantic
> spacy
> ```

4. **Run the backend server**

```
uvicorn backend.main:app --reload
```

The API will be available at `http://localhost:8000`.

---

## API Endpoints

### 1. POST `/process`

* **Description**: Upload a video file, generate transcript, apply default edit rules, and render output video.
* **Request**: `multipart/form-data` with a file field.
* **Response**:

```json
{
  "video": "outputs/video.mp4",
  "edits": [
    { "start": 0, "end": 3, "text": "Hello World", "style": "title", "animation": "fade" }
  ]
}
```

---

### 2. POST `/chat`

* **Description**: Apply a chat command to an existing uploaded video and render a new output.
* **Request**: JSON

```json
{
  "video_name": "video.mp4",
  "message": "Make captions bolder"
}
```

* **Response**:

```json
{
  "video": "outputs/video.mp4",
  "edits": [
    { "start": 0, "end": 3, "text": "Hello World", "style": "title", "animation": "fade", "fontsize": 40 }
  ]
}
```

* **Supported commands**:

  * `"bolder"` → increases font size of captions.
  * `"remove animation"` → disables caption animations.

---

## Requirements

* Python 3.10+
* **Libraries**:

```
fastapi
uvicorn
openai-whisper
moviepy
torch
pydantic
spacy
```
---

## Technologies

* **FastAPI** – API framework
* **MoviePy** – Video processing and rendering
* **Whisper** – Audio transcription
* **Pydantic** – Data validation and models
* **Python AsyncIO** – Async wrappers for blocking video/audio operations

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes and commit (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

**FrameFlow Backend** – powering intelligent AI video editing with transcription, automated rules, and chat-driven edits.

```

---

