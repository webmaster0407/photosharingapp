import axios from 'axios';

export const getAllCategories = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories`);
    return data;
};

export const getCategoryById = async (categoryId) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/categories/${categoryId}`);
    return data;
};

export const createCategory = async (name, status) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/categories`, {
        name,
        status
    })
    return data;
};

export const updateCategoryById = async (categoryId, name, status) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/categories/${categoryId}`, {
        name,
        status
    });
    return data;
};

export const deleteCategoryById = async (categoryId) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/categories/${categoryId}`);
    return data;
};
