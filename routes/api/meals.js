const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateMealInput = require("../../validation/meal");
const Meal = require("../../models/Meal");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all availabe meals
router.get("/", (req, res) => {
    Meal
     .find()
     .sort({name: 1})
     .then(meals => res.json(meals))
})

// post a customized meal by the user
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { isValid, errors } = validateMealInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newMeal = new Meal({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description,
        nutrients: req.body.nutrients,
        prepTime: req.body.prepTime,
    })

    newMeal
     .save()
     .then(meal => res.json(meal))
    }
)

// get user meals
router.get("/user/:user_id", (req, res) => {
    Meal
        .find({ user: req.params.user_id })
        .then(meals => res.json(meals))
})

module.exports = router;