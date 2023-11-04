const express = require('express');
const fs = require('fs'); // Require the 'fs' module to work with the file system
const app = express();
const port = 8080;

app.use(express.static('static'));

// Read the residence hall data from the JSON file
const residenceHallsData = JSON.parse(fs.readFileSync('ResHall_info.json'));
console.log("json done");
// Define an endpoint for your residence halls
app.get('/api/reshalls/:name', (req, res) => {
  console.log("inside get");
  const name = req.params;
  //FOR SOME REASON NAME IS AN OBJECT. SO I HAD TO DO NAME.NAME
  console.log(name);
  // Find the image path for the residence hall
  const imagePath = residenceHallsData.ResHalls[name.name].img;

  if (!imagePath) {
    res.status(404).json({ error: 'Residence hall not found' });
  } else {
    console.log(imagePath);
    res.json({ imageUrl: imagePath });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
