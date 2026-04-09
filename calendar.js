const first_day = new Date("2025-05-26"); // First working day
const last_day = new Date("2026-04-09"); // Last working day

//last_day.setHours(14, 45, 0, 0); 
let today = new Date();
today.setHours(5, 30, 0, 0);
const mil_sec_in_day = 86400000;

console.log("today: " + today)
console.log("last_day: " + last_day)

const holidays = [
  "2025-08-08",
  "2025-08-15",
  "2025-08-27",
  "2025-09-05",
  "2025-09-20",
  "2025-09-22",
  "2025-09-23",
  "2025-09-24",
  "2025-09-25",
  "2025-09-26",
  "2025-09-27",
  "2025-09-29",
  "2025-09-30",
  "2025-10-01",
  "2025-10-02",
  "2025-10-03",
  "2025-10-04",
  "2025-10-20",
  "2025-10-21",
  "2025-10-22",
  "2025-11-01",
  "2025-11-08",
  "2025-12-24",
  "2025-12-25",
  "2025-12-26",
  "2025-12-27",
  "2025-12-29",
  "2025-12-30",
  "2025-12-31",
  "2026-01-01",
  "2026-01-14",
  "2026-01-26",
  "2026-03-19",
  "2026-04-03",
];

function find_days_inbetween(start, end) {
    let diff = end - start;
    days = diff / mil_sec_in_day;
    days = Math.round(days);
    return days;
  }
  //This function gives you the number of sundays or any other day between two dates.
  //It checks every single day from the starting till end and each time it lands on the specific day,
  //it counts it in the variable "specific_day"
  
function get_num_spec_days(first_date, last_date, day) {
  let diff = last_date - first_date;
  let i = 0;
  let specific_day = 0;

  while (i <= diff) {
    let x = new Date(first_date.getTime() + i);
    if (x.getDay() == day) {
      specific_day = specific_day + 1;
    }
    i = i + mil_sec_in_day; //<-- if increased by just one, only one millisecond will change
  }
  return specific_day;
}

function is_holiday(x_date) {
  let i = 0;
  while (i < holidays.length) {
    let holiday = new Date(holidays[i]);
    if (holiday.getTime() == x_date.getTime()) {
      return true;
    }
    i = i + 1;
  }
  return false;
}
// The above function checks if a perticular date is a holiday.
//Sundays not included

function get_num_hols(first_date, last_date) {
  let diff = last_date - first_date;

  let i = 0;
  let hols = 0;
  while (i <= diff) {
    let x = new Date(first_date.getTime() + i);
    if (is_holiday(x) == true) {
      hols = hols + 1;
    }
    i = i + mil_sec_in_day; //<-- if increased by just one only one millisecond will change
  }
  return hols;
}


// The below function checks if a given date is a holiday. 
// including sundays

function find_if_hol(x_date) {
  let date_hol = is_holiday(x_date);

  if (x_date.getDay() == 0) {
    return true;
  } else {
    if (date_hol == true) {
      return true;
    } else {
      return false;
    }
  }
}

function find_next_hol() {

    let i = 0;
    let hols = 0;
  let end_day = new Date(last_day.getTime());
  end_day.setHours(5, 30, 0, 0);
    
    let day = new Date(today.getTime()+ i);
    day.setHours(5, 30, 0, 0);



  while (hols < 1 && day.valueOf() <= end_day.valueOf()) {
      
      
      day = new Date(today.getTime()+ i);
      

      let is_hol = is_holiday(day)
      if ( is_hol == true) {

          hols = hols + 1;
          return day;
      }
      i = i + mil_sec_in_day
    }
    
    return "no_more_hols";
 

}

function find_vacation () {
  let i = 0
  let got_it = 0
  let start_date = 0
  let end_date = 0
  while (got_it < 1||day == last_day) {
    
    let day = new Date(today.getTime()+ i);
    
    let is_hol = find_if_hol(day)
    if ( is_hol == true) {
      if (start_date)
      start_date = day
       
    }
    i = i + mil_sec_in_day
  }
}

function show_bar(percentage) {
    var elem = document.getElementById("myBar");
    var width = percentage;
    elem.style.width = width + "%"
    elem.innerHTML = width + "%"
}

function startVacationConfetti() {
  var canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    return;
  }

  var context = canvas.getContext('2d');
  var particles = [];
  var colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
  var animationId;
  var gravity = 0.02;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createBurst() {
    for (var i = 0; i < 320; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        size: 6 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: -3 + Math.random() * 6,
        speedY: 1 + Math.random() * 3,
        rotation: Math.random() * Math.PI,
        rotationSpeed: -0.2 + Math.random() * 0.4,
        opacity: 1
      });
    }
  }

  function drawParticle(particle) {
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.globalAlpha = particle.opacity;
    context.fillStyle = particle.color;
    context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.55);
    context.restore();
  }

  function updateParticles() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(function (particle) {
      particle.speedY += gravity;
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.rotation += particle.rotationSpeed;
      particle.opacity -= 0.004;

      drawParticle(particle);

      return particle.y < canvas.height + 30 && particle.opacity > 0;
    });

    if (particles.length > 0) {
      animationId = requestAnimationFrame(updateParticles);
    } else {
      cancelAnimationFrame(animationId);
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  resizeCanvas();
  createBurst();
  updateParticles();
  window.addEventListener('resize', resizeCanvas, { once: true });
}

var vacationAudio = null;
var vacationAudioPendingPlay = false;
var vacationAudioFallbackListenersBound = false;

function getVacationAudio() {
  if (!vacationAudio) {
    vacationAudio = new Audio('Fireworks.mp3');
    vacationAudio.preload = 'auto';
  }

  return vacationAudio;
}

function bindVacationAudioFallback() {
  if (vacationAudioFallbackListenersBound) {
    return;
  }

  vacationAudioFallbackListenersBound = true;

  var resumeOnInteraction = function () {
    if (!vacationAudioPendingPlay) {
      return;
    }

    var audio = getVacationAudio();
    audio.muted = false;
    audio.currentTime = 0;

    var retryPromise = audio.play();
    if (retryPromise && typeof retryPromise.catch === 'function') {
      retryPromise.catch(function () {
        // Keep pending if playback is still blocked.
      });
    }
  };

  document.addEventListener('click', resumeOnInteraction);
  document.addEventListener('keydown', resumeOnInteraction);
  document.addEventListener('touchstart', resumeOnInteraction);
}

function playVacationAudio() {
  var audio = getVacationAudio();
  vacationAudioPendingPlay = true;

  audio.pause();
  audio.currentTime = 0;
  audio.volume = 1;
  audio.muted = true;

  var playPromise = audio.play();

  // Start muted (autoplay-friendly), then immediately unmute for audible playback.
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise.then(function () {
      setTimeout(function () {
        audio.muted = false;
      }, 60);
      vacationAudioPendingPlay = false;
    }).catch(function () {
      audio.muted = false;
      bindVacationAudioFallback();
    });
  } else {
    audio.muted = false;
    vacationAudioPendingPlay = false;
  }

  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(function () {
      bindVacationAudioFallback();
    });
  }
}

function ensureVacationFlashStyles() {
  if (document.getElementById('vacation-flash-style')) {
    return;
  }

  var style = document.createElement('style');
  style.id = 'vacation-flash-style';
  style.textContent = `
    #vacation-flash-overlay {
      position: fixed;
      inset: 0;
      background: #ffffff;
      z-index: 10001;
      pointer-events: none;
      overflow: hidden;
      opacity: 1;
    }

    #vacation-flash-overlay .vacation-flare {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 18vmax;
      height: 18vmax;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0.08);
      background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.96) 45%, rgba(255, 255, 255, 0) 72%);
      filter: blur(8px);
      box-shadow: 0 0 80px 50px rgba(255, 255, 255, 0.95);
      opacity: 0.96;
    }

    #vacation-flash-overlay.active .vacation-flare {
      animation: vacationFlashExpand 760ms cubic-bezier(0.2, 0.65, 0.2, 1);
    }

    #vacation-flash-overlay.fade-out {
      opacity: 0;
      transition: opacity 900ms ease-out;
    }

    @keyframes vacationFlashExpand {
      0% {
        transform: translate(-50%, -50%) scale(0.08);
        opacity: 0.95;
      }

      35% {
        opacity: 1;
      }

      100% {
        transform: translate(-50%, -50%) scale(16);
        opacity: 0;
      }
    }
  `;

  document.head.appendChild(style);
}

function runVacationFlash(onFinished) {
  ensureVacationFlashStyles();

  var page = document.getElementById('page');
  if (page) {
    page.style.visibility = 'hidden';
  }

  var existingOverlay = document.getElementById('vacation-flash-overlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }

  var overlay = document.createElement('div');
  overlay.id = 'vacation-flash-overlay';

  var flare = document.createElement('div');
  flare.className = 'vacation-flare';
  overlay.appendChild(flare);

  document.body.appendChild(overlay);

  requestAnimationFrame(function () {
    overlay.classList.add('active');
  });

  setTimeout(function () {
    overlay.classList.add('fade-out');
  }, 760);

  setTimeout(function () {
    overlay.remove();
    if (page) {
      page.style.visibility = 'visible';
    }
    if (typeof onFinished === 'function') {
      onFinished();
    }
  }, 1660);
}



function show_details() {

    let is_sat_working = document.getElementById("toggleSwitch").checked;

    let no_of_sat_left = get_num_spec_days(today, last_day, 6);
    let no_of_sat_over = get_num_spec_days(first_day, today, 6);
    let no_of_sat_in_year = get_num_spec_days(first_day, last_day, 6);


    let next_hol = find_next_hol();

    if (next_hol != "no_more_hols") {
        let next_hol_date = next_hol.getDate() + " " + next_hol.toLocaleString('default', { month: 'long' }) + " " + next_hol.getFullYear()
        document.getElementById("next-hol").innerHTML = next_hol_date;
      document.getElementById("next-hol-section").style.display = "block";
    }
    else { 
      document.getElementById("next-hol-section").style.display = "none";
    }


    let no_of_sundays_left = get_num_spec_days(today, last_day, 0);
    let no_of_hols_left = get_num_hols(today, last_day);
    let no_of_working_days_left =
     find_days_inbetween(today, last_day) 
     - no_of_sundays_left  
     - no_of_hols_left;

    if (is_sat_working == false) {
        no_of_working_days_left = no_of_working_days_left - no_of_sat_left;
    }
    document.getElementById("days-left").innerHTML = no_of_working_days_left;




    let no_of_sundays_over = get_num_spec_days(first_day, today, 0);
    let no_of_holidays_over = get_num_hols(first_day, today);
    let no_of_working_days_over =
      find_days_inbetween(first_day, today) 
      - no_of_sundays_over
      - no_of_holidays_over;
    if (is_sat_working == false) {
        no_of_working_days_over = no_of_working_days_over - no_of_sat_over;
    }
    document.getElementById("days-over").innerHTML = no_of_working_days_over;


    let total_days = find_days_inbetween(first_day, last_day);
    let no_of_sundays_in_year = get_num_spec_days(first_day, last_day, 0);
    let no_of_holidays_in_year = get_num_hols(first_day, last_day);
    let total_no_of_working_days =
      total_days - no_of_sundays_in_year - no_of_holidays_in_year;
    if (is_sat_working == false) {
        total_no_of_working_days = total_no_of_working_days - no_of_sat_in_year;
    }
    let percentage_of_year_completed = 0;
    if (total_no_of_working_days >= 0) {
      percentage_of_year_completed = Math.floor(
        (no_of_working_days_over / total_no_of_working_days) * 10000
      ) / 100;
    }
    show_bar(percentage_of_year_completed);


    var countDownDate = new Date(last_day.getTime());
    countDownDate.setHours(12, 20, 0, 0);

    var countdownIntervalId = null;

    function countdown() {

        // Get today's date and time
        var now = new Date().getTime();

    
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        if (distance < 0) {
            if (countdownIntervalId) {
              clearInterval(countdownIntervalId);
            }
            page2()
            return;
        }
    
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let days_display = document.getElementById("days").innerHTML = days;
        let hours_display = document.getElementById("hrs").innerHTML = hours;
        let minutes_display = document.getElementById("mins").innerHTML = minutes;
        let seconds_display = document.getElementById("secs").innerHTML = seconds;

        days_display = days
        hours_display = hours
        minutes_display = minutes
        seconds_display = seconds
    }
    // Update the count down every 1 second
    countdownIntervalId = setInterval(countdown, 1000);

}
async function page2() {
  if (window.__vacationPageLoaded) {
    return;
  }
  window.__vacationPageLoaded = true;

  const response = await fetch("vacation.html");  // Wait for the fetch to complete
  
  // Step 2: Convert the response to text
  const data = await response.text();  // Wait for the text conversion
  
  // Step 3: Inject the content into the page
  document.getElementById('page').innerHTML = data;
  runVacationFlash(function () {
    startVacationConfetti();
    playVacationAudio();
  });

  setTimeout(() => {
    console.log(document.documentElement.outerHTML);
  }, 500);
}
async function page1() {
  const response = await fetch("page1.html");  // Wait for the fetch to complete
  
  // Step 2: Convert the response to text
  const data = await response.text();  // Wait for the text conversion
  
  // Step 3: Inject the content into the page
  document.getElementById('page').innerHTML = data;


}
console.log("hello")

if (today > last_day || today == last_day) {
  page2() //summer vacation
}
else { 
  //regular school
  page1()
  setTimeout(() => {
    show_details();
  }, 500);
}
