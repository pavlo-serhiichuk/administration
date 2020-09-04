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



