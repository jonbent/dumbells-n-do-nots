import express from "express"
const router = express.Router();
import passport from 'passport'
import MuscleGroup from '../../models/MuscleGroup.js'

router.get('/',
    (req, res) => {
        let findQuery = {};
        if (req.body && req.body.muscleGroupIds) findQuery = { _id: { $in: req.body.muscleGroupIds } }
        MuscleGroup.find(findQuery)
            .then(muscleGroups => res.json(muscleGroups))
            .catch(err =>
                res.status(404).json({ nomusclegroupsfound: 'No Muscle Groups found' })
            );
    }
)


export default router;
