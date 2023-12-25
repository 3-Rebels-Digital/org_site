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
  [...text].map(letter => console.log(letter));
  return [...text].map(letter =>
    `<span class="letter" data-text="${letter}">${letter}</span>`).join("");
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
    const isSymbol = Math.random() > 0.5;
    const randomClass = isSymbol ? "glitch-text--symbols" : "glitch-text";
    // randomoize to return glitch-text or glitch-text and --symbols
    selectLetter.classList.add(randomClass);
    setTimeout(() => {
      selectLetter.classList.remove("glitch-text", "glitch-text--symbols");
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

const nextPhrase = (counter, phrases) => {
  const nextCounter = counter + 1;
  if (nextCounter >= phrases.length) {
    return 0;
  }
  return nextCounter;
}

const textChangeAnimation = (element, phrases) => {
  let counter = 0;
  const changeText = () => {
    element.classList.add("glitch");
    element.dataset.text = phrases[nextPhrase(counter, phrases)];
    counter++;
    if (counter >= phrases.length) {
      counter = 0;
    }
    setTimeout(() => {
      element.textContent = phrases[counter];
      setTimeout(() => {
        element.classList.remove("glitch");
      }, 500);
    }, 1000);


  }
  setInterval(changeText, 12000);
}

const changeText = () => {
  const header2 = getElement(".heading-2");
  const span = header2.querySelector("span");
  span.classList.add("rebel-switcher");
  const phrases = [
    "in record time",
    "efficiently",
    "with a smile",
    "with a passion",
  ];
  textChangeAnimation(span, phrases);
}

const heroAnimator = () => {
  const hero = getElement("#animatedHero");
  const header1 = hero.querySelector(".heading-1");
  header1.innerHTML = splitText(header1.innerText);
  const letters = document.querySelectorAll(".letter");
  randomizeLetterFont(letters);
  changeText();
}

window.addEventListener("load", () => {
  heroAnimator();
})