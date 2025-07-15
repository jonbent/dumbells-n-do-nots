import express from "express";
const router = express.Router();
import validateRegisterInput from '../../validation/register.js';
import validateLoginInput from '../../validation/login.js';
import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import Day from '../../models/Day.js';
import Routine from '../../models/Routine.js';
import UserMeal from '../../models/UserMeal.js';
import UserWorkout from '../../models/UserWorkout.js';
import jwt from 'jsonwebtoken';
import {
    awsBucketName,
    awsBucketAccessId,
    secretOrKey,
    awsBucketToken,
    awsRegion,
UploadFileUrlLink} from '../../config/keys.js';
import passport from 'passport';
import {v4 as uuid} from 'uuid';
import Validator from 'validator';
import passwordValidator from 'password-validator';
import sampleRoutine from '../../sampleroutine.js';


import multer from "multer";
import AWS from "aws-sdk";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
    accessKeyId: awsBucketAccessId,
    secretAccessKey: awsBucketToken,
    region: awsRegion
});

const createDemoRoutine = async (req, res, user) => {
    const curDate = new Date();
    const dateRange = [];
    curDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        dateRange.push(new Date(curDate));
        curDate.setDate(curDate.getDate() + 1);
    }

    // Find existing routines for this user
    const routines = await Routine.find({ user: "5e601d09012e125773768324" });
    const routineIds = routines.map(r => r._id);

    const dates = await Day.find({
        date: { $in: dateRange },
        routine: { $in: routineIds }
    });

    if (dates.length !== 0) {
        return null;
    } else {
        const sampleRoutineKeys = Object.keys(sampleRoutine);
        const newRoutine = {};

        dateRange.forEach((date, idx) => {
            let month = date.getMonth() + 1;
            if (month < 10) month = `0${month}`;
            let day = date.getDate();
            if (day < 10) day = `0${day}`;
            const year = date.getFullYear();
            newRoutine[`${month}/${day}/${year}`] = sampleRoutine[sampleRoutineKeys[idx]];
        });

        // Create new Routine
        const newUserRoutine = new Routine({
            user: user._id
        });

        await newUserRoutine.save();

        // Create Day documents
        const newDaysData = dateRange.map(date => ({
            date,
            routine: newUserRoutine._id
        }));

        const days = await Day.insertMany(newDaysData);

        newUserRoutine.days = days.map(day => day._id);
        await newUserRoutine.save();

        const weeksWorkouts = [];
        let weeksMeals = [];
        const dayStrings = Object.keys(newRoutine);

        try {
            for (let idx = 0; idx < dayStrings.length; idx++) {
                const dayString = dayStrings[idx];
                const dayData = newRoutine[dayString];
                const dayDoc = days[idx];

                // Prepare meals for the day
                const dayMeals = Object.keys(dayData.meals).map(mealId => ({
                    meal: mealId,
                    quantity: dayData.meals[mealId],
                    day: dayDoc._id
                }));

                // Insert meals
                const meals = await UserMeal.insertMany(dayMeals);
                weeksMeals = weeksMeals.concat(meals);

                // Prepare workout if exists
                const workoutKeys = Object.keys(dayData.workout).filter(
                    exKey => dayData.workout[exKey] === true
                );

                let workout;
                if (workoutKeys.length !== 0) {
                    const newWorkout = new UserWorkout({
                        day: dayDoc._id,
                        exercises: workoutKeys
                    });
                    workout = await newWorkout.save();
                    weeksWorkouts.push(workout);
                }

                // Save meal and workout refs to the Day
                dayDoc.meals = meals.map(meal => meal._id);
                if (workout) {
                    dayDoc.workout = workout._id;
                }
                await dayDoc.save();
            }

            return newUserRoutine;
        } catch (e) {
            console.error("ERROR creating demo routine!", e);

            // Cleanup all partial data
            if (weeksWorkouts.length > 0) {
                await UserWorkout.deleteMany({
                    _id: { $in: weeksWorkouts.map(w => w._id) }
                });
            }

            if (weeksMeals.length > 0) {
                await UserMeal.deleteMany({
                    _id: { $in: weeksMeals.map(m => m._id) }
                });
            }

            await Day.deleteMany({ routine: newUserRoutine._id });
            await Routine.deleteOne({ _id: newUserRoutine._id });

            throw e;
        }
    }
};


router.get('/demo', async (req, res) => {
    let r = await Routine.find({user: "5e601d09012e125773768324"});
    Day.deleteMany({"routine": r._id});
    Routine.deleteOne({"_id": r._id});
    return res.json({message: r})
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
                        secretOrKey,
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
                .then(async isMatch => {
                    if (isMatch) {
                        if (user._id.toString() === "5e601d09012e125773768324") await createDemoRoutine(req, res, user);
                        let newUser = Object.assign({}, user.toObject());
                        delete newUser.password;
                        delete newUser.date;
                        const payload = newUser;
                        jwt.sign(
                            payload,
                            secretOrKey,
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
                    _id: user._id
                }
            });
        })
})

router.patch('/:username/update', passport.authenticate('jwt', { session: false }), upload.single("avatarUrl"), async (req, res) => {
    const s3 = new AWS.S3();
    try {
      const user = await User.findOne({ username: req.params.username });

      if (!user) {
        return res.status(400).json({ user: { message: "User not found" } });
      }

      const file = req.file;

      if (file) {
        console.log(UploadFileUrlLink);
        console.log(awsBucketName);

        const s3FileURL = UploadFileUrlLink;
        const keyname = file.originalname + uuid();

        const params = {
          Bucket: awsBucketName,
          Key: keyname,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read"

        };

        const data = await s3.upload(params).promise();

        user.avatarUrl = s3FileURL + keyname;
      }

      user.weightCur = req.body.weightCur;
      user.height = req.body.height;
      user.username = req.body.username;

      if (Validator.isEmail(req.body.email)) {
        user.email = req.body.email;
      }

      await user.save();

      let newUser = Object.assign({}, user.toObject());
      delete newUser.password;
      delete newUser.date;

      const payload = newUser;

      jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 604_800 },
        (err, token) => {
          if (err) return res.json(err);
          return res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }

})
export default router;
