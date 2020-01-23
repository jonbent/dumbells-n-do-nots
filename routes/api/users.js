const express = require("express");
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    User.findOne({ email: req.body.email })
        .then(user => {
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
            let errors = newUser.validateSync();
            if (errors){
                errors = errors.errors
                if (req.body.password !== req.body.password2)errors = Object.assign(errors, {password2: {
                    message: "Password Confirmation must match",
                    name: "ValidatorError",
                    properties: {
                        message: "Path `password2` must match path `password`.",
                        type: "required",
                        path: "password2"
                    },
                    kind: "required",
                    path: "password2"
                }})
                return res.status(422).json(errors)
            }

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
                            
                            .catch(err => res.status(400).json(err.errors));
                    })
                })
            // }
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

router.post('/:username/update', upload.single("avatarImg"), (req, res) => {
    User.findOne({ username: req.params.username }).then(user => {
        if (!user) return res.status(400).json({ user: { message: "User not found" } })
        const file = req.file;
        const s3FileURL = keys.UploadFileUrlLink;
        let params = {
            Bucket: keys.awsBucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        }
        new AWS.S3({
            accessKeyId: keys.awsBucketAccessId,
            secretAccessKey: keys.awsBucketToken,
            region: keys.awsRegion
        }).upload(params, (err, data) => {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                user.avatarUrl = s3FileURL + file.originalname
                console.log(user);
                
                res.json({ user });
                user.save(function (error, newFile) {
                    if (error) {
                        throw error;
                    }
                });
            }
        })
        })
})
module.exports = router;