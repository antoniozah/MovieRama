import { img_path } from "../api";
import { movieRating, getYear, truncate, badgeColor } from "../helpers/helpers";
const Movie = (movie, getGenreName, movieElement) => {
  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    genre_ids,
  } = movie;

  let poster_image = null;
  if (poster_path) {
    poster_image = `<img src="${img_path + poster_path}" alt="${title}" />`;
  }
  movieElement.innerHTML = `<figure class="movie-poster ${
    !poster_path ? "no-image" : ""
  }">
    ${poster_path ? poster_image : "<div>No image</div>"}
  </figure>
      <div class="movie-info">
          <span class="movie-release_year">
              ${getYear(release_date)}
          </span>
          <h3 class="movie-title">${title}</h3>
          <p class="movie-overview">${truncate(overview, 100)}</p>
          <div class="movie-details">
              <span class="movie-rating ${badgeColor(
                vote_average
              )}">${movieRating(vote_average)}</span>
              <p class="movie-genres">${genre_ids.map((id) =>
                getGenreName(id)
              )}</p>
          </div>
      </div>`;

  return movieElement;
};

export default Movie;
