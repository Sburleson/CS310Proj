const express = require('express');
const fs = require('fs'); // Require the 'fs' module to work with the file system
const { get } = require('http');
const multer = require("multer");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const port = 8080;
const DB_PATH = "Housing.db";
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
app.use(express.static('static'));
// Read the residence hall data from the JSON file
const residenceHallsData = JSON.parse(fs.readFileSync('ResHall_info.json'));
console.log("json done");
// Define an endpoint for your residence halls
app.get('/api/reshalls/:name', (req, res) => {
  try{
      const name = req.params;
      //FOR SOME REASON NAME IS AN OBJECT. SO I HAD TO DO NAME.NAME
      console.log(name);
      // Find the image path for the residence hall
      if(name.name == "all"){
        console.log("here");
        res.send(residenceHallsData);
        console.log(residenceHallsData);
      }
      else if(name.name in residenceHallsData.ResHalls){
        const imagePath = residenceHallsData.ResHalls[name.name].img;
        if (!imagePath) {
          res.status(404).json({ error: 'Residence hall not found' });
        } else {
          console.log(imagePath);
          res.json({ imageUrl: imagePath });
          res.type('img').send(imagePath);
        }
      }
  }catch(error){
    console.log(error);
  }
});
app.post("/login", async function(req, res) {
    console.log("received login request");
    console.log(req.params);
    console.log(req.body);
    let studentID = req.body.ID;
    let password = req.body.pass;
    try {
    if (await validation(studentID, password)) {
        res.status(200).json({msg: "success"});
        console.log("Success");
    }
    else {
        res.status(400).json({"msg": "Password incorrect!"});
        console.log("Fail");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "internal server error"});
  }
})
async function validation(studentID, pwd) {
    const db = await getDBConnection();
    const query = "SELECT ID,Password from Students where ID is "+studentID;
    const rows = await db.all(query);
    await db.close();
    if (rows.length > 0) {
      console.log(rows[0]);
      return rows[0]["Password"] == pwd;
    } else {
      return false;
    }
}
app.post("/group", async function(req, res) {
  const StudentIDs  = req.body.studentID;
  try {
    await insertIntoGroups(StudentIDs);
    res.status(200).json({ msg: "Data inserted successfully into groups table" });
    console.log("Data inserted into groups table");
  } catch (error) {
    console.error("Error in /group endpoint:", error); // Log the specific error
    res.status(500).json({ msg: "Internal server error in /group endpoint" });
  }
});


async function insertIntoGroups(StudentIDs) {
  const db = await getDBConnection();
  try {
    // Insert into the groups table
    const groupInsertQuery = "INSERT INTO groups (StudentIDs) VALUES (?)";
    let result = await db.run(groupInsertQuery, [JSON.stringify(StudentIDs)]);
    console.log(result);
    // Fetch credits for the students
    const studentsCreditsQuery = `SELECT ID, Credits FROM Students WHERE ID IN (${StudentIDs.join(",")})`;
    const studentCredits = await db.all(studentsCreditsQuery);

    // Calculate average credits
    let totalCredits = 0;
    studentCredits.forEach(student => {
      totalCredits += parseInt(student.Credits, 10) || 0; // Ensure proper parsing to integer
    });
    const numberOfStudents = StudentIDs.length;
    const averageCredits = totalCredits / numberOfStudents;

    // Insert into the queues2 table
    const insertQueueQuery = "INSERT INTO Queues2 (GroupID, AverageCredits) VALUES (?, ?)";
    await db.run(insertQueueQuery, [ID, averageCredits]);

    // Log for debugging
    console.log("Average credits for the group:", averageCredits);
  } catch (error) {
    console.error("Error inserting into groups and queues2:", error);
    throw error;
  } finally {
    await db.close();
  }
}


app.get('/queue-order', async (req, res) => {
  try {
    const queueOrder = await getQueueOrderFromDatabase();
    res.json(queueOrder);
  } catch (error) {
    console.error("Error in /queue-order endpoint:", error);
    res.status(500).json({ error: 'Failed to retrieve queue order from the database' });
  }
});

async function getQueueOrderFromDatabase() {
  const db = await getDBConnection();
  try {
    const query = "SELECT GroupID FROM queues2 ORDER BY AverageCredits DESC";
    const queueData = await db.all(query);

    console.log("Queue Data:", queueData); // Log retrieved queue data

    const queueOrder = queueData.map(item => item.GroupID);
    return queueOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve queue order from the database');
  } finally {
    await db.close();
  }
}








async function getDBConnection() {
    const db = await sqlite.open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
    return db;
}
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
