const rootContainer = document.querySelector("#root");
rootContainer.innerHTML = "";

class MyHtmlElement {
  constructor(...args) {
    // args pomimo przekazania obiektu jest tablica, dlatego ze mamy operator spread
    for (const htmlElement of args) {
      for (const key in htmlElement) {
        this[key] = htmlElement[key];
      }
    }
  }
}

const testObj = new MyHtmlElement({
  type: "text",
  tagName: "input",
  required: true,
});

const createMyHtmlElement = (myHtmlElement) => {
  const element = document.createElement(myHtmlElement.tagName); // form
  for (const prop in myHtmlElement) {
    if (prop === "classList") {
      myHtmlElement[prop].forEach((className) => {
        element.classList.add(className);
      });
    } else {
      element[prop] = myHtmlElement[prop];
      if (Array.isArray(myHtmlElement[prop])) {
        for (const child of myHtmlElement[prop]) {
          element.appendChild(createMyHtmlElement(child));
        }
      }
    }
  }

  return element;
};

const firstNameInput = {
  tagName: "label",
  for: "petName",
  children: [
    {
      tagName: "span",
      id: "labelText",
      innerText: "First name:",
    },
    {
      tagName: "input",
      required: true,
      type: "text",
      minlength: 3,
      id: "petName",
      name: "name",
      placeholder: "Your pets name",
    },
  ],
};

const categorySelect = {
  tagName: "label",
  children: [
    {
      tagName: "span",
      id: "labelText",
      innerText: "Category:",
    },
    {
      tagName: "select",
      id: "categorySelect",
      name: "category",
      value: "-",
      required: true,
      children: [
        //   {
        //     tagName: "option",
        //     disabled: true,
        //     selected: "selected",
        //     value: "-",
        //     innerText: "-",
        //   },
        {
          tagName: "option",
          value: "dogs",
          innerText: "Dogs",
        },
        {
          tagName: "option",
          value: "cats",
          innerText: "Cats",
        },
      ],
    },
  ],
};

const photoUrlInput = {
  tagName: "label",
  children: [
    {
      tagName: "span",
      id: "labelText",
      innerText: "Photo url:",
    },
    {
      tagName: "input",
      type: "url",
      required: true,
      minlength: 3,
      id: "photoUrl",
      name: "photoUrl",
      placeholder: "Your pets photo url",
    },
  ],
};

const formElements = {
  form: {
    tagName: "form",
    id: "addNewPetForm",
    novalildate: "novalildate",
    children: [
      firstNameInput,
      categorySelect,
      photoUrlInput,
      {
        tagName: "label",
        children: [
          {
            tagName: "span",
            id: "labelText",
            innerText: "Tags:",
          },
          {
            tagName: "input",
            type: "text",
            id: "tags",
            name: "tags",
            placeholder: "dog, cat, puppy",
          },
        ],
      },
      {
        tagName: "label",
        children: [
          {
            tagName: "span",
            id: "labelText",
            innerText: "Status:",
          },
          {
            tagName: "select",
            id: "petStatusSelect",
            name: "petStatusSelect",
            required: true,
            children: [
              {
                tagName: "option",
                value: "available",
                innerText: "Available",
                selected: true,
              },
              {
                tagName: "option",
                value: "pending",
                innerText: "Pending",
              },
              {
                tagName: "option",
                value: "sold",
                innerText: "Sold",
              },
            ],
          },
        ],
      },
      {
        tagName: "div",
        classList: ["buttons"],
        children: [
          { tagName: "input", type: "submit", value: "Add new pet" },
          { tagName: "input", type: "reset", value: "Reset form" },
        ],
      },
    ],
  },
};

for (const element in formElements) {
  rootContainer.appendChild(createMyHtmlElement(formElements[element]));
}

const isEmpty = (value) => value === "" || value === 0 || !value;

const isValidElement = (htmlElement) =>
  htmlElement.type === "submit" || htmlElement.type === "reset" ? false : true;

const addNewPetFormContainer = document.getElementById("addNewPetForm");

addNewPetFormContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target.elements);
  for (const el of event.target.elements) {
    if (isValidElement(el)) {
      if (isEmpty(el.value)) {
        el.classList.add("emptyInputError");
      } else {
        if (el.classList.length && el.classList.includes("emptyInputError"))
          el.classList.remove("emptyInputError");
      }
    }
  }
});
