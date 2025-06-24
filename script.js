// script.js

function copyTranslation(elementId) {
  const translationField = document.getElementById(elementId);
  const copyNotification = document.getElementById(
    `copyNotification${elementId.slice(-2)}`
  );

  translationField.select();
  document.execCommand("copy");

  copyNotification.innerText = "Copied";
  copyNotification.style.display = "block";

  setTimeout(() => {
    copyNotification.innerText = "";
    copyNotification.style.display = "none";
  }, 3000);
}

function attachEventListeners() {
  const translateButton = document.getElementById("translate-btn");

  // Attach the translateText function to the click event of the button
  translateButton.addEventListener("click", translateText);
  translateButton.addEventListener("touchstart", translateText);

  ["DE", "FR", "NL"].forEach((lang) => {
    const copyButton = document.getElementById(`copyButton${lang}`);
    copyButton.addEventListener("click", () =>
      copyTranslation(`translation${lang}`)
    );
  });
}

async function translateText() {
  const textToTranslate = document.getElementById("inputText").value;

  try {
    const response = await fetch(
      "https://deepl-translation-app.onrender.com/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `text=${encodeURIComponent(textToTranslate)}`,
      }
    );

    console.log("logs out", response);
    const translations = await response.json();
    document.getElementById("translationDE").value = translations["DE"];
    document.getElementById("translationFR").value = translations["FR"];
    document.getElementById("translationNL").value = translations["NL"];
  } catch (error) {
    console.error("Translation error:", error);
    // Handle error
  }
}

// Attach event listeners when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", attachEventListeners);
