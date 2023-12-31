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
    console.log(req.body);
    let studentID = req.body.ID;
    let password = req.body.pass;
    try{
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

  //PopReshallX();
})

app.post("/group", async function(req, res) {
  console.log("received group request");
  console.log(req.body.StudentIDs);
  let IDs = req.body.StudentIDs;
  try{
    if(await addgroup(IDs)){
      res.status(200).json({msg: "success"});
        console.log("Success");
    }
    else{
      res.status(400).json({"msg": "group not added!"});
        console.log("Fail");
    }
  }catch(error) {
      console.log(error);
      res.status(500).json({msg: "internal server error"});
  }
})

app.get("/Queue/:type",async function(req,res){
  try{
    let type = req.params.type;
    const db = await getDBConnection();
    const query = `Select max(QID) from ${type}`;
    const rows = await db.all(query);

    console.log(rows);
    res.send(rows)
  }
  catch(error){

  }
  

  await db.close();
})

async function addgroup(StudentIDs){
    //const IDs = StudentIDs.map(id => `"${id}"`).join(',');
    
    console.log("adding to group");
    //console.log(IDs);
    const db = await getDBConnection();
    const query = `Insert into Groups(ID,StudentIDs) values(1,"${StudentIDs}")`;     
    console.log(query);   
    const rows = await db.all(query);            

    await db.close();
}

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

async function getPosition(){
    const db = await getDBConnection();
    const query = "SELECT ID,Password from Students where ID is "+studentID;
    const rows = await db.all(query);

    await db.close();
    return rows;
}

async function PopReshallX(){
  console.log("in pop");
  const db = await getDBConnection();

  let rooms = 10;
  let halls = 8;

  for(let x=0; x<halls; x++){
    for(let y=0; y<rooms; y++){
      const query = `INSERT INTO ResHallX(ResHallID,RoomNum) VALUES(${x},${y})`;
      const rows = await db.all(query);
    }
  }

  console.log("poped");
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
