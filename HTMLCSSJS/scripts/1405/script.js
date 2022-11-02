/**
 * Cwiczenie 1 - Modal
 *
 * a) caly modal jest budowany w JS
 * b) modal czeka w HTML na wywolanie przez JS (tak jak spinner)
 *
 * Co potrzebujemy:
 * a) CSS: position, top/left, z-index, background, ...
 * b) HTML: container, w container - modal, w modalu: [X] do zamykania, tekst (lorem ipsum), input + button
 * c) JS: setTimeout, querySelector..., element.style.visibility.., addEventListner na ikonie do zamykania
 *
 * Cwiczenie 2 - Modal - obsluga
 * a) wyswietlanie / interakcja
 * - klik na "X" powoduje zamkniecie
 * - modal pojawia sie automatycznie po 10sek
 * - obsluga zapisania sie do newslettera: wysylka formularza + komunikat o zapisaniu
 *
 * b) zapisywanie informacji w przegladarce
 * - wykorzystaj localStorage do sprawdzania czy modal byl wyswietlony
 */

const domElements = {
  modals: {
    newsletterModal: {
      container: document.getElementById("newsletterModal"),
      content: "",
    },
    accessModal: {},
  },
};

const getItemFromLS = (key) => {
  if (window.localStorage) {
    return localStorage.getItem(key);
  } else {
    throw Error("Localstorage is not supported");
  }
};

const setItemInLS = (key, value) => {
  if (window.localStorage) {
    localStorage.setItem(key, value);
  } else {
    throw Error("Localstorage is not supported");
  }
};

// Obsluga zachowania modalu
// 1. Wybranie modala z DOM
const modalContainer = document.querySelector(".modalContainer");
const innerModalContent = modalContainer.querySelector(".modal");
const newsletterFlagFromLS = getItemFromLS("newsletterModal");

// 2. ustawienie setTimeout na 10sek, aby modal sie pokazal uzytkownikowi
if (!newsletterFlagFromLS) {
  setTimeout(() => {
    if (modalContainer) {
      modalContainer.style.visibility = "visible";
      innerModalContent.classList.add("visible");
      if (getItemFromLS("newsletterModal")) return;
      handleModalRenderingBehaviour();
    }
  }, 1000);
}

const setNewseletterModalFlag = () => {
  setItemInLS("newsletterModal", true);
};

// 3. Dodanie eventu na zamkniecie
modalContainer.addEventListener("click", (e) => {
  // Sprawdzamy czy event.target to span.closeIcon lub svg z parent elementem span.closeIcon
  // e.target.tagName === "svg" && e.target.closest('.closeIcon')
  if (e.target.tagName === "svg" || e.target.closest(".closeIcon")) {
    modalContainer.style.visibility = "";
    innerModalContent.classList.remove("visible");
    setNewseletterModalFlag();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && modalContainer.style.visibility === "visible") {
    modalContainer.style.visibility = "";
    innerModalContent.classList.remove("visible");
    setNewseletterModalFlag();
  }
});

// Obsluga wysylki formularza w modalu
// 1. Wybranie formularza z modala - modalContainer.querySelector
// 2. Dodajemy event na submit
// 3. obsluga - preventDefault() + podmiana zawartosci innerHtml w naszym modalu (u mnie to będzie klasa ".modal__content")
const newsletterFormContainer = modalContainer.querySelector("form");

newsletterFormContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const modalContentContainer = modalContainer.querySelector(".modal__content");
  modalContentContainer.innerHTML =
    "<p>Dziękujemy za zapisanie się do newslettera</p>";
  setNewseletterModalFlag();
});

// Cwiczenie 3 - dodanie eventu, ktory spowoduje zamkniecie modalu na przycisniecie "escape"
// Potrzebne będzie dodanie eventu "keydown" na "document"

// Zadanie domowe - zamykanie modala na click poza modal (nie modalContainer)

// Localstorage
if (window.localStorage) {
  //   localStorage.setItem("test", JSON.stringify({ name: "jakub2" }));
  //   console.log(JSON.parse(localStorage.getItem("test")));
}

// Cwiczenie 4 - localstorage & modal
// Modal wyswietlamy tylko w sytuacji, kiedy localstorage od "newsletterModal" jest puste.
// W kazdej sytuacji, kiedy uzytkownik wejdzie w interakcje z modalem - ustawiamy "newsletterModal" na "true"

// Cwiczenie 5 - liczenie wyswietlen modalu
// Liczymy do 3 wyswietlen modalu przy pomocy localstorage i jezeli wartosc ilosci wyswietlen bedzie wynosila 3 - ustawiamy flage newsletterModal na true
const handleModalRenderingBehaviour = () => {
  const howManyTimesModalWasRendered = getItemFromLS("modalRenderingCounter");
  if (!howManyTimesModalWasRendered) {
    setItemInLS("modalRenderingCounter", JSON.stringify({ counter: 1 }));
  } else {
    let counter = JSON.parse(howManyTimesModalWasRendered).counter;
    setItemInLS(
      "modalRenderingCounter",
      JSON.stringify({ counter: ++counter })
    );
    if (counter >= 3) {
      setNewseletterModalFlag();
    }
  }
};

/**
 * Cwiczenie 6
 * Utworz modal logowania/rejstracji
 *
 * Zalozenia:
 * - modal posiada dwie zakladki
 * - zakladka logowania zawiera dwa inputy (mail + pwd) oraz przycisk "loguj"
 * - zakladka "rejestracja" bedzie zawierala 2 stepy tzn:
 * -- step1 - dane osobowe (imie + nazwisko)
 * -- step2 - mail + pwd
 *
 * Do zakladki "rejestracja" potrzebny nam będzie stepper ktory pokaze aktualny krok rejestracji
 * - dopoki dane nie beda prawidlowe przyciski typu "nastepny"/"rejestruj" beda nieaktywne
 * - przycisk "wstecz" jest aktywny tylko na step2
 * - przycisk "rejestruj" spowoduje zamkniecie modala i wyswietlenie informacji o prawidlowej rejestracji
 */

const switchContainer = document.querySelector(".content__switcher");
switchContainer.addEventListener("click", (e) => {
  if (e.target.id) {
    document.querySelectorAll(".switchButton").forEach((el) => {
      el.classList.remove("active");
    });
    const activeButton = document.getElementById(e.target.id);
    activeButton.classList.add("active");
    document.querySelectorAll(".switchContent").forEach((el) => {
      if (el.dataset.id === e.target.id) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });
  }
});

const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActive = 1;

next.addEventListener("click", () => {
  currentActive++;

  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  update();
});

prev.addEventListener("click", () => {
  currentActive--;

  if (currentActive < 1) {
    currentActive = 1;
  }

  update();
});

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = progressContainer.querySelectorAll(".active");
  const stepperContentContainer = document.querySelector(".stepperContent");
  const activeStepContentTabs =
    stepperContentContainer.querySelectorAll(".stepContent");

  activeStepContentTabs.forEach((el) => {
    if (el.id !== `step${currentActive}`) {
      el.style.display = "none";
    } else {
      el.style.display = "flex";
    }
  });

  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  if (currentActive === 1) {
    prev.disabled = true;
    next.disabled = false;
  } else if (currentActive === circles.length) {
    next.disabled = true;
    prev.disabled = false;
  }
}

const accessModalContainer = document.getElementById("accessModalContainer");
const innerAccessModalContent = accessModalContainer.querySelector(".modal");
const accessModalIcon = document.querySelector(".accessModalIcon");
accessModalIcon.addEventListener("click", (e) => {
  console.log(innerAccessModalContent);
  accessModalContainer.style.visibility = "visible";
  innerAccessModalContent.classList.add("visible");
});

accessModalContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "svg" || e.target.closest(".closeIcon")) {
    accessModalContainer.style.visibility = "";
    innerAccessModalContent.classList.remove("visible");
  }
});
