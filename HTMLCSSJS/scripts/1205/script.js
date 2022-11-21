const addNewInputToContainer = (event, containerName, placeholder) => {
  // const parentContainer = event.srcElement.parentElement.parentElement;
  const parentContainer = event.srcElement.closest(".inputsButtonsContainer");
  const divElement = document.createElement("div");
  const inputElement = document.createElement("input");
  const buttonElement = document.createElement("button");

  divElement.classList.add("flexContainer");

  inputElement.type = "text";
  inputElement.name = containerName;
  inputElement.placeholder = placeholder;

  buttonElement.innerText = "-";
  buttonElement.classList.add("extraFormField");
  buttonElement.classList.add("extraFormFieldRemove");
  buttonElement.type = "button";
  buttonElement.addEventListener("click", (e) =>
    e.target.parentElement.remove()
  );
  divElement.append(inputElement, buttonElement);
  parentContainer.appendChild(divElement);
};

const newPetPhotoUrlInputButton = document.querySelector(
  "#newPetPhotoUrlInputButton"
);

const newPetTagInputButton = document.querySelector("#newPetTagInputButton");
const formContainer = document.getElementById("addNewPet");
const spinnerContainer = document.querySelector(".spinnerContainer");

newPetPhotoUrlInputButton.addEventListener("click", (e) => {
  addNewInputToContainer(e, "photoUrl", "https://...");
});

newPetTagInputButton.addEventListener("click", (e) => {
  addNewInputToContainer(e, "newPetTagInput", "e.g dog");
});

const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

// 3. Napisanie success callback
const onDataSendSuccessCallback = (data) => {
  if (data.code === 500) {
    onDataSendErrorCallback();
    return;
  }
  showToast("Formularz wyslany prawidlowo", "success", 3000);
  formContainer.reset();
};

// 4. Napisanie Error callback
const onDataSendErrorCallback = (error) => {
  console.warn(error);
  showToast("Wysylka nieudana :(", "error", 3000);
};

const showToast = (msg, type, time) => {
  const el = document.createElement("div");
  el.innerText = msg;
  el.classList.add("toastNotification");
  if (type === "success") el.classList.add("success");
  if (type === "error") el.classList.add("error");

  document.querySelector("body").appendChild(el);

  const timeout = setTimeout(() => {
    el.remove();
  }, time);

  el.addEventListener("click", (e) => {
    clearTimeout(timeout);
    e.target.remove();
  });
};

// 8. [*] spinner przy przetwarzaniu danych

const sendDataToApi = async (formData, onSuccessCallback, onErrorCallback) => {
  try {
    spinnerContainer.style.display = "flex";
    const request = await fetch("https://petstore.swagger.io/v2/pet", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const apiResponse = await request.json();
    if (onSuccessCallback) onSuccessCallback(apiResponse);
  } catch (err) {
    if (onErrorCallback) onErrorCallback(err);
  } finally {
    spinnerContainer.style.display = "none";
  }
};

formContainer.addEventListener("submit", (e) => {
  e.preventDefault(); // wylacza domyslne zachowanie eventu - w tym przypadku submit
  const { elements } = e.target; // wszystkie elementy html formularza (inputy i buttony) - kolekcja elementow
  const request = {
    id: generateRandomNumber(),
    category: {
      id: generateRandomNumber(),
      name: elements["category"].value,
    },
    name: elements["name"].value,
    photoUrls: [],
    tags: [],
    status: elements["status"].value,
  };
  for (const element of elements) {
    if (isElementValid(element)) {
      if (element.name === "photoUrl") {
        element.value ? request.photoUrls.push(element.value) : null;
      } else if (element.name === "newPetTagInput") {
        element.value
          ? request.tags.push({
              id: generateRandomNumber(),
              name: element.value,
            })
          : null;
      } else {
      }
    }
  }
  sendDataToApi(request, onDataSendSuccessCallback, onDataSendErrorCallback);
});

const isElementValid = (element) => {
  return (
    element.type !== "submit" &&
    element.type !== "reset" &&
    element.type !== "button"
  );
};
