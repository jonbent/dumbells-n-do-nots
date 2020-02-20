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
router.get("/startDate", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const curDate = new Date(req.query.startDate);
    const dateRange = [];
    for(let i = 0; i < 7; i++){
        curDate.setDate(curDate.getDate() + 1);
        const newDate = new Date(DateFormat(curDate, 'yyyy-mm-dd'));
        dateRange.push(newDate);
    }
    const routines = await Routine.find({user: req.user._id});
    const routineIds = routines.map(r => r._id);
    let dates = await Day.find({date: {$in: dateRange}, routine: {$in: routineIds}});
    const datesFound = dates.length ? true : false;
    return datesFound ? (
        res.status(422).json({message: "Week already taken by existing routine"})
    ) : (
        res.json({datesFound})
    );

})
router.get('/user/:userId', async (req, res) => {
    let routines = await Routine.find({user: req.params.userId}).sort({$natural:-1});
    const response = {routines};
    response.days = await Day.find({routine: { $in: routines.map(r => r._id)}});
    await res.json(response);
});

// get user routine
router.get('/user/:userId/single', async (req, res) => {
    const curDate = new Date(DateFormat(new Date(), "yyyy-mm-dd"));
    curDate.setDate(curDate.getDate() + 1);
    const routines = await Routine.find({user: req.params.userId});
    let date = await Day.findOne({date: {$eq: curDate}, routine: {$in: routines.map(r => r._id)}})
    const routine = await Routine.findOne({user: req.params.userId, _id: date.routine});
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
});

router.get('/:routineId', async (req, res) => {
    let routine = await Routine.find({_id: req.params.routineId}).limit(1);
    routine = routine[0];
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

// update routine to checkDone meals and workout
router.put("/days/:dayId/:completableType/:completableId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const day = await Day.findOne({_id: req.params.dayId})
    const routine = await Routine.findOne({_id: day.routine})
    switch(req.params.completableType){
        case "workout":
            const workout = await UserWorkout.findOne({_id: req.params.completableId})
            workout.doneCheck = req.body.doneCheck
            workout.save()
            break;
        case "meal":
            const meal = await UserMeal.findOne({ _id: req.params.completableId})
            meal.doneAmount += parseInt(req.body.doneAmount)
            meal.save()
            break;
        default: 
            break;
        }
        res.redirect(303, `/api/routines/${routine._id}`)
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
    const dateRange = [];
    const dayStrings = Object.keys(req.body);
    dayStrings.forEach(dayString => {
        let routineDay = new Date(dayString);
        routineDay.setDate(routineDay.getDate() + 1);
        dateRange.push(routineDay);

    });
    const routines = await Routine.find({user: req.user._id});
    const routineIds = routines.map(r => r._id);
    let dates = await Day.find({date: {$in: dateRange}, routine: {$in: routineIds}});
    if (dates.length !== 0) return res.status(400).json({dates: "Dates already exist "});
    newRoutine
        .save()
        .then(routine => {
            dateRange.forEach(date => {
                newDays.push({date, routine: routine._id});
            });
            Day.insertMany(newDays).then((days) => {
                routine.days = days.map(day => day._id);
                routine.save();
                const weeksWorkouts = [];
                let weeksMeals = [];
                dayStrings.forEach(async (dayString, idx) => {
                    const dayMeals = [];
                    let dayWorkout;

                    Object.keys(req.body[dayString].meals).forEach((mealId) => {
                        dayMeals.push({meal: mealId, quantity: req.body[dayString].meals[mealId], day: days[idx]._id});
                    });
                    if ( req.body[dayString].workout.length !== 0 ) dayWorkout = {day: days[idx]._id, exercises: req.body[dayString].workout};
                    let meals;
                    let newWorkout;
                    let workout;
                    try {
                        if ( req.body[dayString].workout.length !== 0 ){
                            newWorkout = new UserWorkout(dayWorkout);
                            workout = await newWorkout.save();
                            weeksWorkouts.push(workout);
                        }

                         meals = await UserMeal.insertMany(dayMeals);
                         weeksMeals = weeksMeals.concat(meals);

                    } catch(e) {
                        console.log('error:', e);
                        UserWorkout.deleteMany({_id: {$in: weeksWorkouts.map(w => w._id)}}).catch(err => console.log(err));
                        UserMeal.deleteMany({_id: {$in: weeksMeals.map(m => m._id)}}).catch(err => console.log(err));
                        Day.deleteMany({routine: routine._id}).catch(err => console.log(err));
                        Routine.deleteOne({_id: routine._id}).catch(err => console.log(err));
                        return res.status(422).json({dates: "Unable to insert with given information"})

                    }
                    days[idx].meals = meals.map(meal => meal._id);
                    if ( req.body[dayString].workout.length !== 0 ) days[idx].workout = workout._id;
                    days[idx].save();


                });
            });
            return res.redirect(`${routine._id}`);
        });
});


// get all sample routines
router.get("/sample/", (req, res) => {
    SampleRoutine
        .find()
        .then(sampleRoutines => res.json(sampleRoutines))
})

module.exports = router;