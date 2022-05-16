// console.clear();

// /*
//  * 1.
//  * - Tworzymy klase Product
//  * - Pobieramy dane z API np. https://fakestoreapi.com/products/1 (async await)
//  * w polu "rating" utwórz metodę "show" która zwróci rating oraz liczbe ocen
//  * w klasie Product utwórz metodę showProductDetails która przeiteruje po polach obiektu i zwróci informacje na jego temat
//  */

// // Klasa, która pozwala na utworzenie obiektu z danymi z API
// // obiekt po odwołaniu do obj.rating.show() powinien zwrócić rating
// // obiekt po odwołaniu do obj.showProductDetails powinien zwrócić detale na jego temat

class Rating {
  constructor(rate, count) {
    this.rate = rate;
    this.count = count;
  }

  show() {
    return `Avg rate: ${this.rate} of ${this.count} vote(s).`;
  }
}

class Product {
  constructor(
    id,
    title,
    price,
    description,
    category,
    image,
    ratingRate,
    ratingCount
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = new Rating(ratingRate, ratingCount); // kompozycja, "has a"
  }

  showProductDetails() {
    let productDetails = "";
    // const {id, title, price} = this;
    // let details = `${id}, ${title}`;
    // 1. for in

    // zadanie domowe: przerobienie metody showProductDetails na funkcje rekurencyjną
    for (const property in this) {
      if (typeof this[property] === "object") {
        for (const prop in this[property]) {
          productDetails += `${prop}: ${this[property][prop]}, `;
        }
      } else {
        productDetails += `${property}: ${this[property]}, `;
      }
    }

    return productDetails;
  }
}
let isLoading = false;
const getApiData = async (successCallback, errorCallback) => {
  try {
    isLoading = true;
    const apiCall = await fetch("https://fakestoreapi.com/products/1");
    const response = await apiCall.json();
    if (successCallback) successCallback(response);
    return response;
  } catch (err) {
    if (errorCallback) errorCallback(err);
    console.error(err);
  } finally {
    isLoading = false;
  }
};

// IIFE
// Immediately Invoked Function Expression
(async () => {
  const apiData = await getApiData();
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { rate, count },
  } = apiData;
  const obj1 = new Product(
    id,
    title,
    price,
    description,
    category,
    image,
    rate,
    count
  );
  // console.log(obj1);
  // Wykorzystujac metody statyczne Object.keys oraz Object.entries wypisz jako string informacje o obiekcie obj1
  // Wynikiem powinny być dwie funkcje, które zwrócą ciąg znaków utworzony w rózny sposób
  // np. printObjDetailsEntries, printObjDetailsKeys

  const printObjDetailsKeys = (obj) => {
    let details = "";
    Object.keys(obj).forEach((element) => {
      details = details + `${element}: ${obj[element]}; `;
    });
    return details;
  };

  const printObjDetailsEntries = (obj) => {
    console.log(Object.entries(obj));
  };

  // console.log(printObjDetailsKeys(obj1));
  printObjDetailsEntries(obj1);
})();

console.clear();

// Cwiczenie
// Jestesmy na wysokosci h
// Upuszczamy pilke z okna. Pilka posiada wspolczynnik odbicia np. 0.66
// Oblicz, ile razy pilka upuszczona z wysokosci h przekroczy linie 1.5m

// h = 3, bounce = 0.66, line = 1.5
// 1 -> leci w dol // nowa wysokosc
// 2 -> po odbiciu
// 3 -> leci w dol

// Zakladamy, ze h > 1.5m, bounce (0,1>, line = 1.5m (nizej niz h)

const calcBouncing = (h, bounce, line = 1.5) => {
  let counter = 0;
  while (h > line) {
    counter += 1;
    h = h * bounce;
    if (h > line) counter += 1;
  }
  return counter;
};

// console.log(calcBouncing(10, 0.66));

// Napisz funkcje, ktora sprawdzi czy podana liczba (argument funkcji) jest potega liczby 2 np. 16 => true, 5 => false

// sprawdzamy, czy istnieje taka liczba, do ktorej podniesiona 2 da przekazana wartosc

// Math

const checkPow = (par) => {
  let number = 0;
  let pow = 0;
  while (number < par) {
    number = Math.pow(2, pow);
    pow++;
    console.log(number);
  }
  return number === par;
};

// console.log(checkPow(1));

// sprawdź czy podany parametr jest palindromem
// kajak

// console.log([1,2,3].reverse())

const isPalindrome = (str) => {
  return str === str.split("").reverse().join("");
};

// console.log(isPalindrome("kobyła ma mały bok"));

//
