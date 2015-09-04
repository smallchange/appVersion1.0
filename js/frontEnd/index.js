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

//--------------------swipe gestures

$("#englishContent").click(function () {
    $("#languagePreference").attr('data-state', 'left');
});

var mc = new Hammer($('#introSection'));
mc.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc.on("panleft", function (ev) {
    intro.setAttribute('data-state', 'left');
});

var instructions = document.getElementById('instructionsSection');
var mc1 = new Hammer(instructions);
mc1.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc1.on("panleft", function (ev) {
    instructions.setAttribute('data-state', 'left');
});

var links = document.getElementById('transitionLinksWrap');
var message = document.getElementById('messageSection');
var mc2 = new Hammer(message);
mc2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc2.on("panleft", function (ev) {
    message.setAttribute('data-state', 'left');
    links.setAttribute('data-state', 'left');
});

$("#signUpSocail").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#signUpSocialSection").attr('data-state', 'right');
    $("#signUpSocialSection").addClass('z90');
});

var bBk = document.getElementById('opaqueBlackBackground');
var socailM = document.getElementById('signUpSocail');
var mc = new Hammer(socailM);
mc2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});


$("#signUp").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#signUpSection").attr('data-state', 'right');
    $("#signUpSection").addClass('z100');
})

var links = document.getElementById('transitionLinksWrap');
var message = document.getElementById('messageSection');
var mc2 = new Hammer(message);
mc2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc2.on("panleft", function (ev) {
    message.setAttribute('data-state', 'left');
    links.setAttribute('data-state', 'left');
});

$("#accountLoginLink").click(function () {
    $(".opaqueBlackBackground").attr('data-state', 'right')
    $("#linkClickedLogInSection").attr('data-state', 'right');
    $("#linkClickedLogInSection").addClass('z90');
})

var links = document.getElementById('transitionLinksWrap');
var message = document.getElementById('messageSection');
var mc2 = new Hammer(message);
mc2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc2.on("panleft panright panup pandown tap press", function (ev) {
    message.setAttribute('data-state', 'left');
    links.setAttribute('data-state', 'left');
});

var bBk = document.getElementById('opaqueBlackBackground');

var socailLinks = document.getElementById('signUpSocailSection');
var signUpForm = document.getElementById('signUpSocialSection');
var logIn = document.getElementById('linkClickedLogInSection');
//var mc2 = new Hammer(socailLinks);
var mc3 = new Hammer(signUpForm);
var mc4 = new Hammer(logIn);
mc2.get('pan').set({
    direction: Hammer.DIRECTION_ALL
});
mc3.on("panleft", function (ev) {
    signUpForm.setAttribute('data-state', 'left');
    bBk.setAttribute('data-state', 'left');
});
mc4.on("panleft", function (ev) {
    logIn.setAttribute('data-state', 'left');
    bBk.setAttribute('data-state', 'left');
});

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
    /*	validate.checkMinLength(document.getElementById("goalName").value, 3);
			validate.checkMinLength(document.getElementById("goalPrice").value, 3); // not sure if max 3 characters is sufficient for this value
			validate.checkMinLength(document.getElementById("deadline").value, 10); // requires a better validation to check if the date is written correctly 
			
			// Continue if the strings contain input 
			if (stringGood){
				user.insertGoal();
                */
    dynamicArgument = 'chooseChallenge';
    dynamicDestination = "#slideNegative";
    slideId = $(this).parents('div').addBack().first().attr('id');
    gui.loadNewInfo(dynamicArgument, dynamicDestination);
    gui.slideSwitch(slideId);
    /*} else
			return; */

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