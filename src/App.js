import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './assets/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ExerciceDetail from './pages/ExerciceDetail';
import Footer from './components/Footer';


const App = () => {

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' }}} m="auto">
      <Navbar/> 
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/exercice/:id' element={<ExerciceDetail/>} />
        </Routes>
      <Footer/>
    </Box>
  )
}

export default App;
