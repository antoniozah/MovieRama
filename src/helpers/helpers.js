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
  // body.style.position = "fixed";
  // body.style.top = `-${window.scrollY}px`;
};

const badgeColor = (rating) => {
  if(rating >= 8 ) {
    return 'green';
  } else if (rating >= 5 ) {
    return 'orange';
  } else {
    return 'red';
  }
}

const fixBodyHidden = (body) => {
  body.classList.remove("opened");
  // const scrollY = body.style.top;
  // body.style.position = "";
  // body.style.top = "";
  // window.scrollTo(0, parseInt(scrollY || "0") * -1);
};

export { truncate, getYear, movieRating, fixBodyOpened, fixBodyHidden, badgeColor };
