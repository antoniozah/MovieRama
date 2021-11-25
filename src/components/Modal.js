import VideoTrailer from './VideoTrailer';
import { badgeColor, movieRating } from '../helpers/helpers';
import Reviews from './Reviews';

const Modal = (params) => {
  const { vote_average, img_path, backdrop_path, title, overview, trailer, movieReviews} = params;
  console.log(movieReviews);
  return `<div class="modal-wrapper">
  <div class="close-button" data-close-button>
    <span></span>
    <span></span>
  </div>
  <div class="modal-content">
    <figure className="modal-image">
      <img src=${img_path + backdrop_path} alt=${title} />
    </figure>
    <div class="modal-info">
      <div class="modal-header">
        <span class="${badgeColor(vote_average)}">${movieRating(vote_average)}</span>
        <h2 class="modal-title">${title}</h2>
      </div>
      <p class="modal-overview">${overview}</p>
      ${VideoTrailer(trailer)}
      <div class="reviews">
        <h3>Reviews</h3>
        <div class="reviews-wrapper">
          ${Reviews(movieReviews)}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

export default Modal;