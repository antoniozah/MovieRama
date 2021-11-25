import { img_path } from "../api";
const SimilarMovie = (similar) => {
  let similarElement = "";
  const { id, title, poster_path } = similar;

  similarElement = `<article class="similar" key=${id} data-item>
    <div class="similar-header">
      <figure class="similar-image">
        <img src=${img_path + poster_path} alt=${title}/>
      </figure>
      <h4 class="similar-title">${title}</h4>
    </div>
  </article>`;

  return similarElement;
};

export default SimilarMovie;
