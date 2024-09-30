// Dummy database
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector("#sign-in-form");
  const signUpForm = document.querySelector("#sign-up-form");

  if (signInForm) {
    signInForm.addEventListener("submit", handleSignIn);
  }

  if (signUpForm) {
    signUpForm.addEventListener("submit", handleSignUp);
  }
});

function handleSignUp(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.fname.value;
  const idnum = form.idnum.value;
  const email = form.email.value;
  const password = form.password.value;

  const idnumPattern = /^[0-9]+$/;
  if (!idnumPattern.test(idnum)) {
    Swal.fire({
      title: "Error",
      text: "ID Number should only contain numbers.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        confirmButton: "custom-swal-button",
      },
    });
    return;
  }

  if (password.length < 8 || password.length > 15) {
    Swal.fire({
      title: "Error",
      text: "Password must be between 8 and 15 characters.",
      icon: "error",
      customClass: {
        confirmButton: "custom-swal-button",
        timer: 2000,
        showConfirmButton: false,
      },
    });
    return;
  }

  const user = { name, idnum, email, password, appointments: [] };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  Swal.fire({
    title: "Success",
    text: "Registration successful! Please log in.",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      confirmButton: "custom-swal-button",
    },
  }).then(() => {
    window.location.href = "sign-in-user.html";
  });
}

function handleSignIn(event) {
  event.preventDefault();
  const form = event.target;
  const idnum = form.idnum.value;
  const password = form.password.value;

  const user = users.find(
    (user) =>
      (user.idnum === idnum || user.email === idnum) &&
      user.password === password
  );

  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    Swal.fire({
      title: "Success",
      text: "Login successful!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        confirmButton: "custom-swal-button",
      },
    }).then(() => {
      window.location.href = "user-landing-page.html";
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Invalid credentials. Please try again.",
      icon: "error",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        confirmButton: "custom-swal-button",
      },
    });
  }
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  var toggleIcon = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.src = "assets/close-eye.svg";
    toggleIcon.alt = "Hide Password";
  } else {
    passwordInput.type = "password";
    toggleIcon.src = "assets/open-eye.svg";
    toggleIcon.alt = "Show Password";
  }
}
