let idIntervalBettingButtons = [];

setContent();
changeTranslations();
showSessionTime();

function changeTranslations() {
    appConfig.selectedLanguage = document.getElementById('translationKey').value;
    showBetslipEvents();

    for (let key in translations) {
        let translate = translations[key][appConfig.selectedLanguage];
        let element = getClassName(key);

        if (element) element.innerHTML = translate;
    }

    for (let sportName in content) {
        let translation = content[sportName].SPORT_NAME[appConfig.selectedLanguage];
        getClassName(sportName).innerHTML = translation;
    }

    showSport(appConfig.selectedSport);
}

let dialog = {
    showLogin() {
        getClassName('login-popup-container').style.display = 'block';
        getClassName('login-button').style.display = 'block';
    },
    showRegister() {
        getClassName('login-popup-container').style.display = 'block';
        getClassName('register-button').style.display = 'block';
    },
    close() {
        getClassName('login-popup-container').style.display = 'none';
        getClassName('register-button').style.display = 'none';
        getClassName('login-button').style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        getClassName('massage').style.display = 'none';
    }
};

let accountMenu = {
    show(username) {
        getClassName('user').style.display = 'block';
        getClassName('showLoginDialogButton').style.display = 'none';
        getClassName('showRegistrationDialogButton').style.display = 'none';
        getClassName('login').innerHTML = username;
        getClassName('logo-container').classList.add('logged');
        dialog.close();
        showUserData();
    },
    hide() {
        getClassName('user').style.display = 'none';
        getClassName('showLoginDialogButton').style.display = 'block';
        getClassName('showRegistrationDialogButton').style.display = 'block';
        getClassName('logo-container').classList.remove('logged');
    },
};

function getClassName(className) {
    return document.getElementsByClassName(className)[0];
}

function loginUser() {
    let credential = getCredentials();

    if (isUserExist(credential)) {
        accountMenu.show(credential.username);
    } else {
        showErrorMassage('Wrong data!!!');
    }
}

function registerUser() {
    let credential = getCredentials();

    if (isUserExist(credential)) {
        showErrorMassage('User is already exist.');
    } else {
        accountMenu.show(credential.username);
        users.push(credential);
    }
}

function showErrorMassage(massage = '') {
    getClassName('massage').innerHTML = massage;
    getClassName('massage').style.display = 'block';
}

function isUserExist({username}) {
    let filteredUsers = users.filter(user => username == user.username);
    return !!filteredUsers.length;
}

function getCredentials() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    return {username, password};
}

function setContent() {
    let sportMenu = getClassName('sport-menu');
    for (let sportName in content) {
        let translation = content[sportName].SPORT_NAME[appConfig.selectedLanguage];
        let button = createButton(sportName, translation);
        sportMenu.appendChild(button);
    }
}

function showSport(sportName) {
    idIntervalBettingButtons.forEach(id => clearInterval(id));
    idIntervalBettingButtons = [];

    appConfig.selectedSport = sportName;
    let sportContent = getClassName('sport-content');
    sportContent.innerHTML = '';
    let events = ((content[sportName] || {}).EVENTS || []);
    sportContent.appendChild(getContentTitle(content[sportName].SPORT_NAME[appConfig.selectedLanguage]));

    events.forEach((item, index) => {
        let eventName = item.NAME[appConfig.selectedLanguage];
        // eventName.split(" - ");
        let eventContainer = document.createElement('DIV');

        eventContainer.classList.add('event-container');
        eventContainer.appendChild(getEventNameContainer(eventName));
        let eventSpecificKey = `${sportName}$${index}`;
        eventContainer.appendChild(getButtonContainer(eventSpecificKey));
        sportContent.appendChild(eventContainer);
    });

}

function getContentTitle(sportName) {
    let contentTitle = document.createElement('DIV');
    contentTitle.classList.add('sport-content-title');
    contentTitle.innerHTML = sportName;
    return contentTitle;
}

function getEventNameContainer(eventName) {
    let eventNameContainer = document.createElement('DIV');
    eventNameContainer.classList.add('event-name-container');
    eventNameContainer.innerHTML = eventName;
    return eventNameContainer;
}

function getButtonContainer(eventSpecificKey) {
    let buttonContainer = document.createElement('DIV');
    buttonContainer.classList.add('button-container');
    let button0 = document.createElement('BUTTON');
    let button1 = document.createElement('BUTTON');
    let button2 = document.createElement('BUTTON');
    button0.classList.add('button-coefficient');
    button1.classList.add('button-coefficient');
    button2.classList.add('button-coefficient');

    button0.onclick = (self) => addSubmitClass(self, eventSpecificKey, 0);
    button1.onclick = (self) => addSubmitClass(self, eventSpecificKey, 1);
    button2.onclick = (self) => addSubmitClass(self, eventSpecificKey, 2);

    getRandomArbitrary(button0, getRandom(3, 7, 0) * 1000);
    getRandomArbitrary(button1, getRandom(3, 7, 0) * 1000);
    getRandomArbitrary(button2, getRandom(3, 7, 0) * 1000);
    buttonContainer.appendChild(button0);
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    return buttonContainer;

    function addSubmitClass(self, eventSpecificKey, buttonIndex) {
        self.currentTarget.classList.toggle(appConfig.submittedClassName);
        let betPercent = self.currentTarget.textContent.split(' ')[0];
        let key =`${eventSpecificKey}$${buttonIndex}$${betPercent}`;
        if(!appConfig.betslipEvents.find(item => item === key)){
            appConfig.betslipEvents.push(key);
        } else{
            appConfig.betslipEvents = appConfig.betslipEvents.filter(value => value !== key);

        }
        showBetslipEvents();
    }

}

function getRandom(min = 2, max = 5, round = 2) {
    let num = Math.random() * (max - min) + min;
    return +num.toFixed(round);
}

function getRandomArbitrary(button, timeout) {
    button.innerHTML = getRandom();

    let intervalId = setInterval(() => {
        if (button.classList.contains(appConfig.submittedClassName)) return;

        let nextValue = getRandom();
        let previousValue = +button.innerHTML.split(' ')[0];

        if (nextValue > +previousValue) {
            button.classList.remove('decreased-bet');
            button.classList.add('increased-bet');
            button.innerHTML = nextValue + '  &#8593';
        } else {
            button.classList.remove('increased-bet');
            button.classList.add('decreased-bet');
            button.innerHTML = nextValue + '  &#8595';
        }
    }, timeout);

    idIntervalBettingButtons.push(intervalId);
}

function createButton(sportName, translation) {
    let button = document.createElement('BUTTON');
    button.classList.add(sportName);
    button.classList.add('az-sport');
    button.onclick = () => showSport(sportName);
    button.innerHTML = translation;
    return button;
}

function switchSizeSettingView(){
    let siteSettingsPopup = getClassName('site-settings-popup');
    let isShowClassExist = siteSettingsPopup.classList.contains('show');

    if (isShowClassExist) {
        siteSettingsPopup.classList.remove('show');
    } else {
        siteSettingsPopup.classList.add('show');
    }
}

function showSessionTime() {
    let seconds = 0;
    setInterval(() => {
        sessionTime.innerHTML = ++seconds;
    },  1000);
}

function showBetslipEvents() {
    let bets = getClassName('bets-container');
    bets.innerHTML = "";

    appConfig.betslipEvents.forEach(key => {
        [sportName, eventId, submittedButtonIndex, betPercent] = key.split('$');

        let eventNameContainer = document.createElement('DIV');
        eventNameContainer.classList.add('betslip-event-name-container');
        let eventName = content[sportName].EVENTS[eventId].NAME[appConfig.selectedLanguage];
        eventNameContainer.innerHTML = eventName;

        let eventPercentContainer = document.createElement('DIV');
        eventPercentContainer.classList.add('betslip-event-percent-container');
        eventPercentContainer.innerHTML = betPercent;

        let eventContainer = document.createElement('DIV');
        eventContainer.appendChild(eventNameContainer);
        eventContainer.appendChild(eventPercentContainer);
        eventContainer.classList.add('betslip-event-container');

        bets.appendChild(eventContainer);
    });

    if (appConfig.betslipEvents.length) {
        getClassName('betslip-message').classList.remove('show');
        getClassName('bet-place-container').classList.add('show');
    } else {
        getClassName('bet-place-container').classList.remove('show');
        getClassName('betslip-message').classList.add('show');
    }
}

