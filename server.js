const express = require('express');
const fs = require('fs'); // Require the 'fs' module to work with the file system
const app = express();
const port = 8080;

app.use(express.static('static'));

// Read the residence hall data from the JSON file
const residenceHallsData = JSON.parse(fs.readFileSync('./reshalls.json'));

// Define an endpoint for your residence halls
app.get('/api/reshalls/:name', (req, res) => {
  const { name } = req.params;

  // Find the image path for the residence hall
  const imagePath = residenceHallsData[name];

  if (!imagePath) {
    res.status(404).json({ error: 'Residence hall not found' });
  } else {
    // Return the image path
    res.json({ imageUrl: imagePath });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
