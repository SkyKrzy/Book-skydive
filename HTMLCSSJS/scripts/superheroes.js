/**
 *   {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
 */

 class SuperHero {
    constructor(name, age, secretIdentity, powers) {
      this.name = name;
      this.age = age;
      this.secretIdentity = secretIdentity;
      this.powers = powers;
    }
  }
  
  class State {
    constructor(prop, value) {
      this[prop] = value;
    }
  }
  
  State.prototype.getSuperheroWithBiggestAmountOfSuperpowers = function () {
    let superhero = this.superheroes[0];
    for (const hero of this.superheroes) {
      if (hero.powers.length > superhero.powers.length) {
        superhero = hero;
      }
    }
    return superhero;
  };
  
  State.prototype.getNameOfSuperheroWithBiggestAmountOfSuperpowers = function () {
    return this.getSuperheroWithBiggestAmountOfSuperpowers().name;
  };
  
  State.prototype.getNameOfSuperheroWithBiggestAmountOfSuperpowers = function () {
    return this.getSuperheroWithBiggestAmountOfSuperpowers().name;
  };
  
  State.prototype.getTheOldestSuperhero = function () {
    let superhero = this.superheroes[0];
    for (const hero of this.superheroes) {
      if (hero.age > superhero.age) {
        superhero = hero;
      }
    }
    return superhero;
  };
  
  State.prototype.getSuperHeroByName = function (name) {
    const hero = this.superheroes.filter((hero) => hero.secretIdentity === name);
    return hero.length ? hero[0] : "Superhero not found..";
  };
  
  State.prototype.addSuperhero = function (name, age, secretIdentity, powers) {
    this.superheroes.push(new SuperHero(name, age, secretIdentity, powers));
    return this.superheroes;
  };
  
  State.prototype.getAllSuperpowers = function () {
    let powers = "";
    this.superheroes.forEach((hero) => {
      powers += hero.powers.join(", ");
      powers += "; ";
    });
    return powers;
  };
  
  State.prototype.getAllSuperpowers = function () {
    return this.superheroes.reduce((powers, hero) => {
      powers += hero.powers.join(", ");
      powers += "; ";
      return powers;
    }, "");
  };
  
  State.prototype.getAllSuperheroNames = function () {
    return this.superheroes.reduce((names, hero) => {
      names += hero.name + ", ";
      return names;
    }, "");
  };
  
  State.prototype.json = function () {
    return JSON.stringify(this);
  };
  
  (async () => {
    const appState = new State("superheroes", []);
    const apiData = await fetch(
      "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
    );
    const response = await apiData.json();
    response.members.forEach((hero) => {
      const { name, age, secretIdentity, powers } = hero;
      appState.superheroes.push(new SuperHero(name, age, secretIdentity, powers));
    });
  
    appState.addSuperhero("Spiderman", 99999999, "Peter Parker", [
      "Webdeveloper",
      "Debugger",
    ]);
    //   console.log(appState.getSuperheroWithBiggestAmountOfSuperpowers());
    //   console.log(appState.getNameOfSuperheroWithBiggestAmountOfSuperpowers());
    //   console.log(appState.getTheOldestSuperhero());
    //   console.log(appState.getSuperHeroByName("Jane Wilson"));
    //   console.log(appState.getAllSuperpowers());
    //   console.log(appState.getAllSuperheroNames());
    //   console.log(appState.json());
  })();
  