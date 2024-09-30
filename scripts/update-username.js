document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (currentUser) {
    document.getElementById("full-name").innerText = currentUser.name;
    document.getElementById("user-id").innerText = `ID: ${currentUser.idnum}`;
  }

  document
    .getElementById("submit-username-button")
    .addEventListener("click", () => {
      const newUsername = document.getElementById("username-input").value;
      if (currentUser && newUsername) {
        currentUser.name = newUsername;

        // Update the user in the users list
        const userIndex = users.findIndex(
          (user) => user.idnum === currentUser.idnum
        );
        if (userIndex !== -1) {
          users[userIndex].name = newUsername;
        }

        // Save the updated users list and current user back to localStorage
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        Swal.fire({
          title: "Success",
          text: "Username updated successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            confirmButton: "custom-swal-button",
          },
        });

        // Reload the page to reflect the updated username
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });

  document.getElementById("logout-button").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "sign-in-user.html";
  });
});
