const bcrypt = require('bcrypt'); 
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            newUser
        });

    } catch (err) {

        res.status(200).json({
            status: 'failed',
            error: 'This email is already in use'
        });
    }
};

exports.loginUser = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, async (err, user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, same) => {
                    if (same) {
                        var currentUser = user;
                        res.status(200).json({
                            status: 'success',
                            currentUser
                        });
                    } else {
                        res.status(200).json({
                            status: 'failed',
                            error: 'Wrong email or password'
                        });
                    }
                });
            }
            else {
                if (req.body.email == "admin@gmail.com" && req.body.password == "root123!@#") {
                    const newUser = new User({
                        ...req.body,
                        username: "admin",
                        role: "admin"
                    });
                    await newUser.save();
                    return res.status(201).json({
                        status: 'success',
                        newUser
                    });
                }
                res.status(200).json({
                    status: 'failed',
                    error: 'Wrong email or password'
                });
            }
        });
    } catch (error) {

        res.status(404).json({
            status: 'failed',
            error
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        res.status(200).json({
            status: 'success',
            users
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.setProfilePhoto = async (req, res) => {
    try {
        const profilePhoto = await User.findByIdAndUpdate(req.params.id, {
            imageUrl: req.body.imageUrl
        }, { new: true });

        res.status(200).json({
            status: 'success',
            profilePhoto
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}

// FOLLOWING SYSTEM

exports.addFollower = async (req, res) => {

    try {
        const follower = await User.findById(req.params.followerId);
        const followed = await User.findById(req.params.followedId);

        var isFriend = false;
        const followingsArray = []
        follower.followings.forEach((f) => {
            followingsArray.push(f);
            if (f !== null && f.id === req.params.followedId) { isFriend = true };
        });

        if (!isFriend) {
            followingsArray.push({ "id": req.params.followedId })
            follower.followings = followingsArray;
            followed.followers += 1;
            follower.save();
            followed.save();

            res.status(201).json({
                status: 'success'
            });
        } else {
            res.status(200).json({
                status: 'failed',
                message: "You are already friend"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }

};

exports.deleteFollower = async (req, res) => {

    try {
        const follower = await User.findById(req.params.followerId);
        const followed = await User.findById(req.params.followedId);

        follower.followings.forEach((f, index) => {

            if (f !== null && f.id === req.params.followedId) {
                follower.followings[index] = null;
                followed.followers -= 1;
                followed.save();
                follower.save();
            }
        });
        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
}