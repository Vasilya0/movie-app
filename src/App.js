import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>  {/*контекст маршрутизации */}
      <Routes> {/*контейнер для маршрутов */}
        <Route path="/" element={<Layout />}> {/*определение маршрута */}
          <Route index element={<MovieList />} />
          
          <Route path="movie/:id" element={<MovieDetails />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;