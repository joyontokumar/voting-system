const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const pollController = require('./pollController');

app.set('view engine', 'ejs')

app.get('/create', pollController.createPollGetController);
app.post('/create', pollController.createPollPostController);
app.get('/polls', pollController.getAllPolls);
app.get('/polls/:id', pollController.viewPollGetController);
app.post('/polls/:id', pollController.viewPollPostController);


app.get('/', (req, res) => {
    res.render('home');
});

mongoose.connect('mongodb://localhost:27017/poll', { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => {
            console.log("server running");
        })
    })
    .catch(e => {
        console.log(e)
    })
