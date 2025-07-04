import MoviePage from "./MoviePage";

function NowPlaying() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

  return (
    <MoviePage
      title="Now Playing Movies"
      subtitle="Daftar film yang sedang tayang di bioskop saat ini."
      url={URL}
    />
  );
}

export default NowPlaying;