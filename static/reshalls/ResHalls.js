//const { response } = require("express");

const APIURL = "http://localhost:8080";

window.addEventListener("load", init);

function init(){
  console.log("int");
  const dropdown = document.querySelector("#dropdown"); // Correct the dropdown ID to match your HTML
  console.log(dropdown);
  const selectedImage = document.getElementById('selected-image');
    // Fetch the residence hall data from your API and populate the dropdown
  fetch(APIURL+'/api/reshalls/all')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    populateDropdown(data);
  })
  .catch((error) => {
    console.error('Error fetching data from the API:', error);
  });

  // Event listener for dropdown changes
  dropdown.addEventListener('change', () => {
  const selectedBuilding = dropdown.value;
  console.log(selectedBuilding);

  // Fetch the specific residence hall by name
  fetch(`/api/reshalls/${selectedBuilding}`)
    .then((response) => {
      if (response.status === 404) {
        console.error('Residence hall not found.');
      } else{
        return response.json();
      }
    })
    .then((buildingData) => {
      // Hide all images first
      let element = document.querySelector('div#ResPhotos');
      element.innerHTML = "";
      //.forEach((img) => img.classList.add('hide'));
      console.log(buildingData);
      // Show the selected image
      let newimage = document.createElement("img");
      newimage.src = buildingData.imageUrl;  
      element.appendChild(newimage);
    })
    .catch((error) => {
      console.error('Error fetching building data from the API:', error);
    });
  });
}

// Function to populate the dropdown with residence hall names
function populateDropdown(data) {
  console.log(data.ResHalls);
  for(hall in data.ResHalls){
    //console.log(hall);
    const option = document.createElement('option');
    option.value = hall;
    option.textContent = hall;
    //console.log(option);
    dropdown.appendChild(option);
  }

}