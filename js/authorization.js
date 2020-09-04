let accountMenu = {
    show({username, balance}) {
        getClassName('user').style.display = 'block';
        getClassName('showLoginDialogButton').style.display = 'none';
        getClassName('showRegistrationDialogButton').style.display = 'none';
        getClassName('login').innerHTML = username;
        getClassName('balance').innerHTML = `$${balance}`;
        getClassName('logo-container').classList.add('logged');
        dialog.close();
    },
    hide() {
        getClassName('user').style.display = 'none';
        getClassName('showLoginDialogButton').style.display = 'block';
        getClassName('showRegistrationDialogButton').style.display = 'block';
        getClassName('logo-container').classList.remove('logged');
        appConfig.isUserLogged = false;
        showBetslipEvents();
    },
};

function loginUser() {
    let userDataFromPopupForAutorisation = getUserNameAndPasswordFromModalDialog();
    let user = getUserInfoFromUsersDB(userDataFromPopupForAutorisation);
    if (user) {
        accountMenu.show(user);
        appConfig.isUserLogged = true;
        appConfig.user = user;
        showBetslipEvents();
    } else {
        showErrorMassage('Wrong data!!!');
    }
}

function registerUser() {
    let credential = getUserNameAndPasswordFromModalDialog();

    if (getUserInfoFromUsersDB(credential)) {
        showErrorMassage('User is already exist.');
    } else {
        accountMenu.show(credential.username);
        users.push(credential);
    }
}

function getUserNameAndPasswordFromModalDialog() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    return {username, password};
}

function hutco() {
    accountMenu.show(users[0]);
    appConfig.isUserLogged = true;
    showBetslipEvents();
}