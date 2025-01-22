// Function to dynamically load a JavaScript file
function loadDynamicScript(src, callback, isModule = false) {
  const script = document.createElement("script");
  script.src = src;

  // Treat the script as a module if needed
  if (isModule) {
    script.type = "module";
  }

  script.onload = callback || (() => console.log(`Script loaded: ${src}`));
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}

// Set the base URL explicitly
const baseURL = "https://supercharger-dev.vercel.app/";

// Check the hostname and load the appropriate script
const origin = window.location.hostname;

loadDynamicScript(`${baseURL}home/staging.js`, () => {
console.log("Loaded production script");
}, true);
