let timeDom = document.querySelector(".time");
let date = new Date();

function setTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours < 10 ? (hours = "0" + hours) : hours;
  minutes < 10 ? (minutes = "0" + minutes) : minutes;
  seconds < 10 ? (seconds = "0" + seconds) : seconds;
  timeDom.innerHTML = hours + ":" + minutes + ":" + seconds;
}
setInterval(setTime, 100);

function setZileSapt() {
  for (let i = 1; i < 8; i++) {
    let setDate = new Date(`2022, 05, 0${i}`);
    let weekName = setDate.toLocaleString("default", {
      weekday: "short",
    });
    let div = document.createElement("div");
    div.innerHTML = weekName;
    div.classList.add("sapt");
    document.querySelector(".zilesapt").appendChild(div);
  }
}
function createDates() {
  for (let i = 1; i < 43; i++) {
    let div = document.createElement("div");
    div.classList.add("alldays");
    document.querySelector(".zilenr").appendChild(div);
  }
}
createDates();
setZileSapt();
let allDays = document.querySelectorAll(".alldays");
let month = date.getMonth();
let year = date.getFullYear();
let zilenr = document.querySelectorAll(".zilenr");
let sapt = document.querySelectorAll(".sapt");
let zilesapt = document.querySelectorAll(".zilesapt");

function setDates(year, month) {
  let setlastdate = new Date(year, month + 1, 0);
  let setfirstdate = new Date(year, month, 1);
  let monthname = setfirstdate.toLocaleString("default", {
    month: "long",
  });
  document.querySelector(".currentdate").innerHTML = date.toDateString();
  document.querySelector(".month").innerHTML = monthname;
  document.querySelector(".year").innerHTML = setfirstdate.getFullYear();
  let weekName = setfirstdate.toLocaleString("default", {
    weekday: "short",
  });
  let previousdays = new Date(year, month, 0).getDate();
  let futuredays = 1;
  let allDaysInMonth = setlastdate.getDate();
  for (let i = 0; i < 7; i++) {
    if (sapt[i].innerHTML === weekName) {
      for (let z = 0; z < allDaysInMonth; z++) {
        if (z <= allDaysInMonth) {
          allDays[z + i].innerHTML = z + 1;
        }
      }
      for (let k = 0; k < allDays.length; k++) {
        if (k >= allDaysInMonth && allDays[k].innerHTML === "") {
          allDays[k].style.color = "gray";
          allDays[k].innerHTML = futuredays++;
        }
      }
    }
  }
  for (let i = 7; i >= 0; i--) {
    if (allDays[i].textContent === "") {
      allDays[i].style.color = "gray";
      previousdays--;
      allDays[i].innerHTML = previousdays + 1;
    }
  }
}

setDates(year, month);
function clear() {
  allDays.forEach((zile) => {
    zile.innerHTML = "";
    zile.style.color = "black";
    zile.classList.add("classTrans1");
  });
}
let transition = function () {
  setTimeout(function () {
    allDays.forEach((zile) => {
      zile.classList.remove("classTrans1");
    });
  }, 700);
};
document.querySelector(".mr").addEventListener("click", function () {
  clear();
  month++;
  setDates(year, month);
  transition();
});
document.querySelector(".ml").addEventListener("click", function () {
  clear();
  month--;
  setDates(year, month);
  transition();
});
document.querySelector(".yr").addEventListener("click", function () {
  clear();
  year++;
  setDates(year, month);
  transition();
});
document.querySelector(".yl").addEventListener("click", function () {
  clear();
  year--;
  setDates(year, month);
  transition();
});
////clock
let switchclock = document.querySelector(".switchclock");
let trigger = true;
for (let i = 1; i < 13; i++) {
  let span = document.createElement("span");
  span.innerHTML = "|";
  span.classList.add("numbers");
  document.querySelector(".numere").appendChild(span);
}

switchclock.addEventListener("click", function () {
  trigger = !trigger;
  trigger === true
    ? (timeDom.style.display = "block")
    : (timeDom.style.display = "none");

  trigger === false
    ? (document.querySelector(".circle2").style.display = "block")
    : (document.querySelector(".circle2").style.display = "none");
  // let audio = document.getElementById("myaudio");
  // trigger === false ? audio.play() : audio.pause();
});
let circleText = document.querySelectorAll(".numbers");

for (let i = 0; i <= circleText.length - 1; i++) {
  circleText[i].style.transform = `rotate(${i * 30}deg) `;
}

let rotate = document.querySelectorAll(".rotate");
let limbamica = document.querySelector(".limbamica");
let limbamare = document.querySelector(".limbamare");
let secundar = document.querySelector(".secundar");

function rotateseconds() {
  let dates = new Date();
  let sec = dates.getSeconds();
  let hour = dates.getHours();
  let min = dates.getMinutes();
  limbamare.style.transform = `rotate(${min * 6}deg) translateY(-50%)`;
  limbamica.style.transform = `rotate(${hour * 30}deg) translateY(-50%)`;
  secundar.style.transform = `rotate(${sec * 6}deg) translateY(-50%) `;
}
setInterval(rotateseconds, 100);
//weather
let request = new XMLHttpRequest();
request.open(
  "GET",
  "https://api.openweathermap.org/data/2.5/weather?lat=44.43225&lon=26.10626&appid=96d8dd56535102c97cc1ba6390e205fe&units=metric"
);
request.send();
let statuss = document.querySelector(".status");
request.addEventListener("load", function () {
  let weatherData = JSON.parse(this.responseText);
  let [status] = weatherData.weather;
  let main = weatherData.main;
  let winddata = weatherData.wind;
  let descriptionString = status.description;
  let html = ` 
  
  <img src="http://openweathermap.org/img/wn/${
    status.icon
  }.png" alt="sun" class="img-weather">
    <p class="location"> ${weatherData.name} </p>
    <p class="temperature"> ${Math.trunc(main.temp)}°</p>
    <p class="status">${status.main}</p>
    <p class="status-description">${
      descriptionString.charAt(0).toUpperCase() + descriptionString.slice(1)
    }</p>
    <p class="min">Min: ${Math.trunc(main.temp_min)}° 🌡</p>
    <p class="max">Max: ${Math.trunc(main.temp_max)}° 🌡</p>
    <p class="wind">${"Wind: " + winddata.speed} 💨</p>`;
  let cointainer = document.querySelector(".weather-container");
  cointainer.insertAdjacentHTML(`beforeend`, html);
});

let trigger2 = true;
let weatherContainer = document.querySelector(".weather-container");
document.querySelector(".weatherbtn").addEventListener("click", function () {
  trigger2 = !trigger2;
  dissapear(trigger2, `Weather`, weatherContainer);
});

function dissapear(trigger, cls, variable, style) {
  if (trigger === true) {
    variable.classList.add(`dissapear${cls}`);
    setTimeout(function () {
      document.querySelector(`.dissapear${cls}`).style.display = "none";
    }, 500);
  } else {
    variable.classList.remove(`dissapear${cls}`);
    weatherContainer.style.display = "grid";
  }
}
