console.clear();
const API_URL = "https://jsonplaceholder.typicode.com";
const USERS_ENDPOINT = `${API_URL}/users`;
const TODOS_ENDPOINT = `${API_URL}/todos`;
/**
 * 1. Tworzymy obiekt ze stanem aplikacji, w ktorym definiujemy wlasnosci "users" oraz "todos"
 * 2. Pobieramy z API liste userow i zapisujemy ja w stanie aplikacji
 * 3. Pobieramy z API liste zadan i zapisujemy ja w stanie aplikacji
 * 4. Tworzymy tablice, w ktorej polaczymy uzytkownikow z zadaniami, ktore sa do nich przypisane
 * 5. Wykorzysujac reduce
 *    a) policz ile zadan jest wykonanych, a ile nie (wsrod wszystkich todos). Informacje przedstaw jako obiekt postaci {done: X, toBeDone: Y}
 *    b) policz ile zadan jest wykonany, a ile nie dla konkretnego uzytkownika i zapisz te informacje w obiekcie uzytkownika jako obiekt postaci {done: X, toBeDone: Y}
 */

const user = { name: "Greg", skills: [] };
user.skills.push("css");
// console.log(user);
let apState = { users: [], todos: [] };

// Event Loop

Promise.allSettled([
  fetch(USERS_ENDPOINT)
    .then((daneZwracane) => {
      return daneZwracane.json();
    })
    .then((daneZwroconeZBackendu) => {
      apState = { ...apState, users: [...daneZwroconeZBackendu] };
      // console.log(apState);
      // console.table(daneZwroconeZBackendu);
      // return daneZwroconeZBackendu;
    }),
  fetch(TODOS_ENDPOINT)
    .then((daneZwracaneZToDos) => {
      return daneZwracaneZToDos.json();
    })
    .then((daneZwracaneZToDosZBackendu) => {
      apState = { ...apState, todos: [...daneZwracaneZToDosZBackendu] };
    })
]).then(() => {
  // mamy pewnosc ze oba zapytania zostaly przetworzone
  apState = {
    ...apState,
    todos: [
      ...apState.todos.map((todo) => {
        if (todo.id % 4 === 0) {
          return { ...todo, completed: true };
        } else {
          return { ...todo };
        }
      })
    ]
  };

  let nowaTablica = [];

  for (let i = 0; i < apState.users.length; i++) {
    nowaTablica.push({
      ...apState.users[i],
      todos: apState.todos.filter((todo) => {
        return todo.userId === apState.users[i].id;
      })
    });
  }
  // console.log(nowaTablica);
  /**
   *
   * 5. Wykorzysujac reduce
   *    a) policz ile zadan jest wykonanych, a ile nie (wsrod wszystkich todos). Informacje przedstaw jako obiekt postaci {done: X, toBeDone: Y}
   *    b) policz ile zadan jest wykonany, a ile nie dla konkretnego uzytkownika i zapisz te informacje w obiekcie uzytkownika jako obiekt postaci {done: X, toBeDone: Y}
   * sum:
   */
  const calcTodos = (prev, curr) => {
    // prev: {done:0, toBeDone:0}
    // curr: todo
    if (curr.completed) {
      return (prev = { done: prev.done + 1, toBeDone: prev.toBeDone });
    } else {
      return (prev = { ...prev, toBeDone: prev.toBeDone + 1 });
    }
  };
  const calcTodosInitialValue = { done: 0, toBeDone: 0 };
  const sum = apState.todos.reduce(calcTodos, calcTodosInitialValue);
  const nowaTablica2 = nowaTablica.map((user, id) => {
    return {
      ...user,
      sum: user.todos.reduce(calcTodos, calcTodosInitialValue)
    };
  });
  apState = { ...apState, users: [...nowaTablica2] };

  // Szukamy dwoch uzytkownikow: najwieksza ilosc todos na done oraz najwieksza ilosc todos na toBeDone
  let user1 = apState.users[0];
  let user2 = apState.users[0];

  // console.log(apState.users);
  // console.log(user1.sum.done);

  for (let i = 0; i < apState.users.length; i++) {
    if (apState.users[i].sum.done > user1.sum.done) {
      user1 = apState.users[i];
    }
    if (apState.users[i].sum.toBeDone > user2.sum.toBeDone) {
      user2 = apState.users[i];
    }
  }
  console.log(apState);

  // console.log(user1.sum);
  // console.log(user2.sum);

  // 2 sposob - sort
  const user1sort = apState.users.sort((a, b) => b.sum.done - a.sum.done)[0];
  const user2sort = apState.users.sort(
    (a, b) => b.sum.toBeDone - a.sum.toBeDone
  )[0];
  // console.log(user1sort.sum);
  // console.log(user2sort.sum);

  // fetch
  // Event loop
  // Promises
});
