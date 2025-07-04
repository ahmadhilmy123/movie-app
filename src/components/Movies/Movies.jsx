import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import Movie from "../Movie/Movie";

// Animation keyframes
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const MoviesContainer = styled.section`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 60vh;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 4rem 3rem;
  }
`;

const MoviesWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  justify-items: center;
  animation: ${slideUp} 0.8s ease-out;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  
  @media (min-width: 1200px) {
    gap: 2.5rem;
  }
`;

const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const SkeletonCard = styled.div`
  width: 220px;
  height: 400px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    rgba(255, 255, 255, 0.5) 37%,
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #64748b;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
  }
  
  .empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  
  .empty-subtitle {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  background: ${props => props.active ? '#4f46e5' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #4f46e5;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const MoviesCount = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #64748b;
  font-weight: 500;
  
  .count-number {
    color: #4f46e5;
    font-weight: 600;
  }
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  background: white;
  color: #374151;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

/**
 * Enhanced Movies Grid Component
 * Features: Search, filter, sort, loading states, responsive design
 */
const Movies = ({ movies = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [filterBy, setFilterBy] = useState("all");

  // Filter and sort movies
  const processedMovies = useMemo(() => {
    let filtered = movies.filter(movie =>
      movie &&
      movie.poster_path &&
      movie.title &&
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply additional filters
    if (filterBy === "recent") {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(movie => {
        const movieYear = movie.release_date 
          ? new Date(movie.release_date).getFullYear() 
          : 0;
        return movieYear >= currentYear - 2;
      });
    } else if (filterBy === "popular") {
      filtered = filtered.filter(movie => movie.vote_average >= 7);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "date":
          return new Date(b.release_date || 0) - new Date(a.release_date || 0);
        case "rating":
          return (b.vote_average || 0) - (a.vote_average || 0);
        default:
          return 0;
      }
    });
  }, [movies, searchTerm, sortBy, filterBy]);

  // Render loading skeletons
  const renderLoadingSkeletons = () => (
    <LoadingGrid>
      {Array(8).fill(0).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </LoadingGrid>
  );

  // Render empty state
  const renderEmptyState = () => (
    <EmptyState>
      <span className="empty-icon">🎬</span>
      <div className="empty-title">
        {searchTerm ? "Tidak Ada Film Ditemukan" : "Belum Ada Film"}
      </div>
      <div className="empty-subtitle">
        {searchTerm 
          ? `Tidak ada film yang cocok dengan pencarian "${searchTerm}"`
          : "Film akan muncul di sini setelah data dimuat"
        }
      </div>
    </EmptyState>
  );

  // Render movie grid
  const renderMovieGrid = () => (
    <>
      <MoviesCount>
        Menampilkan <span className="count-number">{processedMovies.length}</span> film
        {searchTerm && ` untuk "${searchTerm}"`}
      </MoviesCount>
      
      <MoviesGrid>
        {processedMovies.map((movie, index) => (
          <Movie 
            key={`${movie.id}-${index}`} 
            movie={movie}
          />
        ))}
      </MoviesGrid>
    </>
  );

  return (
    <MoviesContainer>
      <MoviesWrapper>
        {!loading && movies.length > 0 && (
          <FilterControls>
            <SearchInput
              type="text"
              placeholder="🔍 Cari film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <FilterButton
              active={filterBy === "all"}
              onClick={() => setFilterBy("all")}
            >
              📽️ Semua
            </FilterButton>
            
            <FilterButton
              active={filterBy === "recent"}
              onClick={() => setFilterBy("recent")}
            >
              🆕 Terbaru
            </FilterButton>
            
            <FilterButton
              active={filterBy === "popular"}
              onClick={() => setFilterBy("popular")}
            >
              ⭐ Populer
            </FilterButton>
            
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">📝 Urutkan: Judul</option>
              <option value="date">📅 Urutkan: Tanggal</option>
              <option value="rating">⭐ Urutkan: Rating</option>
            </SortSelect>
          </FilterControls>
        )}

        {loading ? renderLoadingSkeletons() : 
         processedMovies.length === 0 ? renderEmptyState() : 
         renderMovieGrid()}
      </MoviesWrapper>
    </MoviesContainer>
  );
};

export default Movies;