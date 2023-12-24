"use strict";

// if the page has been rendered, then execute the function
const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  );
}

// convert string into array then loop through each letter and return as a span
const splitText = (text) => {
  return [...text].map(letter => `<span class="letter">${letter}</span>`).join("");
}

const fontArray = ["Ft Activica Mix", "Ft Activica Symbols", "Ft Activica"];

const changeFont = (element, font) => {
  const fontWithFontBackup = `${font}, "Sans-Serif"`;
  element.style.fontFamily = fontWithFontBackup;
}

const randomizeLetterFont = (letters) => {
  let counter  = 0;

  const fontChanger = () => {
    counter++;
    console.log(`change font ${counter}`);
    const selectLetter = letters[Math.floor(Math.random() * letters.length)];
    const selectFont = fontArray[Math.floor(Math.random() * fontArray.length)];
    selectLetter.classList.add("glitch-text");
    setTimeout(() => {
      selectLetter.classList.remove("glitch-text");
    }, 6000);
  }

  const intervalUpdater = () => {
    const randomInterval = Math.floor(Math.random() * 6000);
    console.log(randomInterval);
    return randomInterval;
  }

  setInterval(() => {
    fontChanger();
  }, 6000);
}

const heroAnimator = () => {
  const hero = getElement("#animatedHero");
  const header1 = hero.querySelector(".heading-1");
  header1.innerHTML = splitText(header1.innerText);
  const letters = document.querySelectorAll(".letter");
  randomizeLetterFont(letters);
}

window.addEventListener("load", () => {
  heroAnimator();
})