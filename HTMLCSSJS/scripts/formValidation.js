console.clear();

/**
 * Walidacja formularza
 * 1. Dodajemy event listner na forumularz (znacznik <form>, event: submit)
 * 2. Wysłany event musi zostać wyłączony (jego domyślne zachowanie) - dlatego wywołujemy metodę .preventDefault() na evencie przekazanym do callbacka np. event.preventDefault()
 * 3. Walidujemy formularz :)
 */

// Cwiczenie
// Wykonaj powyzsze pkt: 1 i 2

const formField = {};

Object.defineProperty(formField, "inputNamesArray", {
  // Zadanie domowe: dodaj tablice inputNamesArray jako read-only property, napisz do niej getter
});

const formInputFieldnames = [
  "Selfie",
  "Pro",
  "vocherElectro",
  "file",
  "Premium",
  "dateFrom",
  "dateTo",
  "destination",
  "email",
  "firstName",
  "insurance",
  "lastName",
  "numberOfPeople",
  "voucherherGift",
  "withoutCam",
];

const inputTypesToCheckValue = ["date", "text", "email", "number"];

const domElements = {
  formContainer: document.querySelector("#contactPageForm"),
  firstNameInput: document.querySelector("#firstName"),
  lastNameInput: document.querySelector("#lastName"),
  emailInput: document.querySelector("#email"),
};

// alternatywa do obiektu domElements jako sposob na bardziej kompleksowe zarzadzanie informacjami o elementach DOM
// const domElementWithConfig = {
//   form: {
//     container: document.querySelector("#contactPageForm"),
//     selector: "#contactPageForm",
//     required: true,
//     pattern: //i,
//     isIterable: false,
//   },
//   firstNameInput: document.querySelector("#firstName"),
//   lastNameInput: document.querySelector("#lastName"),
//   emailInput: document.querySelector("#email"),
// };

// domElements.firstNameInput.onfocus = () => {
//   // w tym miejscu musimy wybrac span o klasie caption w przestrzeni konkretnego inputa
//   console.log("firstNameInput focus");
// };

// domElements.lastNameInput.onfocus = () => {
//   console.log("lastNameInput focus");
// };

// domElements.emailInput.onfocus = () => {
//   console.log("emailInput focus");
// };

// domElements.firstNameInput.onblur = () => {
//   console.log("firstNameInput focus lost");
// };

// domElements.lastNameInput.onblur = () => {
//   console.log("lastNameInput focus lost");
// };

// domElements.emailInput.onblur = () => {
//   console.log("emailInput focus lost");
// };

const validateFormElementValue = (element) => {
  // funkcja sprawdzajaca wartosc inputa
  // w przypadku pustej wartosci - dodajemy klasę "emptyInputError"
  // w przeciwnym przypadku - usuwamy
  const errorClassName = "emptyInputError";
  if (element.length && element.type !== "select-one") return;
  if (
    (inputTypesToCheckValue.includes(element.type) && element.value === "") ||
    (element.type === "select-one" && element.value === "-")
  ) {
    element.classList.add(errorClassName);
    return;
  }
  if (
    element.classList.length > 0 &&
    element.classList.contains(errorClassName)
  )
    element.classList.remove("emptyInputError");
};

const onFormSubmitCallback = (event) => {
  event.preventDefault();
  for (const element of formInputFieldnames) {
    validateFormElementValue(event.target.elements[element]);
  }
  console.log("------------------------");
};

// event.target.elements to kolekcja wszystkich elementów które są bezpośrednimi dziećmi naszego formularza (kolekcja tzn. mix tablicy oraz obiektu)

domElements.formContainer.addEventListener("submit", onFormSubmitCallback);

/**
 * Cwiczenie
 * Pole Imie, Nazwisko i Email są wymagane
 * Pod każdym z tych pól dodaj "podpis" który pokaże się dopiero, kiedy użytkownik kliknie dany input
 * Zachowanie labelki:
 *  1. On focus - labelka staje się widoczna
 *  2. Po podaniu wartości - nic się nie zmienia
 *  3. Po wysłaniu formularza - walidacja i w przypadku bledu - kolor czerwony
 *  4. Ponowna walidacja - jezeli nadal sa bledny - kolor czerwony
 *  5. W przypadku poprawy bledow - kolor "domyslny"
 *  6. W idealnej sytuacji - walidacja nastepuje onblur na inpucie
 */

// ---------------------- 11.05 ----------------------
/** Cwiczenie
 * API: https://petstore.swagger.io/#/pet/addPet
 * 1. Stworz obiekt z opisem pol formularza (id, typ, initialValue, isRequired, ...). Wszystkie inputy maja byc w <label for="xxxxx"></label>
 * 2. Iterujac po polach obiektu utworz formularz przy pomocy JS
 * 3. Na podstawie opisu pol z obiektu - waliduj formularz przy wysylce
 * 4. Dodaj do pola formularza error message, ktory pojawi sie w przypadku niespielnienia walidacji
 * 5. Wysylaj formularz dopiero, kiedy walidacja nie zwroci bledu
 */

/**
 * Krok po kroku:
 * 0. (Opcjonalnie) Tworzymy klase dla kazdego elementu HTML
 * 1. Tworzymy const z adresem API i wszystkie zmienne zwiazane z konfiguracja jak np. formElements (obiekt/tablica)
 * 2. Uzupelniamy obiekt odpowiednimi danymi
 * 3. Tworzymy funkcje pomocniczna do tworzenia elementow HTML
 * 4. Iterujemy przez obiekt w celu utworzenia elementow na stronie (kontener formularza <form> zostaje bez zmian w HTML)
 * 5. Dodajemy event listener na formularzu
 * 6. Tworzymy callback na dodany event listener (musimy uwzglednic m.in preventDefault, pobieranie value, sprawdzanie czy pole jest required etc, wysylke w przypadku braku bledow)
 * 7. W przypadku braku bledow wykona sie funkcja odp. za wysylke danych - musimy ja wczesniej utworzyc
 * 8. Jesli dane zostana wyslane prawidlowo - czyscimy formularz, w przeciwnym przypadku - obslugujemy blad serwera
 */

// Wersja bez przeladowania JSem :)
/**
 * 1. Tworzymy formularz w HTML (pomijamy tworzenie calego obiektu z elementami i wlasnosciami)
 * 2. Dodajemy event listener na formularzu, ale walidacje realizujemy po stronie HTML
 * 3. Obslugujemy wysylke danych do API przy pomocy funkcji callback na event listner naszego formularza
 * - dane pobieramy przy pomocy document.querySelector("#idElementu").value
 */

// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
/**
 * Cwiczenie
 * Stworz aplikacje wyszukujacą przepisy na drinki (text input + calle do api)
 * Obsluz wyjatki (jak np. brak zwrotki z serwera)
 * Dodaj flagi w celu przełączania wersji językowych (ENG, ES, IT, FR, DE)
 * [*] Przepisy wyświetlaj w formie kafelek, gdzie na początku pokazujemy zdjęcie, pod zdjęciem nazwę drinka, a po najechaniu na kafelek - skladniki i przepis
 */
