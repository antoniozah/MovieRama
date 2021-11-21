const truncate = (string, length) => {
    return string.substring(0, length) + '...';
};

const getYear = (date) => {
    return date.split('-')[0];
};

const movieRating = (rating) => {
    return rating + '/10';
};

export { truncate, getYear, movieRating };
