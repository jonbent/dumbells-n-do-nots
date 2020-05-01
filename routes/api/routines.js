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
    if (!req.query.startDate) return res.status(422).json({message: "Start Date must be provided"});
    const curDate = new Date(DateFormat(req.query.startDate, 'mm/dd/yyyy'));
    curDate.setHours(0,0,0,0);
    const dateRange = [];
    for(let i = 0; i < 7; i++){
        const newDate = new Date(curDate);
        curDate.setDate(curDate.getDate() + 1);
        dateRange.push(newDate);
    }
    const routines = await Routine.find({user: req.user._id});
    const routineIds = routines.map(r => r._id);
    let dates = await Day.find({date: {$in: dateRange}, routine: {$in: routineIds}});
    const datesFound = dates.length ? true : false;
    return datesFound ? (
        res.status(422).json({message: "Please select another date from above, week has already been taken by an existing routine."})
    ) : (
        res.json({datesFound})
    );
});

router.get("/fromToday", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const today = new Date();
    const days = await Day.find({date: {$gte: today}});
    return res.json({days})
    // if (!req.query.startDate) return res.status(422).json({message: "Start Date must be provided"});
    // const curDate = new Date(DateFormat(req.query.startDate, 'mm/dd/yyyy'));
    // curDate.setHours(0,0,0,0);
    // const dateRange = [];
    // for(let i = 0; i < 7; i++){
    //     const newDate = new Date(curDate);
    //     curDate.setDate(curDate.getDate() + 1);
    //     dateRange.push(newDate);
    // }
    // const routines = await Routine.find({user: req.user._id});
    // const routineIds = routines.map(r => r._id);
    // let dates = await Day.find({date: {$in: dateRange}, routine: {$in: routineIds}});
    // const datesFound = dates.length ? true : false;
    // return datesFound ? (
    //     res.status(422).json({message: "Please select another date from above, week has already been taken by an existing routine."})
    // ) : (
    //     res.json({datesFound})
    // );
})
router.get('/user/:userId', async (req, res) => {
    let routines = await Routine.find({user: req.params.userId}).sort({$natural:-1});
    const response = {routines};
    response.days = await Day.find({routine: { $in: routines.map(r => r._id)}});
    await res.json(response);
});

// get user routine
router.get('/user/:userId/single', async (req, res) => {
    const curDate = new Date();
    curDate.setHours(0,0,0,0);
    console.log(curDate);
    const routines = await Routine.find({user: req.params.userId});
    let date = await Day.findOne({date: curDate, routine: {$in: routines.map(r => r._id)}});
    if (!date) return res.status(400).json({errors: {routine: "Cannot find given routine"}});
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

router.put('/:routineId/days/:dayId', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const routine = await Routine.findOne({_id: req.params.routineId});
    if (!routine) return res.status(400).json({errors: {routine: "Cannot find given routine"}});
    if (routine.user.toString() !== req.user._id.toString()) return res.status(401).json({errors: {routine: "Cannot edit other user's routines"}});
    const day = await Day.findOne({_id: req.params.dayId});
    if (!day) return res.status(400).json({errors: {routine: "Cannot find given day"}});
    // const meals = await UserMeal.find({day: day._id});

    const dayMeals = [];
    Object.keys(req.body.meals).forEach((mealId) => {
        dayMeals.push({meal: mealId, quantity: req.body.meals[mealId], day: day._id});
    });
    const exercises = Object.keys(req.body.workout).filter(eId => !!req.body.workout[eId]);
    try {

        await UserMeal.deleteMany({day: day.id});
        await UserWorkout.deleteOne({day: day.id});
        const userMeals = await UserMeal.insertMany(dayMeals);
        if (exercises.length) {
            const newWorkout = new UserWorkout({day: day._id, exercises});
            await newWorkout.save();
            day.workout = newWorkout._id;
        } else {
            day.workout = null;
        }
        day.meals = userMeals.map(dm => dm._id);
        day.save();
    } catch(e) {
        res.status(500).json({message: "Unable to update day"})
    }
    res.redirect(303, `/api/routines/${routine._id}`);
    // if (req.body.workout.length !== 0 ) dayWorkout = {day: days[idx]._id, exercises: req.body[dayString].workout};

})

router.get('/:routineId', async (req, res) => {
    let routine = await Routine.findOne({_id: req.params.routineId});
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
    const day = await Day.findOne({_id: req.params.dayId});
    if (!day) return res.status(422).json({message: "No Day found with given ID."});
    const routine = await Routine.findOne({_id: day.routine});
    if (routine.user.toString() !== req.user._id.toString()) return res.status(422).json({message: "Current User does not own given routine"});
    switch(req.params.completableType){
        case "workout":
            const workout = await UserWorkout.findOne({_id: req.params.completableId});
            if (!workout) return res.status(422).json({message: "Cannot find given workout"});
            if (typeof req.body.doneCheck !== "boolean" ) return res.status(422).json({message: "doneCheck must be provided"});
            workout.doneCheck = req.body.doneCheck;
            workout.save();
            break;
        case "meal":
            const meal = await UserMeal.findOne({ _id: req.params.completableId});
            if (!meal) return res.status(422).json({message: "Cannot find given meal"});
            if (!req.body.doneAmount || isNaN(req.body.doneAmount)) return res.status(422).json({message: "doneAmount must be a valid number"});
            meal.doneAmount += parseInt(req.body.doneAmount);
            meal.save();
            break;
        default: 
            return res.status(422).json({message: "Cannot find completeable type"});
        }
        res.redirect(303, `/api/routines/${routine._id}`);
});

router.patch('/days/:dayId/meals/:mealId', passport.authenticate('jwt', {session: false}), async(req, res) => {
    if (isNaN(req.body.val) || !req.body.val) return res.status(422).json({message: "Val must be a valid number."});
    const day = await Day.findOne({_id: req.params.dayId});
    if (!day) return res.status(422).json({message: "Day not found"});

    const meal = await Meal.findOne({_id: req.params.mealId});
    if (!meal) return res.status(422).json({message: "Meal not found"});

    const routine = await Routine.findOne({_id: day.routine});
    if (!routine) return res.status(422).json({message: "Routine not found"});

    if (routine.user.toString() !== req.user._id.toString()) return res.status(401).json({message: "Unathorized to edit routine."})
    let userMeal = await UserMeal.findOne({day: day._id, meal: meal._id});
    const val = parseInt(req.body.val);
    if (!userMeal) {
        if (req.body.val <= 0) return res.status(422).json({message: "User meal cannot have a negative value for quantity."})
        userMeal = new UserMeal({day: day._id, meal: meal._id, quantity: val});
        day.meals.push(userMeal._id);
        day.save();
    } else {
        if (val + userMeal.quantity < 0) return res.status(422).json({message: "User meal cannot have a negative value for quantity."})
        userMeal.quantity += val;
    }
    userMeal.save();
    return res.redirect(303, `/api/routines/${routine._id}`)
})
router.patch('/days/:dayId/exercises/:exerciseId', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const day = await Day.findOne({_id: req.params.dayId});
    if (!day) return res.status(422).json({message: "Day not found"});
    const routine = await Routine.findOne({_id: day.routine});
    if (!routine) return res.status(422).json({message: "Routine not found"});
    if (routine.user.toString() !== req.user._id.toString()) return res.status(401).json({message: "Unathorized to edit routine."})
    let userWorkout = await UserWorkout.findOne({day: day._id});
    let selected = false;
    if (!userWorkout) {
        userWorkout = new UserWorkout({day: day._id, exercises: [req.params.exerciseId]});
        day.workout = userWorkout._id;
        day.save();
    } else {
        selected = userWorkout.exercises.indexOf(req.params.exerciseId);
        if (selected !== -1){
            userWorkout.exercises.splice(selected, 1);
        } else {
            userWorkout.exercises.push(req.params.exerciseId)
        }
    }
    userWorkout.save()
    res.redirect(303, `/api/routines/${routine._id}`);



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
                        UserWorkout.deleteMany({_id: {$in: weeksWorkouts.map(w => w._id)}});
                        UserMeal.deleteMany({_id: {$in: weeksMeals.map(m => m._id)}});
                        Day.deleteMany({routine: routine._id});
                        Routine.deleteOne({_id: routine._id});
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