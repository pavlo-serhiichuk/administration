let selectedSport = Object.keys(content)[0];
let selectedLanguage = "en";
let users = [{
    username: '2',
    password: '2',
}];

setContent();
changeTranslations();

function changeTranslations() {
    selectedLanguage = document.getElementById('translationKey').value;

    for (let key in translations) {
        let translate = translations[key][selectedLanguage];
        getClassName(key).innerHTML = translate;
    }

    for (let sportName in content) {
        let translation = content[sportName].SPORT_NAME[selectedLanguage];
        getClassName(sportName).innerHTML = translation;
    }

    showSport(selectedSport);
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
        let translation = content[sportName].SPORT_NAME[selectedLanguage];
        let button = createButton(sportName, translation);
        sportMenu.appendChild(button);
    }
}

function showSport(sportName) {
    selectedSport = sportName;
    let sportContent = getClassName('sport-content');
    sportContent.innerHTML = '';
    let events = ((content[sportName] || {}).EVENTS || []);

    events.forEach(item => {
        let eventName = item.NAME[selectedLanguage];

        let eventContainer = document.createElement('DIV');
        eventContainer.classList.add('event-container');

        let eventNameContainer = document.createElement('DIV');
        eventNameContainer.classList.add('event-name-container');
        eventNameContainer.innerHTML = eventName;
        eventContainer.appendChild(eventNameContainer);

        let buttonContainer = document.createElement('DIV');
        buttonContainer.classList.add('button-container');
        let button = document.createElement('BUTTON');
        button.innerHTML = '3.43';
        buttonContainer.appendChild(button);
        eventContainer.appendChild(buttonContainer);

        sportContent.appendChild(eventContainer);
    });
}

function createButton(sportName, translation) {
    let button = document.createElement('BUTTON');
    button.classList.add(sportName);
    button.classList.add('az-sport');
    button.onclick = () => showSport(sportName);
    button.innerHTML = translation;
    return button;
}

