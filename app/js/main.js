//Pomodoro-timer main-script

class Timer {
  constructor(workTime, breakTime) {
    this.defaultWorkTime = workTime;
    this.defaultBreakTime = breakTime;
    this.workTime = workTime;
    this.breakTime = breakTime;
    this.paused = false;
    this.modeBreak = false;
    this.timeout = null;
    this.running = false;
  }
  formatTime(time) {
    let seconds = time % 60;
    if (seconds.toString().length == 1) {
      seconds = "0" + seconds;
    }
    return `${Math.floor(time / 60)}:${seconds}`;
  }

  tick() {
    if (this.workTime === 1) {
      this.modeBreak = true;
      this.workTime = this.defaultWorkTime;
    }
    if (this.breakTime === 1) {
      this.modeBreak = false;
      this.breakTime = this.defaultWorkTime;
    }
    if (!this.paused && !this.modeBreak) {
      this.timeout = setTimeout(() => {
        this.workTime -= 1;
        this.renderTimer();
        this.tick();
      }, 1000);
    }
    if (!this.paused && this.modeBreak) {
      this.timeout = setTimeout(() => {
        this.breakTime -= 1;
        this.renderTimer();
        this.tick();
      }, 1000);
    }
  }
  start() {
    clearTimeout(this.timeout);
    this.workTime = this.defaultWorkTime;
    this.breakTime = this.defaultBreakTime;
    this.paused = false;
    this.running = true;
    this.modeBreak = false;
    document.querySelector(".pause-resume-btn").innerHTML = "pause";
    this.tick();
  }
  togglePause() {
    this.paused = !this.paused;
    if (this.paused && this.running) {
      clearTimeout(this.timeout);
      document.querySelector(".pause-resume-btn").innerHTML = "resume";
    }
    if (!this.paused && this.running) {
      this.tick();
      document.querySelector(".pause-resume-btn").innerHTML = "pause";
    }
  }
  renderTimer() {
    const percent = this.workTime / this.defaultWorkTime * 100;
    updateCircle(percent, this.formatTime(this.workTime));
  }
}

function updateCircle(val, caption) {
  const circle = document.querySelector("#svg #bar");
  var r = circle.getAttribute("r");
  var c = Math.PI * (r * 2);
  if (val < 0) {
    val = 0;
  }
  if (val > 100) {
    val = 100;
  }
  var pct = (100 - val) / 100 * c;
  circle.style.strokeDashoffset = pct;
  document.querySelector("#cont").setAttribute("data-pct", caption);
}

timer = new Timer(1500, 300);

startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", timer.start.bind(timer));
pauseResumeBtn = document.querySelector(".pause-resume-btn");
pauseResumeBtn.addEventListener("click", timer.togglePause.bind(timer));