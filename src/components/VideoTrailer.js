const VideoTrailer = (trailer) => {
  let trailerElement = "";
  if (trailer.length > 0) {
    const { key, name, site } = trailer[0];
    if (site == "YouTube" && key !== null) {
      trailerElement = `<div class="trailer-wrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title=${name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>`;
    } else {
      trailerElement = "<div>No videos found!!!!</div>";
    }
  } else {
    trailerElement = "<div>No videos found!!!!</div>";
  }

  return trailerElement;
};

export default VideoTrailer;
