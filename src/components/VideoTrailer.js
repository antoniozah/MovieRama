const VideoTrailer = (trailer) =>  {
  const { key, name, site} = trailer[0];
  let trailerElement = '';
  if( site == "YouTube" && key !== null) {
    trailerElement = `<div class="trailer">
    <h3>Video Trailer</h3>
    <div class="trailer-wrapper">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title=${name} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>`;
  } else {
    trailerElement = '<div>No videos found!!!!</div>';
  }
  return trailerElement;
}

export default VideoTrailer;