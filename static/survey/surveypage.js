

// // check credentials of login
// "use strict";
// (function () {
//     window.addEventListener('load', initialization);

//     function initialization() {
//         console.log("init");
//         let Sid = document.getElementById('StudentID');
//         let pwd = document.getElementById('pwd');
//         let SubBtn = document.getElementById('logbtn');
//         let save = document.getElementById('saveButton');
//         save.addEventListener('click', saveFunction);

//         console.log(SubBtn);
//     }

//     function test(){
//         console.log("out");
//     }

//     function checkCred() {
//         console.log("checkCred");
//         // setting cred to true just for now
//         let cred = true;
//         if (cred){
//             let LogDiv = document.getElementById('login');
//             let DropDiv= document.getElementById('dropdown');
//             console.log(DropDiv);
//             DropDiv.classList.remove('visible');
//         }
       
//     }

//     function saveFunction() {
//         const BASE_URL = "http://localhost:8080";
//         let yourself = document.getElementById("floatingInputGroupSelf").value;
//         let roommate1 = document.getElementById("floatingInputGroup1").value;
//         let roommate2 = document.getElementById("floatingInputGroup2").value;
//         let roommate3 = document.getElementById("floatingInputGroup3").value;
        
//         let roommateArray = [yourself, roommate1, roommate2, roommate3];
      
//         let data = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ studentIDs: roommateArray })
//         };
      
//         fetch(BASE_URL + "/group", data)
//           .then(response => response.json())
//           .then(groupData => {
//             console.log("Group data:", groupData);
//             alert("Roommates have been saved successfully");
      
//             // Call function to display the queue order
//             displayQueueOrder();
//           })
//           .catch(error => {
//             console.error("Error:", error);
//             alert("Roommates have not been saved properly");
//           });
//       }
      
//       // Function to display the queue order
//       function displayQueueOrder() {
//         const BASE_URL = "http://localhost:8080";
//         $.ajax({
//           type: 'GET',
//           url: BASE_URL + '/queue-order',
//           success: function(queueOrder) {
//             let orderHtml = '<h3>Order of Groups in Queue</h3><ol>';
//             queueOrder.forEach(function(groupID) {
//               orderHtml += `<li>${groupID}</li>`;
//             });
//             orderHtml += '</ol>';
//             $('#queueOrder').html(orderHtml);
//           },
//           error: function(xhr, status, error) {
//             console.error(error);
//           }
//         });
//       }

// })();

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

        let data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ StudentIDs: roommateArray })
        };

        fetch(BASE_URL + "/group", data)
            .then(checkStatus)
            .then(response => response.json())
            .then((savedData) => {
                alert("Roommates have been saved successfully");
                displayQueueOrder();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Roommates have not been saved properly");
            });
    }

    function displayQueueOrder() {
        const BASE_URL = "http://localhost:8080";
        $.ajax({
            type: 'GET',
            url: BASE_URL + '/queue-order',
            success: function(queueOrder) {
                let orderHtml = '<h3>Order of Groups in Queue</h3><ol>';
                queueOrder.forEach(function(groupID) {
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
})();

function checkStatus(response) {
    console.log(response);
    if (response.ok) {
        return response.json();
    }
    else {
        Promise.reject(new Error('fail'));
    }
}