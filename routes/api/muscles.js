const express = require("express");
const router = express.Router();
const passport = require('passport');
const Muscle = require('../../models/Muscle');

router.get('/',
    (req, res) => {
        let findQuery = {};
        if (req.body.muscleIds) findQuery = { _id: { $in: req.body.muscleIds } }
        Muscle.find(findQuery)
            .then(muscles => res.json(muscles))
            .catch(err =>
                res.status(404).json({ nomusclegroupsfound: 'No Muscles found' })
            );
    }
)


module.exports = router;