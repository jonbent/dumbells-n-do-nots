const express = require("express");
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        birthDate: req.user.birthDate,
        weightStart: req.user.weightStart,
        weightCur: req.user.weightCur,
        height: req.user.height,
        sex: req.user.sex,
        date: req.user.date,
        weightGoal: req.user.weightGoal,
        goalPath: req.user.goalPath,
        
    });
})


router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Use the validations to send the error
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    birthDate: req.body.birthDate,
                    weightStart: req.body.weightStart,
                    weightCur: req.body.weightStart,
                    height: req.body.height,
                    sex: req.body.sex,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, username: user.username };
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    // Tell the key to expire in one hour
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: 'Bearer ' + token,
                                            user: user
                                        });
                                    });
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const username = req.body.username;
    const password = req.body.password;

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username })
        .then(user => {
            if (!user) {
                // Use the validations to send the error
                errors.email = 'User not found';
                return res.status(400).json(errors);
            };
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        // And here:
                        return res.status(400).json(errors);
                    }
                })
        })
})
router.get('/:username', (req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            if (!user) {
                // Use the validations to send the error
                errors.email = 'User not found';
                return res.status(400).json(errors);
            };
            res.json({
                user: {
                    username: user.username,
                }
            });
        })
})
module.exports = router;