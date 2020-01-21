const express = require("express");
const router = express.Router();
const Routine = require("../../models/Routine");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get user routine
router.get('user/:user_id', (req, res) => {
    Routine
     .find({user: req.params.user_id})
     .then(routine => res.json(routine))
})

module.exports = router;