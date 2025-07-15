import express from "express"
const router = express.Router();
import passport from 'passport'
import Muscle from '../../models/Muscle.js'

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


export default router;
