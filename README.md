
# FrameFlow – AI-Powered Video Editor

**FrameFlow** is an AI-driven video editing platform that allows users to upload videos, edit them with natural language commands, and apply automated effects and captions. The project combines **FastAPI**, **Whisper**, and **MoviePy** on the backend with a **modern JavaScript frontend** for an intuitive video editing experience.

---

## Table of Contents
```
- [Project Overview](#project-overview)  
- [Architecture & Workflow](#architecture--workflow)  
- [Folder Structure](#folder-structure)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Frontend Usage](#frontend-usage)  
- [Backend Usage](#backend-usage)  
- [Contributing](#contributing)  
```
---

## Project Overview

FrameFlow provides:

- **Video Upload & Management** – Users can upload MP4/MP3 files for editing.  
- **AI Chat Commands** – Modify videos using natural language (e.g., “Make captions bolder”, “Remove animation”).  
- **Automatic Captioning & Styling** – Transcribes audio and applies predefined rules for captions and animations.  
- **Preview & Timeline Editing** – Visual timeline with clip management and tools for trimming, adding audio, captions, or effects.  

The goal is to **minimize manual video editing effort** while giving users **full control via AI commands**.

---

## Architecture & Workflow

The project is split into **frontend** and **backend**, communicating over **HTTP APIs**.

### 1. Frontend

- Built with **HTML, CSS, and vanilla JavaScript**.  
- Handles video uploads, previews, timeline management, tool interactions, and AI chat UI.  
- Sends JSON requests to the backend for video processing and chat commands.

### 2. Backend

- Built with **FastAPI** (Python).  
- Handles:

  1. **Video Upload** – Saves files to `/uploads`.  
  2. **Transcription** – Uses **Whisper** to extract audio → text + timestamps.  
  3. **Edit Plan Generation** – Applies rules (captions, styles, animations) based on transcript segments.  
  4. **Chat Command Processing** – Modifies edit plan according to natural language commands.  
  5. **Video Rendering** – Generates final video with **MoviePy** and saves to `/outputs`.  

### 3. Workflow Diagram (Conceptual)

```plaintext
[User Uploads Video] 
        │
        ▼
[Frontend Upload Page] ──> POST /process ──> [Backend]
        │                                │
        │                                ▼
        │                     Transcription (Whisper)
        │                                │
        │                     Edit Plan Generation
        │                                │
[AI Chat Panel] ──> POST /chat ──────────┘
        │
        ▼
[Frontend Preview & Timeline Updates]
        │
        ▼
[Rendered Video in /outputs]
````

**Key Points:**

* **Async Operations**: Long-running tasks (transcription, rendering) are run asynchronously to avoid blocking the API.
* **AI Commands**: Backend interprets commands like “bolder” or “remove animation” to update captions dynamically.
* **Separation of Concerns**: Frontend handles UI/UX; backend handles AI, processing, and rendering.

---

## Folder Structure

```plaintext
frontend/
│
├─ index.html        # Landing / Hero page
├─ script.js         # Landing page JS
├─ style.css         # Global styles
│
# Studio / Editor
├─ studio.html
├─ studio.css
├─ studio.js
│
# Dashboard / Upload
├─ dashboard.html
├─ dashboard.css
├─ dashboard.js
```

```plaintext
backend/
│
├─ main.py           # FastAPI app with /process and /chat endpoints
├─ chat.py           # Parse AI chat commands
├─ renderer.py       # Video rendering using MoviePy
├─ transcription.py  # Audio → text transcription (Whisper)
├─ rules.py          # Predefined edit rules
├─ uploads/          # Uploaded videos
└─ outputs/          # Rendered videos
```

---

## Tech Stack

**Frontend**:

* HTML5, CSS3, JavaScript (Vanilla)
* CSS Grid & Flexbox for responsive layouts
* Interactive AI chat interface for editing

**Backend**:

* **FastAPI** – API framework
* **MoviePy** – Video editing and rendering
* **Whisper (openai-whisper)** – Speech-to-text transcription
* **Python AsyncIO** – Non-blocking video/audio processing
* **Pydantic** – JSON validation and models

**Other Dependencies**:

* Torch (required by Whisper)
* spaCy (optional NLP components)

---

## Getting Started

### Frontend

1. Open `index.html` in a browser (or use a local server for hot reload).
2. Use the dashboard page to upload videos.
3. Navigate to the Studio page to preview, edit, and apply AI chat commands.

### Backend

1. Clone the repository:

```bash
git clone https://github.com/your-username/frameflow.git
cd frameflow/backend
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the server:

```bash
uvicorn backend.main:app --reload
```

API will be available at `http://localhost:8000`.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Make changes and commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## Summary

FrameFlow integrates **AI-powered transcription, editing rules, and chat commands** to simplify video editing workflows. Its architecture separates frontend and backend responsibilities, ensuring a responsive UI and scalable video processing pipeline.

```
