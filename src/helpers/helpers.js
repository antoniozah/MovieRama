const truncate = (string, length) => {
  return string.substring(0, length) + "...";
};

const getYear = (date) => {
  return date.split("-")[0];
};

const movieRating = (rating) => {
  return rating + "/10";
};

const fixBodyOpened = (body) => {
  body.classList.add("opened");
};

const badgeColor = (rating) => {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};

const fixBodyHidden = (body) => {
  body.classList.remove("opened");
};

const loadSimilar = (visible, similarNumber) => {
  const seeMore = document.querySelector("[data-show-more");
  const similarsList = document.querySelectorAll(
    ".similars-wrapper > .similar"
  );

  Array.from(similarsList)
    .slice(0, 4)
    .forEach((similar, index) => {
      similar.classList.add("show");
    });

  if (typeof seeMore !== undefined && seeMore !== null) {
    seeMore.addEventListener("click", () => {
      similarsList.forEach((item, index) => {
        if (index > 3) {
          if (!item.classList.contains("show")) {
            item.cla;
            item.classList.add("show");
            seeMore.textContent = "Show less";
          } else {
            item.classList.remove("show");
            seeMore.textContent = "Show more";
          }
        }
      });
    });
  }
};

export {
  truncate,
  getYear,
  movieRating,
  fixBodyOpened,
  fixBodyHidden,
  badgeColor,
  loadSimilar,
};
