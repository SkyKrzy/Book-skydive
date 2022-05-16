
console.log("forValidation.ja");

const formInputFieldnames = [
    "firstName",
    "lastName",
    "email",
    "destination",
    "dateFrom",
    "dateTo",
    "numberOfPeople",
    "carRent",
    "airportTransport",
    "withInsurance",
    "insurance",
    "withoutInsurance",
    "file",
  ];
const inputTypeCheckValue = {"date", "text", "email", "number"};

const demElement = {
    formConteiner: document.querySelector("#contactPageform"),
    firstNameInput: document.querySelector("#firstName"),
    lastNameInput: document.querySelector("#email"),
  

};


domElement.firstNameInput.onfocus = () => {
    console.log("")

};
domElement.lastNameInput.onfocus = () => {

};
domElement.emailInput.onfocus = () => {

};
domElement.firstNameInput.onblur = () => {

};

const validateFormElement = (element, elementid) => {
    if (inputTypetoCheckValue.includes(element.type) && element.
    value === "") {
        element.classList.add(errorClassName);
        return;
    }

}

const onFormSubmitCallback = (event) => {
    event.preventDefault()
    for (const element of formInputFieldnames) {
        console.log(
            `Wartość $(element) to ${event.target.elements[element].value}
            `
        )
    }
console.log("----------------")

};

domElement.fromConteiner.addEventListener("submit", onFormSubmitCallback);






