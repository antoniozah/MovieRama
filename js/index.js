import { img_path, inTheaters, genresUrl } from './api.js';
import { truncate, getYear, movieRating } from './helpers.js';

const results = document.querySelector('.results');

let genresList = [];

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    showInTheaters(data.results);
};

const getGenres = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.genres);
    genresList = data.genres;
    console.log(genresList);
};

const showInTheaters = (movies) => {
    results.innerHTML = '';

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

        movieElement.innerHTML = `<img src="${
            img_path + poster_path
        }" alt="${title}" />
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
            <div class="movie-genres">${genre_ids}</div>
        </div>`;

        results.appendChild(movieElement);
    });
};
getGenres(genresUrl);
getMovies(inTheaters);
