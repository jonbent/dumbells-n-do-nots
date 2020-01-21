const express = require("express");
const router = express.Router();
const Routine = require("../../models/Routine");
const SampleRoutine = require("../../models/SampleRoutine")
const validateRoutineInput = require("../../validation/routine");
const passport = require("passport");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get user routine
router.get('/user/:user_id', (req, res) => {
    Routine
     .find({user: req.params.user_id})
     .then(routine => res.json(routine))
})

//let user create a routine
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { isValid, errors } = validateRoutineInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Routine({
        user: req.user.id,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

    newRoutine
        .save()
        .then(routine => res.json(routine))
    }
)


// get all sample routines
router.get("/sample/", (req, res) => {
    SampleRoutine
        .find()
        .then(sampleRoutines => res.json(sampleRoutines))
})

module.exports = router;