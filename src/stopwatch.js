let hrDisplay = document.getElementById("hr-display");
let minDisplay = document.getElementById("min-display");
let secDisplay = document.getElementById("sec-display");
let msDisplay = document.getElementById("ms-display");

let isRunning = false;

function updateTime(hr, min, sec, ms) {
  hrDisplay.textContent = hr;
  minDisplay.textContent = min;
  secDisplay.textContent = sec;
  msDisplay.textContent = ms;
}

function runWatch() {
  if (isRunning) {
    let time = [
      parseInt(hrDisplay.textContent),
      parseInt(minDisplay.textContent),
      parseInt(secDisplay.textContent),
      parseInt(msDisplay.textContent),
    ];
    time[3]++;

    if (time[3] === 10) {
      time[2]++;
      time[3] = 0;
    }

    if (time[2] === 60) {
      time[1]++;
      time[2] = 0;
    }

    if (time[1] === 60) {
      time[0]++;
      time[1] = 0;
    }

    time.forEach((el) => {
      if (
        time.indexOf(el) !== 3 &&
        el.toString().length !== 2 &&
        parseInt(el) < 10
      ) {
        time[time.indexOf(el)] = "0" + el.toString();
      } else {
        time[time.indexOf(el)] = el.toString();
      }
    });

    updateTime(time[0], time[1], time[2], time[3]);
    setTimeout("runWatch()", 100);
  }
}

function toggleWatch() {
  if (!isRunning) {
    isRunning = true;
    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-pause";
    document.getElementById("toggle-button").title = "Pause";
    runWatch();
  } else {
    isRunning = false;
    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-play";
    document.getElementById("toggle-button").title = "Continue";
  }
}

function resetWatch() {
  if (!isRunning) {
    isRunning = false;
    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-play";
    document.getElementById("toggle-button").title = "Start";
    updateTime("00", "00", "00", "0");
  }
}
