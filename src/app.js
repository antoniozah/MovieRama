import { img_path, inTheaters, genresUrl, searchUrl } from "./api.js";
import { truncate, getYear, movieRating } from "./helpers/helpers.js";
// import "../css/style.css";

const search = document.querySelector(".search");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");

let page = 1;
let searchIsActive = false;
let query = null;
let genresList = [];
let typingTimer;
let typeInterval = 500;

const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.results);
  return data.results;
};

const getGenres = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.genres);
  genresList = data.genres;
  console.log(genresList);
};

const getGenreName = (id) => {
  const genre = genresList.filter((g) => g.id == id);
  return genre[0]?.name;
};

const handleSearch = (e) => {
  results.innerHTML = "";
  query = search.value;
  if (query) {
    searchIsActive = true;
    showMovies(searchUrl, 1, query);
  } else {
    searchIsActive = false;
    showMovies(inTheaters, 1, null);
  }
  console.log(query, "Fetched....", results.innerHTML);
};

search.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(handleSearch, typeInterval);
});

const showMovies = async (url, page, query) => {
  const chunk = `${url}&query=${query}&page=${page}`;
  const movies = await getMovies(chunk);

  console.log(movies);

  movies.forEach((movie, index) => {
    const {
      title,
      poster_path,
      backdrop_path,
      overview,
      vote_average,
      release_date,
      genre_ids,
    } = movie;

    const movieElement = document.createElement("article");
    movieElement.classList.add("movie");
    let poster_image = null;
    if (poster_path) {
      poster_image = `<img src="${img_path + poster_path}" alt="${title}" />`;
    }
    movieElement.innerHTML = `<figure class="movie-poster ${
      !poster_path ? "no-image" : ""
    }">
      ${poster_path ? poster_image : '<div class="no-image">No image</div>'}
    </figure>
        <div class="movie-info">
            <span class="movie-release_year">
                ${getYear(release_date)}
            </span>
            <h3 class="movie-title">${title}</h3>
        </div>
        <div class="movie-overview">
            ${truncate(overview, 100)}
        </div>
        <div class="movie-details">
            <div class="movie-rating">${movieRating(vote_average)}</div>
            <div class="movie-genres">${genre_ids.map((id) =>
              getGenreName(id)
            )}</div>
        </div>`;

    results.appendChild(movieElement);
  });
};

const showLoading = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      console.log(page);
      searchIsActive
        ? showMovies(searchUrl, page, query)
        : showMovies(inTheaters, page, query);
    }, 500);
  }, 1000);
};
getGenres(genresUrl);

window.addEventListener("load", (event) => {
  showMovies(inTheaters, 1, null);
});

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log(scrollTop + "," + clientHeight + "," + scrollHeight);
    showLoading();
    console.log("reload");
  }
});
