function getClassName(className) {
    return document.getElementsByClassName(className)[0];
}

function createElement(tagName  = "", className = "", text = "", onclick = () => {}) {
    let tag = document.createElement(tagName);
    tag.classList.add(className);
    tag.innerHTML = text;
    tag.onclick = onclick;
    return tag;
}

function getRandom(min = 2, max = 5, round = 2) {
    let num = Math.random() * (max - min) + min;
    return +num.toFixed(round);
}