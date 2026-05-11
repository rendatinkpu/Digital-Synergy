const config = window.APP_CONFIG || {};
const appName = config.appName || "Aplikasi";
const appUrl = config.appsScriptUrl || "";

const titleEl = document.getElementById("appTitle");
const connectionText = document.getElementById("connectionText");
const frame = document.getElementById("appFrame");
const loader = document.getElementById("loader");
const fallback = document.getElementById("fallback");
const reloadBtn = document.getElementById("reloadBtn");
const openOriginalBtn = document.getElementById("openOriginalBtn");
const installBtn = document.getElementById("installBtn");

let deferredInstallPrompt = null;
let iframeLoaded = false;

document.title = appName;
titleEl.textContent = appName;
openOriginalBtn.href = appUrl;

function setFrameUrl() {
  if (!appUrl) {
    connectionText.textContent = "URL Apps Script belum diatur.";
    fallback.hidden = false;
    loader.hidden = true;
    return;
  }

  iframeLoaded = false;
  loader.hidden = false;
  fallback.hidden = true;
  connectionText.textContent = "Menghubungkan ke Apps Script...";
  frame.src = appUrl + (appUrl.includes("?") ? "&" : "?") + "pwa=1&t=" + Date.now();
}

frame.addEventListener("load", () => {
  iframeLoaded = true;
  loader.hidden = true;
  connectionText.textContent = "Aplikasi aktif";
});

setTimeout(() => {
  if (!iframeLoaded) {
    loader.hidden = true;
    fallback.hidden = false;
    connectionText.textContent = "Perlu cek izin embed Apps Script";
  }
}, 12000);

reloadBtn.addEventListener("click", setFrameUrl);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installBtn.hidden = true;
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
  deferredInstallPrompt = null;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // PWA tetap berjalan walau service worker gagal, misalnya saat dibuka langsung dari file://
    });
  });
}

setFrameUrl();
