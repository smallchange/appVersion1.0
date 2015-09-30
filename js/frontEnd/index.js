var deviceWidth = [];
var deviceHeight = [];

var dynamicId,
    dynamicClass,
    pages = [],
    numPages = 0,
    pageId = "";

//--------------------intro run

$("body").on('click', '#englishContent', function (ev) {

    gui.loadSwitch('html/intro', 'intro1', 'slide', ev);

    gui.htmlToDom('html/intro', 'intro2', 'slideNegative', function () {
        hammer.swipe('slidePositive', 'left', function () {
            gui.htmlToDom('html/intro', 'intro3', 'slideZero', function () {
                gui.slideSwitch('slide', 'Positive');
                gui.htmlToDom('html/intro', 'introOptions', 'slideZero', function () {
                    hammer.swipe('slideNegative', 'left', function () {
                        gui.slideSwitch('slide', 'Negative');
                    });
                })
            });
        });

    });
    /*
            hammer.swipe('slideNegative', 'left', function () {
                gui.htmlToDom('html/intro', 'intro3', 'slideZero');
                gui.slideSwitch('slideNegative');

                hammer.swipe('slideZero', 'left', function () {
                    gui.htmlToDom('html/intro', 'introOptions', 'slidePositive');
                    gui.slideSwitch('slideZero');
                });
            });
            */
});


//hammer.swipe('introSection', 'left');
//hammer.swipe('instructionsSection', 'left');
//if (hammer.swipe('messageSection', 'left')) {
//  $("#circleNav").attr('data-state', 'leftHide');
//}

//gui.htmlToDom('html/intro', 'intro2', 'slideNegative');
//hammer.swipe('logInSection', 'left');
//hammer.swipe('introSection', 'left', 'loadSwitch');


//--------------------general functionality
//slide modal down
$("body").on('click', '#closeBtn', function () {
    $('#modal, #modal2').attr('data-state', 'scrollDown');
    setTimeout(function () {
        $('#modal, #modal2').empty();
    }, 750);
});

//--------------------logIn or signUp
$("body").on('click', '#logIn', function () {
    gui.loadModal('logIn');
});

$("body").on('click', '#signUp', function () {
    gui.loadModal('signUp');
});

$("body").on('click', '#emailSignUp', function () {
    gui.htmlToDom('html/modals', 'userInfoForm', 'newPositive', function () {
        gui.slideSwitch('new', 'Zero');
    });
});

//--------------------getInfoToDatabases
$("body").on('click', '#signUpFormSubmit', function (ev) {
    ev.preventDefault();
    serverActions.createTables("profile");
    userActions.createProfile();
    
    gui.htmlToDom('html/modals', 'userInfoForm2', 'newNegative', function () {
        gui.slideSwitch('new', 'Positive');
        gui.htmlToDom('html', 'chooseChallengeInfo', 'newZero');
    });
});

$("body").on('click', '#signUpFormSubmit2', function (ev) {
    ev.preventDefault();
    userActions.createProfile2();
    //gui.slideSwitch('new', 'Zero');
});

//--------------------nav functions (fix)
$('body').on('click', '#navBtn', function (event) {
    event.preventDefault();
    $('#nav').attr('data-state', 'showRight');
});

$('body').on('click', '#navBtnBack', function (event) {
    event.preventDefault();
    $('#nav').attr('data-state', 'leftHide');
    $('#nav').attr('data-state', 'startRight');
});




$('#drop').click(function (event) {
    event.preventDefault();

    serverActions.dropTable("challenges");
    serverActions.dropTable("profile");
});