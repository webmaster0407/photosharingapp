import axios from 'axios';

export const getUser = async (userId) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
    return data;
};

export const followUser = (followerId, followedId) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/users/${followedId}/followers/${followerId}`);
};

export const unfollowUser = (followerId, followedId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${followedId}/followers/${followerId}`);
};

export const setProfilePhoto = async (userId, image) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${userId}/photo`, {
        imageUrl: image
    });
    return data;
};
