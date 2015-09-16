var adminControls = {
        //used to create new users
        //ottawaAdmin
        //Admins
        //Sponsers
        createNewUser: function (typeOfUser, userName) {
            //Organization Name*
            //User's First Name
            //User's Last Name
        },
        //creates user with certain edit privileges
        
        //used to delete current users (OttawaADm!n cannot be deleted);
        deleteUser: function (typeOfUser, userName) {},
        //
        
        //used to change a users permission of app editing
        //only one OttawaADm!n && OttawaADm!n type can't change
        changeUserType: function (userName, currentType, newType) {},
        approveAllChanges: function () {
            //check if version number is higher
            //if nvn>vn view changes
        },
        rejectAllChanges: function () {
            //
        },
    },
    userGui = {
        checkPermision: function (dynamicCase) {
            switch (dynamicCase) {
            case OttawaADm!n:
                init.check(validate.challengesCreated());
                break;
            case aDm!n:
                init.check(validate.isUserGuest());
                break;
            case sponsor:
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
        
    },
    content&Colour = {
        selectImage: function () {},
        saveNewImage: function (src, alt, title) {},
        writeTxt: function () {},
        saveNewTxt: function (runFunction) {
            changingContent.runFunction();
        },
        changeColour: function () {},
        updateJson: function (ageGroup, info) {}
    },
    addNewContent = {
        newJsonFile: function () {},
        newAgeGroup: function () {},
    },
    update = {
        versionNum: function (oldVersionNumber) {
            if(oldVersionNumber){
                
            } else ()
        }
    };