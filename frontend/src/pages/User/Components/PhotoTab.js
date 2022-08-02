import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

import Image from '../../../components/Image';
import { getPhotosByUserId } from './../../../services/PhotoServices';

function PhotoTab({ userId }) {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotosByUserId(userId).then(d => setPhotos(d.photos));
  }, [userId])

  return (
    <Box sx={{ px:{xs:0,sm:1,md:3}, py: 3, display: 'flex', justifyContent: 'center' }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3} >
        {  
          photos.map((photo, index) => {
            return <Image key={index} publisher={photo.publisher} publisherName={photo.publisherName} title={photo.title} imageUrl={photo.imageUrl} id={photo._id} />
          })
        }
      </Masonry>
    </Box>
  )

}

export default PhotoTab;
