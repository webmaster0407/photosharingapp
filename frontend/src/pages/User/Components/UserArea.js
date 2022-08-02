import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Button, Modal } from '@mui/material';

import PPChanger from '../../../components/PPChanger';
import { getUser, followUser, unfollowUser } from '../../../services/UserServices';

function UserArea({ user, currentUser }) {

    const [openChanger, setOpenChanger] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (currentUser) {
            getUser(currentUser)
                .then(result => {
                    result.user.followings && result.user.followings.forEach(f => {
                        if (f !== null && f !== undefined) {
                            if (f.id === user._id) {
                                setIsFollowed(true);
                            }
                        }
                    });
                });
        }
    }, [user, currentUser]);
 
    const onClickFollow = () => {
        if (currentUser !== null && currentUser !== undefined && user._id !== null && user._id !== undefined) {
            followUser(currentUser, user._id);
            setIsFollowed(true);
        }
    };

    const onClickUnfollow = () => {
            unfollowUser(currentUser, user._id);
            setIsFollowed(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Avatar
                        alt="Photography"
                        src={user.imageUrl}
                        sx={{ width: '20vh', height: '20vh', mx: 'auto', cursor: 'pointer' }}
                        onClick={() => user._id === currentUser && setOpenChanger(true)}
                    />
                    <Typography variant="h5" sx={{ mt: 3, mx: 'auto', fontWeight: '800' }}>@{user.username}</Typography>
                    <Typography sx={{ mt: 1, mx: 'auto', fontSize: '1.3rem', fontWeight: '300' }}>{user.email}</Typography>
                    <Box sx={{ display: 'flex', mt: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ mr: 0, fontWeight: '700' }}>{user.followers} Followers</Typography>
                        {user._id === currentUser
                            ?
                            null :
                            (isFollowed
                                ?
                                <Button variant='contained' onClick={onClickUnfollow} color='error' sx={{ borderRadius: '25px', ml: 2 }} >Unfollow</Button>
                                :
                                <Button variant='contained' onClick={onClickFollow} color='error' sx={{ borderRadius: '25px', ml: 2 }} >Follow</Button>
                            )}
                    </Box>
                </Box>
            </Box>


            <Modal
                open={openChanger}
                onClose={() => setOpenChanger(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <PPChanger setOpenChanger={setOpenChanger} oldImageUrl={user.imageUrl} userId={currentUser} />
            </Modal>
        </>
    )
}

export default UserArea;