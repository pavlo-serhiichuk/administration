let users = [{
    username: '2',
    password: '2',
}];

let dialog = {
    showLogin(){
        getClassName('login-popup-container').style.display = 'block';
        getClassName('login-button').style.display = 'block';
    },
    showRegister(){
        getClassName('login-popup-container').style.display = 'block';
        getClassName('register-button').style.display = 'block';
    },
    close(){
        getClassName('login-popup-container').style.display = 'none';
        getClassName('register-button').style.display = 'none';
        getClassName('login-button').style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        getClassName('massage').style.display = 'none';

    }
};

let accountMenu = {
  show(username){
      getClassName('user').style.display = 'block';
      getClassName('showLoginDialogButton').style.display = 'none';
      getClassName('login').innerHTML = username;
      getClassName('showRegistrationDialogButton').style.display = 'none';
      dialog.close();
      showUserData();
  },
    hide(){
        getClassName('user').style.display = 'none';
        getClassName('showLoginDialogButton').style.display = 'block';
        getClassName('user-data').style.display = 'none';
        getClassName('showRegistrationDialogButton').style.display = 'block';
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

function showUserData() {
    getClassName('user-data').style.display = 'block';
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