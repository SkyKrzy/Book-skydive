console.clear();
// https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json

/**
 * 1. Utwórz klasę SuperHero, która pozwoli na utworzenie obiektów z pola "members" [X]
 * 2. Pobierz dane z API, a następnie utwórz na bazie tablicy "members" obiekty klasy SuperHero [X]
 * 3. Utworzone obiekty dodaj do obiektu "appState" w polu "superheroes" [X]
 * 4. Napisz funkcje, które pozwolą na wyszukanie:
 * - bohatera z najwieksza iloscia supermocy // getSuperheroWithBiggestAmountOfSuperpowers()
 * (mozemy zrobic geter w obiekcie, metode na prototypie klasy State lub zwykla funkcje, ktora bedzie korzystac z obiektu appState) [X]
 * - najstarszego superbohatera [X]
 * - superbohatera o wskazanym przez nas identity (np. podajemy Jane Wilson i otrzymujemy obiekt superbohaterki o tym identity) [X]
 * 5. Napisz funkcję, która na bazie przyjętych właściwości doda nowego superbohatera do stanu aplikacji [X]
 * 6. W stanie aplikacji utwórz metody:
 * - która pozwoli na wyświetlenie wszystkich supermocy (wszystkich bohaterów), (geter, metoda, funkcja) [X]
 * - która wyświetli wszystkich superbohaterów (pole "name") [X]
 */

// Zadanie z *
// - wykorzystaj IIFE i async/await
// - dodaj metodę w obiekcie appState o nazwie "json", która zwróci JSON z appState
// const response = '{"name": "jakub"}'
// console.log(JSON.parse(response))
// console.log(JSON.stringify({name: "Jakub"}))

/**
 *{
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    }, */

// Pkt 1
class Superhero {
  constructor(name, age, secretIdentity, powers) {
    this.name = name;
    this.age = age;
    this.secretIdentity = secretIdentity;
    this.powers = powers;
  }

  get amountOfPowers() {
    return this.powers.length;
  }
}

class State {
  constructor(superheroes) {
    this.superheroes = superheroes;
    this.isLoading = false;
  }

  json() {
    return JSON.stringify(this);
  }
}

// Pkt 5
State.prototype.addNewSuperhero = function (name, age, secretIdentity, powers) {
  this.superheroes.push(new Superhero(name, age, secretIdentity, powers));
};

// Pkt 4.1
State.prototype.getSuperheroWithBiggestAmountOfSuperpowers = function () {
  // let superhero = this.superheroes[0];
  // for(const hero of this.superheroes) {
  //   if (superhero.amountOfPowers < hero.amountOfPowers) {
  //     superhero = hero;
  //   }
  // }
  // return superhero;

  return this.superheroes.reduce(
    (prev, hero) => {
      if (prev.amountOfPowers < hero.amountOfPowers) {
        return hero;
      }
      return prev;
    },
    { amountOfPowers: 0 } // zapewniamy odpowiedni obiekt pod kątem struktury, nie musi to być obiekt z naszego state aplikacji
  );
};
// Pkt 4.2
State.prototype.getTheOldestSuperhero = function () {
  return this.superheroes.reduce((prev, hero) => {
    if (prev.age < hero.age) {
      return hero;
    }
    return prev;
  }, this.superheroes[0]);
};
// Pkt 4.3
State.prototype.getSuperheroByGivenIdentity = function (identity) {
  const superhero = this.superheroes.filter(
    (hero) => hero.secretIdentity.toLowerCase() === identity.toLowerCase()
  );
  return superhero.length ? superhero[0].name : "Hero not found 😎";
};
// Pkt 6.1
State.prototype.getAllSuperpowers = function () {
  return this.superheroes
    .reduce((prev, curr) => {
      return [...prev, ...curr.powers];
    }, [])
    .join(", ");
};

// Pkt 6.2
// funkcja
// Krok 1. Deklaracja funkcji przy pomocy const i nazwy, a nastepnie przypisanie funkcji strzalkowej
const getAllSuperheroNames = (appState) => {
  // Krok 2. Odwolujemy sie do parametru (appState jako stan naszej aplikacji nie zostal jeszcze zdefiniowany), aby zaczac iteracje przez tablicę superbohaterów
  // Krok 3. Wywolujemy metode forEach na tablicy elementów, jako parametr przekazujemy funkcję strzalkowa (jest to callback, który posiada 2 argumenty - element (aktualnie przetwarzany) praz indeks)
  let names = "";
  appState.superheroes.forEach((element, index) => {
    // Krok 4. Wiedzac, ze element posiada wszystkie wlasnosci klasy Superhero mozemy pobrac wartosc jego pola "name"
    // console.log(element.name);
    // Krok 5. Pobrana wartosc przypisujemy do zmiennej pomocniczej zdefiniowanej przed petla
    // Krok 6. Aby nie utracic stanu zmiennej pomocnicznej musimy przypisac do niej poprzednia wartosc (z poprzedniego przebiegu petli)
    names = `${element.name}, ${names}`;
  });
  return names;
};

(async () => {
  const appState = new State([]);
  try {
    // Pkt 2 - czesciowo
    appState.isLoading = true;
    const apiData = await fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
    );
    const response = await apiData.json(); // metoda .json() operuje na strumieniu danych zwracanych przez Promise z funkcji fetch
    // Pkt 2 - czesciowo, 3
    response.members.forEach((superhero) => {
      const { name, age, secretIdentity, powers } = superhero;
      // const newHeroObject = new Superhero(name, age, secretIdentity, powers);
      // appState.superheroes.push(newHeroObject);
      // appState.superheroes.push(new Superhero(name, age, secretIdentity, powers));
      appState.addNewSuperhero(name, age, secretIdentity, powers);
    });
    appState.addNewSuperhero("Spiderman", 99999999, "Peter Parker", [
      "Webdeveloper",
      "Debugger",
    ]);
    // console.log(appState.getSuperheroWithBiggestAmountOfSuperpowers());
    // console.log(appState.getTheOldestSuperhero());
    // console.log(appState.getSuperheroByGivenIdentity("Peter parker1"));
    // console.log(appState.getAllSuperpowers());
    // console.log(appState);
    console.log(getAllSuperheroNames(appState));
    console.log(appState.json());
  } catch (err) {
  } finally {
    appState.isLoading = false;
  }
})();

/**
 * fetch("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
 *  .then((response) => response.json())
 *  .then((data) => console.log(data));
 */
