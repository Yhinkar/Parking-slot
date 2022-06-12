//Update places count
countAvailablePlaces(event);

// Empty text box
document.querySelector("#carValue").value = '';

// Render the table
renterTable();

const freeSpot = (event) => {
cars.splice(event.target.dataset.row, 1);
setClassForBadge();

if (cars.length == totalPlaces) {
  document.querySelector('#carButton').setAttribute('disabled');
} else {
  document.querySelector('#carButton').removeAttribute('disabled');
}

// Render Table again after delete 
renterTable();
//Update places count
countAvailablePlaces(event);
}

// Add new car to the array
addCarButton.addEventListener('click', addCar);

// Render Table
renterTable();

//Show places count at page load
countAvailablePlaces(event);