let countdown;
let changeColor;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const alarm = document.querySelector(".alarm");

timerDisplay.style.color = "white";

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    if (secondsLeft === 5) {
      changeColor = setInterval(function () {
        flashColor();
      }, 500);
    } else if (secondsLeft === 0) {
      clearInterval(changeColor);
      timerDisplay.style.color = "white";
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  if (seconds === 5) {
    alarm.play();
  } else if (seconds === 0) {
    alarm.pause();
    alarm.currentTime = 0;
  }

  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;

  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  // for 12-hour clock
  // const adjustedHour = hour > 12 ? hour - 12 : hour;
  // const text = hour > 12 ? "P.M." : "A.M.";

  // endTime.textContent = `Be Back At ${adjustedHour < 10 ? "0" : ""}${adjustedHour}:${
  //   minutes < 10 ? "0" : ""
  // }${minutes} ${text}`;

  endTime.textContent = `Be Back At ${hour < 10 ? "0" : ""}${hour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});

function flashColor() {
  if (timerDisplay.style.color === "white") {
    timerDisplay.style.color = "red";
  } else {
    timerDisplay.style.color = "white";
  }
}
