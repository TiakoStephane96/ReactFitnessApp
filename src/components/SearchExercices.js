import React from 'react';
import { useState, useEffect } from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercices = ({setExercises, bodyPart, setBodyPart}) => {

  const [search, setSearch] = useState('');
  const [bodyParts, setbodyParts] = useState([]);

  useEffect(() =>{
    const fetchExercicesData = async () => {
      const bodyPartsData = await fetchData
      ('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setbodyParts(['all', ...bodyPartsData]);

    }

    fetchExercicesData();
  }, [])

  const handleSearch = async () => {
    if(search){
      const exercisesData = await fetchData
      ('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
    
      const searchedExercices = exercisesData.filter(
        (exercice) => exercice.name.toLocaleLowerCase().includes(search)
        || exercice.target.toLocaleLowerCase().includes(search)
        || exercice.equipment.toLocaleLowerCase().includes(search)
        || exercice.bodyPart.toLocaleLowerCase().includes(search)

        );

        setSearch('');
        setExercises(searchedExercices);
    }
  }

  return (
    <Stack alignItems='center' mt="37px"
    justifyContent="center" p="20px"
    >
      <Typography fontWeight={700} 
      sx={{ fontSize:{ lg: '44px', xs: '30px'}}} mb="50px" textAlign="center">
        Awesome Exercises You <br/> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField 
        sx={{
          input:{
          fontWeight:"70", 
          border: 'none', 
          borderRadius: '4px'},
          width:{ lg: '800px', xs: '350px'},
          backgroundColor: '#fff',
          borderRadius: '40px'
        }}
        height="76px"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        placeholder="Search Exercise"
        type="text"
        />
        <Button className='search-btn'
        sx={{
          bgcolor: '#ff2625',
          color: '#fff',
          textTransform: 'none',
          width: {lg: '175px', xs: '80px'},
          fontSize: { lg: '20px', xs: '14px'},
          height: '56px',
          position: 'absolute',
          right:0
        }}
        onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{position:'relative', width: '100%', p: '20px'}}>
        <HorizontalScrollbar 
        data={bodyParts} 
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        isBodyParts
        />
      </Box>
    </Stack>
  )
}

export default SearchExercices
