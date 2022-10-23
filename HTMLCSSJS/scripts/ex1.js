console.clear();

// 1. Utwórz 3 klasy
// Kazda klasa powinna zawierać 4 własności, 2 metody
// Na podstawie kazdej z klas utwórz 3 obiekty (w sumie 9 obiektów)

// https://jsonplaceholder.typicode.com/photos/2
// https://jsonplaceholder.typicode.com/photos/3

// https://jsonplaceholder.typicode.com/posts/2
// https://jsonplaceholder.typicode.com/posts/3

// https://jsonplaceholder.typicode.com/users/2
// https://jsonplaceholder.typicode.com/users/3

// class, constructor, new, this

// 1. Photos
class Photos {
  constructor(albumId, id, title, url) {
    this.albumId = albumId;
    this.id = id;
    this.title = title;
    this.url = url;
  }
  getAlbumId() {
    console.log(`Album Id: ${this.albumId}`);
  }
  getTitle() {
    console.log(`Title: ${this.title}`);
  }
}
const photo1 = new Photos(
  1,
  1,
  "accusamus beatae ad facilis cum similique qui sunt",
  "https://via.placeholder.com/600/92c952"
);

const photo2 = new Photos(
  1,
  2,
  "reprehenderit est deserunt velit ipsam",
  "https://via.placeholder.com/600/771796"
);

const photo3 = new Photos(
  1,
  3,
  "officia porro iure quia iusto qui ipsa ut modi",
  "https://via.placeholder.com/600/24f355"
);

// 2. Posts
// syntax sugar
class Posts {
  constructor(userId, id, title, body) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }

  calcTitleLength() {
    return this.title.length;
  }

  getBody() {
    return this.body;
  }
}

const post1 = new Posts(
  1,
  1,
  "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
);

const post2 = new Posts(
  1,
  2,
  "qui est esse",
  "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
);

const post3 = new Posts(
  1,
  3,
  "ea molestias quasi exercitationem repellat qui ipsa sit aut",
  "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
);

// 3. Users
class Users {
  constructor(id, name, username, email, phone, website) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.website = website;
  }

  newUserId() {
    console.log(`My ID will be ${this.id}`);
    // alert('test'); // side effect
  }

  newUser() {
    console.log(`My name is ${this.name}`);
  }
}

const user1 = new Users(
  1,
  "Leanne Graham",
  "Bret",
  "Sincere@april.biz",
  "1-770-736-8031 x56442",
  "hildegard.org"
);

const user2 = new Users(
  2,
  "Ervin Howell",
  "Antonette",
  "Shanna@melissa.tv",
  "010-692-6593 x09125",
  "anastasia.net"
);

const user3 = new Users(
  3,
  "Clementine Bauch",
  "Samantha",
  "Nathan@yesenia.net",
  "1-463-123-4447",
  "ramiro.info"
);

// class Users {
//   constructor(id, name, username, email, phone, website) {
//     this.id = id;
//     this.name = name;
//     this.username = username;
//     this.email = email;
//     this.phone = phone;
//     this.website = website;
//   }

//   getId() {
//     console.log("This is your ID", this.id);
//     // console.log(`This is your ID ${this.id}`); // grawis
//     // console.log("This is your ID" + this.id); // konkatencja stringów
//   }
//   getName() {
//     console.log("And that is your Name");
//   }
// }

// const user1 = new Users(
//   3,
//   "Clementine Bauch",
//   "Samantha",
//   "Nathan@yesenia.net",
//   "ramiro.info"
// );

// user1.getId();

// const user2 = new Users(
//   2,
//   "Ervin Howell",
//   "Antonette",
//   "Shanna@melissa.tv",
//   "010-692-6593 x09125",
//   "anastasia.net"
// );

// https://www.empik.com/czysty-kod-podrecznik-dobrego-programisty-robert-c-martin,p1100571160,ksiazka-p?cq_src=google_ads&cq_cmp=14064729746&cq_term=&cq_plac=&cq_net=u&cq_plt=gp&gclid=CjwKCAjwsJ6TBhAIEiwAfl4TWPkNVus-nMWzkM2fXuSPo1zXBQmXZmEgkyfr8qeE_Do_z900HiEPGBoCxQsQAvD_BwE&gclsrc=aw.ds

// https://botland.com.pl/ksiazki-dla-programistow/20850-mistrz-czystego-kodu-kodeks-postepowania-profesjonalnych-programistow-robert-c-martin-9788328382961.html?cd=1564049911&ad=58987843373&kd=&gclid=CjwKCAjwsJ6TBhAIEiwAfl4TWCAqNMdrOJgLAZ37ehVt-xjmiqowXmZWXFCFxSHTmpIWy0WR7O5cPhoCBHEQAvD_BwE

// 2. Pobierz po 1 typie danych z API i utwórz na ich podstawie obiekty konkretnych klas.
// 2.1 Spróbuj wykorzystać do tego celu funkcję (DRY - Don't repeat yourself)

// https://jsonplaceholder.typicode.com/photos/1
// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/users/1

// fetch -> Promise -> Response Object -> .json()
let photos4;

const createNewPhotoObject = (photoData) => {
  const { albumId, id, title, url } = photoData;
  photos4 = new Photos(albumId, id, title, url);
  console.log(photos4);
};

// console.log(createNewPhotoObject);

const getData = async (path, id = "", onSuccessCallback, onErrorCallback) => {
  // fetch(`${path}/${id}`)
  //   .then((resolve) => resolve.json())
  //   .then((response) => {
  //     // console.log('pobrano prawidlowo!')
  //     if (onSuccessCallback) {
  //       // console.log(onSuccessCallback);
  //       onSuccessCallback(response);
  //     }
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
  const data = await fetch(`${path}/${id}`);
  const response = await data.json();
  return response;
};

// getData("https://jsonplaceholder.typicode.com/photos", 5);

const getApiData = async () => {
  try {
    const data = await getData(
      "https://jsonplaceholder.typicode.com/photos/",
      5,
      createNewPhotoObject
    );
    console.log(data);
    photos4 = data;
  } catch (err) {
    console.error(err);
  } finally {
  }
};

// getApiData();

// :, ;, -, ~, ), D
// [';]', ':[', ';*', ':$', ';-D'] => 1 emotka prawidłowa

// Napisz funkcję, która dla tablicy emotek policzy, ile z nich jest "akceptowalnych"

// funkcjaDoLiczeniaEmotek([';]', ':[', ';*', ':$', ';-D']) // return 1

// .forEach => nie mamy break ani continue, przechodzi przez wszystkie element tablicy (dziala jak for)
const emojiCounter = (arr) => {
  let counter = 0;
  const validEmoji = [
    ";)",
    ":)",
    ";-)",
    ":-)",
    ";~)",
    ":~)",
    ";D",
    ":D",
    ";-D",
    ":-D",
    ";~D",
    ":~D",
  ];
  arr.forEach((item) => {
    if (validEmoji.includes(item)) {
      counter++;
    }
  });
  return counter;
};

// console.log(emojiCounter([";]", ":[", ";*", ":$", ";-D", ";-D", ";-C"]));

// 4. Mamy dwie tablice a, b
// Musimy napisać funkcję, która przyjmie dwie tablice jako argumenty i sprawdzi czy są "takie same".
// Takie same oznacza, ze elementy tablicy b (niezaleznie od polozenia) sa kwadratami elementów z tablicy a

/**
  a = [121, 144, 19, 161, 19, 144, 19, 11]
  b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
*/

/**
 * musimy miec pewnosc, ze:
 * - dlugosci tablic sa takie same
 * - tablice nie sa puste
 * - wykorzystamy np. sort/Math.pow, sort/Math.sqrt
 * - wykorzystamy np. map na tablicy a i zamiana na string i porownanie z tablica b zamieniona na string
 */

const compareArrays = (a, b) => {
  if (!a.length || !b.length || a.length !== b.length) {
    return false;
  }

  let arr1 = a.sort((a, b) => a - b);
  let arr2 = b.sort((a, b) => a - b);
  let arr3 = arr1.map((n) => n * n);
  let i = 0;

  let areArraysEqual = true;
  for (let number of arr2) {
    if (number !== Math.pow(arr3[i], 2)) {
      // console.log(number, arr3[i]);
      areArraysEqual = false;
    }
    i++;
  }
  return areArraysEqual;
};

const a = [121, 144, 19, 161, 19, 144, 19, 11];
const b = [121, 14641, 20736, 361, 25921, 361, 20736, 361];
// console.log(compareArrays(a, b));

// 5. Autobus jezdzi po miescie
// Pasazerowie wsiadaja i wysiadaja, na wejsciu mamy tablice zlozona z tablic 2 elementowych
// indeks 0 to pasazerowie ktorzy wsiadaja, indeks 1 to pasazerowie ktorzy wysiadaja

// [[10,0],[3,5],[5,8]] => 5 pasazerow

const countPass = (arr) => {
  let passIn = 0;
  let passOut = 0;
  arr.forEach((zagniezdzonaTablica) => {
    passIn = passIn + zagniezdzonaTablica[0];
    passOut = passOut + zagniezdzonaTablica[1];
  });
  console.log(passIn - passOut);
};

countPass([
  [10, 0],
  [3, 5],
  [5, 8],
]);

// const compareArrays = (a, b) => {}

// [[10,0],[3,5],[5,8]].forEach((el) => {
// 1 przebieg: el === [10, 0], passIn = 0
// 2 przebieg: el === [3, 5], passIn = 10
// 3 przebieg: el === [5, 8], passIn = 13
// })
