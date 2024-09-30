document.addEventListener("DOMContentLoaded", () => {
  const previousAppointment = JSON.parse(
    localStorage.getItem("previousAppointment")
  );
  if (previousAppointment) {
    console.log("Previous Appointment found");

    selectService(
      document.querySelector(
        `button[onclick="selectService(this, '${previousAppointment.service}')"]`
      ),
      previousAppointment.service
    );
    selectDate(
      document.querySelector(
        `div[onclick="selectDate(this, '${previousAppointment.date}')"]`
      ),
      previousAppointment.date
    );
    selectTime(
      document.querySelector(
        `button[onclick="selectTime(this, '${previousAppointment.time}')"]`
      ),
      previousAppointment.time
    );

    // Remove previous appointment from localStorage to prevent pre-filling on next visit
    localStorage.removeItem("previousAppointment");
  }

  const previousService = localStorage.getItem("selectedService");
  const previousDate = localStorage.getItem("selectedDate");
  const previousTime = localStorage.getItem("selectedTime");

  if (previousService) {
    const serviceButton = document.querySelector(
      `button[onclick="selectService(this, '${previousService}')"]`
    );
    if (serviceButton) selectService(serviceButton, previousService);
  }

  if (previousDate) {
    const dateDiv = document.querySelector(
      `div[onclick="selectDate(this, '${previousDate}')"]`
    );
    if (dateDiv) selectDate(dateDiv, previousDate);
  }

  if (previousTime) {
    const timeButton = document.querySelector(
      `button[onclick="selectTime(this, '${previousTime}')"]`
    );
    if (timeButton) selectTime(timeButton, previousTime);
  }
});

function selectService(button, service) {
  // Clear previous selection
  const buttons = document.querySelectorAll(".select-service button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  // Select the new service
  button.classList.add("selected");
  localStorage.setItem("selectedService", service);
}

function selectDate(div, date) {
  // Clear previous selection
  const dates = document.querySelectorAll(".calendar .date");
  dates.forEach((d) => d.classList.remove("selected"));

  // Select the new date
  div.classList.add("selected");
  localStorage.setItem("selectedDate", date);
}

function selectTime(button, time) {
  // Clear previous selection
  const buttons = document.querySelectorAll(".time-slots button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  // Select the new time
  button.classList.add("selected");
  localStorage.setItem("selectedTime", time);
}

function confirmAppointment() {
  const selectedService = localStorage.getItem("selectedService");
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedTime = localStorage.getItem("selectedTime");

  if (!selectedService || !selectedDate || !selectedTime) {
    alert("Please select a service, date, and time.");
    return; // Prevents redirection if selections are missing
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const appointmentID = `APPT-${currentUser.idnum}-${(
    currentUser.appointments.length + 1
  )
    .toString()
    .padStart(3, "0")}`;

  const appointment = {
    service: selectedService,
    date: selectedDate,
    time: selectedTime,
    appointmentID,
    status: "Pending",
  };

  currentUser.appointments.push(appointment);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("currentAppointment", JSON.stringify(appointment));
  window.location.href = "user-confirmation-page.html"; // Only redirects if selections are complete
}
