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

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

const app = express();

app.use(passport.initialize());
require('./config/passport')(passport);

const port = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/exercises", users)
app.use("/api/favorites", users)
app.use("/api/meals", users)
app.use("/api/muscleGroups", users)
app.use("/api/routines", users)
app.use("/api/users", users)
app.use("/api/workouts", users)
app.listen(port, () => {

        

});