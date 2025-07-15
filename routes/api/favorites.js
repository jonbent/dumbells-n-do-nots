import express from "express";
const router = express.Router();
import passport from 'passport';
import Favorite from '../../models/Favorite.js';
import validateFavorite from '../../validation/favorite.js';
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
export default router;
