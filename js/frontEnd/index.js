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

$("#englishContent").click(function () {
    $("#languagePreference").attr('data-state', 'left');
});

//--------------------swipe gestures
//hammer.swipe('introSection', 'left');
//hammer.swipe('instructionsSection', 'left');
//hammer.swipe('messageSection', 'left');
//hammer.swipe('signUpSocailSection', 'left')
//hammer.swipe('linkClickedLogInSection', 'left');

$("#signUpSocail").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#signUpSocialSection").attr('data-state', 'right');
    $("#signUpSocialSection").addClass('z90');
});

$("#signUp").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#signUpSection").attr('data-state', 'right');
    $("#signUpSection").addClass('z100');
})

$("#accountLoginLink").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#linkClickedLogInSection").attr('data-state', 'right');
    $("#linkClickedLogInSection").addClass('z90');
})

//--------------------nav functions (fix)
$('body').on('click', '#navBtn', function (event) {
    event.preventDefault();
    dynamicArgument = $(this).attr('id');
    dynamicDestination = "#modal";

    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.showModal();
});

$('body').on('click', '#navBtnBack', function (event) {
    gui.hideModal();
});
//--------------------getInfoToDatabases
$('body').on('click', '#signUpFormSubmit', function (event) {
    event.preventDefault();

    console.log(algorithm.add2Values(40, 50))
        // Cannot show the next page if the info is not valid
        //if (isValid && stringGood)
        //{
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