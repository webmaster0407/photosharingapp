import React, { forwardRef, useState } from 'react';
import { Box, Button, Typography, MenuItem, InputLabel, Select, TextField, Snackbar, Alert } from '@mui/material';
 
import { createCategory, updateCategoryById, deleteCategoryById } from '../services/CategoryServices';

const CategoryEditModal = forwardRef(({ categories, isEdit, setOpen }, ref) => {

    const [catIndex, setCatIndex] = useState("0");
    const [status, setStatus] = useState(true);
    const [category, setCategory] = useState(isEdit ? categories[0].name : "");
    const [editAlert, setEditAlert] = useState(false);
    const [createAlert, setCreateAlert] = useState(false);
    const [editResult, setEditResult] = useState("");
    const [createResult, setCreateResult] = useState("");

    const handleChangeCategory = (e) => {
        setCategory(categories[e.target.value].name);
        setStatus(categories[e.target.value].status);
        setCatIndex(e.target.value);
    };

    const handleSubmit = (e) => {
        updateCategoryById(categories[catIndex]._id, category, status)
            .then((res) => {
                setEditResult(res.status);
                setEditAlert(true);
                setTimeout(() => {
                    setOpen(false);
                }, 1500)
            });
        e.preventDefault();
    };

    const handleDelete = (e) => {
        deleteCategoryById(categories[catIndex]._id)
            .then((res) => {
                setEditResult(res.status);
                setEditAlert(true);
                setTimeout(() => {
                    setOpen(false);
                }, 1500)
            });
        e.preventDefault();
    };

    const handleCreate = (e) => {
        createCategory(category, status)
            .then((res) => {
                setCreateResult(res.status);
                setCreateAlert(true);
                setTimeout(() => {
                    setOpen(false);
                }, 1500)
            });
        e.preventDefault();
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                component='form'
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    flexDirection: 'column',
                    width: { xs: '100vw', sm: '70vw', md: '50vw', lg: '30vw' }
                }}>
                <Box sx={{ backgroundColor: '#e61605', height: '1rem', mb: 5 }}></Box>
                <Typography variant='h2' sx={{ m: 1, textAlign: 'center' }}>{isEdit ? 'Edit' : 'Create'}</Typography>
                <Box px={3} >
                    {isEdit && <><InputLabel>Category</InputLabel>
                        <Select fullWidth sx={{ mb: 2 }} defaultValue={"0"} onChange={handleChangeCategory} >
                            {
                                categories.map((category, index) => {
                                    return <MenuItem key={index} value={index} >{category.name}</MenuItem>
                                })
                            }
                        </Select></>}
                    <InputLabel>Category Name</InputLabel>
                    <TextField fullWidth variant="outlined" sx={{ mb: 2 }} value={category} onInput={(e) => setCategory(e.target.value)} > </TextField>
                    <InputLabel>Status</InputLabel>
                    <Select fullWidth sx={{ mb: 2 }} onChange={(e) => setStatus(e.target.value)} value={status} >
                        <MenuItem value={true} >Active</MenuItem>
                        <MenuItem value={false} >Passive</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        isEdit ?
                            <>
                                <Button
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    color="error"
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                                <Button
                                    sx={{ mt: 3, ml: 3 }}
                                    variant="outlined"
                                    color="error"
                                    type='submit'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    color="error"
                                    type='submit'
                                    onClick={handleCreate}
                                >
                                    Create
                                </Button>
                                <Button
                                    sx={{ mt: 3, ml: 3 }}
                                    variant="outlined"
                                    color="error"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </>
                    }

                </Box>
                <Box sx={{ backgroundColor: '#e61605', height: '1rem', mt: 5 }}></Box>
            </Box>


            {/* Alert */}

            <Snackbar open={editAlert} autoHideDuration={3000} onClose={() => setEditAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity={editResult === 'failed' ? 'error' : 'success'} onClose={() => setEditAlert(false)}>
                    {editResult === 'failed' ? 'Somethings went wrong.' : 'Category successfully edited.'}
                </Alert>
            </Snackbar>

            <Snackbar open={createAlert} autoHideDuration={3000} onClose={() => setCreateAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity={createResult === 'failed' ? 'error' : 'success'} onClose={() => setCreateAlert(false)}>
                    {createResult === 'failed' ? 'Somethings went wrong.' : 'Category successfully created.'}
                </Alert>
            </Snackbar>
        </>
    )
});

export default CategoryEditModal;