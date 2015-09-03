var init = {
    initialize: function () {
        calender.setToday(); // sets today's date
        document.addEventListener("DOMContentLoaded", app.checkDetails);
        document.addEventListener('deviceready', app.checkDetails, false);
    }
}

init.initialize();