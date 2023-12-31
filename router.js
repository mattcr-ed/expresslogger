//Routes for the REST API

//Set required exports
const express = require('express');
const config = require('./config.json');
const fs = require('fs');
const router = express.Router();

//Default POST function, dumps the supplied data to a log file
router.post('/', function(req, res) {
    //Check if we've actually got something in the query. If nothing, return error
    if (!req.query) {
        res.status(400);
        res.json({message: "Bad request"});
    //Actually have a query, so process it
    } else {
        //Get the date and time
        const date = new Date();
        //Build the string to log
        let toLog = "\n" + date.toISOString() + "\n" + req.query.data + "\n";
        //Append to logging file, catch errors
        fs.appendFile(config.lSaveLoc, toLog, (err) => {
            if (err) {
                console.log(err);
            }
        })
        //Return success for those listening
        res.json({message: "Data logged"});
        res.status(200);
    }
});

router.post('/logaction', function(req, res) {
    if (!req.query.id || !req.query.message || !req.query.severity) {
        res.status(400);
        res.json({ message: "Bad Request!" });
    } else {
        let date = new Date();
        let toLog = "\n" + date.toISOString() + " Process: " + req.query.id + " Severity: " + req.query.severity + "\n";
        fs.appendFile(config.lSaveLoc, toLog, (err) => {
            if (err) { console.log(err) };
        })
        fs.appendFile(config.lSaveLoc, req.query.message, (err) => {
            if (err) { console.log(err) };
        });
        res.json({ message: "Success!" });
        res.status(200);
    }
});

module.exports = router;