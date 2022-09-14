import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';

import HeroBanner from '../components/HeroBanner';
import SearchExercices from '../components/SearchExercices';
import Exercices from '../components/Exercices';


const Home = () => {

  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <Box>
      <HeroBanner/>
      <SearchExercices 
      setExercises= {setExercises} 
      bodyPart= {bodyPart} 
      setBodyPart= {setBodyPart} 
      />
      <Exercices
      Exercices= {exercises} 
      setExercises= {setExercises} 
      bodyPart= {bodyPart} 
      />
    </Box>
  )
}

export default Home
