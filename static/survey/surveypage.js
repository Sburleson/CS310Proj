
// check credentials of login
"use strict";
(function () {
    window.addEventListener('load',initialization);
    function initialization() {
        console.log("init");
        let Sid = document.getElementById('StudentID');
        let pwd = document.getElementById('pwd');
        let SubBtn = document.getElementById('saveButton');
        console.log(SubBtn);
        SubBtn.addEventListener('click', test);
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
})();