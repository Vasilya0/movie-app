import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Chip,
  CardActionArea
} from '@mui/material';
import noPoster from './assets/no-poster.jpg'; 

const MovieCard = ({ movie }) => {
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : noPoster;

  return (
    <Card >
      <CardActionArea 
        component={RouterLink}
        to={`/movie/${movie.imdbID}`}>
        {/* Постер фильма */}
        <CardMedia
          component="img"
          height="450"
          image={posterUrl}
          alt={movie.Title}
          
        />
        
        <CardContent >
          {/* Название и год */}
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {movie.Title}
          </Typography>
          
          <Box >
            {/* Год выпуска */}
            <Chip 
              label={movie.Year} 
              size="small" 
              color="primary"
              variant="outlined"
            />
               
          </Box>
        
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;