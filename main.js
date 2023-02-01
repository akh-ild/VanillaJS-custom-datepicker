const datePickerEl = document.querySelector('.date-picker');
const selectedDateEl = document.querySelector('.selected-date');
const datesEl = document.querySelector('.dates');
const mthEl = document.querySelector('.mth');
const nextMthEl = document.querySelector('.next-mth');
const prevMthEl = document.querySelector('.prev-mth');
const daysEl = document.querySelector('.days');
const weekEl = document.querySelector('.week');
let dayEl;
let emptyDayEl;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

// Functions
function setTodaysDate() {
  mthEl.textContent = months[month] + ' ' + year;
  selectedDateEl.textContent = formatDate(day, month, year);
}

function toggleDatePicker(e) {
  datesEl.classList.toggle('active');
}

function goToNextMonth(e) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mthEl.textContent = months[month] + ' ' + year;
  populateDates();
}
function goToPrevMonth(e) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mthEl.textContent = months[month] + ' ' + year;
  populateDates();
}

function formatDate(day, month, year) {
  day = day < 10 ? '0' + day : day;
  month = month + 1;
  month = month < 10 ? '0' + month : month;
  return `${day} / ${month} / ${year}`;
}

function getDaysInMonth(year, month) {
  let amountDays = new Date(year, month + 1, 0).getDate();
  return amountDays;
}

function populateWeekDays() {
  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  weekDays.forEach((day) => {
    const weekDayEl = document.createElement('div');
    weekDayEl.classList.add('week-day');
    weekDayEl.textContent = day;
    weekEl.appendChild(weekDayEl);
  });
}

function populateDates(e) {
  daysEl.innerHTML = '';
  console.log(month, year);
  let firstDayMonth = new Date(year, month, 1).getDay();
  console.log(firstDayMonth);
  for (let i = 0; i < firstDayMonth; i++) {
    emptyDayEl = document.createElement('div');
    emptyDayEl.classList.add('empty');
    daysEl.appendChild(emptyDayEl);
  }
  for (let i = 0; i < getDaysInMonth(year, month, 0); i++) {
      dayEl = document.createElement('div');
      dayEl.classList.add('day');
      dayEl.textContent = i + 1;
    if (selectedDay == (i + 1) && selectedMonth === month && selectedYear === year) {
      dayEl.classList.add('selected');
    }
    setDayEventListener(i);
    daysEl.appendChild(dayEl);
  }
}

function setDayEventListener(day) {
  dayEl.addEventListener('click', () => {
    selectedDate = new Date(year + '-' + (month + 1) + '-' + (day + 1));
    selectedDay = (day + 1);
    selectedMonth = month;
    selectedYear = year;
    selectedDateEl.textContent = formatDate(selectedDay, selectedMonth, selectedYear);
    selectedDateEl.dataset.value = selectedDate;
    toggleDatePicker();
    populateDates();
  });
}

setTodaysDate();
populateWeekDays();
populateDates();

// Event listeners
selectedDateEl.addEventListener('click', toggleDatePicker);
nextMthEl.addEventListener('click', goToNextMonth);
prevMthEl.addEventListener('click', goToPrevMonth);