let groupeCollapse;
addEventsOnGroupButtons();

function addEventsOnGroupButtons() {
    groupeCollapse = true;
    
    let buttonElements = document.querySelectorAll('.table__group-btn');

    for (let index = 0; index < buttonElements.length; index++) {
        const element = buttonElements[index];
        element.addEventListener('click', groupingChildQuestions);
    }
}

function groupingChildQuestions() {
    let mainRow = this.parentElement.parentElement;
    let trElements = document.getElementsByTagName("tr");
    
    for (let index = 0; index < trElements.length; index++) {
        if (trElements[index].getAttribute('parent-elem') == mainRow.getAttribute('elem')) {
            if (trElements[index].getAttribute('class').indexOf(' hide') == -1) {
                trElements[index].setAttribute('class', trElements[index].getAttribute('class') + ' hide');
            } else {
                trElements[index].setAttribute('class', trElements[index].getAttribute('class').replace(/ hide/g, ''));
            }
        }
        groupeCollapse = false;
    }
}