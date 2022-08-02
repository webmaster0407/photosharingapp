import * as yup from 'yup'; 

const SignupValidations = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(5).max(15).required(),
    password: yup.string().min(5).max(20).required(),
    terms: yup.boolean().oneOf([true]).required(),
});

export default SignupValidations;