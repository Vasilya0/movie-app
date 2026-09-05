 import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Layout = () => {
  return (
    <> {/*невидимый контейнер */}
      {/* Шапка приложения*/}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/">
            <HomeIcon />
            Movie
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Основное содержимое */}
      <Box component="main">
        <Outlet />
      </Box>

      {/* Подвал */}
      <Box 
        component="footer" 
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Movie Finder. Данные предоставлены OMDb API.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Layout;