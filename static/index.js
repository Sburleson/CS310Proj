let isLoggedIn = false;

window.addEventListener('load', init);

function init() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', checkCred);
    toggleNavbarVisibility(); // Initially hide the navigation bar
}

function checkCred(event) {
    event.preventDefault(); // Prevent the form from submitting
    const BASE_URL = "http://localhost:8080";
    const studentID = document.getElementById('StudentID').value;
    const password = document.getElementById('pwd').value;

    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: studentID, pass: password }),
    };

    const loginBtn = document.getElementById('logbtn');
    loginBtn.disabled = true; // Disable the login button during processing

    // Display loader while processing login
    const loginMessages = document.getElementById('loginMessages');
    loginMessages.innerHTML = '<div class="text-center">Logging in...</div>';

    fetch(BASE_URL + '/login', data)
        .then(response => response.json())
        .then(data => {
            if (data.msg === 'success') {
                isLoggedIn = true;
                showSuccessMessage();
            } else {
                isLoggedIn = false;
                showFailureMessage();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFailureMessage();
        })
        .finally(() => {
            loginBtn.disabled = false; // Enable the login button
            toggleNavbarVisibility(); // Show/hide navbar based on login status
        });
}

function showSuccessMessage() {
    const loginMessages = document.getElementById('loginMessages');
    loginMessages.innerHTML = '<div class="text-success text-center">Logged in successfully!</div>';

    // document.getElementById('login').style.display = 'none';
}

function showFailureMessage() {
    const loginMessages = document.getElementById('loginMessages');
    loginMessages.innerHTML = '<div class="text-danger text-center">Login failed. Please check your credentials.</div>';
}

function toggleNavbarVisibility() {
    const navbar = document.querySelector('.navbar');
    navbar.style.visibility = isLoggedIn ? 'visible' : 'hidden';
}
