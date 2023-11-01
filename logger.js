//Lightweight Express.JS app for programs to log issues in my network
//Simply takes data and dumps to log file
//Log file is rotated in OS

//Set required exports
const express = require('express');
const router = require('./router.js');

//App boilerplayer
const app = express();
app.use(express.json());
app.use('/', router);

//Set a port, 2500 not really used so borrowing it
const PORT = process.env.PORT || 2500;

//Start the app
app.listen(PORT, () => {
    console.log("Logger listening on PORT: ", PORT);
});