function showLoginDialog() {
    getClassName('login-popup-container').style.display = 'block';
}

function closeLoginDialog() {
    getClassName('login-popup-container').style.display = 'none';
}

function showDataForAutorizedUser(username) {
    getClassName('user').style.display = 'block';
    getClassName('log-in').style.display = 'none';
    getClassName('login').innerHTML = username;
    getClassName('massage').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
function logOut() {
    getClassName('user').style.display = 'none';
    getClassName('log-in').style.display = 'block';
    getClassName('user-data').style.display = 'none';
}

function getClassName(className) {
 return document.getElementsByClassName(className)[0];
}

function checkAccess() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if(username == '1' && password == '1'){
        closeLoginDialog();
        showUserData();
        showDataForAutorizedUser(username);
    } else{
        showWrongMassage();
    }
}
function showUserData() {
    getClassName('user-data').style.display = 'block';
}
function showWrongMassage() {
    getClassName('massage').style.display = 'block';

}