const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserMeal = require("../../models/UserMeal")

// get a user's specific meals for a given day on a routine
router.get("/day/:dayId", (req, res) => {
    UserMeal
        .find({ day: req.params.dayId })
        .then(userMeals => res.json(userMeals))
})

// post a meals for a day in the routine
router.post("/day/:dayId/", (req, res) => {
    const newUserMeal = new UserMeal({
        day: req.body.dayId,
        meal: req.body.mealId,
        timeStamp: req.body.timeStamp
    })

    newUserMeal
        .save()
        .then(userMeal => res.json(userMeal))
})