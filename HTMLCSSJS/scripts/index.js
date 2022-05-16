console.clear();
// https://jsonplaceholder.typicode.com/users
const API_URL = "https://jsonplaceholder.typicode.com";
const USERS_ENPOINT = `${API_URL}/users`;
const TODOS_ENDPOINT = `${API_URL}/todos`;

const filterUsersArray = (usersArray, property, value) => {
  return usersArray.filter((obiektUzytkownika, indeksTegoObiektuWTablicy) => {
    return obiektUzytkownika[property] === value;
  });
};

fetch(USERS_ENPOINT)
  .then((daneZwroconePrzezPromise) => {
    // console.log(daneZwroconePrzezPromise);
    return daneZwroconePrzezPromise.json();
  })
  .then((daneZwroconePrzezObiektResponse) => {
    // console.log(daneZwroconePrzezObiektResponse);
    // 1. Console.log, który zwróci obiekt uzytkownika o ID = 2
    // console.log(Array.isArray(daneZwroconePrzezObiektResponse));
    // filter

    // 2. Zwracamy uzytkownika, ktory posiada strone o adresie "ola.org"
    /*
    return daneZwroconePrzezObiektResponse.filter(
      (obiektUzytkownika, indeksTegoObiektuWTablicy) => {
        return obiektUzytkownika.id === 2;
      }
    );
    */
    //  3. Zastepujemy ponizszy return funkcja "filterUsersArray"
    // return filterUsersArray(
    //   daneZwroconePrzezObiektResponse,
    //   "name",
    //   "Leanne Graham"
    // );
    // 4. Na bazie tablicy zwrocone przez API utworz nowa tablice, która będzie zawierała tylko informacje o adresie zamieszkania
    // return daneZwroconePrzezObiektResponse.map((item) => {
    //   return item.address;
    // });
    // 5. Sortujemy tablice userow w taki sposob, aby byli posortowani po polu username rosnaco
    return daneZwroconePrzezObiektResponse.sort((a, b) => {
      // console.log(a.username.toLowerCase(), a.username.toLowerCase().charCodeAt(0), a.username[0].toLowerCase())
      return (
        a.username.toLowerCase().charCodeAt(0) -
        b.username.toLowerCase().charCodeAt(0)
      );
    });
  })
  .then((daneZwroconePrzezPoprzedniThen) => {
    console.log(daneZwroconePrzezPoprzedniThen);
  })
  .catch((error) => {
    console.error(error);
  });

// fetch pobiera dane z API
// i udostepnia je dalej w formie obiektu typu Promise
// obiekt Promise jest w stanie "settled" jezeli dane z serwera zostaną
// pobrane prawidłowo i zwraca obiekt typu Response
