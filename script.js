'use strict';

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElementEl = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
// countdownValue can be set to an empty string but an empty Date object is more descriptive
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set min date value
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
const updateDOM = () => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log('distance: ', distance);
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;

    // textContent returns every element in the node and is faster than innerHTML because it does not parse HTML
    timeElementEl[0].textContent = days;
    timeElementEl[1].textContent = hours;
    timeElementEl[2].textContent = minutes;
    timeElementEl[3].textContent = seconds;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
};

// Take Values from Form Input
const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);

    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue);
    updateDOM();
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);