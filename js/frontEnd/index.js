var deviceWidth = [];
var deviceHeight = [];

var dynamicId,
    dynamicClass,
    pages = [],
    numPages = 0,
    pageId = "";

//--------------------gui run
/*$('body').on('click', '.modalLink', function (ev) {
    ev.preventDefault;
    dynamicId = $(this).attr('id');
    dynamicClass = $(this).attr('class').substr(0, 5);

    gui.loadNewInfo(dynamicId, dynamicClass);
    gui.showModule();

    return
});

$('body').on('click', '.pageLink', function (ev) {
    ev.preventDefault;

    dynamicId = $(this).attr('id');
    dynamicClass = $(this).attr('class').substr(0, 4);

    dynamicParent = $(this).parents('div').addBack().first();
    slideId = $(this).parent('div').addBack().first().attr('id');

    gui.loadNewInfo(dynamicId, dynamicClass);
    gui.slideSwitch(slideId);
    gui.showNewPage()
});*/

$("body").on('click', '#englishContent', function () {
    $("#languagePreference").attr('data-state', 'leftHide');
    hammer.swipe('introSection', 'left');
    hammer.swipe('instructionsSection', 'left');
    if (hammer.swipe('messageSection', 'left')){
        $("#transitionLinksWrap").attr('data-state', 'leftHide');
    }

    hammer.swipe('linkClickedLogInSection', 'left');
});

//--------------------swipe gestures

$("body").on('click', '#signUpSocail', function () {
    $("#signUpSocialSection").attr('data-state', 'showRight');
    $("#signUpSocialSection").addClass('z90');

    //hammer.swipe('signUpSocailSection', 'left')
});

$("body").on('click', "#signUp", function () {
    $("#signUpSection").attr('data-state', 'showRight');
    $("#signUpSection").addClass('z100');
})

$("body").on('click', "#logIn", function () {
    $("#linkClickedLogInSection").attr('data-state', 'showRight');
    $("#linkClickedLogInSection").addClass('z90');
})

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
//--------------------getInfoToDatabases
$('body').on('click', '#signUpFormSubmit', function (event) {
    event.preventDefault();
    
        // Cannot show the next page if the info is not valid
        //if (isValid && stringGood)
        //{
    $('#signUpSection, #signUpOptions').attr('data-state', 'leftHide');
    
    dynamicArgument = 'savingsGoal';
    dynamicDestination = "#slidePositive";
    slideId = $(this).parents('div').addBack().first().attr('id');
    serverActions.createTables("profile");
    serverActions.createTables("challenges");
    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.slideSwitch(slideId);
    userActions.insertProfileInfo();
    //} 
    //else 
    //return; 


});

$('body').on('click', '#savingsGoalSubmitBtn', function (event) {
    event.preventDefault();
    $('#savingsGoalSection').attr('data-state', 'leftHide');
    dynamicArgument = 'chooseChallenge';
    dynamicDestination = "#slideNegative";
    slideId = $(this).parents('div').addBack().first().attr('id');
    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.slideSwitch(slideId);
});

$('body').on('click', '.userIndividualChallengesSection', function (ev) {
    ev.preventDefault();

    challengeChosen = $(this).addBack().attr('id');
    dynamicDestination = $('#modal');
    if (challengeChosen == 'ownChallenge') {
        gui.loadNewInfo(challengeChosen, dynamicDestination);
        gui.showModal();
    } else {
        load = "preSetChallenge"
        gui.loadNewInfo(load, dynamicDestination);
        $('#dynamicWord').append(challengeChosen);
        gui.showModal();
    }
});

$('body').on('click', '#customChallengeSubmit', function (ev) {
    ev.preventDefault();
    slideId = 'slideNegative';
    dynamicArgument = 'myChallenges';
    dynamicDestination = "#slideZero";

    gui.hideModal();
    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.slideSwitch(slideId);
});
$('body').on('click', '#acceptChallenge', function (ev) {
    ev.preventDefault();
    slideId = 'slideNegative';
    dynamicArgument = 'myChallenges';
    dynamicDestination = "#slideZero";
    challengesArg = "challengeLeft";
    challengeDes = "userIndividualChallengesSection";

    gui.hideModal();
    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.appendNewInfo(challengesArg, challengeDes);
    gui.slideSwitch(slideId);
});

$('#drop').click(function (event) {
    event.preventDefault();

    SQLite.dropTable("challenges");
    SQLite.dropTable("profile");
});