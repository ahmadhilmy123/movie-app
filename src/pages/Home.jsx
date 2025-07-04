import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import Movies from "../components/Movies/Movies";
import Heading from '../components/UI/Typography/Heading';
import Paragraph from '../components/UI/Typography/Paragraph';

import {
  Box,
  Heading as ChakraHeading,
  Button as ChakraButton,
} from '@chakra-ui/react';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const response = await axios.get(URL);
      setMovies(response.data.results);
      // console.log(response.data.results);
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero />

        {/* Komponen lokal */}

        {/* Tombol dari Chakra UI */}
        <Box my={4}>
          <ChakraButton size="sm" colorScheme="blue" mr={2}>SM</ChakraButton>
          <ChakraButton size="md" colorScheme="green" mr={2}>MD</ChakraButton>
          <ChakraButton size="lg" colorScheme="teal">LG</ChakraButton>
        </Box>

        <Movies movies={movies} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
