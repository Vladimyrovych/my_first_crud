let forms = Array.prototype.slice.call(document.querySelectorAll('form'));
forms.forEach(function (element) {
    element.addEventListener('submit', function (event) {
        event.preventDefault();
    })
});

let sendCreateButton = document.querySelector('.buttons__create');
let sendUpdateButton = document.querySelector('.buttons__update');
let sendDeleteButton = document.querySelector('.buttons__delete');

sendCreateButton.addEventListener('click', sendRow.bind(null, true, false, false));
sendUpdateButton.addEventListener('click', sendRow.bind(null, false, true, false));
sendDeleteButton.addEventListener('click', sendRow.bind(null, false, false, true));

function sendRow(isCreate, isUpdate, isDelete) {
    let etalonObj = jsonData[0];
    let jsonForSend = {};//отправить на сервер
    for (let key in etalonObj) {
        if (etalonObj.hasOwnProperty(key)) {
            jsonForSend[key] = null;
        }
    }

    if (isCreate === true && (checkedRow === undefined || checkedRow.getAttribute('parent-elem') !== null)) {//создаем родителькую запись
        let inputsOfForm = Array.prototype.slice.call(document.querySelectorAll('.modal-wrapper__row'));
        for (let key in etalonObj) {
            if (etalonObj.hasOwnProperty(key)) {
                inputsOfForm.forEach(function (element) {
                    if (element.id === key) {
                        if (element.type === 'checkbox') {
                            jsonForSend[key] = element.checked;
                        } else {
                            jsonForSend[key] = element.value;
                        }
                    }    
                });
            }
        }
    } else if (isCreate === true && checkedRow !== undefined && checkedRow.getAttribute('parent-elem') === null) {//создаем дочернюю запись
        let inputsOfForm = Array.prototype.slice.call(document.querySelectorAll('.modal-wrapper__row'));
        for (let key in etalonObj) {
            if (etalonObj.hasOwnProperty(key)) {
                inputsOfForm.forEach(function (element) {
                    if (element.id === key) {
                        if (element.type === 'checkbox') {
                            jsonForSend[key] = element.checked;
                        } else {
                            jsonForSend[key] = element.value;
                        }
                    }    
                });
                if (key === 'ParentQuestionId') {
                    jsonForSend[key] = checkedRow.getAttribute('elem');
                }
            }
        }
    } else if (isUpdate === true || isDelete === true) {//обновляем запись или удаляем запись
        let inputsOfForm = Array.prototype.slice.call(document.querySelectorAll('.modal-wrapper__row'));
        for (let key in etalonObj) {
            if (etalonObj.hasOwnProperty(key)) {
                inputsOfForm.forEach(function (element) {
                    if (element.id === key) {
                        if (element.type === 'checkbox') {
                            jsonForSend[key] = element.checked;
                        } else {
                            jsonForSend[key] = element.value;
                        }
                    }    
                });
                if (key === 'ParentQuestionId') {
                    jsonForSend[key] = checkedRow.getAttribute('parent-elem');
                }
                if (key === 'QuestionId') {
                    jsonForSend[key] = checkedRow.getAttribute('elem');
                }
            }
        }
    }    

    jsonForSend = JSON.stringify(jsonForSend);

    console.log(jsonForSend);
    
    //после получения ОК от сервера перезаписать переменную jsonData и выполнить все указанные ниже действия:

    document.querySelector(".control-panel-container__modal-create").classList.remove('control-panel-container__modal-create_open');
    document.querySelector(".control-panel-container__modal-update").classList.remove('control-panel-container__modal-update_open');
    document.querySelector(".control-panel-container__modal-delete").classList.remove('control-panel-container__modal-delete_open');
    renderData(jsonData);//вызов функции рефреша грида с новым json
    addEventsOnGroupButtons();
    addEventsOnButtons();
    addClickRowEvent();
    console.log(checkedRow);
    
    seveSelectedRow();

    console.log('Hello!');
    console.log('Hello hello!!!');
    
}