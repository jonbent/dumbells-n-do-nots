const express = require("express");
const router = express.Router();
const Routine = require("../../models/Routine");
const Day = require("../../models/Day");
const UserMeal = require("../../models/UserMeal");
const Meal = require("../../models/Meal");
const UserWorkout = require("../../models/UserWorkout");
const Exercise = require("../../models/Exercise");
const SampleRoutine = require("../../models/SampleRoutine")
const validateRoutineInput = require("../../validation/routine");
const passport = require("passport");
const DateFormat = require('dateformat')

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get user routine
router.get('/user/:userId', async (req, res) => {
    let date = await Day.find({date: {$eq: new Date(DateFormat(new Date(), "yyyy-mm-dd"))}}).limit(1).sort({$natural:-1});
    let routine = await Routine.find({user: req.params.userId, _id: date[0].routine}).limit(1).sort({$natural:-1});
    routine = routine[0];
    if (!routine) return res.status(400).json({errors: {routine: "Cannot find given routine"}});
    const response = {days: [], userMeals: {}, workouts: {}, routine};
    response.days = await Day.find({routine: routine._id});
    const dayIds = response.days.map(day => day._id);
    const userMeals = await UserMeal.find({day: {$in: dayIds}});
    const mealIds = [];
    let exerciseIds = [];
    userMeals.forEach(userMeal => {
        response.userMeals[userMeal._id] = userMeal;
        mealIds.push(userMeal.meal);
    });
    response.meals = await Meal.find({_id: {$in: mealIds}});
    const workouts = await UserWorkout.find({day: {$in: dayIds}});
    workouts.forEach(workout => {
        response.workouts[workout._id] = workout;
        exerciseIds = exerciseIds.concat(workout.exercises)
    });
    response.exercises = await Exercise.find({_id: {$in: exerciseIds}});
    await res.json(response);
})

router.get('/:routineId', async (req, res) => {
    const routine = await Routine.find({_id: req.params.routineId}).limit(1)
    if (!routine) return res.status(400).json({errors: {routine: "Cannot find given routine"}});

    const response = {days: [], userMeals: {}, workouts: {}, routine};

    response.days = await Day.find({routine: req.params.routineId});
    const dayIds = response.days.map(day => day._id);
    const userMeals = await UserMeal.find({day: {$in: dayIds}});
    const mealIds = [];
    let exerciseIds = [];
    userMeals.forEach(userMeal => {
        response.userMeals[userMeal._id] = userMeal;
        mealIds.push(userMeal.meal);
    });
    response.meals = await Meal.find({_id: {$in: mealIds}});
    const workouts = await UserWorkout.find({day: {$in: dayIds}});
    workouts.forEach(workout => {
        response.workouts[workout._id] = workout;
        exerciseIds = exerciseIds.concat(workout.exercises)
    });
    response.exercises = await Exercise.find({_id: {$in: exerciseIds}});
    await res.json(response);
})


//let user create a routine
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { isValid, errors } = await validateRoutineInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Routine({
        user: req.user.id
    });

    const newDays = [];
    newRoutine
        .save()
        .then(routine => {
            const dayStrings = Object.keys(req.body)
            dayStrings.forEach(dayString => {
                newDays.push({date: new Date(dayString), routine: routine._id});
            });
            Day.insertMany(newDays).then((days) => {
                dayStrings.forEach((dayString, idx) => {
                    const weekMeals = [];
                    const weekWorkouts = [];
                    Object.keys(req.body[dayString].meals).forEach((mealId) => {

                        weekMeals.push({meal: mealId, quantity: req.body[dayString].meals[mealId], day: days[idx]._id});
                    });
                    if ( req.body[dayString].workout.length !== 0 ) weekWorkouts.push({day: days[idx]._id, exercises: req.body[dayString].workout});
                    const mealPromise = UserMeal.insertMany(weekMeals);
                    const workoutPromise = UserWorkout.insertMany(weekWorkouts).then(res => console.log('res', res));
                    Promise.all([workoutPromise, mealPromise]).then(() => {
                        return res.json({routine: newRoutine });
                        // console.log(newRoutine);
                    })
                });
            });
        });
});


// get all sample routines
router.get("/sample/", (req, res) => {
    SampleRoutine
        .find()
        .then(sampleRoutines => res.json(sampleRoutines))
})

module.exports = router;