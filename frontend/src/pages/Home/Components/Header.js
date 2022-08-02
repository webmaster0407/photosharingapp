import React from 'react';
import {Box, Typography} from '@mui/material';
import CategorySelector from './CategorySelector';

function Header() {
  return (
    <Box sx={{textAlign:'center',mt:4,p:2}}>
        <Typography  sx={{fontSize:'4.5vh',fontWeight:'300'}}>
        Discover the best content on Photosharing
        </Typography>
        <Typography sx={{fontSize:'2.5vh', fontWeight:'bolder', mt:4}}>
        Choose your interests
        </Typography>
        <CategorySelector/>
    </Box>
  )
}
 
export default Header;