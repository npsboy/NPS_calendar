const first_day = new Date("2025-05-26");
const last_day = new Date("2026-04-10");

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
    
    let day = new Date(today.getTime()+ i);
    day.setHours(5, 30, 0, 0);



    while (hols < 1 && day.valueOf() != last_day.valueOf()) {
      
      
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



function show_details() {

    let is_sat_working = document.getElementById("toggleSwitch").checked;

    let no_of_sat_left = get_num_spec_days(today, last_day, 6);
    let no_of_sat_over = get_num_spec_days(first_day, today, 6);
    let no_of_sat_in_year = get_num_spec_days(first_day, last_day, 6);


    let next_hol = find_next_hol();

    if (next_hol != "no_more_hols") {
        let next_hol_date = next_hol.getDate() + " " + next_hol.toLocaleString('default', { month: 'long' }) + " " + next_hol.getFullYear()
        document.getElementById("next-hol").innerHTML = next_hol_date;
    }
    else { 
        document.getElementById("next-hol").innerHTML = "Vacation Time!"
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
    let percentage_of_year_completed = Math.round(
        (no_of_working_days_over / total_no_of_working_days) * 100
      );
    show_bar(percentage_of_year_completed);


    var countDownDate = last_day.getTime();
    countDownDate = last_day
    countDownDate.setHours(14, 45, 0, 0);

    function countdown() {

        // Get today's date and time
        var now = new Date().getTime();

    
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        if (distance < 0) {
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
    setInterval(countdown, 1000);

}
async function page2() {
  const response = await fetch("vacation.html");  // Wait for the fetch to complete
  
  // Step 2: Convert the response to text
  const data = await response.text();  // Wait for the text conversion
  
  // Step 3: Inject the content into the page
  document.getElementById('page').innerHTML = data;

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
  alert("hi")
  page2() //summer vacation
}
else { 
  //regular school
  page1()
  setTimeout(() => {
    show_details();
  }, 500);
}
