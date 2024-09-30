function validateForm() {
  const idnum = document.getElementById("idnum").value;
  const password = document.getElementById("password").value;
  const idnumPattern = /^[0-9]+$/;

  if (!idnumPattern.test(idnum)) {
    alert("ID Number should only contain numbers.");
    return false;
  }

  if (password.length < 8 || password.length > 15) {
    alert("Password must be between 8 and 15 characters.");
    return false;
  }

  return true;
}
