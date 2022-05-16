console.clear();

/*
 * 1.
 * - Tworzymy klase Product
 * - Pobieramy dane z API np. https://fakestoreapi.com/products/1 (async await)
 * w polu "rating" utwórz metodę "show" która zwróci rating oraz liczbe ocen
 * w klasie Product utwórz metodę showProductDetails która przeiteruje po polach obiektu i zwróci informacje na jego temat
 */

// Klasa, która pozwala na utworzenie obiektu z danymi z API
// obiekt po odwołaniu do obj.rating.show() powinien zwrócić rating
// obiekt po odwołaniu do obj.showProductDetails powinien zwrócić detale na jego temat

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
// (async () => {
//   const apiData = await getApiData();
//   const {
//     id,
//     title,
//     price,
//     description,
//     category,
//     image,
//     rating: { rate, count },
//   } = apiData;
//   const obj1 = new Product(
//     id,
//     title,
//     price,
//     description,
//     category,
//     image,
//     rate,
//     count
//   );
//   console.log(obj1.showProductDetails());
//   //   delete obj1.id;
//   //   console.log(obj1);
//   console.log(Object.keys(obj1));
//   console.log(Object.entries(obj1));
// })();

const user = {
  name: "Greg",
  lastName: "Bush",
};

const user2 = Object.create(user);

console.log(user);
console.log(user2.name);

Product.prototype.checkStockValue = function () {
  console.log("Zostalo w magazynie .... sztuk");
};

const product = new Product(1, 2, 3, 4, 5, 6, 7, 5);
console.log(product);

Object.defineProperty(product, "stock", {
  configurable: false,
  writable: false,
  enumerable: true,
  value: 10,
});

for (const key in product) {
  console.log(key);
}
