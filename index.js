let users = [{
    username: '2',
    password: '2',
}];

function showLoginDialog() {
    getClassName('login-popup-container').style.display = 'block';
    getClassName('login-button').style.display = 'block';
}

function showRegistrationDialog() {
    getClassName('login-popup-container').style.display = 'block';
    getClassName('register-button').style.display = 'block';
}

function closeLoginDialog() {
    getClassName('login-popup-container').style.display = 'none';
    getClassName('register-button').style.display = 'none';
    getClassName('login-button').style.display = 'none';
}

function showDataForAutorizedUser(username) {
    getClassName('user').style.display = 'block';
    getClassName('log-in').style.display = 'none';
    getClassName('login').innerHTML = username;
    getClassName('massage').style.display = 'none';
    getClassName('registration').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    closeLoginDialog();
    showUserData();
}

function logOut() {
    getClassName('user').style.display = 'none';
    getClassName('log-in').style.display = 'block';
    getClassName('user-data').style.display = 'none';
    getClassName('registration').style.display = 'block';

}

function getClassName(className) {
    return document.getElementsByClassName(className)[0];
}

function loginUser() {
    let credential = getCredentials();

    if (isUserExist(credential)) {
        showDataForAutorizedUser(credential.username);
    } else {
        showErrorMassage('Wrong data!!!');
    }
}

function registerUser() {
    let credential = getCredentials();

    if (isUserExist(credential)) {
        showErrorMassage('User is already exist.');
    } else {
        showDataForAutorizedUser(credential.username);
        users.push(credential);
    }
}

function showErrorMassage(massage = '') {
    getClassName('massage').innerHTML = massage;
    getClassName('massage').style.display = 'block';
}

function showUserData() {
    getClassName('user-data').style.display = 'block';
}

function isUserExist({username, password}) {
    let filteredUsers = users.filter(user => username == user.username && password == user.password);
    return !!filteredUsers.length;
}

function getCredentials() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    return {username, password};
}