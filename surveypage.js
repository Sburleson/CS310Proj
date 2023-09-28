// check credentials of login
(function () {
    window.onload = initialization;

    function initialization() {
        let Sid = document.getElementById('StudentID');
        let pwd = document.getElementById('pwd');
        let SubBtn = document.getElementById('logbtn');

        SubBtn.addEventListener('click', checkCred);

        function checkCred() {
            // Retrieve the values of StudentID and password fields
            let studentIdValue = Sid.value;
            let pwdValue = pwd.value;

            //check database or json file idk yet.
            //since we seem to be uisng a static folder i would guess json file
            if (cred){
                let LogDiv = getElementById('login');

                LogDiv.classList.add('loggedin');
                LogDiv.classList.remove('not-loggedin');
                
            }
        }
    }
})();