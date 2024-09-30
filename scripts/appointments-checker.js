document.addEventListener("DOMContentLoaded", () => {
  const currentAppointment = JSON.parse(
    localStorage.getItem("currentAppointment")
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentAppointment && currentUser) {
    console.log("Current User and Appointment found");

    const userNameElement = document.querySelector(".user-name");
    const userIdElement = document.querySelector(".user-id");
    const userEmailElement = document.querySelector(".user-email");
    const appointmentServiceElement = document.querySelector(".service-type");
    const appointmentDateElement = document.querySelector(".appointment-date");
    const appointmentTimeElement = document.querySelector(".appointment-time");

    if (
      userNameElement &&
      userIdElement &&
      userEmailElement &&
      appointmentServiceElement &&
      appointmentDateElement &&
      appointmentTimeElement
    ) {
      userNameElement.innerText = currentUser.name;
      userIdElement.innerText = currentUser.idnum;
      userEmailElement.innerText = currentUser.email;
      appointmentServiceElement.innerText = currentAppointment.service;
      appointmentDateElement.innerText = currentAppointment.date;
      appointmentTimeElement.innerText = currentAppointment.time;
    } else {
      console.error("One or more elements not found in the DOM");
    }
  } else {
    alert("No appointment details found. Please book an appointment first.");
    window.location.href = "user-appointment-page.html";
  }
});

function saveCurrentAppointment() {
  const currentAppointment = JSON.parse(
    localStorage.getItem("currentAppointment")
  );
  localStorage.setItem(
    "previousAppointment",
    JSON.stringify(currentAppointment)
  );
}

function submitAppointment() {
  const currentAppointment = JSON.parse(
    localStorage.getItem("currentAppointment")
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Retrieve the user's appointments or create a new array if not found
  let appointments =
    JSON.parse(localStorage.getItem(`appointments-${currentUser.idnum}`)) || [];
  const appointmentCount = appointments.length + 1;

  // Generate the unique appointment ID
  const appointmentID = `APPT${currentUser.idnum}-${String(
    appointmentCount
  ).padStart(3, "0")}`;

  // Create the appointment object
  const appointment = {
    id: appointmentID,
    date: currentAppointment.date,
    time: currentAppointment.time,
    service: currentAppointment.service,
    status: "Pending", // Default status
  };

  // Add the new appointment to the array
  appointments.push(appointment);

  // Store the updated array back to localStorage
  localStorage.setItem(
    `appointments-${currentUser.idnum}`,
    JSON.stringify(appointments)
  );

  Swal.fire({
    title: "Appointment Confirmed!",
    text: "Your appointment has been successfully confirmed.",
    icon: "success",
    customClass: {
      confirmButton: "custom-swal-button",
    },
  }).then(() => {
    window.location.href = "appointment-history.html";
  });
}
