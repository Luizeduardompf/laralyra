const board = document.getElementById("board");
const toast = document.getElementById("toast");
const audioCache = new Map();

function getAudio(sound) {
  if (!audioCache.has(sound.id)) {
    const audio = new Audio(sound.file);
    audio.preload = "auto";
    audioCache.set(sound.id, audio);
  }
  return audioCache.get(sound.id);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1500);
}

function playSound(sound, btn) {
  const audio = getAudio(sound);
  audio.currentTime = 0;
  audio.play().catch(() => {
    showToast("Clique novamente para liberar o som 🔈");
  });

  btn.classList.add("playing");
  setTimeout(() => btn.classList.remove("playing"), 300);
}

function buildBoard() {
  SOUNDS.forEach((sound, i) => {
    const btn = document.createElement("button");
    btn.className = "sound-btn";
    btn.style.setProperty("--hue", (i * (360 / SOUNDS.length)).toFixed(0));
    btn.setAttribute("aria-label", sound.label);

    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = sound.emoji;

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = sound.label;

    btn.appendChild(emoji);
    btn.appendChild(label);
    btn.addEventListener("click", () => playSound(sound, btn));

    board.appendChild(btn);
  });
}

buildBoard();
