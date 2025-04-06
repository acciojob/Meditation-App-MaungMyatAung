//your JS code here. If required.
const audio = document.getElementById('audio');
const video = document.getElementById('bgVideo');
const playBtn = document.getElementById('playBtn');
const timeDisplay = document.querySelector('.time-display');
const timeButtons = {
  smaller: document.getElementById('smaller-mins'),
  medium: document.getElementById('medium-mins'),
  long: document.getElementById('long-mins')
};
const rainMode = document.getElementById('rainMode');
const beachMode = document.getElementById('beachMode');

let duration = 600; // default 10 minutes
let isPlaying = false;
let fakeDuration = duration;
let interval;

// Update displayed time
function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  timeDisplay.textContent = `${mins}:${secs}`;
}

function togglePlay() {
  if (!isPlaying) {
    audio.play();
    video.play();
    playBtn.src = "https://img.icons8.com/ios-filled/50/pause.png";
    interval = setInterval(() => {
      fakeDuration--;
      updateTimeDisplay(fakeDuration);
      if (fakeDuration <= 0) {
        pauseMedia();
        fakeDuration = duration;
      }
    }, 1000);
  } else {
    pauseMedia();
  }
  isPlaying = !isPlaying;
}

function pauseMedia() {
  audio.pause();
  video.pause();
  playBtn.src = "https://img.icons8.com/ios-filled/50/play.png";
  clearInterval(interval);
}

// Time select events
timeButtons.smaller.onclick = () => setDuration(120);
timeButtons.medium.onclick = () => setDuration(300);
timeButtons.long.onclick = () => setDuration(600);

function setDuration(time) {
  duration = time;
  fakeDuration = time;
  updateTimeDisplay(duration);
  pauseMedia();
  isPlaying = false;
}

// Sound picker events
rainMode.onclick = () => switchMode('rain');
beachMode.onclick = () => switchMode('beach');

function switchMode(mode) {
  if (mode === 'rain') {
    audio.src = 'Sounds/rain.mp3';
    video.src = 'Sounds/rain.mp4';
  } else {
    audio.src = 'Sounds/beach.mp3';
    video.src = 'Sounds/beach.mp4';
  }
  audio.load();
  video.load();
  pauseMedia();
  isPlaying = false;
  updateTimeDisplay(duration);
}

playBtn.addEventListener('click', togglePlay);
updateTimeDisplay(duration);
