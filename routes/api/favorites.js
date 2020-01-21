const express = require("express");
const router = express.Router();
const passport = require('passport');
const Favorite = require('../../models/Favorite');
const validateFavorite = require('../../validation/favorite');
router.get('/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        Favorite.find({ favoritable: req.body.favoritableId, favoritableModel: req.body.favoritableType, user: req.user._id})
        .populate('meal')
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateFavorite(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        Favorite.find({ favoritable: req.body.favoritableId, favoritableModel: req.body.favoritableType }).then(favorite => {
            if (favorite) {
                errors.favoritableId = "Favorite Already Exists."
                return res.status(400).json(errors);
            }
            Favorite.create({ favoritable: req.body.favoritableId, favoritableModel: req.body.favoritableType, user: req.user._id })
        })
    }
)
module.exports = router;