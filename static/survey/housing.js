// check credentials of login
"use strict";
(function () {
    const BASE_URL = "http://localhost:8080"; // Define BASE_URL outside the functions

    let queueOrder = []; // Define queueOrder outside the functions

    window.addEventListener('load', initialization);

    function initialization() {
        console.log("init");
        let checkQueue = document.getElementById('checkQueue');
        let submit = document.getElementById("submit");
        submit.addEventListener('click', submitFunction);

        checkQueue.addEventListener('click', saveFunction);

        // Fetch the queue order and assign it to the queueOrder variable
        fetch(BASE_URL + "/queue-order")
            .then(response => response.json())
            .then(data => {
                console.log("Received queue order:", data);
                queueOrder = data; // Assign the received data to queueOrder
            })
            .catch(error => {
                console.error("Error fetching queue order:", error);
                // Handle errors with fetching queue order
            });
    }
    

    function saveFunction() {
        console.log("save function is running");
        const BASE_URL = "http://localhost:8080";
        let housingForm = document.getElementById('housingForm');
        
        
                // After saving, fetch and display the queue order
                fetch(BASE_URL + "/queue-order")
                    .then(response => response.json())
                    .then(queueOrder => {
                        console.log("Received queue order:", queueOrder);
                        const YOUR_GROUP_ID = queueOrder.length;
                        
                        alert("Roommates have been saved successfully. Group id is: " + YOUR_GROUP_ID);
                        if (queueOrder.length > 0 && queueOrder[0] === YOUR_GROUP_ID) {
                            // If your group ID is first, show the form
                            housingForm.classList.remove("hidden");
                        }
                        else {
                            housingForm.classList.add("hidden");
                        }
                        // Display the queue order in an HTML list
                        const firstTenEntries = queueOrder.slice(0, 10);

                        let orderHtml = '<h3>Order of Groups in Queue</h3><ol>';
                        firstTenEntries.forEach(function(groupID) {
                            orderHtml += `<li>${groupID}</li>`;
                        });
                        orderHtml += '</ol>';
                        $('#queueOrder').html(orderHtml); // Update the HTML with the queue order
                    })
                    .catch(error => {
                        console.error("Error fetching queue order:", error);
                        // Handle errors with fetching queue order
                    });

                    
            
            
    }

    function submitFunction() {
        const housingIDInput = document.getElementById('housingID');
        const housingID = housingIDInput.value.trim(); // Get the entered housing ID
        const YOUR_GROUP_ID = queueOrder.length; // Assign the group ID from the queueOrder

        if (housingID !== "") {
            // Check room occupancy and attempt to occupy the room
            fetch(BASE_URL + "/checkRoomOccupancy", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ housingID: housingID })
            })
            .then(response => response.json())
            .then(result => {
                if (!result.roomOccupied) {
                    // If room is not occupied, proceed to occupy the room
                    fetch(BASE_URL + "/occupyRoom", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ housingID: housingID, groupID: YOUR_GROUP_ID })
                    })
                    .then(response => response.json())
                    .then(occupyResult => {
                        if (occupyResult.success) {
                            alert(`Room ${housingID} occupied by Group ${YOUR_GROUP_ID}`);

                            if (queueOrder.length > 0) {
                                queueOrder.shift(); // Remove the first element from the array
                                console.log("Queue after removing first group:", queueOrder);
                            }
                            
                        } else {
                            alert(occupyResult.error);
                        }
                    })
                    .catch(error => {
                        console.error("Error occupying room:", error);
                        // Handle error while occupying room
                    });
                } else {
                    alert(`Room ${housingID} is already occupied`);
                }
            })
            .catch(error => {
                console.error("Error checking room occupancy:", error);
                // Handle error while checking room occupancy
            });
        } else {
            alert("Please enter a Housing ID");
        }
    }
    
})();