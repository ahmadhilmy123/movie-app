import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Heading from '../../components/UI/Typography/Heading';
import Paragraph from '../../components/UI/Typography/Paragraph';
import Movies from '../../components/Movies/Movies';

function MoviePage({ title, subtitle, url }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(url);
      setMovies(response.data.results);
    }

    fetchMovies();
  }, [url]);

  return (
    <>
      <Navbar />
      <Heading level={2}>{title}</Heading>
      <Paragraph>
        {subtitle}
      </Paragraph>
      <Movies movies={movies} />
      <Footer />
    </>
  );
}

export default MoviePage;