import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import Button from "../UI/Button";

function Hero() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch("https://www.omdbapi.com/?apikey=fcf50ae6&i=tt2975590");
      const data = await response.json();
      setMovie(data);
    }

    fetchMovie(); 
  }, []); 
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h2 className={styles.heroTitle}>{movie.Title }</h2>
        <h2 className={styles.heroGenre}>Genre : {movie.Genre }</h2>
        <p className={styles.heroSubtitle}>
         {movie.Plot}
        </p>
        <Button className={styles.heroButton}>Tonton Sekarang</Button>
      </div>
      <div className={styles.heroImage}>
        <img
          src={movie.Poster}
          alt="Poster Film Unggulan"
        />
      </div>
    </section>
  );
}

export default Hero;
