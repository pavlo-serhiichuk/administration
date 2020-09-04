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

    if (appConfig.isUserLogged) {
        getClassName('login-button-betslip').classList.remove('show');
        getClassName('plays-bet-button').classList.add('show');
    } else {
        getClassName('login-button-betslip').classList.add('show');
        getClassName('plays-bet-button').classList.remove('show');
    }
}

function placeBet() {
    let betAmount = getClassName('bet-amount-label').value;
    let balance = getClassName('')
}
