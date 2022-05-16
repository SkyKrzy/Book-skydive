// "use strict"; [verify]

// console.log(addTwoNumbers(1, 2));
function addTwoNumbers(a, b) {
  return a + b;
}

// var b = 10;

// const a = "";
// let c = 10;

// zakresy globalne
// zakresy lokalne

let c = 1;

function x() {
  let a = 2;
  let b = 1;
  console.log(c);
  console.log(a); //to działa
}

zmienna = 1; // staje sie zmienna globalna w obiekcie window

x();
console.log(b); //to nie działa
