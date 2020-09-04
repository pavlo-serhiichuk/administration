function getUserInfoFromUsersDB(userDataFromPopupForAutorisation) {
    let {username, password} = userDataFromPopupForAutorisation;
    // let filteredUsers = users.filter(user => username === user.username && user.password === password);
    let filteredUsers = [];

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (username === user.username && user.password === password) {
            filteredUsers.push(user)
        }
    }

    // return filteredUsers.length ? filteredUsers[0]: null;
    if (filteredUsers.length) {
        return filteredUsers[0];
    }

    return null;
}