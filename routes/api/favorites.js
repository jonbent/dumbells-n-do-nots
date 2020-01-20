const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Favorite = require('../../models/Favorite');
// router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));
router.get('/meals', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Favorite.find({})
    }
)
module.exports = router;