console.clear();

// ------
// Klasy
// funkcja konstruktora (konstruktor)
const createUser = (name, username, email) => {
  // let user = {name: name, username: username, email: email};
  let user = { name, username, email };
  user.sayHello = function () {
    console.log("Hello! My name is " + user.name);
  };
  return user;
};

class User {
  constructor(name, username, email) {
    this.name = name;
    this.username = username;
    this.email = email;
  }
  sayHello() {
    console.log("Hello! My name is " + this.name);
  }
}

// console.log(this);

const el = createUser("Greg", "Gregory", "greg@gmail.com");
const el2 = new User("Philip", "Phil", "phil@gmail.com");
// console.log(el);
// console.log(el2);
// el.sayHello();
// el2.sayHello();

// Klasy: new, this, constructor, class
// Utworz 4 nowe klasy: Auto, Book, Phone, Computer
// W funkcji konstruktora wykorzystaj 4 wlasnosci
// Do kazdej klasy dodaj 3 metody ktore np. wyswietla informacje o wlasnosciach obiektu tej klasy

class Auto {
  constructor(color, brand, model, maxSpeed) {
    this.color = color;
    this.brand = brand;
    this.model = model;
    this.maxSpeed = maxSpeed;
  }
  getColor() {
    console.log("Color is " + this.color);
  }
  getBrand() {
    console.log("Brand: " + this.brand);
  }
  getModel() {
    // ' " ` (grawis/backtick)
    console.log(`Model: ${this.model}`);
  }
}

const auto1 = new Auto("blue", "Audi", "A6", 250);

auto1.getColor();
auto1.getModel();

class Book {
  constructor(title, year, pages, coverColor) {
    this.title = title;
    this.year = year;
    this.pages = pages;
    this.coverColor = coverColor;
  }

  getTitle() {
    console.log("Title is " + this.title);
  }

  getYear() {
    console.log("Year is " + this.year);
  }

  getPages() {
    console.log(`Pages: ${this.pages}`);
  }
}

const book = new Book("Harry Potter", "2021", "231", "blue");

book.getTitle();
book.getPages();

class Phone {
  constructor(company, model, year, price) {
    this.company = company;
    this.model = model;
    this.year = year;
    this.price = price;
  }
  getCompany() {
    console.log(this.company);
  }
  getModel() {
    console.log(this.model);
  }
  getYear() {
    console.log(this.year);
  }
  getPrice() {
    console.log(this.price);
  }
}
const phone = new Phone("OnePlus", "Nord2", "2022", "300$");

phone.getModel();
phone.getPrice();

class Computer {
  constructor(company, model, ram, price) {
    this.company = company;
    this.model = model;
    this.ram = ram;
    this.price = price;
  }
  showCompany() {
    console.log(`Name of company is ${this.company}`);
  }
  showModel() {
    console.log(`Model of the computer is ${this.model}`);
  }

  showRam() {
    console.log(`This computer has ${this.ram} of ram`);
  }
  showPrice() {
    console.log(`Price of this computer is ${this.price} usd`);
  }
}

let nowyKomputer = new Computer("Dell", "ASGAZ", "16gb", 2000);
nowyKomputer.showRam();

console.clear();

const isValid = false;
const isRegistered = true;

// Promises
// const feedback = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     isValid ? resolve("Valid ✅") : reject("Is not valid ❌");
//   }, 5000);
// });

// const feedback2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     isValid || isRegistered ? resolve("Valid ✅") : reject("Is not valid ❌");
//   }, 1000);
// });

// const feedback3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     isValid ? resolve("Valid ✅") : reject("Is not valid ❌");
//   }, 9000);
// });

// feedback.then(console.log).catch(console.error);
// Promise.race([feedback, feedback2, feedback3])
//   .then((promisesArray) => {
//     console.log(promisesArray);
//   })
//   .catch(console.error);

// Symulujemy odpowiedz ze strony backendu
// Zwracamy tablice elementów z utworzonych przez nas klas po 5 sekundach
// Wykorzystujemy klase Promise

let isLoading = false;

// Promise
// const backendData = new Promise((resolve, reject) => {
//   const array = [auto1, book, phone, nowyKomputer];
//   setTimeout(() => {
//     resolve(array);
//   }, 5000);
// });

isLoading = true;
// backendData
//   .then((responseBackend) => {
//     console.log(...responseBackend);
//   })
//   .catch((error) => {
//     console.error(error);
//   })
//   .finally(() => {
//     console.log("finally!");
//     isLoading = false;
//   });

// setTimeout(() => {
//   console.log('timeout');
// }, 1000)

// const polling = setInterval(() => {
//   console.log("request");
// }, 5000);

// clearInterval(polling);

// Tworzymy dwa interwaly
// W jednym interwale będziemy co 5 sekund dodawac do tablicy licz losowych losowa liczbe
// W drugim interwale ktory bedzie uruchamiany co 3 sekundy bedzie sprawdzac sume liczb w tablicy (przy pomocy reduce)
// Drugi interwal laczymy z promise, ktory zostanie skonsumowany kiedy liczba w tablicy bedzie wieksza/rowna 500, a liczba requestow bedzie mniejsza niz 10, w przeciwnym przypadku - promise zostanie odrzucony

const randomNumbers = [];
let countReq = 0;
let countNum = 0;
const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

const interval1 = setInterval(() => {
  randomNumbers.push(generateRandomNumber());
  console.log(randomNumbers);
}, 5000);

const interval2 = setInterval(() => {
  randomNumbers.reduce((prev, current) => {
    countNum = prev + current;
    return countNum;
  }, 0);
  countReq++;
  console.log(countNum);
  console.log(countReq);
}, 3000);

const promise = new Promise((res, rej) => {
  setTimeout(() => {
    if (countNum >= 200 && countReq <= 15) {
      console.log("1");
      clearInterval(interval1);
      clearInterval(interval2);
      res("Resolved");
    } else {
      console.log("2");

      clearInterval(interval1);
      clearInterval(interval2);
      rej("Rejected");
    }
  }, 30000);
});
promise
  .then((res) => {
    console.log("ok");
  })
  .catch((error) => console.error(error));
