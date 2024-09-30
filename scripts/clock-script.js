(function (d, eId) {
  function updateTimeAndDate() {
    var now = new Date();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var dayOfWeek = days[now.getDay()];
    var day = now.getDate();
    var month = now.getMonth() + 1; // Month is zero-indexed, so we add 1
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Pad single digits with leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Pad day and month with leading zeros if necessary
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    // Construct the date string
    var dateString = dayOfWeek + " | " + day + "/" + month + "/" + year;
    // Construct the time string
    var timeString = hours + ":" + minutes + " " + ampm;

    // Update the content of #pst-time
    document.getElementById("pst-time").textContent =
      dateString + " | " + timeString;

    // Update office status
    var officeStatus = document.querySelector(".office-status .status p");
    var officeStatusContainer = document.querySelector(
      ".office-status .status"
    );
    var officeStatusIcon = document.querySelector(".office-status img");

    var currentTime = now.getHours() * 100 + now.getMinutes();
    var openingTime = 730; // 7:30 AM
    var closingTime = 2030; // 8:30 PM

    if (currentTime >= closingTime || currentTime < openingTime) {
      officeStatus.textContent = "Closed";
      officeStatusContainer.style.backgroundColor = "#F5A3A3"; // Red background
      officeStatus.style.color = "#6D2020"; // Red text
      officeStatusIcon.src = "user-assets/closed-door.svg"; // Closed door icon
    } else {
      officeStatus.textContent = "Open";
      officeStatusContainer.style.backgroundColor = "#A3F5B4"; // Green background
      officeStatus.style.color = "#206D30"; // Green text
      officeStatusIcon.src = "user-assets/open-door.svg"; // Open door icon
    }
  }

  // Update time and date initially
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 1000);
})(document, "gwt-pst");


