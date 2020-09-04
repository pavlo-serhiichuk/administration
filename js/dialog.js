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

function showErrorMassage(massage = '') {
    getClassName('massage').innerHTML = massage;
    getClassName('massage').style.display = 'block';
}