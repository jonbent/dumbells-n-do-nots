const express = require("express");
const router = express.Router();
const passport = require('passport');
const MuscleGroup = require('../../models/MuscleGroup');

router.get('/',
    (req, res) => {
        let findQuery = {};
        if (req.body.muscleGroupIds) findQuery = { _id: { $in: req.body.muscleGroupIds } }
        MuscleGroup.find(findQuery)
            .then(muscleGroups => res.json(muscleGroups))
            .catch(err =>
                res.status(404).json({ nomusclegroupsfound: 'No Muscle Groups found' })
            );
    }
)


module.exports = router;