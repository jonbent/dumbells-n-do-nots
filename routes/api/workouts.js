const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateWorkoutInput = require("../../validation/workout");
const Workout = require("../../models/Workout");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all availabe workouts
router.get("/", (req, res) => {
    if (req.body.muscleGroupIds){
        const request = new XMLHttpRequest();
    } else {
        Workout
            .find()
            .sort({ name: 1 })
            .then(workouts => res.json(workouts))
    }
})

// post a customized workout by the user
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log(Object.keys(req))
    const { isValid, errors } = validateWorkoutInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newWorkout = new Workout({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description
    })

    newWorkout
        .save()
        .then(workout => res.json(workout))
}
)

// get user workouts
router.get("/user/:user_id", (req, res) => {
    Workout
        .find({ user: req.params.user_id })
        .then(workouts => res.json(workouts))
})


module.exports = router;