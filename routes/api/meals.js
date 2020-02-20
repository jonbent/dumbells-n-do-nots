const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateMealInput = require("../../validation/meal");
const Meal = require("../../models/Meal");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all availabe meals
router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize);
    const pageNum = parseInt(req.query.pageNum);
    const minCals = parseInt(req.query.minCals);
    const maxCals = parseInt(req.query.maxCals);
    console.log(req)
    const meals = await Meal
     .find()
     .sort({title: 1})
     .gte('calories', minCals)
     .gt('protein', 29)
     .lte('calories', maxCals)
     .limit(pageSize)
     .skip(pageSize * pageNum)
     return res.json(meals)
})

// post a customized meal by the user
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    const { isValid, errors } = validateMealInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newMeal = new Meal({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
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