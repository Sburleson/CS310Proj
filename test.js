(function () {
    "use strict";
    const express = require("express");
    const { platform } = require("os");
    const { promises: fs } = require("fs");

    const app = express();
    const PORT = process.env.PORT || 8080;

    // Middleware function
    app.use(getResHalls);

    // JSON API
    async function getResHalls(req, res, next) {
        console.log("here");
        try {
            let ResHalls = await fs.readFile('JSON_files/ResHall_info.json', 'utf-8');
            ResHalls = JSON.parse(ResHalls);
            console.log(ResHalls);
            next(); // Call next() to proceed to the next middleware or route
        } 
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); // Handle the error and send an error response
        }
    }

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})();

