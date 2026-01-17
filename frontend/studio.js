// Basic timeline play simulation
const playBtn = document.querySelector(".timeline-controls button:nth-child(2)");

let playing = false;

playBtn.addEventListener("click", () => {
  playing = !playing;
  playBtn.textContent = playing ? "⏸" : "▶";
});

// Tool click feedback
document.querySelectorAll(".tool-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Tool action will go here");
  });
});
