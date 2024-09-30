// Load user information from local storage and update the page
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Update full name and ID number
    document.getElementById("full-name").innerText = currentUser.name;
    document.getElementById("user-id").innerText = `ID: ${currentUser.idnum}`;

    // Update welcome text with the user's first name
    const firstName = currentUser.name.split(" ")[0];
  }

  // Logout functionality
  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "sign-in-user.html";
  });
});
