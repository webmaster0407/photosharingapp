const express=require('express');
const router=express.Router();

const { getAllUsers, loginUser, createUser, getUserById, addFollower, deleteFollower, setProfilePhoto } = require('../controllers/userController');

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById);

router.route('/register').post(createUser);

router.route('/login').post(loginUser);

router.route('/:followedId/followers/:followerId').post(addFollower);

router.route('/:followedId/followers/:followerId').delete(deleteFollower);

router.route('/:id/photo').put(setProfilePhoto);

module.exports = router;

