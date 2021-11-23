import { img_path, inTheaters, genresUrl } from './api.js';
import { truncate, getYear, movieRating } from './helpers.js';

const results = document.querySelector('.results');
const loader = document.querySelector('.loader');
let page = 1;

let genresList = [];

const getMovies = async (url) => {
  const response = await fetch(url + '&page=' + page);
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

const showInTheaters = async () => {
  const movies = await getMovies(inTheaters);
  console.log(movies);

  movies.forEach((movie, index) => {
    const {
      title,
      poster_path,
      overview,
      vote_average,
      release_date,
      genre_ids,
    } = movie;

    const movieElement = document.createElement('article');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `<figure class="movie-poster">
      <img src="${img_path + poster_path}" alt="${title}" />
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
            <div class="movie-rating">${vote_average}</div>
            <div class="movie-genres">${genre_ids.map((id) =>
              getGenreName(id)
            )}</div>
        </div>`;

    results.appendChild(movieElement);
  });
};

const showLoading = () => {
  loader.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      console.log(page);
      showInTheaters();
    }, 1000);
  }, 500);
};
getGenres(genresUrl);
showInTheaters();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    console.log(scrollTop + ',' + clientHeight + ',' + scrollHeight);
    showLoading();
    console.log('reload');
  }
});
