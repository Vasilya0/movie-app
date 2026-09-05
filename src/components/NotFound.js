 import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Card
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card sx={{ p: 6, textAlign: 'center' }}>
        <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }} />
        
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Страница не найдена
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph >
          Извините, запрашиваемая страница не существует.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            size="large"
          >
            На главную
          </Button>
          
        
        </Box>
      </Card>
    </Container>
  );
};

export default NotFound;