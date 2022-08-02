import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import { Favorite, Edit } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import { addLike, removeLike } from '../services/PhotoServices';
import useLikeStatus from '../hooks/useLikeStatus';

function Image({ imageUrl, title, publisher, publisherName, id }) {

  const { user } = useUserContext();
  const [likeStatus] = useLikeStatus(id, user);
  const [likeButton, setLikeButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLikeButton(likeStatus);
  }, [likeStatus]);

  const onClickLike = () => {
    if (user) {
      if (likeButton) {
        removeLike(id, user);
      } else {
        addLike(id, user);
      }
      setLikeButton(!likeButton);
    }
  }
 
  const onClickEdit = () => {
    navigate('/edit', { state: { photoId: id } });
  }

  return (
    <ImageListItem className='image-area'>
      <img onClick={() => navigate(`/photo/${id}`)} alt={title} src={imageUrl} />
      <ImageListItemBar
        className='image-text'
        sx={{ p: 2, display: 'none' }}
        title={title}
        subtitle={`@${publisherName}`}
        actionIcon={
          publisher === user ?
            <IconButton onClick={onClickEdit}>
              <Edit sx={{ color: 'rgba(255, 255, 255, 1)' }} />
            </IconButton>
            :
            <IconButton onClick={onClickLike} >
              <Favorite sx={{ color: likeButton ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.54)' }} />
            </IconButton>
        } />
    </ImageListItem>
  )
}

export default Image;