 import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import noPoster from './assets/no-poster.jpg'; 

const API_KEY = '15a4ec27'; 
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;


  // Функция для форматирования текста
  const formatText = (text) => {
  return !text || text === 'N/A' ? 'Информация отсутствует' : text;
};


const MovieDetails = () => {
  const { id } = useParams(); // Получаем ID фильма из URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchMovieDetails = () => {
      setLoading(true);
      setError(null);
      
        // Если нет ID, возвращаемся на главную
        if (!id) {
          navigate('/');
          return;
        }

        //Отправка HTTP-запроса
        //отправка get запроса к API        
        fetch(`${BASE_URL}&i=${id}&plot=full`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        //Преобразование JSON-ответа в JS-объект
        return response.json();
      })
      .then(data => {
        if (data.Response === 'False') {
          throw new Error(data.Error || 'Фильм не найден');
        }
        setMovie(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  fetchMovieDetails();
}, [id, navigate]);





  if (loading) {
    return (
      <Container>
        <CircularProgress size={60} />
        <Typography>Загружаем информацию о фильме...</Typography>
      </Container>
    );
  }


  if (error || !movie) {
    const message ='Фильм не найден';
    return (
      <Container>
        <Alert 
        severity={"error"} 
        action={
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<HomeIcon />}
            size="large"
          >
            На главную
          </Button>
          } >
          Ошибка: {message}
          </Alert>
      </Container>
    );
  }



  return (
    <Container maxWidth="lg" >
      <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<HomeIcon />}
            size="large"
          >
            На главную
          </Button>

      {/* Основная информация о фильме */}
      <Card sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
         <Box sx={{ 
          width: { xs: '100%', md: '33%' }, 
          minWidth: { xs: '100%', md: '300px' },
          flexShrink: 0 
        }}>
            <CardMedia
              component="img"
              image={movie.Poster !== 'N/A' ? movie.Poster : noPoster}
              alt={movie.Title}
              sx={{
                width: 'auto',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          </Box>

          {/* Информация */}
          <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {movie.Title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Chip label={movie.Year} color="primary" variant="outlined" />
                <Chip label={movie.Runtime !== 'N/A' ? movie.Runtime : 'Длительность не указана'} />
                <Chip label={movie.Genre !== 'N/A' ? movie.Genre : 'Жанр не указан'} />
                <Chip label={movie.Type === 'movie' ? 'Фильм' : 'Сериал'} />
              </Box>

              {/* Рейтинг */}
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <StarIcon sx={{ color: '#ffc107', mr: 1 }} />
                  <Typography variant="h5" component="span" sx={{ mr: 2 }}>
                    {movie.imdbRating}/10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.imdbVotes !== 'N/A' ? `${movie.imdbVotes} оценок` : ''}
                  </Typography>
                </Box>
              )}

              {/* Сюжет */}
              <Box >
                <Typography variant="h6" gutterBottom>Сюжет</Typography>
                <Typography variant="body1">
                  {formatText(movie.Plot)}
                </Typography>
              </Box>
            </Box>
      </Card>

      <Divider sx={{ my: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Дополнительная информация
        </Typography>
      </Divider>

      <Card>
        <CardContent>
          {/* Дополнительная информация */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Режиссер:</strong></Typography>
              <Typography variant="body1">{movie.Director !== 'N/A' ? movie.Director : 'Не указан'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Актеры:</strong></Typography>
              <Typography variant="body1">{movie.Actors !== 'N/A' ? movie.Actors : 'Не указаны'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Сценарий:</strong></Typography>
              <Typography variant="body1">{movie.Writer !== 'N/A' ? movie.Writer : 'Не указан'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Язык:</strong></Typography>
              <Typography variant="body1">{movie.Language !== 'N/A' ? movie.Language : 'Не указан'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Страна:</strong></Typography>
              <Typography variant="body1">{movie.Country !== 'N/A' ? movie.Country : 'Не указана'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom><strong>Награды:</strong></Typography>
              <Typography variant="body1">{movie.Awards !== 'N/A' ? movie.Awards : 'Нет наград'}</Typography>
            </Grid>
          </Grid>     
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;