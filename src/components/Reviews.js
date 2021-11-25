import { badgeColor, movieRating, truncate } from "../helpers/helpers";

const Reviews = (movieReviews) => {
  let reviewsElement = "";
  let voteRating;
  if (movieReviews.length > 0) {
    const reviews = movieReviews.slice(0, 2).map((review) => review);
    reviewsElement = reviews
      .map((review) => {
        const {
          id,
          author,
          author_details: { avatar_path, rating },
          content,
        } = review;

        if (rating !== null) {
          voteRating = `<span class="${badgeColor(rating)}">${movieRating(
            rating
          )}</span>`;
        } else {
          voteRating = "";
        }

        return `<article class="review" key=${id}>
        <div class="review-wrapper">
        ${voteRating}
          <div class="review-content">
            <h4 class="review-author">${author}</h4>
            <blockquote>${truncate(content, 280)}</blockquote>
          </div>
        </div>
      </article>`;
      })
      .join("");
  } else {
    reviewsElement = "<div>No reviews found!</div>";
  }
  return reviewsElement;
};

export default Reviews;
