document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    document.getElementById("full-name").innerText = currentUser.name;
    document.getElementById("user-id").innerText = `ID: ${currentUser.idnum}`;

    const firstName = currentUser.name.split(" ")[0];
    document.querySelector(
      ".welcome-text strong"
    ).innerText = `Hello, ${firstName}!`;
  }

  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "sign-in-user.html";
  });
});
