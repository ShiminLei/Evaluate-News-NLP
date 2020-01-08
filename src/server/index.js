var path = require('path')
const cors = require('cors');
const express = require('express')
const bodyParser = require('body-parser')
var aylien = require("aylien_textapi");

console.log(`Your API key is ${process.env.API_KEY}`);
const dotenv = require('dotenv');
dotenv.config();

let projectData = {};

// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary.
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
    });

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/sentimentApi', function (req, res) {
    const urlNews = req.body.url;
    textapi.sentiment({url: urlNews}, function(error, response) {
        if (error === null) {
            projectData['polarity'] = response.polarity;
            projectData['subjectivity'] = response.subjectivity;
            
            res.send(projectData);
            console.log(projectData)
        } else {
            console.log(error)
        }
    });
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

