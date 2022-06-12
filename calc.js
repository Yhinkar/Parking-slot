const slotId = document.querySelector("#slot-id");
const fullname = document.querySelector("#name");
const carModel = document.querySelector("#car-model");
const book = document.querySelector("#book");
const retrieveSlot = document.querySelector("#retrieveSlot");
const slotSelected = document.querySelector("#slots-selected");
const retrieveModel = document.querySelector("#retrieveModel");
const retrieveName = document.querySelector("#retrieveName");
const price = document.querySelector("#price");
const time = document.querySelector("#time");
const total = document.querySelector("#total");
const tabulate = document.querySelector("#tabulate");
const bookingsFromLocalStorage = JSON.parse(localStorage.getItem("booking"));
const slotsFromLocalStorage = JSON.parse(localStorage.getItem("filledSlots"));
let booking;
let filledSlots;

// If local storage is empty, initialize an empty booking and filledSlots array
if(bookingsFromLocalStorage){
    booking = [...bookingsFromLocalStorage];
    filledSlots = [...slotsFromLocalStorage];
}
else{
    booking = [];
    filledSlots = [];
}

document.querySelector("#filled-slots").innerHTML = "FILLED SLOTS: "+JSON.stringify(filledSlots);

// event listener to add booking information to local storage
book.addEventListener("click", () => {

    // get the current time which would be the entry time
    const currentDate = new Date();
    const currentTime = currentDate.getTime() / 1000;

    // calculating the price dependent on slot
    let slotPrice;
    if(slotId.value > 10){
        slotPrice = 100;
    }
    else{
        slotPrice = 60;
    }

    // push the booking information to the array of booked slots
    booking.push({
        "slot": slotId.value,
        "name": fullname.value,
        "carModel": carModel.value,
        "price": slotPrice,
        "entryTime": currentTime
    });
    // set to local storage
    localStorage.setItem("booking", JSON.stringify(booking));

    // add slot to filledSlot array
    filledSlots.push(slotId.value);
    localStorage.setItem("filledSlots", JSON.stringify(filledSlots));

    // alert user and reload window
    alert("booking was successful!");
    window.location.reload();
});


// add eventListener to calculate and fill table values
tabulate.addEventListener("click", () => {

    let userBooking;

    // to retrieve bookings
    for(let i = 0; i < bookingsFromLocalStorage.length; i++){
        if(bookingsFromLocalStorage[i].slot === retrieveSlot.value){
            userBooking = bookingsFromLocalStorage[i];
        }
    }

    // calculate the time spent using the difference between entry time and now
    const entryTime = userBooking.entryTime;
    const exitDate = new Date();
    const exitTime = exitDate.getTime() / 1000;
    const timeSpent = exitTime - entryTime;

    // convert time into hour, minutes
    const sec = parseInt(timeSpent, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    const formattedTime = hours+':'+minutes+':'+seconds; 

    // calculate the total bills in case user spends above 30mins
    let totalBills;
    if(timeSpent <= 1800) {
        totalBills = userBooking.price;
    }
    else{
        totalBills = userBooking.price + (hours * 15);
    }

    // update information in the table
    slotSelected.innerHTML = userBooking.slot;
    retrieveName.innerHTML = userBooking.name;
    retrieveModel.innerHTML = userBooking.carModel;
    price.innerHTML = userBooking.price+'$';
    time.innerHTML = formattedTime;
    total.innerHTML = totalBills+'$';
})

// Path of this code was copied online.