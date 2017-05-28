function Timer(workTime1, breakTime1) {
  workTime = workTime1;
  breakTime = breakTime1;
  paused = false;
  modeBreak = false;
  timeout = null;
  return {
      formattedTime() {
        let workSeconds = workTime % 60;
        if (workSeconds.toString().length == 1) {
        workSeconds = "0" + workSeconds;
        }
        return `${Math.floor(this.workTime / 60)}:${workSeconds}`;
      },
        tick() {
            if (!this.paused && this.workTime > 0) {
            timeout = setTimeout(() => {
                this.workTime -= 1;
                renderTimer();
                tick();
            }, 1000);
            }
        },
  this.start = function() {
    tick();
  };
  this.togglePause = function() {
    this.paused = !this.paused;
    if (this.paused) {
      clearTimeout(this.timeout);
    }
    if (!this.paused) {
      this.start();
    }
  };
  function renderTimer() {
    document.querySelector(".time").innerHTML = formattedTime();
  }
}
}

Timer(1500, 300);
Timer.start;
// startBtn = document.querySelector(".start-btn");
// startBtn.addEventListener("click", timer.start);
// pauseResumeBtn = document.querySelector(".pause-resume-btn");
// pauseResumeBtn.addEventListener("click", timer.togglePause.bind(timer));
