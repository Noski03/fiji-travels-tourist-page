const button = document.getElementById("dark-mode-btn");
function toggleDarkMode() {
  if (button.textContent === "Toggle Light Mode") {
    // Switch to light mode
    console.log("Switching to light mode");
    // TO DO: implement light mode functionality here
    button.textContent = "Toggle Dark Mode";
  } else {
    // Switch to dark mode
    console.log("Switching to dark mode");
    // TO DO: implement dark mode functionality here
    button.textContent = "Toggle Light Mode";
  }
}
button.addEventListener("click", toggleDarkMode);
