const hiddenInput = document.getElementById("hiddenFileInput");
const selectBtn = document.getElementById("fileSelectorBtn");
const fileName = document.getElementById("selectedFileName");
const metaBox = document.getElementById("metadataBox"); // may be null
const uploadBtn = document.getElementById("uploadBtn");
const statusText = document.getElementById("uploadStatus");

// Safari fix
selectBtn.addEventListener("click", () => {
  hiddenInput.value = "";
  hiddenInput.click();
});

// File selection
hiddenInput.addEventListener("change", () => {
  if (!hiddenInput.files.length) {
    fileName.textContent = "No file chosen";
    return;
  }

  const file = hiddenInput.files[0];

  // ✅ Validate file type
  const allowedTypes = ["audio/mpeg", "video/mp4"];
  if (!allowedTypes.includes(file.type)) {
    statusText.textContent = "Only MP3 or MP4 files are allowed.";
    statusText.className = "upload-error";
    hiddenInput.value = "";
    return;
  }

  // ✅ Optional size limit (100MB)
  if (file.size > 100 * 1024 * 1024) {
    statusText.textContent = "File size exceeds 100MB.";
    statusText.className = "upload-error";
    hiddenInput.value = "";
    return;
  }

  fileName.textContent = file.name;
  statusText.textContent = "";
});

// Upload
uploadBtn.addEventListener("click", async () => {
  if (!hiddenInput.files.length) {
    statusText.textContent = "Please select a file.";
    statusText.className = "upload-error";
    return;
  }

  statusText.textContent = "Uploading...";
  statusText.className = "";

  const form = new FormData();

  // ✅ MUST MATCH backend: upload.single("media")
  form.append("media", hiddenInput.files[0]);

  // ✅ Metadata only if textarea exists
  if (metaBox) {
    try {
      const meta = JSON.parse(metaBox.value || "{}");
      form.append("metadata", JSON.stringify(meta));
    } catch {
      statusText.textContent = "Invalid JSON metadata!";
      statusText.className = "upload-error";
      return;
    }
  }

  try {
    const uploadRes = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: form
    });

    const data = await uploadRes.json();

    if (!uploadRes.ok || data.error) {
      throw new Error(data.error || "Upload failed");
    }

    statusText.textContent = "Upload successful! 🎉";
    statusText.className = "upload-success";

    // reset UI
    hiddenInput.value = "";
    fileName.textContent = "No file chosen";

  } catch (err) {
    console.error(err);
    statusText.textContent = "Upload failed. Try again.";
    statusText.className = "upload-error";
  }
});
