import React, { forwardRef, useState } from 'react';
import { Typography, Box, Button, TextField, InputAdornment, InputLabel, FormControl, IconButton, OutlinedInput, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useFormik } from 'formik';
import SignupValidations from '../validations/SignupValidations';
import { Signup } from '../services/AuthServices';


const SignupModal = forwardRef(({ setOpen, setSignupAlert, setResult }, ref) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { handleChange, handleBlur, errors, touched, isValid, values, handleSubmit, resetForm } = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: false
        },
        onSubmit: async values => {

            var data = await Signup(values.email, values.username, values.password);
            var result = await data.data;
            setResult(result);
            setSignupAlert(true);
            resetForm();

            if (!result.error) {
                setOpen(false);
            }

        },
        validationSchema: SignupValidations
    })

    return (
        <Box component='form' sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', flexDirection: 'column', width: { xs: '100vw', sm: '70vw', md: '50vw', lg: '30vw' } }}>
            <Box sx={{ backgroundColor: '#e61605', height: '1rem', mb: 5 }}></Box>
            <Typography variant='h2' sx={{ m: 1, textAlign: 'center' }}>Sign Up</Typography>
            <TextField
                sx={{ mx: { xs: 1, md: 5 }, my: 2 }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                label="Email"
                type="email"
                name='email'
                value={values.email}
            />
            <TextField
                sx={{ mx: { xs: 1, md: 5 }, my: 2 }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && errors.username}
                helperText={touched.username && errors.username}
                label="Username"
                type="text"
                name='username'
                value={values.username}
            />
            <FormControl sx={{ mx: { xs: 1, md: 5 }, my: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    name='password'
                    value={values.password}
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
                {touched.password && <FormHelperText sx={{ color: '#e61605' }} >{errors.password}</FormHelperText>}
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mx: { xs: 1, md: 5 }, my: 2 }}>
                <FormControlLabel
                    control={<Checkbox checked={values.terms} />}
                    onChange={handleChange}
                    value={values.terms}
                    name='terms'
                    label="I agree the Terms of Service and Privacy Policy." />
                <Button sx={{ mt: 1 }} variant="contained" color="error" disabled={!isValid} type='submit' onClick={handleSubmit} >
                    Sign Up
                </Button>
            </Box>
            <Box sx={{ backgroundColor: '#e61605', height: '1rem', mt: 5 }}></Box>
        </Box>
    )
}); 

export default SignupModal;