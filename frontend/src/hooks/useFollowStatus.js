import { useEffect, useState } from 'react';
import { getUser } from '../services/UserServices';

const useFollowStatus = (follower, following) => {
    const [status, setStatus] = useState(false);

    useEffect(()=>{
        if (follower && follower !== null) {
            getUser(follower)
                .then(result => {
                    result.user.followings && result.user.followings.forEach(f => {
                        if (f !== null && f !== undefined) {
                            if (f.id === following) {
                                setStatus(true);
                            }
                        }
                    });
                });
        }
    },[follower,following]);

    return [status];
}; 

export default useFollowStatus;