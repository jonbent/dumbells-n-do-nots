const express = require("express");
const router = express.Router();
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const uuid = require('uuid');
const Validator = require('validator');
const passwordValidator = require('password-validator');



const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
    accessKeyId: keys.awsBucketAccessId,
    secretAccessKey: keys.awsBucketToken,
    region: keys.awsRegion
});



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
});


router.post('/register', (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthDate: req.body.birthDate,
        weightStart: req.body.weightStart,
        weightCur: req.body.weightStart,
        height: req.body.height,
        sex: req.body.sex,
        goalPath: parseInt(req.body.goalPath)
    });

    let errors = {};
    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8)
        .is().max(75)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().not().spaces()


    // if (req.body.password !== req.body.password2) errors = Object.assign(errors, {password2: {
    //         message: "Password Confirmation must match",
    //         name: "ValidatorError",
    //         properties: {
    //             message: "Path `password2` must match path `password`.",
    //             type: "required",
    //             path: "password2"
    //         },
    //         kind: "required",
    //         path: "password2"
    //     }})
    


    let validatorErrors = newUser.validateSync();
    if (validatorErrors){

        errors = Object.assign(validatorErrors.errors, errors)
    }
    if (req.body.sex === "M"){
        newUser.avatarUrl = '/images/maleDefaultAvatar.jpg'
    } else {
        newUser.avatarUrl = '/images/femaleDefaultAvatar.jpg'
    }
    if (!Validator.isEmail(req.body.email)) {
        errors.email = {
            message: "Invalid Email",
            name: "ValidatorError",
            properties: {
                message: "Path `email` must be a valid email.",
                type: "not valid",
                path: "email"
            },
            kind: "not valid",
            path: "email"
        };
    }
    if (req.body.password !== req.body.password2) errors.password2 = {
        message: "Password Confirmation must match",
        name: "ValidatorError",
        properties: {
            message: "Path `password2` must match path `password`.",
            type: "required",
            path: "password2"
        },
        kind: "required",
        path: "password2"
    };
    const passValid = passwordSchema.validate(req.body.password, { list: true });
    if (passValid.length) {
        errors.password = {
            message: 'Path `password` must have at least 1 number, 8 chars, and one capital letter.',
            name: 'ValidatorError',
            properties: {
                message: "Path `password` must have at least 1 number, 8 chars, and one capital letter.",
                type: "not valid",
                path: "password"
            }
        };
    }

    if ([1,2].includes(req.body.goalPath)) {
        errors.goalPath = {
            message: 'Path `goal path` must be selected.',
            name: 'ValidatorError',
            properties: {
                message: 'goal path must be selected.',
                type: "not valid",
                path: "goalPath"
            }
        };
    }

    if (Object.keys(errors).length !== 0) return res.status(422).json(errors)
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    let payload = Object.assign({}, user.toObject());
                    delete payload.password;
                    delete payload.date;

                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        // Tell the key to expire in one hour
                        { expiresIn: 604_800 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                            });
                        });
                })
                
                .catch(err => res.status(400).json(err.errors));
        })
    })
            // }
})
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    const username = req.body.username;
    const password = req.body.password;

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ username: new RegExp(`^${username}$`, 'i')})
        .then(user => {
            if (!user) {
                // Use the validations to send the error
                errors.username = 'User not found';
                return res.status(400).json(errors);
            };
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        let newUser = Object.assign({}, user.toObject());
                        delete newUser.password;
                        delete newUser.date;
                        const payload = newUser;
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // Tell the key to expire in one hour
                            { expiresIn: 604_800 },
                            (err, token) => {
                                if (err){
                                    return res.status(400).json(errors);
                                }
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        // And here:
                        return res.status(400).json({password: 'Invalid credentials'});
                    }
                })
        }).catch(err => console.log(err))
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
                    _id: user._id
                }
            });
        })
})

router.post('/:username/update', passport.authenticate('jwt', { session: false }), upload.single("avatarUrl"), (req, res) => {
    const s3 = new AWS.S3();
    User.findOne({ username: req.params.username }).then(user => {
        if (!user) return res.status(400).json({ user: { message: "User not found" } })
        const file = req.file;
        const callback = () => {
            user.weightCur = req.body.weightCur;
            user.height = req.body.height;
            user.username = req.body.username;
            user.save(function (error, newFile) {
                if (error) return res.status(422).json(error);
                let newUser = Object.assign({}, user.toObject());
                delete newUser.password;
                delete newUser.date;
                const payload = newUser;
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    // Tell the key to expire in one hour
                    { expiresIn: 604_800 },
                    (err, token) => {
                        if (err) return res.json(err)
                        return res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
            });
        };
        if (file){
            const s3FileURL = keys.UploadFileUrlLink;
            const keyname = file.originalname + uuid();
            let params = {
                Bucket: keys.awsBucketName,
                Key: keyname,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            };
            s3.upload(params, (err, data) => {

                if (err) {
                    res.status(500).json({ error: true, Message: err });
                } else {
                    user.avatarUrl = s3FileURL + keyname;
                    callback();

                }
            })
        } else {
            callback();
        }

    }).catch(err => res.json(err))
    // User.findOne({ username: req.params.username }).then(user => {
    //     if (!user) return res.status(400).json({ user: { message: "User not found" } })
    //     const file = req.file;
    //     const s3FileURL = keys.UploadFileUrlLink;
    //     let params = {
    //         Bucket: keys.awsBucketName,
    //         Key: file.originalname,
    //         Body: file.buffer,
    //         ContentType: file.mimetype
    //         // ACL: 'public-read'
    //     }
    //     const s3 = new AWS.S3({
    //         accessKeyId: keys.awsBucketAccessId,
    //         secretAccessKey: keys.awsBucketToken,
    //         // signatureVersion: 'v4',
    //         region: keys.awsRegion
    //     })
    //     const signedUrl = s3.getSignedUrl('putObject', params, (err, data) => {
    //         if (err) {
    //             res.status(500).json({ error: true, Message: err });
    //         }

    //     })
    //     user.avatarUrl = signedUrl;


    //     user.save(function (error, newFile) {
    //         if (error) {
    //             throw error;
    //         }
    //         res.json({ user });
    //     });
    // })
})
module.exports = router;