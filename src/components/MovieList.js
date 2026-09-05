import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import MovieCard from './MovieCard';

const API_KEY = '15a4ec27';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const POPULAR_QUERIES = [
  'avengers',
  'star wars',
  'harry potter',
  'marvel',
  'disney',
  'action',
  'comedy',
  'drama',
  '2023',
  '2024'
];


const getRandomQuery = () => {
    return POPULAR_QUERIES[Math.floor(Math.random() * POPULAR_QUERIES.length)];
  };


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies =  (query) => {
    setLoading(true);
    setError(null);
    
    const url = `${BASE_URL}&s=${query}`;

    //Отправка HTTP-запроса
    //отправка get запроса к API 
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      //Преобразование JSON-ответа в JS-объект
      return response.json();
    })
    .then(data => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      } else {
        setMovies(data.Search.slice(0, 15));
      }
    })
    .catch(err => {
      setError(err.message);
      setMovies([]);
    })
    .finally(() => {
      setLoading(false);
    });
};

  useEffect(() => {
    const randomQuery = getRandomQuery();
    fetchMovies(randomQuery);
  }, []);


  return (
    <Container maxWidth="lg">
      <Box >
        <Typography variant="h3" component="h1" gutterBottom>
          🎬 Фильмы
        </Typography>
      </Box>
     
      {loading && (
        <Box >
          <CircularProgress size={60} />
          <Typography>Загружаем фильмы...</Typography>
        </Box>
      )}


      {error && !loading && (
        <Alert 
          severity="error" >
          Ошибка: {error}
        </Alert>
      )}

      
      {!loading && !error && movies.length === 0 && (
        <Alert severity="info">
          Фильмы не найдены  
        </Alert>
      )}

      {!loading && !error && movies.length > 0 && (
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    )}
  
 
    </Container>
  );
};

export default MovieList;