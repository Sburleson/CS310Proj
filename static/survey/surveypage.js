// check credentials of login
"use strict";
(function () {
    window.addEventListener('load', initialization);

    function initialization() {
        console.log("init");
        let Sid = document.getElementById('StudentID');
        let pwd = document.getElementById('pwd');
        let SubBtn = document.getElementById('logbtn');
        let save = document.getElementById('saveButton');
        save.addEventListener('click', saveFunction);
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
    }

    function displayQueueOrder() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/queue-order',
            success: function(data) {
                console.log("Received queue order:", data); // Log the received data
                let orderHtml = '<h3>Order of Groups in Queue</h3><ol>';
                data.forEach(function(groupID) {
                    orderHtml += `<li>${groupID}</li>`;
                });
                orderHtml += '</ol>';
                $('#queueOrder').html(orderHtml);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
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
        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ StudentIDs: roommateArray })
        }
    
        console.log(data);
    
        fetch(BASE_URL + "/group", data)
            .then(response => response.json())
            .then(savedData => {
                console.log("Data sent:", savedData);
                alert("Roommates have been saved successfully");
    
                // After saving, fetch and display the queue order
                fetch(BASE_URL + "/queue-order")
                    .then(response => response.json())
                    .then(queueOrder => {
                        console.log("Received queue order:", queueOrder);
    
                        // Display the queue order in an HTML list
                        let orderHtml = '<h3>Order of Groups in Queue</h3><ol>';
                        queueOrder.forEach(function(groupID) {
                            orderHtml += `<li>${groupID}</li>`;
                        });
                        orderHtml += '</ol>';
                        $('#queueOrder').html(orderHtml); // Update the HTML with the queue order
                    })
                    .catch(error => {
                        console.error("Error fetching queue order:", error);
                        // Handle errors with fetching queue order
                    });
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Roommates have not been saved properly");
            });
    }
    
})();
