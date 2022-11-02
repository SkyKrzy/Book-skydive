jQuery(document).ready(() => {
  const xhr = new XMLHttpRequest();
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

  const IMG_URL = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  // najpierw otwieramy polaczenie - konfigurujemy endpoint, metode i sposob (sync/async)

  xhr.open("GET", API_URL, true);

  // error
  // load

  // progress

  xhr.addEventListener("error", (e) => {
    console.error("Request failed. Details: ", e);
  });

  // ustawiamy oczekiwany typ odpowiedzi
  xhr.responseType = "json";

  xhr.addEventListener("load", () => {
    // console.log(xhr.statusText);
    if (xhr.status === 200) {
      // console.log(JSON.parse(xhr.response));
      const { results } = xhr.response;

      for (const movie of results) {
        const { title, vote_average, overview, poster_path } = movie;
        $("#main").append(
          createMovieTile(poster_path, title, vote_average, overview)
        );
      }

      // document.getElementById('main');
      // const p = document.createElement("p");
      // p.innerText = "lorem ipsum";

      // append, prepend, after, before
      // remove()
      // $("#main").before(p);
    }
  });

  xhr.send(null);

  const getRatingClassName = (ratingAvg) => {
    if (ratingAvg >= 8) {
      return "green";
    } else if (ratingAvg >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };

  const createMovieTile = (poster_path, title, vote_average, overview) => {
    const container = $('<div class="movie"></div>');
    container.append(
      poster_path
        ? `<img src="${IMG_URL}${poster_path}" alt="${title}" />`
        : "<div class='fakeimg'>poster not found</div>"
    );
    container.append(`
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getRatingClassName(vote_average)}">${vote_average}</span>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    </div>`);
    $(container).click(function () {
      $(this).children().find(".overview").toggleClass("active");
    });
    $(container).dblclick(() => {
      $(container).remove();
    });
    return container;
  };

  // fetch("url").then(data => data.json()).then(data => {
  //   // data jest juz przetworzona i gotowa do wykorzystania w DOM
  // }).catch()

  $("#form").submit((e) => {
    e.preventDefault();
    // wysylamy xhr request z wartoscia z formularza na odpowiedni adres API
    // zmieniamy zawartosc DOM na response z formularza
    const xhr = new XMLHttpRequest();
    const searchValue = $(".search").val();

    xhr.open("GET", `${SEARCH_API}${searchValue}`, true);
    xhr.responseType = "json";

    xhr.addEventListener("error", () => {
      console.error("Request failed");
    });

    xhr.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log(progress);
      } else {
        console.log("Progress nie jest mozliwy do wyliczenia");
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        // console.log(JSON.parse(xhr.response));
        const { results } = xhr.response;

        $("#main").empty();
        for (const movie of results) {
          const { title, vote_average, overview, poster_path } = movie;
          $("#main").append(
            createMovieTile(poster_path, title, vote_average, overview)
          );
        }
      }
    });

    xhr.send(null);
  });
});
