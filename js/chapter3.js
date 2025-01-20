(function() {

    // Part """1""":  Hotel stats
    var hotel = {
        name: "Holiday Inn",
        roomRate: 148.83,
        discount: 100, // THE SALESMAN REFUSES TO PAY FOR WEAKLING SERVICE!
        offerPrice: function() {
            var offerRate = this.roomRate * ((100 - this.discount) / 100);
            return offerRate;
        }
    }

    var hotelName, roomRate, specialRate;

    hotelName = document.getElementById("hotelName");
    roomRate = document.getElementById("roomRate");
    specialRate = document.getElementById("specialRate");

    hotelName.textContent = hotel.name;
    roomRate.textContent = "$" + hotel.roomRate.toFixed(2);
    specialRate.textContent = "$" + hotel.offerPrice();

    // Part """2""": Arrival Date
    var arrivalMsg;
    var elArrival;

    var today = new Date();

    function arrivalDate(today) {
        
        // Declare variables
        var weekFromToday, day, date, month, year, dayNames, monthNames;

        // Get the time of exactly one week from today, calculated in miliseconds
        weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        // Initialize weekday names
        dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Initialize month names
        monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        date = weekFromToday.getDate();
        day = dayNames[weekFromToday.getDay()];
        month = monthNames[weekFromToday.getMonth()];
        year = weekFromToday.getFullYear();

        arrivalMsg = day + " <br />(" + date + " " + month + " " + year + ")";
        return arrivalMsg
    }

    elArrival = document.getElementById("arrivalAt");
    elArrival.innerHTML = arrivalDate(today);
}());