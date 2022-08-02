import React, { useState } from 'react';
import { Box, Input, Button, Avatar, Snackbar, Alert } from '@mui/material';

import { uploadPhotoToCloudinary } from '../services/PhotoServices';
import { setProfilePhoto } from '../services/UserServices';

const PPChanger = ({ setOpenChanger, userId, oldImageUrl }) => {

    const [image, setImage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [result, setResult] = useState("");

    const chooseImage = (e) => {

        uploadPhotoToCloudinary(e.target.files[0])
            .then(data => setImage(data.url));
    };
 
    const handleSubmit = (e) => {

        setProfilePhoto(userId, image)
            .then(data => {
                setResult(data);
                setOpenAlert(true);
                setTimeout(() => {
                    setOpenChanger(false);
                }, 1100)
            });

        e.preventDefault();
    };

    const handleCancel = () => {
        setOpenChanger(false);
    };

    return (
        <>
            <Box component='form'
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    flexDirection: 'column',
                    width: { xs: '100vw', sm: '70vw', md: '50vw', lg: '30vw' }
                }}>
                <Box sx={{ backgroundColor: '#e61605', height: '1rem', mb: 5 }}></Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar
                        src={image !== "" ? image : oldImageUrl}
                        alt="Photography"
                        sx={{ width: '20vh', height: '20vh', mx: 'auto', my: 2, cursor: 'pointer' }}
                    />
                    <Input sx={{ width: '95px', textAlign: 'center' }} onChange={chooseImage} className='imageSelect' type="file" name="imageSelecter" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        sx={{ mt: 3 }}
                        variant="contained"
                        color="error"
                        type='submit'
                        onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button
                        sx={{ mt: 3, ml: 2 }}
                        onClick={handleCancel}
                        variant="outlined"
                        color="error">
                        Cancel
                    </Button>
                </Box>
                <Box sx={{ backgroundColor: '#e61605', height: '1rem', mt: 5 }}></Box>
            </Box>

            {/* Alert */}
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity={result !== null && result.status === 'failed' ? 'error' : 'success'} onClose={() => setOpenAlert(false)}>
                    {result !== null && result.status === 'success' ? 'Successfully saved.' : 'Somethings went wrong.'}
                </Alert>
            </Snackbar>
        </>
    )
}

export default PPChanger;