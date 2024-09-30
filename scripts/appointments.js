document.addEventListener("DOMContentLoaded", () => {
  let selectedService = localStorage.getItem("selectedService") || "";
  let selectedDate = localStorage.getItem("selectedDate") || "";
  let selectedTime = localStorage.getItem("selectedTime") || "";

  // Load previous selections from localStorage if available
  const previousService = localStorage.getItem("selectedService");
  const previousDate = localStorage.getItem("selectedDate");
  const previousTime = localStorage.getItem("selectedTime");
  const previousAppointment = localStorage.getItem("previousAppointment");

  if (previousAppointment) {
    // Only highlight previous selections if coming back from confirmation page
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
  } else {
    // Clear any pre-selected choices if no previous appointment is found
    localStorage.removeItem("selectedService");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
  }

  window.selectService = function (button, service) {
    selectedService = service;
    highlightSelection(button, ".select-service button");
    localStorage.setItem("selectedService", selectedService);
    console.log(`Service selected: ${service}`);
  };

  window.selectDate = function (div, date) {
    selectedDate = date;
    highlightSelection(div, ".date");
    localStorage.setItem("selectedDate", selectedDate);
    console.log(`Date selected: ${date}`);
  };

  window.selectTime = function (button, time) {
    selectedTime = time;
    highlightSelection(button, ".time-col-one button, .time-col-two button");
    localStorage.setItem("selectedTime", selectedTime);
    console.log(`Time selected: ${time}`);
  };

  function highlightSelection(selectedElement, selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.classList.remove("selected");
    });
    if (selectedElement) {
      selectedElement.classList.add("selected");
    }
  }

  window.confirmAppointment = function () {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Please select a service, date, and time.");
      localStorage.setItem("selectedService", selectedService);
      localStorage.setItem("selectedDate", selectedDate);
      localStorage.setItem("selectedTime", selectedTime);
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
    window.location.href = "user-confirmation-page.html"; // Redirects to the confirmation page
  };

  window.showPopup = function (action) {
    const popup = document.getElementById("confirmationPopup");
    const message = document.getElementById("popupMessage");
    const confirmButton = document.getElementById("confirmButton");

    if (action === "submit") {
      message.textContent =
        "Do you really want to submit this appointment? This process cannot be undone.";
      confirmButton.textContent = "YES";
      confirmButton.onclick = function () {
        submitAppointment();
        hidePopup();
      };
    }

    popup.style.display = "flex";
  };

  window.hidePopup = function () {
    const popup = document.getElementById("confirmationPopup");
    popup.style.display = "none";
  };

  window.submitAppointment = function () {
    const currentAppointment = JSON.parse(
      localStorage.getItem("currentAppointment")
    );
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let appointments =
      JSON.parse(localStorage.getItem(`appointments-${currentUser.idnum}`)) ||
      [];
    const appointmentCount = appointments.length + 1;
    const appointmentID = `APPT${currentUser.idnum}-${String(
      appointmentCount
    ).padStart(3, "0")}`;

    const appointment = {
      id: appointmentID,
      date: currentAppointment.date,
      time: currentAppointment.time,
      service: currentAppointment.service,
      status: "Pending", // Default status
    };

    appointments.push(appointment);
    localStorage.setItem(
      `appointments-${currentUser.idnum}`,
      JSON.stringify(appointments)
    );

    Swal.fire({
      title: "Appointment Submitted!",
      text: "Your appointment has been successfully submitted.",
      icon: "success",
      customClass: {
        confirmButton: "custom-swal-button",
      },
    }).then(() => {
      window.location.href = "appointment-history.html";
    });
  };
});
