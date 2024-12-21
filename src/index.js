import "@/styles/main.css";

function setDarkMode() {
  var isDarkMode = window.store.darkMode;
  var btn = document.getElementById("darkModeToggle");
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  btn.textContent = isDarkMode ? "☀️" : "🌙";
}

function toggleDarkMode() {
  window.store.darkMode = !window.store.darkMode;
}

function setCurrentYear() {
  var currentYear = window.store.currentYear;
  document.getElementById("currentYear").textContent = `${currentYear} `;
}

function main() {
  setDarkMode();
  setCurrentYear();
  // setListings();
}

var store = {
  darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  currentYear: new Date().getFullYear(),
  listings: [],
};

var storeProxy = new Proxy(store, {
  set: function set_(store, key, value) {
    store[key] = value;
    window.dispatchEvent(new Event(key + "Updated"));
    return true;
  },
  get: function get_(store, key) {
    return store[key];
  },
});

window.store = storeProxy;

document.addEventListener("DOMContentLoaded", main);
window.addEventListener("darkModeUpdated", setDarkMode);
document
  .getElementById("darkModeToggle")
  .addEventListener("click", toggleDarkMode);
