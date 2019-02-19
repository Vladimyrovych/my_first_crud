let mappingDataTypes = {//Заккомментировать атрибуты, которые необходимо скрыть. Комментировать вместе с объектом ниже.
    // QuestionId: 'string',
    // ParentQuestionId: 'string',
    // TicketId: 'number',
    QuestionText: 'string',
    // Answer: 'number',
    CommentText: 'string',
    IsActive: 'boolean',
    IsMain: 'boolean',
    RequestType: 'string',
    CreatedOn: 'string',
    ModifiedOn: 'string'
}

let mappingColumnName = {//Заккомментировать атрибуты, которые необходимо скрыть. Комментировать вместе с объектом выше.
    // QuestionId: 'Question Id',
    // ParentQuestionId: 'Parent question Id',
    // TicketId: 'Ticket Id',
    QuestionText: 'Question text',
    // Answer: 'Answer',
    CommentText: 'Comment text',
    IsActive: 'Is active',
    IsMain: 'Is main',
    RequestType: 'Request type',
    CreatedOn: 'Created on',
    ModifiedOn: 'Modified on'
}

renderData(jsonData);

function renderData(jsonData) {
//Динамическое создание шапки таблицы исходя из атрибутов входящего JSON
    let rowHeaderTable = '<th></th>';
    for (let key in mappingColumnName) {
        if (mappingColumnName.hasOwnProperty(key)) {
            let element = mappingColumnName[key];
            rowHeaderTable += '<th>' + element + '</th>'
        }
    }

    let rootElement = document.querySelector('.table');//очищаем ДОМ после предыдущего его наполнения
    while (rootElement.firstChild) {
        rootElement.removeChild(rootElement.firstChild);
    }
    checkedRow = undefined;//очищаем переменную, кокорая хранит в себе

    let newTr = document.createElement('tr');
    newTr.classList.add('table__head');
    newTr.innerHTML = rowHeaderTable;
    document.querySelector('.table').appendChild(newTr);

    //Наполнение таблицы родительскими и дочерними вопросами. Под одним родительским его дочерние.
    let rowsToCreate = [];

    for (let index = 0; index < jsonData.length; index++) {
        let checkedCheckBox = '<input type="checkbox" checked disabled></input>';
        let unCheckedCheckBox = '<input type="checkbox" disabled></input>';
        if (jsonData[index].ParentQuestionId === null) {
            let parentRowBody = '<td><button class="table__group-btn">+</button></td>';
            for (let _key in mappingDataTypes) {
                if (mappingDataTypes.hasOwnProperty(_key)) {
                    let element = mappingDataTypes[_key];
                    for (let key in jsonData[index]) {
                        if (jsonData[index].hasOwnProperty(key)) {
                            let parentElement = jsonData[index][key];
                            if (_key === key) {
                                parentRowBody += '<td id="' + key + '" >' + (element === 'boolean' ? parentElement === true ? checkedCheckBox : unCheckedCheckBox : parentElement) + '</td>';
                            }
                        }
                    }            
                }
            }


            let newTr = document.createElement('tr');
            newTr.classList.add('table__row');
            newTr.classList.add('table__row_is-main');
            newTr.setAttribute('elem', jsonData[index].QuestionId);
            newTr.innerHTML = parentRowBody;
            rowsToCreate.push(newTr);

            let parentId = jsonData[index].QuestionId;
            for (let i = 0; i < jsonData.length; i++) {
                let childElement = jsonData[i];
                if (childElement.ParentQuestionId === parentId) {
                    let childRowBody = '<td></td>';
                    for (let _key in mappingDataTypes) {
                        if (mappingDataTypes.hasOwnProperty(_key)) {
                            let _element = mappingDataTypes[_key];
                            for (let key in childElement) {
                                if (childElement.hasOwnProperty(key)) {
                                    let element = childElement[key];
                                    if (_key === key) {
                                        childRowBody += '<td id="' + key + '" >' + (_element === 'boolean' ? element === true ? checkedCheckBox : unCheckedCheckBox : element) + '</td>';
                                    }
                                }
                            }        
                        }
                    }
                    

                    let newTr = document.createElement('tr');
                    newTr.setAttribute('class', 'table__row');
                    newTr.classList.add('table__row');
                    newTr.setAttribute('parent-elem', childElement.ParentQuestionId);
                    newTr.setAttribute('elem', childElement.QuestionId);
                    newTr.innerHTML = childRowBody;
                    rowsToCreate.push(newTr);

                }
            }
        }
    }

    for (let index = 0; index < rowsToCreate.length; index++) {
        document.querySelector('.grid-container__table').appendChild(rowsToCreate[index]);
    }

}

