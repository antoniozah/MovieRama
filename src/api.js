const api_key = "1bd984d26ed61f8d35a34c7635a24751";
const api_url = "https://api.themoviedb.org/3";
const img_path = "https://image.tmdb.org/t/p/w1280";
const genresUrl = `${api_url}/genre/movie/list?api_key=${api_key}`;
const inTheaters = `${api_url}/movie/now_playing?api_key=${api_key}`;
const searchUrl = `${api_url}/search/movie?api_key=${api_key}`;

export { img_path, inTheaters, genresUrl, searchUrl };
