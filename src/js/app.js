("use strict");

// User Input Elements
const time = document.getElementById("time");
const date = document.getElementById("date");

// All radio buttons
const themeRadios = document.getElementsByName("theme-radio");
const verifiedRadios = document.getElementsByName("verified-radio");

// Preview Elements
const tweet = document.getElementById("tweet");
const tweetBox = document.getElementById("tweet-box");
const tweetVerified = document.getElementById("tweet-verified");

const tweetTime = document.getElementById("tweet-time");
const tweetDate = document.getElementById("tweet-date");

// Required
let themeColor = "#fff";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Function to set Theme of the Tweet Desk
 */
function toggleTheme(ev) {
  let choice;

  for (let i = 0; i < themeRadios.length; i++) {
    if (themeRadios[i].checked) {
      choice = themeRadios[i].value;
    }
  }

  if (choice === "dim") {
    tweet.className = "tweet dim";
    tweetBox.className = "tweet-box dim";
    themeColor = "#15202b";
  } else if (choice === "dark") {
    tweet.className = "tweet dark";
    tweetBox.className = "tweet-box dark";
    themeColor = "#000000";
  } else {
    tweet.className = "tweet";
    tweetBox.className = "tweet-box";
    themeColor = "#fff";
  }
}

/**
 * Function to toggle verificatio badge
 */
function toggleVerified() {
  let choice;

  for (let i = 0; i < verifiedRadios.length; i++) {
    if (verifiedRadios[i].checked) {
      choice = verifiedRadios[i].value;
    }
  }

  if (choice === "show") {
    tweetVerified.classList.remove("hide");
  } else {
    tweetVerified.classList.add("hide");
  }
}

/**
 * Render Date in Tweet Desk
 */
function renderDate() {
  const dateValue = date.value.trim();

  if (dateValue === "") {
    tweetDate.innerText = getCurrentDate();
  } else {
    tweetDate.innerText = dateValue;
  }
}

/**
 * Get Current Date
 * @returns CurrentDate
 */
function getCurrentDate() {
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  return `${MONTHS[month]} ${date}, ${year}`;
}

function setTimeStamp() {
  renderDate();
}
setTimeStamp();

// EventListeners

for (let i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener("change", toggleTheme);
}

for (let i = 0; i < verifiedRadios.length; i++) {
  verifiedRadios[i].addEventListener("change", toggleVerified);
}
