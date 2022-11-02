/**
 * DRY
 * Refactoring kodu to normalna rzecz
 * Jesli funkcje - to pure
 * Rzeczy typu API_URL, KEY, etc zapisujcie w constach
 * Wydzielajcie jak najwiecej rzeczy wspolnych do funkcji
 */

const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${"3fd2be6f0c70a2a598f084ddfb75487c"}&page=1`;

const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${"3fd2be6f0c70a2a598f084ddfb75487c"}&query=`;

const domElements = {
  container: document.querySelector(".container"),
  searchInput: document.getElementById("movieSearchInput"),
  searchForm: document.querySelector("form"),
  loaderContainer: document.querySelector(".loaderContainer"),
};

const appData = {
  total_pages: 0,
  currentPage: 1,
  isLoading: false,
};

const moviesData = [];

// pobieranie danych z API
const fetchData = async (url, onSuccessCallback, onErrorCallback) => {
  try {
    appData.isLoading = true;
    toggleSpinner();
    const request = await fetch(url);
    const data = await request.json();
    onSuccessCallback(data);
  } catch (err) {
    onErrorCallback(err);
  } finally {
    appData.isLoading = false;
    toggleSpinner();
  }
};

const onFetchDataSuccessCallback = (apiResponse) => {
  const { results, total_pages } = apiResponse;
  const { currentPage } = appData;
  appData.total_pages = total_pages;
  moviesData[currentPage - 1] = [...results];

  domElements.container.innerHTML = "";
  moviesData[currentPage - 1].forEach((movieDetails) => {
    const { overview, poster_path, title, vote_average, id } = movieDetails;
    const movieTile = createMovieTile(
      overview,
      poster_path,
      title,
      vote_average,
      id
    );
    addContentToDom(movieTile, domElements.container);
  });
};

const onFetchDataErrorCallback = (errorData) => {
  createErrorMessage(errorData);
  throw Error(errorData);
};

const timeotAction = (action) =>
  setTimeout(() => {
    action();
  }, time);

// pobieranie klasy do ratingu
const getRatingClass = (rating) => {
  if (rating >= 8) return "green";
  if (rating >= 5 && rating < 8) return "orange";
  return "red";
};

const getMoviePosterTag = (posterPath, title) => {
  return posterPath
    ? `<img src="${IMG_URL}${posterPath}" alt="${title}" />`
    : '<div class="emptyImage"><p>no poster available</p></div>';
};

// obsluga bledow api w DOM - tworzymy element
const createErrorMessage = (errorMessage) => {
  domElements.container.innerHTML = `
     <div class="emptyStateContainer">
       <p class="errorMessage">${errorMessage}</p>
     </div>
   `;
};

const isMovieInFavArray = (movieId) => {
  const favMoviesArray = JSON.parse(
    getElementFromLocalstorage("favouriteMovies")
  );

  if (favMoviesArray.length && favMoviesArray.includes(`${movieId}`)) {
    return `<div class="heartContainer"></div>`;
  }
  return "";
};

// tworzenie elementu na bazie danych z API
const createMovieTile = (
  overview,
  poster_path,
  title,
  vote_average,
  movieId
) => {
  const movieTile = document.createElement("div");
  movieTile.classList.add("movie");
  movieTile.dataset.id = movieId;
  movieTile.innerHTML = `
     ${isMovieInFavArray(movieId)}
     ${getMoviePosterTag(poster_path, title)}
     <div class="movie-info">
       <h3>${title}</h3>
       <span class="${getRatingClass(vote_average)}">${vote_average}</span>
       <div class="overview">
         <h3>Overview</h3>
         ${overview}
       </div>
     </div>
   `;
  movieTile.addEventListener("click", () => {
    movieTile.querySelector(".overview").classList.toggle("active");
  });
  return movieTile;
};

domElements.container.addEventListener("dblclick", (e) => {
  const clickedElementContainer = e.target.closest(".movie");

  const movieId = e.target.closest(".movie").dataset.id;
  const favMoviesArray = JSON.parse(
    getElementFromLocalstorage("favouriteMovies")
  );
  let newFavMoviesArray = [];

  if (favMoviesArray) {
    const isMovieInArray =
      favMoviesArray.filter(
        (idFromLocalStorage) => idFromLocalStorage === movieId
      ).length === 1;

    if (isMovieInArray) {
      const heart = clickedElementContainer.querySelector(".heartContainer");
      heart.remove();
      newFavMoviesArray = [
        ...favMoviesArray.filter(
          (idFromLocalStorage) => idFromLocalStorage !== movieId
        ),
      ];
    } else {
      newFavMoviesArray = [...favMoviesArray, movieId];
      const heart = document.createElement("div");
      heart.classList.add("heartContainer");
      clickedElementContainer.prepend(heart);
    }

    setElementInLocalstorage(
      "favouriteMovies",
      JSON.stringify(newFavMoviesArray)
    );

    return;
  }

  setElementInLocalstorage("favouriteMovies", JSON.stringify([movieId]));

  // jezeli nie ma tablicy - ustawiamy ja z nowa wartoscia
});

domElements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  onSearchEventHandler(event.target[0].value);
});

// pokaz spinner
const toggleSpinner = () => {
  if (appData.isLoading) {
    domElements.loaderContainer.style.visibility = "visible";
  } else {
    setTimeout(() => {
      domElements.loaderContainer.style.visibility = "";
    }, 1000);
  }
};

// obslugujemy szukanie
const onSearchEventHandler = (searchValue) => {
  if (searchValue === "") {
    fetchData(API_URL, onFetchDataSuccessCallback, onFetchDataErrorCallback);
    return;
  }
  fetchData(
    `${SEARCH_API}${searchValue}`,
    onFetchDataSuccessCallback,
    onFetchDataErrorCallback
  );
};

// dodajemy elementy do DOM
const addContentToDom = (childElement, parentElement) => {
  parentElement.appendChild(childElement);
};

const setElementInLocalstorage = (key, value) => {
  if (!window.localStorage) {
    throw Error("Localstorage nie jest wspierane");
  } else {
    localStorage.setItem(key, value);
  }
};
const getElementFromLocalstorage = (key) => {
  if (!window.localStorage) {
    throw Error("Localstorage nie jest wspierane");
  } else {
    return localStorage.getItem(key);
  }
};

const onPageChange = () => {};
const onMovieLike = () => {};

fetchData(API_URL, onFetchDataSuccessCallback, onFetchDataErrorCallback);

/**
 * I saw the devil
 * Bitter sweat life
 * Oldboy
 * Spider man
 * Dr Strange
 * Tajemnice Dumbledora
 */

/**
 * paginationGenerator = (currentPage, maxPage) => {
 * [currentPage .active]
 * [currentPage + 1]
 * [currentPage + 2]
 * [currentPage + 3]
 * [currentPage + 4]
 * [currentPage + 5]
 * ...
 * [maxPage]
 * }
 *
 * + animacja na double click
 */
