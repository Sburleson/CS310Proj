(function () {

window.addEventListener('load',initialization)

    // function initialization() {
    //     console.log("init");
    //     let dropdown = document.getElementById('dropdown');

    //     dropdown.addEventListener('click', () => {
    //         this.selected;
    //     });
    //     console.log(dropdown);
    // }

    function initialization() {
        console.log("init");
        let dropdown = document.getElementById('dropdown');

        dropdown.addEventListener('change', () => {
            // Get the selected option value
            let selectedBuilding = dropdown.value;
            
            // Remove the 'hide' class from an element with the id 'founders' when 'Founders' is selected
            if (selectedBuilding === 'Founders') {
                let Founders = document.querySelectorAll('Founders');
                Founders.classList.remove('hide');
                
                
            }

            console.log(dropdown);
        });
    }


})();