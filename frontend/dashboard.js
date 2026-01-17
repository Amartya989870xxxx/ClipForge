/**
 * dashboard.js
 * Handles file selection (MP4/MP3), drag-and-drop, 
 * and source list management.
 */

const hiddenInput = document.getElementById("hiddenFileInput");
const dropZone = document.getElementById("dropZone");
const chooseFile = document.getElementById("chooseFile");
const addMoreBtn = document.getElementById("addMoreBtn");
const sourceList = document.getElementById("sourceList");
const startBtn = document.getElementById("startEditingBtn");
const statusText = document.getElementById("uploadStatus");

// Track uploaded files in an array
let sources = [];

/* ==========================================
   1. TRIGGERING THE FILE EXPLORER
   ========================================== */

// Clicking the "+ Add sources" button opens the file browser
addMoreBtn.onclick = () => {
  hiddenInput.value = ""; // Reset value to allow re-selecting the same file
  hiddenInput.click();
};

// Clicking the main drop zone box opens the file browser
dropZone.onclick = () => hiddenInput.click();

// The "choose file" link inside the text
chooseFile.onclick = (e) => {
  e.stopPropagation(); // Prevents the browser from opening twice
  hiddenInput.click();
};

/* ==========================================
   2. DRAG AND DROP LOGIC
   ========================================== */

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "#3edfb6"; // Visual feedback
  dropZone.style.background = "rgba(62, 223, 182, 0.04)";
});

dropZone.addEventListener("dragleave", () => {
  dropZone.style.borderColor = "rgba(255, 255, 255, 0.15)";
  dropZone.style.background = "transparent";
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "rgba(255, 255, 255, 0.15)";
  dropZone.style.background = "transparent";
  handleFiles(e.dataTransfer.files); //
});

/* ==========================================
   3. FILE HANDLING & VALIDATION
   ========================================== */

// When files are selected via the "stored files" tab
hiddenInput.addEventListener("change", () => {
  handleFiles(hiddenInput.files);
});

function handleFiles(files) {
  if (files.length === 0) return;

  for (let file of files) {
    // Support for MP4 and multiple MP3 MIME types
    const allowedTypes = ["video/mp4", "audio/mpeg", "audio/mp3"];
    
    if (!allowedTypes.includes(file.type)) {
      statusText.textContent = `Error: "${file.name}" is not a supported MP4 or MP3.`;
      statusText.style.color = "#ff4d4d";
      continue;
    }

    // Add to our internal tracking array
    sources.push(file);
    renderSource(file);
  }

  // If at least one file is valid, enable the "Start Editing" button
  if (sources.length > 0) {
    startBtn.disabled = false;
    statusText.textContent = `${sources.length} file(s) ready.`;
    statusText.style.color = "#3edfb6";
  }
}

/* ==========================================
   4. UI RENDERING
   ========================================== */

function renderSource(file) {
  // Remove "No sources yet" text if it exists
  const emptyMsg = sourceList.querySelector(".empty-text");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  const div = document.createElement("div");
  div.className = "source-item"; // Matches styling in dashboard.css
  
  // Display file type icon and name
  const icon = file.type.includes("video") ? "🎬" : "🎵";
  div.innerHTML = `<span>${icon} ${file.name}</span>`;
  
  sourceList.appendChild(div);
}

// Redirect to editor
// startBtn.onclick = () => {
//   window.location.href = ".html";
// };

//const startEditingBtn = document.getElementById("startEditingBtn");

startBtn.addEventListener("click", () => {
  // Only allow navigation if enabled
  if (startEditingBtn.disabled) return;

  // Redirect to Studio page
  window.location.href = "studio.html";
});
