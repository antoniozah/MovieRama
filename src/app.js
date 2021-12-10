import {
  api_url,
  img_path,
  inTheaters,
  genresUrl,
  searchUrl,
  api_key,
} from "./api.js";
import Modal from "./components/Modal.js";
import Movie from "./components/Movie.js";
import {
  fixBodyOpened,
  fixBodyHidden,
  loadSimilar,
} from "./helpers/helpers.js";
require("../public/style.css");

const body = document.body;
const search = document.querySelector(".search");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");
const overlay = document.querySelector(".overlay");
const overlayContent = document.querySelector(".overlay-content");
const loaderRing = document.querySelector(".loader-ring");

let page = 1;
let searchIsActive = false;
let query = null;
let genresList = [];
let typingTimer;
let typeInterval = 500;
let visible = 4;

const getMovies = async (url, id) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

const getGenres = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  genresList = data.genres;
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
};

search.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(handleSearch, typeInterval);
});

const showMovies = async (url, page, query) => {
  const chunk = `${url}&query=${query}&page=${page}`;
  const movies = await getMovies(chunk, null, null);

  movies.forEach((movie) => {
    const movieElement = document.createElement("article");
    movieElement.classList.add("movie");
    movieElement.setAttribute("id", movie.id);
    Movie(movie, getGenreName, movieElement);

    results.appendChild(movieElement);

    movieElement.addEventListener("click", () => {
      const movieId = movieElement.getAttribute("id");
      overlay.classList.add("show");
      fixBodyOpened(body);
      modalShow(movie);
      loaderRing.classList.add("active");
    });
  });
};

const modalClose = () => {
  overlay.classList.remove("show");
  fixBodyHidden(body);
  overlayContent.innerHTML = "";
};

const modalShow = async (movie) => {
  const { id, title, backdrop_path, overview, vote_average } = movie;
  const trailerUrl = `${api_url}/movie/${id}/videos?api_key=${api_key}`;
  const reviewsUrl = `${api_url}/movie/${id}/reviews?api_key=${api_key}`;
  const similarUrl = `${api_url}/movie/${id}/similar?api_key=${api_key}`;
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const movieVideos = await getMovies(trailerUrl);
  const movieReviews = await getMovies(reviewsUrl);
  const movieSimilars = await getMovies(similarUrl);
  // console.log(movieVideos, 'videooos');
  let trailer = "";
  let reviews = "";
  const similarMoviesNumber = movieSimilars.length;
  if (movieVideos.length > 0) {
    trailer = movieVideos.filter((video) =>
      video.name.toLowerCase().includes("trailer")
    );
  }

  const params = {
    title,
    vote_average,
    trailer,
    img_path,
    backdrop_path,
    overview,
    movieReviews,
    movieSimilars,
    visible,
  };
  setTimeout(() => {
    modal.innerHTML = Modal(params);
    loaderRing.classList.remove("active");
    overlayContent.appendChild(modal);
    const closeButton = document.querySelector("[data-close-button]");
    closeButton.addEventListener("click", modalClose);
    loadSimilar(visible, similarMoviesNumber);
  }, 500);
};

const showLoading = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");

    setTimeout(() => {
      page++;
      // console.log(page);
      searchIsActive
        ? showMovies(searchUrl, page, query)
        : showMovies(inTheaters, page, query);
    }, 500);
  }, 1000);
};

window.addEventListener("load", (event) => {
  getGenres(genresUrl);
  showMovies(inTheaters, 1, null);
});

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + innerHeight >= scrollHeight) {
    showLoading();
  }
});
