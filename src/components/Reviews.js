import { badgeColor, movieRating, truncate } from "../helpers/helpers";

const Reviews = (movieReviews) => {
  let reviewsElement = '';
  if(movieReviews.length > 0 ) {
    const reviews = movieReviews.slice(0,2).map(review => review);
    reviewsElement = reviews.map(review => {
      const { id, author, author_details: { avatar_path, rating }, content } = review;
      let voteRating;
      if(rating !== null ) {
        voteRating = `<span>  -  ${movieRating(rating)}</span>`
      } else {
        voteRating = '';
      }
      let authorImage = avatar_path?.substring(1);
      return `<article class="review" key=${id}>
        <div class="review-header">
          <figure class="review-avatar">
          <img src=${authorImage} alt=${author} />
          </figure>
          <div class="review-author">${author}</div>
          ${voteRating}
        </div>
        <div class="review-content">
          <blockquote>${truncate(content, 280)}</blockquote>
        </div>
      </article>`;
    }).join('');
  } else {
    reviewsElement = '<div>No reviews found!</div>';
  }
  return reviewsElement;
}

export default Reviews;