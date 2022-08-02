import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Typography, Box, Button, Modal, Snackbar, Alert, IconButton } from '@mui/material';
import { Camera, Login, Person, Logout, AddAPhoto } from '@mui/icons-material';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { useUserContext } from '../contexts/UserContext';

function Navbar() {
 
    const navigate = useNavigate();
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const [loginAlert, setLoginAlert] = useState(false);
    const [signupAlert, setSignupAlert] = useState(false);
    const [loginResult, setLoginResult] = useState(null);
    const [signupResult, setSignupResult] = useState(null);

    const { user, setUser } = useUserContext();

    const onClickLogout = () => {
        localStorage.removeItem('UID');
        setUser(null);
        navigate('/');
        window.location.reload(false);
    }

    return (
        <Box>
            <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none', position: 'sticky', px: 2 }}>
                <Container maxWidth="x1" sx={{
                    display: { xs: 'contents', sm: 'flex' },
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate('/')} >
                        <Camera sx={{
                            mr: 1,
                            fontSize: '4vh',
                            color: '#e61605'
                        }}
                        />
                        <Typography
                            variant='h2'
                            sx={{
                                fontSize: '4vh',
                                color: '#e61605',
                                fontWeight: '800'
                            }}>
                            Photosharing
                        </Typography>
                    </Box>
                    {
                        user === 'null' || user === null
                            ?
                            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    color='error'
                                    variant='text'
                                    sx={{ mr: 1, fontWeight: 'bold', borderRadius: '25px' }}
                                    onClick={() => setOpenLogin(true)}
                                ><Login sx={{ mr: 1 }} />Login</Button>
                                <Button
                                    variant='contained'
                                    color='error'
                                    sx={{ fontWeight: 'bold', borderRadius: '25px' }}
                                    onClick={() => setOpenSignup(true)}
                                ><Person sx={{ mr: 1 }} />Sign Up</Button>
                            </Box>
                            :
                            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button 
                                color='error' 
                                variant='text' 
                                sx={{ mr: 1, fontWeight: 'bold', borderRadius: '25px' }} 
                                onClick={onClickLogout} 
                                ><Logout sx={{ mr: 1 }} />Logout</Button>
                                <Button 
                                variant='contained' 
                                color='error' 
                                sx={{ fontWeight: 'bold', borderRadius: '25px' }} 
                                onClick={() => navigate(`/profile/${user}`)} 
                                ><Person sx={{ mr: 1 }} />Account</Button>
                                <IconButton color='error' onClick={()=>navigate('/upload')} ><AddAPhoto/></IconButton>
                            </Box>
                    }
                </Container>
            </AppBar>


            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <LoginModal setOpen={setOpenLogin} setLoginAlert={setLoginAlert} setResult={setLoginResult} />
            </Modal>

            <Modal
                open={openSignup}
                onClose={() => setOpenSignup(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <SignupModal setOpen={setOpenSignup} setSignupAlert={setSignupAlert} setResult={setSignupResult} />
            </Modal>


            <Snackbar open={loginAlert} autoHideDuration={3000} onClose={() => setLoginAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity={loginResult !== null && loginResult.status === 'failed' ? 'error' : 'success'} onClose={() => setLoginAlert(false)}>
                    {loginResult !== null && loginResult.status === 'success' ? 'You successfully logged in.' : 'Wrong email or password.'}
                </Alert>
            </Snackbar>

            <Snackbar open={signupAlert} autoHideDuration={3000} onClose={() => setSignupAlert(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity={signupResult !== null && signupResult.status === 'failed' ? 'error' : 'success'} onClose={() => setSignupAlert(false)}>
                    {signupResult !== null && signupResult.status === 'success' ? 'You successfully registered' : 'This email is already in use'}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Navbar;