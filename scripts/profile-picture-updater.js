function getUserId() {
  // Replace this with the actual method to get the currently logged-in user's ID
  return document
    .getElementById("user-id")
    .textContent.trim()
    .replace("ID: ", "");
}

function uploadProfilePicture() {
  const fileInput = document.getElementById("profile-picture-input");
  const file = fileInput.files[0];
  const reader = new FileReader();
  const userId = getUserId();

  reader.onload = function (e) {
    const profilePictureDataUrl = e.target.result;
    // Display the new profile picture in the preview and side menu
    document.getElementById(
      "profile-picture-preview"
    ).style.backgroundImage = `url(${profilePictureDataUrl})`;
    document.querySelectorAll("#user-profile").forEach((elem) => {
      elem.style.backgroundImage = `url(${profilePictureDataUrl})`;
    });
    // Save the profile picture to localStorage with user ID
    localStorage.setItem(`profilePicture_${userId}`, profilePictureDataUrl);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function loadProfilePicture() {
  const userId = getUserId();
  const profilePictureDataUrl = localStorage.getItem(
    `profilePicture_${userId}`
  );
  if (profilePictureDataUrl) {
    document.getElementById(
      "profile-picture-preview"
    ).style.backgroundImage = `url(${profilePictureDataUrl})`;
    document.querySelectorAll("#user-profile").forEach((elem) => {
      elem.style.backgroundImage = `url(${profilePictureDataUrl})`;
    });
  }
}

function removeProfilePicture() {
  const userId = getUserId();
  localStorage.removeItem(`profilePicture_${userId}`);
  document.getElementById("profile-picture-preview").style.backgroundImage = "";
  document.querySelectorAll("#user-profile").forEach((elem) => {
    elem.style.backgroundImage = "";
  });
}

// Load profile picture on page load
document.addEventListener("DOMContentLoaded", loadProfilePicture);
