import MoviePage from "./MoviePage";

function TopRated() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;

  return (
    <MoviePage
      title="Top Rated Movies"
      subtitle="Daftar film dengan rating tertinggi."
      url={URL}
    />
  );
}

export default TopRated;