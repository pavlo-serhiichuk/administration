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
        let button = createElement('button', sportName, translation, () => showSport(sportName));
        button.classList.add('az-sport');
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
        let eventContainer = createElement('DIV','event-container');
        let eventNameContainer = createElement('DIV', 'event-name-container', eventName)
        eventContainer.appendChild(eventNameContainer);

        eventContainer.appendChild(getButtonContainer(`${sportName}$${index}`));
        sportContent.appendChild(eventContainer);
    });
}

function getContentTitle(sportName) {
    let contentTitle = document.createElement('DIV');
    contentTitle.classList.add('sport-content-title');
    contentTitle.innerHTML = sportName;
    return contentTitle;
}

function getButtonContainer(eventSpecificKey) {
    let buttonContainer = createElement('DIV', 'button-container');

    for (let index = 0; index < 3; index++) {
        let onclick = (self) => addSubmitClass(self, eventSpecificKey, index);
        let button = createElement('BUTTON', 'button-coefficient', "",  onclick);

        updatePercentage(button, getRandom(3, 7, 0) * 1000);

        buttonContainer.appendChild(button);
    }
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

function updatePercentage(button, timeout) {
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

        let eventName = content[sportName].EVENTS[eventId].NAME[appConfig.selectedLanguage];
        let eventNameContainer = createElement('div', 'betslip-event-name-container', eventName);
        let eventPercentContainer = createElement('div', 'betslip-event-percent-container', betPercent);
        let eventContainer = createElement('div', 'betslip-event-container');

        eventContainer.appendChild(eventNameContainer);
        eventContainer.appendChild(eventPercentContainer);

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

function createElement(tagName  = "", className = "", text = "", onclick = () => {}) {
    let tag = document.createElement(tagName);
    tag.classList.add(className);
    tag.innerHTML = text;
    tag.onclick = onclick;
    return tag;
}