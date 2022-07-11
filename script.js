'use strict';

const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const titleEl = document.getElementById('title')
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElementEl = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
// countdownValue can be set to an empty string but a new Date is more descriptive, maintain a variables type throughout the code
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set min date value
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(()=> {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfoEl.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in progress by populating countdown
            countdownElTitle.textContent = `${countdownTitle}`;

            // textContent returns every element in the node and is faster than innerHTML because it does not parse HTML
            timeElementEl[0].textContent = days;
            timeElementEl[1].textContent = hours;
            timeElementEl[2].textContent = minutes;
            timeElementEl[3].textContent = seconds;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
};

// Take Values from Form Input
const updateCountdown = e => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    
    // Save countdown object to local storage, the object must be saved as JSON
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
const reset = () => {
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    // Stop the countdown
    clearInterval(countdownActive);

    // Reset values
    countdownTitle = '';
    countdownDate = '';

    titleEl.value = countdownTitle;
    dateEl.value = countdownDate;

    // Remove countdown object from localStorage
    localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
    // Get countdown from localStorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// Onload, check localstorage for countdown object
restorePreviousCountdown();