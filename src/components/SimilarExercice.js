import React from 'react';
import {Boc, Box, Stack, Typography} from '@mui/material';

import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarExercice = ({targetMuscleExercices, equipmentExercices}) => {
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0'}}} >
      <Typography variant="h4" mb={5}>
        Exercices that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative'}} >
        {targetMuscleExercices.length ?
         <HorizontalScrollbar data={targetMuscleExercices}/> :
         <Loader/> }
      </Stack>
      <Typography variant="h4" mb={5}>
        Exercices that use the same equipment grup
      </Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative'}} >
        {equipmentExercices.length ?
         <HorizontalScrollbar data={equipmentExercices}/> :
         <Loader/> }
      </Stack>
    </Box>
  )
}

export default SimilarExercice
