("use strict");

// User Input Elements
const avatar = document.getElementById("avatar");
const fileName = document.getElementById("file-name");
const reset = document.getElementById("reset");

const fullName = document.getElementById("name");
const username = document.getElementById("username");
const message = document.getElementById("message");

const time = document.getElementById("time");
const date = document.getElementById("date");
const client = document.getElementById("client");

const retweets = document.getElementById("retweets");
const quotes = document.getElementById("quotes");
const likes = document.getElementById("likes");

// All radio buttons
const themeRadios = document.getElementsByName("theme-radio");
const verifiedRadios = document.getElementsByName("verified-radio");

// Preview Elements
const tweet = document.getElementById("tweet");
const tweetBox = document.getElementById("tweet-box");

const tweetAvatar = document.getElementById("tweet-avatar");
const tweetVerified = document.getElementById("tweet-verified");

const tweetName = document.getElementById("tweet-name");
const tweetUsername = document.getElementById("tweet-username");
const tweetMessage = document.getElementById("tweet-message");

const tweetTime = document.getElementById("tweet-time");
const tweetDate = document.getElementById("tweet-date");
const tweetClient = document.getElementById("tweet-client");

const tweetRetweets = document.getElementById("tweet-retweets");
const tweetQuotes = document.getElementById("tweet-quotes");
const tweetLikes = document.getElementById("tweet-likes");

// Download Button
const download = document.getElementById("download");

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
 * Formats a number for display with thousands separators and abbreviations for millions, billions, and trillions.
 * @param {Number} num The number to be formatted.
 * @param {Number} fixed (Optional) The desired number of decimal places (defaults to 0).
 * @returns {String} The formatted number string.
 */
function numberFormatter(num, fixed = 0) {
  if (num === null || num === 0) return num === 0 ? "0" : null;

  const suffixes = ["", "K", "M", "B", "T"];
  const exponent = Math.min(Math.floor(Math.log10(Math.abs(num)) / 3), 4);

  // Handle single, double, and triple-digit numbers without decimals
  if (exponent === 0 && Math.abs(num) < 1000) {
    return num.toFixed(0); // Remove ".0" for small numbers
  }

  const formattedNum = Math.abs(num / Math.pow(10, exponent * 3)).toFixed(
    Math.max(fixed, 1)
  );

  return formattedNum + suffixes[exponent];
}
/*
 * Render/Show the uploaded file's name
 */
function showFileName(name) {
  fileName.classList.add("show");
  fileName.innerText = name;
}

/*
 * Render Profile Picture in Tweet
 */
function renderProfilePic() {
  const [file] = avatar.files;
  if (file) {
    showFileName(file.name);
    tweetAvatar.src = URL.createObjectURL(file);
  }
}

/*
 * Reset the profile picture to default
 */
function resetProfilePic() {
  fileName.innerText = "";
  fileName.classList.remove("show");
  tweetAvatar.src = "/src/assets/silhoutte.png";
}

/**
 * Render Name in Tweet Desk
 */
function renderName() {
  const nameValue = fullName.value.trim();

  if (nameValue === "") {
    tweetName.innerText = "Name";
  } else {
    tweetName.innerText = nameValue;
  }

  const characterCountEl = fullName.nextElementSibling.querySelector(".count");
  characterCountEl.innerText = nameValue.length;
}

/**
 * Render Username in Tweet Desk
 */
function renderUsername() {
  const usernameValue = username.value.trim();

  if (username === "") {
    tweetUsername.innerText = "username";
  } else {
    tweetUsername.innerText = usernameValue;
  }
}

/**
 * Render Message in Tweet Desk
 */
function renderMessage() {
  const msgValue = message.value.trim();

  if (msgValue === "") {
    tweetMessage.innerText = "Generate convincing fake tweet images";
  } else {
    tweetMessage.innerText = "";

    msgValue.split(" ").forEach((token) => {
      if (token.match(/^@(\w){1,20}$/)) {
        const spanEl = document.createElement("span");
        spanEl.className = "highlight";
        spanEl.innerText = token;

        tweetMessage.append(spanEl);
        tweetMessage.append(" ");
      } else if (token.match(/^@(\w){21,}$/)) {
        const spanEl = document.createElement("span");
        spanEl.className = "highlight";
        spanEl.innerText = token.slice(0, 21);

        tweetMessage.append(spanEl);
        tweetMessage.append(token.slice(21));
        tweetMessage.append(" ");
      } else if (token.match(/^@\w+/)) {
        const spanEl = document.createElement("span");
        spanEl.className = "highlight";
        spanEl.innerText = token.match(/^@\w+/);

        tweetMessage.append(spanEl);
        tweetMessage.append(token.match(/(?<=\w)\W+/));
        tweetMessage.append(" ");
      } else {
        tweetMessage.append(token);
        tweetMessage.append(" ");
      }
    });

    // To preserve line breaks
    tweetMessage.innerHTML = tweetMessage.innerHTML.replace(/\n/g, "<br>\n");
  }

  let test = `hey there @elon how are you?`;

  const characterCountEl = message.nextElementSibling.querySelector(".count");

  characterCountEl.innerText = msgValue.length;
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
 * Render Time in Tweet Desk
 */
function renderTime() {
  const timeValue = time.value.trim();

  if (timeValue === "") {
    tweetTime.innerText = getCurrentTime();
  } else {
    tweetTime.innerText = timeValue;
  }
}

/**
 * Render to set Client Device
 */
function renderClient() {
  const clientValue = client.value.trim();

  if (clientValue === "") {
    tweetClient.innerText = "Twitter Web App";
  } else {
    tweetClient.innerText = clientValue;
  }
}

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
 * Function to toggle verification badge
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

/**
 * Get Current Time
 * @returns Current Time
 */
function getCurrentTime() {
  let suffix;
  const dateObj = new Date();
  let hours = +dateObj.getHours();
  let minutes = ("00" + dateObj.getMinutes()).slice(-2);

  if (hours > 12) {
    hours = hours - 12;
    suffix = "PM";
  } else {
    if (hours === 0) {
      hours = 12;
      suffix = "AM";
    } else if (hours === 12) {
      suffix = "PM";
    } else {
      suffix = "AM";
    }
  }

  return `${hours}:${minutes} ${suffix}`;
}

// Set Timestamp when page is loaded
function setTimeStamp() {
  renderTime();
  renderDate();
}
setTimeStamp();

/**
 * Render Retweets in Tweet Desk
 */
function renderRetweets() {
  tweetRetweets.parentElement.classList.remove("hide");
  let retweetsValue = retweets.value;

  if (retweetsValue === "") {
    tweetRetweets.innerText = "99";
  } else {
    retweetsValue = +retweetsValue;

    if (retweetsValue >= 0) {
      if (retweetsValue === 0) {
        tweetRetweets.parentElement.classList.add("hide");
      } else {
        tweetRetweets.innerText = numberFormatter(retweetsValue);
      }
    } else {
      tweetRetweets.innerText = "99";
    }
  }
}

// EventListeners
avatar.addEventListener("change", renderProfilePic);
reset.addEventListener("click", resetProfilePic);

fullName.addEventListener("input", renderName);
username.addEventListener("input", renderUsername);
message.addEventListener("input", renderMessage);

time.addEventListener("input", renderTime);
date.addEventListener("input", renderDate);
client.addEventListener("input", renderClient);

retweets.addEventListener("input", renderRetweets);
// quotes.addEventListener("input");
// likes.addEventListener("input");

for (let i = 0; i < themeRadios.length; i++) {
  themeRadios[i].addEventListener("change", toggleTheme);
}

for (let i = 0; i < verifiedRadios.length; i++) {
  verifiedRadios[i].addEventListener("change", toggleVerified);
}
