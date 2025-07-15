import path from 'path';
import mongoose from 'mongoose';
import express from "express";
import {mongoURI} from './config/keys.js';
import bodyParser from 'body-parser';
import passport from 'passport';

import exercises from "./routes/api/exercises.js";
import favorites from "./routes/api/favorites.js";
import meals from "./routes/api/meals.js";
import muscleGroups from "./routes/api/muscleGroups.js";
import muscles from "./routes/api/muscles.js";
import routines from "./routes/api/routines.js";
import users from "./routes/api/users.js";
import workouts from "./routes/api/workouts.js";
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
import configurePassport from './config/passport.js';

configurePassport(passport);

const port = process.env.PORT || 3333;

app.use("/api/exercises", exercises);
app.use("/api/favorites", favorites);
app.use("/api/meals", meals);
app.use("/api/muscleGroups", muscleGroups);
app.use("/api/muscles", muscles);
app.use("/api/routines", routines);
app.use("/api/users", users);
app.use("/api/workouts", workouts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.listen(port, () => {

    mongoose.connect(mongoURI, {useUnifiedTopology: true,useNewUrlParser: true,})
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(err));

});
