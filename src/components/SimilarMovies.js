import SimilarMovie from "./SimilarMovie";

const SimilarMovies = (movieSimilars, visible) => {
  const similars = movieSimilars;
  let similarsElement = "";
  if (similars.length > 0) {
    similarsElement = `<div class="similars-wrapper" data-list>
    ${similars
      .map((similar) => {
        return SimilarMovie(similar);
      })
      .join("")}
      
    </div>
    <span class="seeMore" data-show-more>Show more</span>`;
  } else {
    similarsElement = "<div>No Similar Movies found</div>";
  }

  return similarsElement;
};

export default SimilarMovies;
