const mongoose = require('mongoose')
const express = require("express")
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const exercises = require("./routes/api/exercises");
const favorites = require("./routes/api/favorites");
const meals = require("./routes/api/meals");
const muscleGroups = require("./routes/api/muscleGroups");
const routines = require("./routes/api/routines");
const users = require("./routes/api/users");
const workouts = require("./routes/api/workouts");



const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/exercises", exercises)
app.use("/api/favorites", favorites)
app.use("/api/meals", meals)
app.use("/api/muscleGroups", muscleGroups)
app.use("/api/routines", routines)
app.use("/api/users", users)
app.use("/api/workouts", workouts)
app.listen(port, () => {

    mongoose
        .connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(err));

});