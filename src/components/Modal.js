import { badgeColor, movieRating } from "../helpers/helpers";
import VideoTrailer from "./VideoTrailer";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";

const Modal = (params) => {
  const {
    vote_average,
    img_path,
    backdrop_path,
    title,
    overview,
    trailer,
    movieReviews,
    movieSimilars,
    visible,
  } = params;

  const modalHeaderImage = () => {
    if(backdrop_path !== null) {
      return `<figure className="modal-image">
        <img src=${img_path + backdrop_path} alt=${title} />
      </figure>`;
    } else {
      return `<div style="font-size: 20px; font-style: italic;">NO IMAGE TO SHOW!</div>`;
    }
  }

  return `<div class="modal-wrapper">
  <div class="close-button" data-close-button>
    <span></span>
    <span></span>
  </div>
  <div class="modal-content">
    ${modalHeaderImage()}
    <div class="modal-info">
      <div class="modal-header">
        <span class="${badgeColor(vote_average)}">${movieRating(
    vote_average
  )}</span>
        <div>
          <h2 class="modal-title">${title}</h2>
          <p class="modal-overview">${overview}</p>
        </div>
      </div>
      <div class="trailer">
        <h3>Video Trailer</h3>
        ${VideoTrailer(trailer)}
      </div>
      <div class="reviews">
        <h3>Reviews</h3>
        <div class="reviews-wrapper">
          ${Reviews(movieReviews)}
        </div>
      </div>
      <div class="similars">
          <h3>Similar Movies</h3>
          ${SimilarMovies(movieSimilars, visible)}
      </div>
    </div>
  </div>
</div>`;
};

export default Modal;
