if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

const showNotification = (body, timeout) => {
  const notification = new Notification("Timly", {
    body: body,
  });

  setTimeout(() => {
    notification.close();
  }, timeout * 1000);
};

let hrDisplay = document.getElementById("hr-display");
let minDisplay = document.getElementById("min-display");
let secDisplay = document.getElementById("sec-display");
let displays = [hrDisplay, minDisplay, secDisplay];

let time = [
  parseInt(hrDisplay.value),
  parseInt(minDisplay.value),
  parseInt(secDisplay.value),
];

let isRunning = false;

const updateTime = (hr, min, sec) => {
  hrDisplay.value = hr;
  minDisplay.value = min;
  secDisplay.value = sec;
};

const runTimer = () => {
  if (isRunning) {
    if (time[2] === 0) {
      if (time[1] !== 0) {
        time[1]--;
        time[2] = 60;
      } else {
        if (time[0] !== 0) {
          time[0]--;
          time[1] = 59;
          time[2] = 60;
        }
      }
    }

    time[2]--;

    time.forEach((el) => {
      if (el.toString().length !== 2 && parseInt(el) < 10) {
        time[time.indexOf(el)] = "0" + el.toString();
      } else {
        time[time.indexOf(el)] = el.toString();
      }
    });

    if (time[0] == 0 && time[1] == 0 && time[2] == 0) {
      showNotification("Timer Done!", 5);
      document
        .getElementById("toggle-button")
        .querySelector("#icon-1").className = "fa fa-play";
      document.getElementById("toggle-button").title = "Start";
      displays.forEach((el) => {
        el.disabled = false;
        el.style.fontSize = "25px";
      });

      isRunning = false;
    }
    updateTime(time[0], time[1], time[2]);
    time = [
      parseInt(hrDisplay.value),
      parseInt(minDisplay.value),
      parseInt(secDisplay.value),
    ];
    setTimeout("runTimer()", 1000);
  }
};

const toggleTimer = () => {
  time = [
    parseInt(hrDisplay.value),
    parseInt(minDisplay.value),
    parseInt(secDisplay.value),
  ];
  time.forEach((el) => {
    if (el == "NaN") {
      alert("Integer fields are required!");
      return;
    }
  });
  if (time[0] === 0 && time[1] === 0 && time[2] === 0) {
    alert("You need to set a timer of atleast 1 second.");
    return;
  }
  time[2]++;
  displays.forEach((el) => {
    el.disabled = true;
    el.style.fontSize = "40px";
  });

  if (!isRunning) {
    isRunning = true;
    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-pause";
    document.getElementById("toggle-button").title = "Pause";
    runTimer();
  } else {
    isRunning = false;
    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-play";
    document.getElementById("toggle-button").title = "Continue";
    displays.forEach((el) => {
      el.disabled = false;
      el.style.fontSize = "25px";
    });
  }
};

const resetTimer = () => {
  if (!isRunning) {
    isRunning = false;
    displays.forEach((el) => {
      el.disabled = false;
      el.style.fontSize = "25px";
    });

    document
      .getElementById("toggle-button")
      .querySelector("#icon-1").className = "fa fa-play";
    document.getElementById("toggle-button").title = "Start";
    ("fa fa-play");
    updateTime("00", "00", "00");
  }
};
