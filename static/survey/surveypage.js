
// check credentials of login
"use strict";
(function () {
    window.addEventListener('load',initialization);
    function initialization() {
        console.log("init");
        let Sid = document.getElementById('StudentID');
        let pwd = document.getElementById('pwd');
        let SubBtn = document.getElementById('logbtn');
        let save = document.getElementById('saveButton');
        save.addEventListener('click', saveFunction);

        // SubBtn.addEventListener('click', test);
        console.log(SubBtn);
    }

    function test(){
        console.log("out");
    }
    function checkCred() {
        console.log("checkCred");
        // setting cred to true just for now
        let cred = true;
        if (cred){
            let LogDiv = document.getElementById('login');
            let DropDiv= document.getElementById('dropdown');
            console.log(DropDiv);
            DropDiv.classList.remove('visible');
            
        }
        // Retrieve the values of StudentID and password fields
        //let studentIdValue = Sid.value;
        // let pwdValue = pwd.value;

        //check database or json file idk yet.
        //since we seem to be uisng a static folder i would guess json file
        
    }

    function saveFunction() {
        console.log("save function is running");
        const BASE_URL = "http://localhost:8080";
        let yourself = document.getElementById("floatingInputGroupSelf").value;
        let roommate1 = document.getElementById("floatingInputGroup1").value;
        let roommate2 = document.getElementById("floatingInputGroup2").value;
        let roommate3 = document.getElementById("floatingInputGroup3").value;

        let roommateArray = [yourself, roommate1, roommate2, roommate3];
        console.log(roommateArray);
        let data = {method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({StudentIDs: roommateArray})
        }

        console.log(data);

        fetch(BASE_URL + "/group", data)
        .then(response => response.json())
        .then(data => {
            console.log("Data sent:", data);
            alert("Roommates have been saved successfully");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Roommates have not been saved properly");
        });

    }

})();