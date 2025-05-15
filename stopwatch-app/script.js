let startTime, updatedTime, difference, timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function timeToString(time) {
  const hrs = String(Math.floor(time / 3600000)).padStart(2, "0");
  const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

function start() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      display.textContent = timeToString(difference);
    }, 1000);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00";
  difference = 0;
  running = false;
  laps.innerHTML = "";
  lapCounter = 1;
}

function lap() {
  if (running) {
    const lapTime = timeToString(difference);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
    laps.appendChild(li);
  }
}
