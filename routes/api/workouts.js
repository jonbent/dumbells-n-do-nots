import express from "express"
const router = express.Router();
import passport from "passport"
import validateWorkoutInput from "../../validation/workout.js"
import Workout from "../../models/Workout.js"

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
    const { isValid, errors } = validateWorkoutInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newWorkout = new Workout({
        user: req.user._id,
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


export default router;
