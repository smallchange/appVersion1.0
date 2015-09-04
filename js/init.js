var init = {
    initChecks: function (dynamicCase) {
        switch (dynamicCase) {
        case profileExists:
            init.check(validate.challengesCreated());
            break;
        case noProfile:
            init.check(validate.isUserGuest());
            break;
        case guestExists:
            init.check(validate.challengesCreated());
            break;
        case noGuest:
            gui.slideSwitch();
            //skip to initail setup
            break;
        case challengeExists:
            gui.slideSwitch();
            //skip to home
            break;
        case noChallenges:
            gui.slideSwitch();
            //skip to choose challenge
            break;
        }
    },
    initialize: function () {
        calender.setToday(); // sets today's date
        document.addEventListener("DOMContentLoaded", app.checkDetails);
        document.addEventListener('deviceready', app.checkDetails, false);
    },
}

init.initialize();