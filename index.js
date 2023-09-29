
(function () {
    "use strict";
    window.addEventListener('load',initialize);

    function initialize() {
        console.log("init");
        let SidEle = document.getElementById('StudentID');
        let pwdEle = document.getElementById('pwd');
        let logBtn = document.getElementById('logbtn');

        console.log(logBtn);

        logBtn.addEventListener('click',checkCred);
    }

    function checkCred() {
        console.log("checkCred");
        // setting cred to true just for now
        let cred = true;
        if (cred){
        console.log("checked");
              
        }
        window.location.href = 'reshalls/ResHalls.html'; 
            
    }

})();