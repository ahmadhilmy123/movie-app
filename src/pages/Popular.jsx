import MoviePage from "./MoviePage";

function Popular() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  return (
    <MoviePage
      title="Popular Movies"
      subtitle="Daftar film populer yang banyak ditonton."
      url={URL}
    />
  );
}

export default Popular;
