const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateMealInput = require("../../validation/meal");
const Meal = require("../../models/Meal");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all availabe meals
router.get("/selected", async (req, res) => {
    console.log(req.query);
    const meals = await Meal.find({_id: {$in: req.query.selectedMealIds}})
    return res.json(meals)
});
router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize);
    let pageNum = parseInt(req.query.pageNum);
    let minCals = parseInt(req.query.minCals);
    let maxCals = parseInt(req.query.maxCals);
    if (isNaN(minCals)) minCals = 0;
    if (isNaN(maxCals) || maxCals === 0) maxCals = 10000;
    if (isNaN(pageNum)) pageNum = 1;
    const mealCount = await Meal.countDocuments(
        {
            calories: {
                $gte: minCals,
                $lte: maxCals
            },
            protein: {
                $gte: 25
            }

        }
    );
    const meals = await Meal
     .find()
     .sort({title: 1})
     .gte('calories', minCals)
     .lte('calories', maxCals)
     .gte('protein', 25)
     .limit(pageSize)
     .skip(pageSize * (pageNum - 1));
     return res.json({meals, totalMeals: mealCount})
})

// post a customized meal by the user
router.post("/", passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log(req);
    const { isValid, errors } = validateMealInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const carbs = parseInt(req.body.carbs);
    const fat = parseInt(req.body.carbs);
    const protein = parseInt(req.body.carbs);
    const calories = (carbs * 4) + (protein * 4) + (fat * 9);
    if (isNaN(calories)) return res.status(422).json({calories: "Unable to create calories from given nutrients"});
    const newMeal = new Meal({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description,
        calories,
        protein,
        fat,
        carbs,
        prepTime: req.body.prepTime,
    });
    console.log(newMeal);
    return res.json({newMeal});
    //
    // newMeal
    //  .save()
    //  .then(meal => res.json(meal))
    }
);

// get user meals
router.get("/user/:user_id", (req, res) => {
    Meal
        .find({ user: req.params.user_id })
        .then(meals => res.json(meals))
})

module.exports = router;