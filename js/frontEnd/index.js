var init;

//-------------------------------------------------- old code

var deviceWidth = [];
var deviceHeight = [];

(function (window, document, $) {
    $(function () {
        var dynamicId,
            dynamicClass,
            pages = [],
            numPages = 0,
            pageId = "";
        //--------------------gui functions
        var gui = {
            loadNewInfo: function (dynamicArgument, dynamicDestination) {
                $(dynamicDestination).empty();
                $.get('ajax/html/' + dynamicArgument + 'Info.html', function (data) {
                    $(dynamicDestination).html(data);
                });
                return
            },
            loadScript: function (dynamicScript) {
                $.getScript("ajax/scripts/" + dynamicScript + ".js")
                    .done(function (script, textStatus) {
                        console.log(textStatus);
                    })
                    .fail(function (jqxhr, settings, exception) {
                        $("div.log").text("Triggered ajaxError handler.");
                    });
            },

            showModal: function () {
                $("#modal").attr("data-state", "right");
                $("#modal").css("z-index", "100");
                return
            },
            hideModal: function () {
                $("#modal").attr("data-state", "hideRight");
            },
            slideSwitch: function (slideId) {
                if (slideId == 'slideZero') {
                    /* work on auto loop
                                prevSlide = pages[i++].id;
                                currentSlide = pages[i].id;
                                nextSlide = pages[i--].id;
                        
                                $("#" + currentSlide).css ({
                                    'left' : '-100%',
                                    'z-index' : '0'
                                });
                        
                                $("#" + nextSlide).css ({
                                    'left' : '0%',
                                    'z-index' : '20'
                                });
                        
                                $("#" + prevSlide).css ({
                                    'left' : '100%',
                                    'z-index' : '10'
                                });
                                */
                    $("#slideZero").attr("data-state", "left");
                    $("#slidePositive").attr("data-state", "right");
                    
                } else if (slideId == 'slidePositive') {
                    $("#slidePositive").attr("data-state", "left");

                    $("#slideNegative").attr("data-state", "right");

                } else if (slideId == 'slideNegative') {
                    $("#slideNegative").attr("data-state", "left");

                    $("#slideZero").attr("data-state", "right");
                }
            }
        };

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

        var intro = document.getElementById('introSection');
        var mc = new Hammer(intro);
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
            dynamicArgument = 'savingsGoal';
            dynamicDestination = "#slidePositive";
            slideId = $(this).parents('div').addBack().first().attr('id');

            SQLite.createTables("profile");
            insertProfile()

            gui.loadNewInfo(dynamicArgument, dynamicDestination);
            gui.slideSwitch(slideId);
        });
        
        $('body').on('click', '#savingsGoalSubmitBtn', function (event) {
            event.preventDefault();
            dynamicArgument = 'chooseChallenge';
            dynamicDestination = "#slideNegative";
            slideId = $(this).parents('div').addBack().first().attr('id');

            SQLite.createTables("profile");
            insertGoalIntoProfile()

            gui.loadNewInfo(dynamicArgument, dynamicDestination);
            gui.slideSwitch(slideId);
        });

        $('body').on('click', '#coffee', function (event) {
            event.preventDefault();
            dynamicArgument = 'myChallenges';
            dynamicDestination = "#slideZero";
            slideId = $(this).parents('div').addBack().first().attr('id');

            SQLite.createTables("challenges");
            insertProfile()

            gui.loadNewInfo(dynamicArgument, dynamicDestination);
            gui.slideSwitch(slideId);
        });
        
        $('#drop').click(function (event) {
            event.preventDefault();

            SQLite.dropTable("challenges");
            SQLite.dropTable("profile");
        });
    });
}(window, document, window.jQuery));