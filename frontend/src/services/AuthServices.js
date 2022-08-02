import axios from 'axios';

export const Signup = async (email, username, password) => {

    return await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, {
        email,
        username,
        password
    });
};

export const Login = async (email, password) => {

    return axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, {
        email,
        password
    });
};