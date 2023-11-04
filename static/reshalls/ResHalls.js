// Assuming you have a dropdown with the id "dropdown" and an image element with id "selected-image"
const dropdown = document.getElementById('dropdown'); // Correct the dropdown ID to match your HTML
const selectedImage = document.getElementById('selected-image');

// Function to populate the dropdown with residence hall names
function populateDropdown(data) {
  data.forEach((building) => {
    const option = document.createElement('option');
    option.value = building.name;
    option.textContent = building.name;
    dropdown.appendChild(option);
  });
}

// Fetch the residence hall data from your API and populate the dropdown
fetch('/api/reshalls')
  .then((response) => response.json())
  .then((data) => {
    // Populate the dropdown with residence hall names from the API data
    populateDropdown(data);
  })
  .catch((error) => {
    console.error('Error fetching data from the API:', error);
  });

// Event listener for dropdown changes
dropdown.addEventListener('change', () => {
  const selectedBuilding = dropdown.value;

  // Fetch the specific residence hall by name
  fetch(`/api/reshalls/${selectedBuilding}`)
    .then((response) => {
      if (response.status === 404) {
        console.error('Residence hall not found.');
      } else {
        return response.json();
      }
    })
    .then((buildingData) => {
      // Hide all images first
      document.querySelectorAll('.res-photo').forEach((img) => img.classList.add('hide'));

      // Show the selected image
      const selectedImage = document.getElementById(selectedBuilding);
      selectedImage.src = `/static/reshalls/resphotos/${selectedBuilding}.png`; // Set the image source
      selectedImage.classList.remove('hide');
    })
    .catch((error) => {
      console.error('Error fetching building data from the API:', error);
    });
});
