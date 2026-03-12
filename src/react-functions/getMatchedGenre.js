

function getMatchedGenre(myData, genresData, randomIndex) {
  if (!myData || randomIndex===undefined || !genresData) return;

  const randomMovieIds = myData.results[randomIndex].genre_ids; // this is an array from "data" -> [28, 53]

  return genresData.genres.filter((genre) => {
    const match = randomMovieIds.includes(genre.id);
    return match;
  });
}

export default getMatchedGenre;
