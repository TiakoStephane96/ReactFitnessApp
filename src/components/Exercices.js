import React, {useEffect, useState} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExercicesCard from './ExercicesCard';


const Exercices = ({Exercices, setExercises, bodyPart}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercicesPerPage = 9;

  const indexOfLastExercice = currentPage * exercicesPerPage;

  const indexOfFirstExercice = indexOfLastExercice - exercicesPerPage;

  const currentExercices = Exercices.slice(indexOfFirstExercice, indexOfLastExercice);
  

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth'})
  }

  useEffect(() => {

    const fetchExercicesData = async () => {
      let exercicesData = [];

      if(bodyPart === 'all') {
        exercicesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      }
      else{
        exercicesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exercicesData);
    };
    
    fetchExercicesData();

  }, [bodyPart]);

  return (
    <Box id="exercises"
    sx={{ mt: { lg: '110px' }}}
    mt="50px"
    p="20px"
    >
      <Typography variant="h4" mb="46px"> 
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px'}}}
      flexWrap="wrap" justifyContent="center"
      >
        { currentExercices.map((exercice, index) => (
          <ExercicesCard key={index} exercice={exercice} />
        )) }
      </Stack> 
      <Stack mt="100px" alignItems="center" >
          { Exercices.length > 9 && (
            <Pagination
              color='standard'
              shape='rounded'
              page={currentPage}
              onChange={paginate}
              size="large"
              count={Math.ceil(Exercices.length / exercicesPerPage)}
              defaultPage={1}
            />
          )}
      </Stack>
    </Box>
  ) 
}

export default Exercices
