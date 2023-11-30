const { group } = require('console');
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
  const StudentIDs  = req.body.StudentIDs;
  console.log(StudentIDs);
  try {
    await insertIntoGroups(StudentIDs);
    res.status(200).json({ msg: "Data inserted successfully into groups table"});
    console.log("Data inserted into groups table");
    
    
  } catch (error) {
    console.error("Error in /group endpoint:", error); // Log the specific error
    res.status(500).json({ msg: "Internal server error in /group endpoint" });
  }
});


async function insertIntoGroups(StudentIDs) {
  const db = await getDBConnection();
  try {
    
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
    // Insert into the groups table
    const groupInsertQuery = "INSERT INTO groups (StudentIDs, AverageCredits) VALUES (?, ?)";
    let result = await db.run(groupInsertQuery, [JSON.stringify(StudentIDs), averageCredits]);
    console.log(result);
    
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
    const result = await getQueueOrderFromDatabase();
    const queueOrder = result[0];
    const queueLen = result[1];
    res.status(200).json({"Length": queueLen, "Groups": queueOrder});
  } catch (error) {
    console.error("Error in /queue-order endpoint:", error);
    res.status(500).json({ error: 'Failed to retrieve queue order from the database' });
  }
});

async function getQueueOrderFromDatabase() {
  const db = await getDBConnection();
  try {
    const groupsQuery = "SELECT ID FROM groups WHERE RoomID IS NULL ORDER BY AverageCredits DESC";
    const queueData = await db.all(groupsQuery);
    const queueLenQuery = "SELECT * FROM groups";
    const result = await db.all(queueLenQuery);
    const queueLen = result.length;
    console.log("Queue Len = " + queueLen);
    console.log("Queue Data:", queueData); // Log retrieved queue data

    const queueOrder = queueData.map(item => item.ID);
    console.log(queueOrder);
    return [queueOrder, queueLen];

  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve queue order from the database');
  } finally {
    await db.close();
  }
}

app.post("/checkRoomOccupancy", async (req, res) => {
  const { housingID } = req.body;
  try {
      const db = await getDBConnection();
      const query = `SELECT * FROM reshallx WHERE RoomID = ? AND occupiedBy IS NOT NULL`;
      const result = await db.get(query, [housingID]);
      await db.close();

      if (result) {
          res.json({ roomOccupied: true });
          console.log("Room is occupied");
      } else {
          res.json({ roomOccupied: false });
          console.log("Room is vacant");
      }
      
  } catch (error) {
      console.error("Error checking room occupancy:", error);
      res.status(500).json({ error: 'Internal server error while checking room occupancy' });
  }
});

app.post("/occupyRoom", async (req, res) => {
  const { housingID, groupID } = req.body;
  console.log("Housing ID = " + housingID + ", group ID is " + groupID);
  try {
      const db = await getDBConnection();
      const checkOccupancyQuery = `SELECT * FROM reshallx WHERE RoomID = ? AND occupiedBy IS NOT NULL`;
      const result = await db.get(checkOccupancyQuery, [housingID]);

      if (!result) {
          const updateQuery = `UPDATE reshallx SET occupiedBy = ? WHERE RoomID = ?`;
          await db.run(updateQuery, [groupID, housingID]);
          const updateGroupQuery = `UPDATE Groups Set RoomID = ? WHERE ID = ?`;
          await db.run(updateGroupQuery, [housingID, groupID]);
          console.log("Group id is: " + groupID);
          await db.close();

          res.json({ success: true, message: `Room ${housingID} occupied by Group ${groupID}` });
      } else {
          await db.close();
          res.status(400).json({ error: `Room ${housingID} is already occupied` });
      }
  } catch (error) {
      console.error("Error occupying room:", error);
      res.status(500).json({ error: 'Internal server error while occupying room' });
  }
});



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

