import { useEffect, useState } from 'react';
import { getPhotoById } from '../services/PhotoServices';

const useLikeStatus = (photoId, liker) => {

    const [likeStatus, setLikeStatus] = useState(false);

    useEffect(() => {
        if(liker){
            if (photoId) {
                getPhotoById(photoId)
                    .then(res => {
                        res.photo.likers.forEach(user => {
                            if (user !== null && user !== undefined) {
                                if (user.id === liker) {
                                    setLikeStatus(true);
                                }
                            }
                        });
                    });
            }
        }       
    }, [photoId, liker])

    return [likeStatus];
}

export default useLikeStatus;

