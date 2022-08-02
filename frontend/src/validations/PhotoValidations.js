import * as yup from 'yup'; 

export const PhotoValidations = yup.object().shape({
    title:yup.string().max(30).required(),
    description:yup.string().max(100).required(),
    category:yup.string().required(),
});