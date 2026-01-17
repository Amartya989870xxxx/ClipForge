```
# FrameFlow Frontend

Welcome to the **FrameFlow** frontend! This is the web interface for your AI-powered video editing platform, built with HTML, CSS, and JavaScript. Users can upload videos, interact with AI chat commands, and edit videos seamlessly.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Folder Structure](#folder-structure)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Technologies](#technologies)  
- [Contributing](#contributing)  

---

## Project Overview

FrameFlow is a modern video editing web application that allows users to:

- Upload videos and audio files.  
- Preview and interact with their media.  
- Use AI-powered chat commands to edit videos (e.g., trim clips, add captions, remove animations).  
- Access a timeline and editing tools for fine control.  

The frontend communicates with a FastAPI backend that handles transcription, video editing logic, and rendering.

---

## Features

- **Upload Page**: Drag-and-drop video/audio upload with progress feedback.  
- **Studio Page**:  
  - Preview panel for selected media.  
  - Media library for uploaded sources.  
  - Timeline with clip management.  
  - Tool buttons for cutting, adding audio, captions, and effects.  
  - AI chat panel for applying edits through natural language commands.  
- **Dashboard / Hero Page**: Overview, quick navigation to the editor, and user guidance.  

---

## Folder Structure

frontend/
│
├─ index.html          # Landing / Hero page
├─ script.js           # Landing / Hero JS
├─ style.css           # Global styles shared across pages
│
# Studio files
├─ studio.html         # Studio / Editor page
├─ studio.css
├─ studio.js
│
# Dashboard / Upload files
├─ dashboard.html      # Upload / Dashboard page
├─ dashboard.css
├─ dashboard.js


---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/your-username/frameflow-frontend.git
cd frameflow-frontend
```

2. **Open in browser**

Since this is a static frontend, you can open HTML files directly in your browser:

```bash
open index.html
```

> Or you can use a local development server like `Live Server` in VS Code for hot reload.

3. **Connect to backend**

Make sure your **FastAPI backend** is running (default at `http://localhost:8000`) so the AI chat and video processing features work correctly.

---

## Usage

* **Landing / Hero Page**: Click “View Dashboard” to go to the Upload page.
* **Upload Page**: Drag & drop video/audio files into the drop zone or click “choose file.” After upload, click “Start Editing.”
* **Studio Page**:

  * Use the **Media Panel** to select sources.
  * Preview your video in the **Preview Panel**.
  * Use **Tool Buttons** to apply edits manually.
  * Use the **AI Chat Panel** to send natural language commands to the backend.
  * Manage clips using the **Timeline**.

---

## Technologies

* **HTML5** – Structure and layout
* **CSS3** – Styling and animations
* **JavaScript (Vanilla)** – Interactivity and frontend logic
* **Grid & Flexbox** – Layout management

---

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes and commit (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

**FrameFlow Frontend** – intuitive AI-powered video editing for everyone.

```


