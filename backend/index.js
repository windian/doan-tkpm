var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chatbox/send', function (req, res) {
    const msg = req.body;
    response = { success: true, message: msg.msg };
    res.status(200).json(response);
})

var server = app.listen(4800, function () {
    console.log("Express App running at http://127.0.0.1:4800/");
})