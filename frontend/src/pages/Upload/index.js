import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, FormControl, Select, Typography, InputLabel, MenuItem, Input, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';

import { PhotoValidations } from '../../validations/PhotoValidations';
import { uploadPhotoToCloudinary, addPhoto } from '../../services/PhotoServices';
import { getAllCategories } from '../../services/CategoryServices';
import { getUser } from '../../services/UserServices';
import { useUserContext } from '../../contexts/UserContext';

function Upload() {

  const { user } = useUserContext();
  const navigate=useNavigate();

  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    getAllCategories().then(data => setCategories(data.allCategories));
    getUser(user).then(data => setCurrentUser(data.user));
  }, [user]);

  const { values, handleSubmit, handleChange, resetForm, isValid } = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
    },
    onSubmit: values => {

      uploadPhotoToCloudinary(image).then(data => {
        addPhoto(data.url, values.title, values.description, values.category, currentUser._id, currentUser.username).then(data => setResult(data));
        setOpenAlert(true);
        setTimeout(() => {
          navigate(-1);
      }, 1500)
      });

      resetForm();
    },
    validationSchema: PhotoValidations,
  });
 
  const chooseImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            component='form'
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: { xs: '100vw', sm: '70vw', md: '50vw', lg: '30vw' }
            }}>

            <Typography variant='h2' sx={{ m: 1, textAlign: 'center' }}>Upload Photo</Typography>
            <TextField
              onChange={handleChange}
              sx={{ mx: { xs: 1, md: 5 }, my: 2 }}
              label="Title"
              type="text"
              name='title'
              value={values.title}
            />
            <TextField
              onChange={handleChange}
              sx={{ mx: { xs: 1, md: 5 }, my: 2 }}
              label="Description"
              type="text"
              name='description'
              value={values.description}
            />
            <FormControl sx={{ mx: { xs: 1, md: 5 }, my: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select name='category' value={values.category} onChange={handleChange}>
                {
                  categories.map((c, index) => {
                    return <MenuItem key={index} value={c._id} >{c.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <FormControl sx={{ mx: { xs: 1, md: 5 }, my: 2 }}>
              <Input onChange={chooseImage} className='imageSelect' type="file" name="imageSelecter" />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mx: { xs: 1, md: 5 }, my: 2 }}>
              <Button
                variant="contained"
                color="error"
                type='submit'
                onClick={handleSubmit}
                disabled={!isValid}>
                Upload
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Alert */}
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
        <Alert severity={result !== null && result.status === 'failed' ? 'error' : 'success'} onClose={() => setOpenAlert(false)}>
          {result !== null && result.status === 'success' ? 'Successfully uploaded.' : 'Somethings went wrong.'}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Upload;