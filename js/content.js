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
        let eventNameContainer = createElement('DIV', 'event-name-container', eventName);
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