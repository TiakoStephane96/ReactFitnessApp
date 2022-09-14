import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, YoutubeOptions } from '../utils/fetchData'
import Detail from '../components/Detail';
import SimilarExercice from '../components/SimilarExercice';
import ExerciceVideos from '../components/ExerciceVideos';


const ExerciceDetail = () => {

  const [ exerciceDetail, setExerciceDetail ] = useState({});
  const [ exerciceVideos, setExerciceVideos ] = useState([]);
  const [targetMuscleExercices, setTargetMuscleExercices] = useState([]);
  const [equipmentExercices, setEquipmentExercices] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchExerciceData = async () => {
      const exerciceDbUrl = 'https://exercisedb.p.rapidapi.com';
      const ytbSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciceDetailData = await fetchData(`${exerciceDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciceDetail(exerciceDetailData);

      const exerciceVideoData = await
      fetchData(`${ytbSearchUrl}/search?query=${exerciceDetailData.name}`, YoutubeOptions);
      setExerciceVideos(exerciceVideoData.contents);

      const targetMuscleExercicesData = 
      await fetchData(`${exerciceDbUrl}/exercises/target/${exerciceDetailData.target}`, exerciseOptions);
      setTargetMuscleExercices(targetMuscleExercicesData);

      const equipmentExercicesData = 
      await fetchData(`${exerciceDbUrl}/exercises/equipment/${exerciceDetailData.equipment}`, exerciseOptions);
      setEquipmentExercices(equipmentExercicesData);
      
    }

    fetchExerciceData();
  }, [id])

  return (
    <Box>
      <Detail exerciceDetail={exerciceDetail} />
      <ExerciceVideos exerciceVideos={exerciceVideos} name={exerciceDetail.name} />
      <SimilarExercice 
      targetMuscleExercices= {targetMuscleExercices}
      equipmentExercices= {equipmentExercices}
      />
    </Box>
  )
}

export default ExerciceDetail
