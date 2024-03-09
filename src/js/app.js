("use strict");

// User Input Elements
const tweetVerified = document.getElementById("tweet-verified");

// All radio buttons
const verifiedRadios = document.getElementsByName("verified-radio");

// Function
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

// EventListeners

for (let i = 0; i < verifiedRadios.length; i++) {
  verifiedRadios[i].addEventListener("change", toggleVerified);
}
