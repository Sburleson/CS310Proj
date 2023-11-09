(function () {
    "use strict";
    window.addEventListener('load', initialize);

    function initialize() {
        console.log("init");
        let SidEle = document.getElementById('StudentID');
        let pwdEle = document.getElementById('pwd');
        let logBtn = document.getElementById('logbtn');

        console.log(logBtn);

        logBtn.addEventListener('click', checkCred);
    }

    function checkCred(event) {
        event.preventDefault(); // Prevent the form from submitting

        let studentID = document.getElementById('StudentID').value;
        let password = document.getElementById('pwd').value;

        // Make a POST request to the server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ studentID, pwd: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.msg === 'success') {
                console.log('Success');
                showSuccessMessage();
            } else {
                console.log('Fail');
                // Display an error message or handle the failure as needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error as needed
        });
    }

    function showSuccessMessage() {
        // Hide login prompts and show success message
        document.getElementById('login').style.display = 'none';
        // Add a new element to display the success message
        let successMessage = document.createElement('div');
        successMessage.textContent = 'Logged in successfully!';
        successMessage.style.color = 'green';
        document.body.appendChild(successMessage);
    }
})();
