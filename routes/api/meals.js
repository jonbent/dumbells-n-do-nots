const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateMealInput = require("../../validation/meal");
const Meal = require("../../models/Meal");
const keys = require('../../config/keys');
const uuid = require('uuid');

const multer = require("multer");
const AWS = require("aws-sdk");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

AWS.config.update({
    accessKeyId: keys.awsBucketAccessId,
    secretAccessKey: keys.awsBucketToken,
    region: keys.awsRegion
});

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// get all availabe meals
router.get("/selected", async (req, res) => {
    const meals = await Meal.find({_id: {$in: req.query.selectedMealIds}})
    return res.json(meals)
});
router.get("/", async (req, res) => {
    const pageSize = parseInt(req.query.pageSize);
    let pageNum = parseInt(req.query.pageNum);
    let minCals = parseInt(req.query.minCals);
    let maxCals = parseInt(req.query.maxCals);
    let searchTerm = req.query.searchTerm ? req.query.searchTerm : "";
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
            },
            title: new RegExp(`^.*${searchTerm}.*$`, 'i'),

        }
    );
    const meals = await Meal
     .find({title: new RegExp(`^.*${searchTerm}.*$`, 'i')})
     .sort({title: 1})
     .gte('calories', minCals)
     .lte('calories', maxCals)
     .gte('protein', 25)
     .limit(pageSize)
     .skip(pageSize * (pageNum - 1));
     return res.json({meals, totalMeals: mealCount})
})

// post a customized meal by the user
router.post("/", passport.authenticate("jwt", {session: false}), upload.single("photoUrl"), async (req, res) => {
    const s3 = new AWS.S3();
    const file = req.file;
    const { isValid, errors } = validateMealInput(req.body);
    if (!isValid) {
        return res.status(422).json(errors);
    }
    const existingMeal = await Meal.findOne({user: req.user._id, title: req.body.title});
    if (existingMeal) return res.status(422).json({name: "Meal name already exists for current user"});
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
    const callback = () => {
        newMeal.save();
        return res.json({newMeal});
    };
    if (file){
        const s3FileURL = keys.UploadFileUrlLink;
        const keyname = file.originalname + uuid();
        let params = {
            Bucket: keys.awsBucketName,
            Key: keyname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        s3.upload(params, (err, data) => {
            if (err) {
                res.status(500).json({ error: true, message: err });
            } else {
                newMeal.photoUrl = s3FileURL + keyname;
                callback();

            }
        })
    } else {
        callback()
    }
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