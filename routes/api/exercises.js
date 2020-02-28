const express = require("express");
const router = express.Router();
const Exercise = require("../../models/Exercise");
const passport = require("passport");
const validateExerciseInput = require("../../validation/exercise")

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all available execises for a muscle group
router.get('muscleGroups/:muscleGroupId', (req, res) => {
    Exercise
        .find({ muscleGroup: req.params.muscleGroupId })
        .then(exercises => res.json(exercises))
})
router.get('/', (req, res) => {
    let findQuery = {};
    if (req.query.muscleGroupIds) findQuery = { muscleGroup: { $in: req.query.muscleGroupIds } }
    
    Exercise
        .find(findQuery)
        .then(exercises => res.json(exercises))

})
// get all available exercises foa a muscle
router.get('muscle/:muscleId', (req, res) => {
    Exercise
        .find({ muscle: req.params.muscleId })
        .then(exercises => res.json(exercises))
})
// possibly create an exercise from a user
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const {isValid, errors} = validateExerciseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newExercise = new Exercise({
        user: req.user._id,
        name: req.body.name,
        description: req.body.description,
        muscleGroup: req.body.muscleGroupId,
        // numSets: req.body.numSets,
        // numReps: req.body.numReps,
        // interval: req.body.interval
    });
    newExercise.save();
    return res.json({newExercise});
})

module.exports = router;