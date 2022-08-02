import React, { forwardRef, useState } from 'react';
import { Typography, Box, Button, TextField, InputAdornment, InputLabel, FormControl, IconButton, OutlinedInput } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import LoginValidations from '../validations/LoginValidations';
import { Login } from '../services/AuthServices';
import { useUserContext } from '../contexts/UserContext';

const LoginModal = forwardRef(({ setOpen, setLoginAlert, setResult }, ref) => {

    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useUserContext();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { values, handleSubmit, handleChange, resetForm, isValid } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            var data = await Login(values.email, values.password);
            var result = await data.data;
            var user = await result.currentUser;

            setResult(result);
            setLoginAlert(true);
            resetForm();

            if (user._id !== null) {
                setUser(user._id)
                localStorage.setItem('UID', user._id);
                setOpen(false);
            }

        },
        validationSchema: LoginValidations,
    });

    return (
        <Box component='form' sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', flexDirection: 'column', width: { xs: '100vw', sm: '70vw', md: '50vw', lg: '30vw' } }}>
            <Box sx={{ backgroundColor: '#e61605', height: '1rem', mb: 5 }}></Box>
            <Typography variant='h2' sx={{ m: 1, textAlign: 'center' }}>Login</Typography>
            <TextField
                sx={{ mx: { xs: 1, md: 5 }, my: 2 }}
                label="Email"
                type="email"
                name='email'
                value={values.email}
                onChange={handleChange}
            />
            <FormControl sx={{ mx: { xs: 1, md: 5 }, my: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    color="error"
                    type='submit'
                    onClick={handleSubmit}
                    disabled={!isValid}>
                    Login
                </Button>
            </Box>
            <Box sx={{ backgroundColor: '#e61605', height: '1rem', mt: 5 }}></Box>
        </Box>

    )
});
 
export default LoginModal;