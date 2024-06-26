const first_day = new Date("2024-06-05");
const last_day = new Date("2025-03-31");
let today = new Date();
today.setHours(5, 30, 0, 0);
const mil_sec_in_day = 86400000;

if (today>last_day || today<first_day) {
  console.log("today")
  document.getElementById("h1").innerHTML = "<br> <br> <h1 align= \"center\", style=\"color:#db35c0\"> <b> IT'S THE SUMMER VACATION! </b> </h1>"
  document.getElementById("percy").innerHTML = " "
  document.getElementById("pro_bar").innerHTML = " "
  document.getElementById("no_wor_left").innerHTML = " "
  document.getElementById("no_wor_over").innerHTML = " "
  document.getElementById("next_hol").innerHTML = " "
  document.getElementById("logo").innerHTML = "<center> <img  src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/640px-SNice.svg.png\" align =\"center\" alt=\"smily\" width=\"250\" height=\"250\"> </center>"
  document.getElementById("background").innerHTML = "<style>  body {   background-image: url('https://static.vecteezy.com/system/resources/previews/003/176/873/original/beach-at-daytime-landscape-scene-with-mountain-background-free-vector.jpg'); background-repeat: no-repeat;  background-attachment: fixed; background-size: cover; } </style>"
  document.getElementById("is_sat_hol?").innerHTML = ""

}
else {


const holidays = [
  "2024-08-15",
  "2024-08-16",
  "2024-09-07",
  "2024-10-02",
  "2024-10-09",
  "2024-10-10",
  "2024-10-11",
  "2024-10-12",
  "2024-10-14",
  "2024-10-15",
  "2024-10-16",
  "2024-10-17",
  "2024-10-18",
  "2024-10-19",
  "2024-10-31",
  "2024-11-01",
  "2024-11-02",
  "2024-11-16",
  "2024-11-18",
  "2024-12-21",
  "2024-12-23",
  "2024-12-24",
  "2024-12-25",
  "2024-12-26",
  "2024-12-27",
  "2024-12-28",
  "2024-12-30",
  "2024-12-31",
  "2025-01-01",
  "2025-01-14",
  "2025-01-26",
  "2025-02-26",
  "2025-03-30"
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

    console.log ("inside find_next_hol()");
    let i = 0;
    let hols = 0;
    
    let day = new Date(today.getTime()+ i);
    day.setHours(5, 30, 0, 0);



    while (hols < 1 && day.valueOf() != last_day.valueOf()) {
      
      
      day = new Date(today.getTime()+ i);
      
      console.log("inside while" +  day);

      let is_hol = is_holiday(day)
      if ( is_hol == true) {

          hols = hols + 1;
          console.log ("returning")
          return day;
      }
      i = i + mil_sec_in_day
    }
    
    console.log ("out of while, not found next holiday; returning last day");
    return "no_more_hols";
 

}

find_next_hol()

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







let test_tv = get_num_hols(today, last_day);
console.log("total holidays are: ", test_tv);
let no_of_holidays_in_year = get_num_hols(first_day, last_day);
let no_of_holidays_over = get_num_hols(first_day, today);
let no_of_sundays_left = get_num_spec_days(today, last_day, 0);
let no_of_sundays_over = get_num_spec_days(first_day, today, 0);
let no_of_sundays_in_year = get_num_spec_days(first_day, last_day, 0);
/*--------------------*/
let no_of_sat_left = get_num_spec_days(today, last_day, 6);
let no_of_sat_over = get_num_spec_days(first_day, today, 6);
let no_of_sat_in_year = get_num_spec_days(first_day, last_day, 6);
/*--------------------*/
let total_days = find_days_inbetween(first_day, last_day);
let no_of_working_days_over =
  find_days_inbetween(first_day, today) -
  no_of_sundays_over -
  no_of_holidays_over;
let total_no_of_working_days =
  total_days - no_of_sundays_in_year - no_of_holidays_in_year;

let no_of_hols_left = get_num_hols(today, last_day);
let no_of_working_days_left =
  find_days_inbetween(today, last_day) - no_of_sundays_left - no_of_hols_left;

let val1 = document.getElementById("no_wor_left").innerHTML;


let val2 = document.getElementById("no_wor_over").innerHTML;





  function makeSatHol() {
   no_of_working_days_over= no_of_working_days_over - no_of_sat_over
   total_no_of_working_days = total_no_of_working_days - no_of_sat_in_year
   no_of_working_days_left = no_of_working_days_left - no_of_sat_left
   main()
  }
//**************************************** */
let next_hol = find_next_hol();

function main () {
  
  let hol_month = next_hol.getMonth() + 1
  let next_hol_date = next_hol.getDate() + "-" + hol_month + "-" + next_hol.getFullYear()
  if (next_hol != "no_more_hols") {
    document.getElementById("next_hol").innerHTML = "The next holiday is on " + next_hol_date;
  }
  else { 
    document.getElementById("next_hol").innerHTML = "No more holidays. The summer vacation is comming up!"
  }

  document.getElementById("no_wor_left").innerHTML =
  no_of_working_days_left + val1;

  document.getElementById("no_wor_over").innerHTML =
  no_of_working_days_over + val2;

  let percentage_of_year_completed = Math.round(
    (no_of_working_days_over / total_no_of_working_days) * 100
  );
  let val3 = " percent of the year has been completed";
  document.getElementById("percy").innerHTML =
  percentage_of_year_completed + "%" + val3;

  let val4 = "<div class=\"w3-grey w3-round-large\">\
<div class=\"w3-containter w3-green w3-round-large w3-center w3-padding w3-xlarge\" style=\"height:50px;width:"+ percentage_of_year_completed + "%" + "\">" + percentage_of_year_completed + "%" + "</div>\
</div>"

document.getElementById("pro_bar").innerHTML = val4
}

main()

function makeSatWorking(){
  console.log("hjghjdjhfjhdkchhg")
  location.reload()
}

}

