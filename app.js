const mongoose = require('mongoose')
const express = require("express")
const db = require('./config/keys').mongoURI;
const app = express();

const port = process.env.PORT || 5000;


app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => {
    mongoose
        .connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
    })
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch(err => console.log(err));
});