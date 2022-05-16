console.clear();
const request = new Promise((resolve, reject) => {
  resolve("ok");
});

// request.then(console.log);
const API_URL = "https://petstore.swagger.io/v2";
const PET_ENDPOINT = `${API_URL}/pet`;
const STORE_ENDPOINT = `${API_URL}/store`;
const USER_ENDPOINT = `${API_URL}/user`;

// Promise, async/await, setInterval, setTimeout - asynchronicznosc

// METODY KOMUNIKACJI
// GET - pobieranie
// POST - wysyłanie (pobieranie) - dane przekazujemy w niejawny sposób, metoda jest wykorzystywana kiedy chcemy dodać nowe dane do naszego serwera (np. nowego uzytkownika)
// DELETE - usuwanie
// PUT - aktualizacja

// Cwiczenie 1
// Utworz klasy Category [X], Pet [X], Tag [X], Order [X], User [X] bazujac na modelach swaggera PetStore

// Kiedy tworzymy klase - zawsze w parze mamy slowko class, wielka litere w nazwie (na poczatku) oraz {}
class Category {
  // zatrudniamy konstruktora, ktory bedzie tworzyl nasze pieczatki na bazie przekazanych informacji
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Pet {
  constructor(id, category, name, photoUrls, tags, status) {
    const { id: categoryId, name: categoryName } = category;
    this.id = id;
    this.category = new Category(categoryId, categoryName);
    this.name = name;
    this.photoUrls = photoUrls;
    this.tags = tags;
    this.status = status;
  }
}

class Tag {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
class Order {
  constructor(id, petId, quantity, shipDate, status, complete) {
    this.id = id;
    this.petId = petId;
    this.quantity = quantity;
    this.shipDate = shipDate;
    this.status = status;
    this.complete = complete;
  }
}

class User {
  constructor(
    id,
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    userStatus
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.userStatus = userStatus;
  }
}

// Cwiczenie 2
// Czesc 0: Utworz stale dla endpointow store oraz user [x]
// Czesc I: Napisz funkcje asynchroniczna odpytujaca dowolny endpoint backendowy (realizacja na dwa sposoby - async/await oraz przy wykorzystaniu Promises) [X]
// Czesc II: Sprawdz w funkcji onSuccessCallback czy zapytanie zostalo przetworzone prawidlowo (weryfikujemy zwrocony obiekt) i odpowiednio obsluz zwrocone dane [X]
// Czesc III: Pobierz dane dla Pet o dowolnym ID (przekazanym w formie parametru) [X]

// Czesc I
// PET_ENDPOINT/findByStatus?status=sold (GET)
// PET_ENDPOINT (PUT)
// https://petstore.swagger.io/v2 /store/order

// DRY - Don't repeat yourself

// Czesc I
const onPetIfSuccess = (data) => {
  if (data.type === "error") {
    console.error(data.message);
  } else {
    // id, category, name, photoUrls, tags, status
    // category = obiekt klasy Category
    // photoUrls = tablica stringów
    // tags = tablica obiektów klasy Tag
    const { id, category, name, photoUrls, tags, status } = data;
    const newTags = tags.map((tag) => {
      const { id, name } = tag;
      return new Tag(id, name);
    });
    // metody tablicowe - map - tworzy nowa tablice na bazie obecnej (w tym przypadku na bazie tablicy tags)
    const pet1 = new Pet(id, category, name, photoUrls, newTags, status);
    console.log(pet1);
    // console.log(data);
  }
};
// Czesc I
const onPetTernarySuccess = (data) => {
  data.type === "error" ? console.error(data.message) : console.log(data);
};

// Czesc II - Promise
const fetchEndpoint = (url, onSuccessCallback, onErrorCallback) => {
  return fetch(url)
    .then((response) => response.json())
    .then((a) => {
      onSuccessCallback(a);
    })
    .catch((err) => {
      onErrorCallback(err);
    });
};

const onPetErrorCallback = (err) => {
  console.log("wywolanie funkcji onError");
  console.error(err);
};

// fetchEndpoint(`${PET_ENDPOINT}/1`, onPetIfSuccess, onError);

// Czesc II - async/await
const fetchAsyncEndpoint = async (url, onSuccessCallback, onErrorCallback) => {
  try {
    const response = await fetch(url);
    // console.log(response);
    // kiedy mamy 200 jako status to znaczy, ze zapytanie do serwera zostalo przetworzone prawidlowo i zostajemy w bloku try lub w then w przypadku promise
    const data = await response.json();
    if (onSuccessCallback) {
      onSuccessCallback(data);
    }
  } catch (err) {
    if (onErrorCallback) {
      console.log("jestesmy w catchu");
      onErrorCallback(err); // onErrorCallback przyjmie wartosc jaka zostala przekazana jako 3 argument funkcji
    }
  }
};

// fetchAsyncEndpoint(`${PET_ENDPOINT}/1`, onPetIfSuccess, onPetErrorCallback);

// Czesc III
const getPetDataById = (id, onSuccessCallback, onErrorCallback) => {
  // bedziemy korzystac z naszej funkcji fetchAsyncEndpoint do pobierania danych na temat zwierzaka po konkretnym ID
  // jako parametry bedziemy przekazywac 3 rzeczy: id, callbacki - success, error
  fetchAsyncEndpoint(
    `${PET_ENDPOINT}/${id}`,
    onSuccessCallback,
    onErrorCallback
  );
};
// getPetDataById(1, appState.pets.push);

// async/await, Promises, callbacki, if/ternary, funkcje

// Cwiczenie 3
// Czesc I: Pobierz dane o zwierzaku dla wybranego ID [X]
// Czesc II: Na podstawie informacji zwróconych przez serwer utwórz obiekt klasy Pet (modyfikujemy callbacki) [X]

// Cwiczenie 4
// Utworz funkcje, ktora pozwoli na dodanie dowolnego zwierzaka, jako parametr przekaz obiekt klasy Pet

/**
 * {
  "id": 1,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
  }
 */

const sendDataToApi = async (
  apiEndpoint,
  data,
  method,
  onSuccessCallback,
  onErrorCallback
) => {
  try {
    const request = await fetch(apiEndpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    if (onSuccessCallback) onSuccessCallback(response);
  } catch (err) {
    if (onErrorCallback) onErrorCallback(err);
  }
};

const petDataToSend = {
  id: 1,
  category: {
    id: 0,
    name: "string",
  },
  name: "Pikuś",
  photoUrls: ["string"],
  tags: [
    {
      id: 1,
      name: "puppy",
    },
  ],
  status: "available",
};

// sendDataToApi(PET_ENDPOINT, petDataToSend, console.log, console.error);

// 1. Tworzymy funkcje strzalkowa
// 2. Dodajemy async, aby nasza funkcja stala sie asynchroniczna
// 3. Przypisujemy wynik dzialania fetch do zmiennej (np. request) i poprzedzamy fetch slowkiem await, aby poczekac na zakonczenie dzialania Promise ktory jest zwrocony przez funkcje fetch
// 4. Po zakonczeniu dzialania funkcji fetch (ktora zwraca Promise) do zmiennej request zostanie przypisany obiekt klasy Response, ktory wymaga wywolania metody ".json()" w celu pobrania danych zwróconych przez serwer
// 5. Zeby pobrac dane z pkt 4 tworzymy kolejna zmienna np. response i przypisujemy do niej wynik dzialania metody .json() wywolanej na obiekcie request. Wynik dzialania metody .json() musi zostać poprzedzony slowkiem await
// 6. Po tej operacji w zmiennej response mamy dostep do danych zwrconych przez serwer
// 7. Rozszerzamy funkcje o callbacki - w zaleznosci od sytuacji wywolamy onSuccessCallback lub onErrorCallback

// Cwiczenie 5
// Rozszerz funkcje sendDataToApi o obsluge metody PUT
// sendDataToApi(PET_ENDPOINT, petDataToSend, 'PUT', () => { getPetDataById(1); }, console.error);

// Cwiczenie 6
// Na bazie funkcji fetchAsyncEndpoint utworz funkcje pobierajaca dane na temat zamowienia o wskazanym ID

const getOrderDetailsById = (orderID, onSuccessCallback, onErrorCallback) => {
  fetchAsyncEndpoint(
    `${STORE_ENDPOINT}/order/${orderID}`,
    onSuccessCallback,
    onErrorCallback // w przypadku callbackow przekazujemy adres pamieci, gdzie znajduje sie cialo naszej funkcji - nie wywolujemy jej w tym miejscu
  );
};

// getOrderDetailsById(4);

const appState = {
  pets: [],
  orders: [],
};

// Cwiczenie 6.5
// Utworz tablice obiektów klasy Pet, a nastepnie korzystajac z metody sendDataToApi dodaj je do API (id zwierzakow od 1 do 10)

// category {id: 1, name: 'cats' }
// category {id: 2, name: 'dogs' }

// tag: {id: 1, 'kitty' }
// tag: {id: 2, 'puppy' }

const pets = [
  new Pet(
    1,
    { id: 2, name: "dogs" },
    "Burek",
    [""],
    [new Tag(2, "puppy")],
    "available"
  ),
  new Pet(
    2,
    { id: 2, name: "dogs" },
    "Lucy",
    [""],
    [new Tag(2, "puppy")],
    "available"
  ),
  new Pet(
    3,
    { id: 2, name: "dogs" },
    "Nela",
    [""],
    [new Tag(2, "puppy")],
    "available"
  ),
  new Pet(
    4,
    { id: 1, name: "cats" },
    "Puszek",
    [""],
    [new Tag(1, "koteł")],
    "unavailable"
  ),
  new Pet(
    5,
    new Category(2, "dogs"),
    "Idefiks",
    [""],
    [new Tag(1, "puppy")],
    "available"
  ),
  new Pet(
    6,
    { id: 2, name: "dogs" },
    "Luigi",
    [""],
    [new Tag(2, "puppy")],
    "available"
  ),
  new Pet(
    7,
    { id: 2, name: "dogs" },
    "Azor",
    [""],
    [new Tag(2, "puppy")],
    "available"
  ),
  new Pet(
    8,
    { id: 1, name: "cats" },
    "Mruczek",
    [""],
    [new Tag(1, "kitty")],
    "available"
  ),
  new Pet(
    9,
    { id: 2, name: "dogs" },
    "Kieł",
    [""],
    [new Tag(2, "doggy")],
    "available"
  ),
  new Pet(
    10,
    { id: 1, name: "cats" },
    "Maniek",
    [""],
    [new Tag(1, "kitty")],
    "available"
  ),
];

const promises = [];
const ordersPromises = [];

for (let pet of pets) {
  // petla do wysylania requestow
  // console.log(pet);
  // new Promise((resolve, reject) => )
  promises.push(
    new Promise((res, rej) => {
      sendDataToApi(
        PET_ENDPOINT,
        pet,
        "POST",
        (data) => {
          appState.pets.push(data);
          res();
        },
        rej
      );
    })
  );
}

// Cwiczenie 7
// Pobierz kilka zwierzakow (np. o Id o 1 do 10) i dodaj je do pola "pets" obiektu "appState"

const getpets = (petsNumber) => {
  for (let i = 1; i <= petsNumber; i++) {
    getPetDataById(
      i,
      (data) => {
        console.log({ ...data });
        appState.pets.push(data);
        // console.log(appState.pets);
      },
      console.error
    ); // funkcja asynchroniczna ktora laduje na EventLoop
  }
};
// 100% pewnosci, ze wszystkie nasze requesty zwiazane z dodaniem danych do API zostaly przetworzone (Promise.all)
Promise.all(promises)
  .then(() => {
    // getpets(10)
  })
  .catch(console.error);
// getpets(10);

// Cwiczenie 8
// Pobierz kilka zamowien (np. o Id o 1 do 10) i dodaj je do pola "orders" obiektu "appState"
const getOrders = (orderNumber) => {
  for (let i = 1; i <= orderNumber; i++) {
    getOrderDetailsById(
      i,
      (data) => {
        console.log(data);
        appState.orders.push(data);
        // console.log(appState.pets);
      },
      console.error
    ); // funkcja asynchroniczna ktora laduje na EventLoop
  }
};

// console.log(getOrders(10));
// getOrders(10);

// Cwiczenie 8.5
// Upewnij sie, ze w appState mamy wszystkie ordersy, a nastepnie wyswietl stan aplikacji (console.log(appState))

for (let i = 1; i <= 10; i++) {
  promises.push(
    new Promise((resolve, reject) =>
      getOrderDetailsById(
        i,
        (data) => {
          appState.orders.push(data);
          resolve();
        },
        reject
      )
    )
  );
}
// console.log(promises);

// then zostanie wywolany jak wszystkie promises zostana skonsumowane,
// catch zostanie wywolany jak jakikolwiek promise zostanie odrzucony
// Promise.all(promises)
//   .then(() => console.log(appState))
//   .catch(console.error);

// Cwiczenie 9
// Sprawdz czy w tablicy "orders" wystepuja zwierzaki z tablicy "pets" obiektu "appState"

// if, funkcje, callbacki, promises, async/await, klasy, obiekty, tablice, petle
// fetch - wysylanie danych, metody komunikacji z API (GET, POST, PUT, PATCH, DELETE)

const test = [
  new Promise((resolve, reject) => {}),
  new Promise((resolve, reject) => {}),
  new Promise((resolve, reject) => {}),
];
// console.log(test);
// Promise.all([]);
