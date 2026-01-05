/* 
Darkmode Logic

const body = document.body;
const button = document.getElementById("dark-mode-btn");

button.addEventListener('click', () => {
  const isDark = body.classList.toggle('darkmode');
  localStorage.setItem('darkmode', isDark);
});

const saved = localStorage.getItem('darkmode') === 'true';
body.classList.toggle('darkmode', saved);
 */

const toggleBtn = document.getElementById("sidebarMenuButton");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});
