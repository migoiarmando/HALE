document.addEventListener("DOMContentLoaded", function () {
  const appointmentHistoryContainer = document.getElementById(
    "appointment-history"
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const appointments =
    JSON.parse(localStorage.getItem(`appointments-${currentUser.idnum}`)) || [];

  // Function to display appointments or empty state message
  function displayAppointments(filter = "All") {
    // Clear previous content
    appointmentHistoryContainer.innerHTML = "";

    const filteredAppointments =
      filter === "All"
        ? appointments
        : appointments.filter((app) => app.status === filter);

    if (filteredAppointments.length === 0) {
      const emptyStateMessage = document.createElement("div");
      emptyStateMessage.classList.add("empty-state-message");
      emptyStateMessage.textContent = "Nothing to show here";

      const emptyStateMessage2 = document.createElement("div");
      emptyStateMessage2.classList.add("empty-state-message2");

      // Create an anchor element for adding appointments
      const addLink = document.createElement("a");
      addLink.textContent = "  Add an Appointment";
      addLink.href = "user-appointment-page.html"; // Replace with the URL for adding appointments
      addLink.classList.add("add-appointment-link");

      // Append the anchor element into the second empty state message
      emptyStateMessage2.appendChild(
        document.createTextNode("There are no past appointments.  ")
      );
      emptyStateMessage2.appendChild(addLink);

      // Append the elements to the container
      appointmentHistoryContainer.appendChild(emptyStateMessage);
      appointmentHistoryContainer.appendChild(emptyStateMessage2);
    } else {
      filteredAppointments.forEach((appointment) => {
        const appointmentElement = document.createElement("div");
        appointmentElement.classList.add(
          "appointee-container",
          appointment.status.toLowerCase()
        );

        appointmentElement.innerHTML = `
                  <div class="checkbox-wrapper-30">
                      <span class="checkbox">
                          <input type="checkbox" />
                          <svg>
                              <use xlink:href="#checkbox-30" class="checkbox"></use>
                          </svg>
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
                          <symbol id="checkbox-30" viewBox="0 0 22 22">
                              <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"/>
                          </symbol>
                      </svg>
                  </div>
                  <span class="appointee-name">${appointment.id}</span>
                  <span>${appointment.date}</span>
                  <span class="appointee-details">${appointment.time}</span>
                  <span class="appointee-details">${appointment.service}</span>
                  <div class="${appointment.status.toLowerCase()}-status-view">
                      <img src="user-assets/${appointment.status.toLowerCase()}.svg" alt="">
                      <span class="confirm-status">${appointment.status}</span>
                  </div>
              `;

        appointmentHistoryContainer.appendChild(appointmentElement);
      });
    }
  }

  // Initial load
  displayAppointments();

  // Event listeners for the tabs
  document.getElementById("all-tab").addEventListener("click", () => {
    displayAppointments("All");
    setActiveTab("all-tab");
  });
  document.getElementById("confirmed-tab").addEventListener("click", () => {
    displayAppointments("Confirmed");
    setActiveTab("confirmed-tab");
  });
  document.getElementById("pending-tab").addEventListener("click", () => {
    displayAppointments("Pending");
    setActiveTab("pending-tab");
  });
  document.getElementById("cancelled-tab").addEventListener("click", () => {
    displayAppointments("Cancelled");
    setActiveTab("cancelled-tab");
  });

  function setActiveTab(tabId) {
    document.querySelectorAll(".tab-header").forEach((tab) => {
      tab.classList.remove("active");
    });
    document.getElementById(tabId).classList.add("active");
  }
});
