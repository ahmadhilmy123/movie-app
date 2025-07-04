import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Styled components
const MovieCard = styled.div`
  width: 220px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 2/3;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    rgba(255, 255, 255, 0.5) 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${MovieCard}:hover & {
    transform: scale(1.05);
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    rgba(255, 255, 255, 0.5) 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
  font-size: 0.875rem;
`;

const MovieInfo = styled.div`
  padding: 1.25rem 1rem;
  background: white;
`;

const MovieTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8rem;
`;

const MovieYear = styled.p`
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ErrorImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  text-align: center;
  padding: 1rem;
`;

/**
 * Enhanced Movie Card Component
 * Features: Loading states, error handling, hover effects, rating display
 */
const Movie = ({ movie }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getImageUrl = (posterPath) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w400/${posterPath}`;
  };

  const getMovieYear = (releaseDate) => {
    if (!releaseDate) return "TBA";
    return new Date(releaseDate).getFullYear();
  };

  const formatRating = (rating) => {
    if (!rating) return null;
    return Math.round(rating * 10) / 10;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleCardClick = () => {
    console.log(`Clicked on movie: ${movie.title}`);
  };

  const imageUrl = getImageUrl(movie.poster_path);
  const movieYear = getMovieYear(movie.release_date);
  const rating = formatRating(movie.vote_average);

  return (
    <MovieCard onClick={handleCardClick} role="button" tabIndex={0}>
      <ImageContainer>
        {imageLoading && (
          <LoadingPlaceholder>
            🎬 Loading...
          </LoadingPlaceholder>
        )}
        
        {imageError || !imageUrl ? (
          <ErrorImage>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎭</div>
            <div>No Image</div>
            <div>Available</div>
          </ErrorImage>
        ) : (
          <MovieImage
            src={imageUrl}
            alt={`Poster film ${movie.title}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        )}

        {rating && (
          <RatingBadge>
            ⭐ {rating}
          </RatingBadge>
        )}
      </ImageContainer>

      <MovieInfo>
        <MovieTitle title={movie.title}>
          {movie.title || "Untitled Movie"}
        </MovieTitle>
        <MovieYear>
          📅 {movieYear}
        </MovieYear>
      </MovieInfo>
    </MovieCard>
  );
};

export default Movie;