"use strict";

function _typeof(obj) {
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
		_typeof = function _typeof(obj) {
			return typeof obj;
		};
	} else {
		_typeof = function _typeof(obj) {
			return obj &&
				typeof Symbol === "function" &&
				obj.constructor === Symbol &&
				obj !== Symbol.prototype
				? "symbol"
				: typeof obj;
		};
	}
	return _typeof(obj);
}

var checkedRow;
addEventsOnButtons();
addClickRowEvent();

function addClickRowEvent() {
	var rowsArray = Array.prototype.slice.call(document.querySelectorAll(".table__row"));
	rowsArray.forEach(function(element) {
		element.addEventListener("click", seveSelectedRow);
	});
}

function seveSelectedRow() {
	if (checkedRow === undefined && this === undefined) {
		document.querySelector('.buttons-container__create-btn').textContent = 'CREATE PARENT';
		document.querySelector('.buttons__create').textContent = 'CREATE PARENT';
	} else if (!checkedRow ) {
		checkedRow = this;
		checkedRow.classList.add("table__row_selected");
		if (this.getAttribute('parent-elem') === null) {
			document.querySelector('.buttons-container__create-btn').textContent = 'CREATE CHILD';
			document.querySelector('.buttons__create').textContent = 'CREATE CHILD';
		}
	} else if (checkedRow === this) {
		checkedRow.classList.remove("table__row_selected");
		document.querySelector('.buttons-container__create-btn').textContent = 'CREATE PARENT';
		document.querySelector('.buttons__create').textContent = 'CREATE PARENT';
		checkedRow = undefined;
	} else {
		checkedRow.classList.remove("table__row_selected");
		checkedRow = this;
		checkedRow.classList.add("table__row_selected");
		if (this.getAttribute('parent-elem') === null) {
			document.querySelector('.buttons-container__create-btn').textContent = 'CREATE CHILD';
			document.querySelector('.buttons__create').textContent = 'CREATE CHILD';
		} else {
			document.querySelector('.buttons-container__create-btn').textContent = 'CREATE PARENT';
			document.querySelector('.buttons__create').textContent = 'CREATE PARENT';
		}
	}
}

function addEventsOnButtons() {
	var createRowBtn = document.querySelector(".buttons-container__create-btn");
	var updateRowBtn = document.querySelector(".buttons-container__update-btn");
	var deleteRowBtn = document.querySelector(".buttons-container__delete-btn");
	var cancelButtons = Array.prototype.slice.call(document.querySelectorAll(".buttons__cencel"));
	createRowBtn.addEventListener("click", renderFieldsDialog.bind(null, true));
	updateRowBtn.addEventListener("click", renderFieldsDialog.bind(null, false));
	deleteRowBtn.addEventListener("click", renderFieldsDialogDelete);
	cancelButtons.forEach(function(element) {
		element.addEventListener("click", function(event) {
			event.preventDefault();
			document.querySelector(".control-panel-container__modal-create").classList.remove('control-panel-container__modal-create_open');
			document.querySelector(".control-panel-container__modal-update").classList.remove('control-panel-container__modal-update_open');
			document.querySelector(".control-panel-container__modal-delete").classList.remove('control-panel-container__modal-delete_open');
		});
	});
} 

//функция отрисовки полей формы удаления данных
function renderFieldsDialogDelete() {
	var currentDocument;

    if (checkedRow !== undefined) {
		document
			.querySelector(".control-panel-container__modal-delete")
			.classList.add('control-panel-container__modal-delete_open');
		currentDocument = document.querySelector(".control-panel-container__modal-delete");
		var selectedRowObj = {};
		jsonData.forEach(function(element) {
			if (element.QuestionId === checkedRow.getAttribute("elem")) {
				for (var key in element) {
					if (element.hasOwnProperty(key)) {
						for (let _key in mappingDataTypes) {
							if (mappingDataTypes.hasOwnProperty(_key)) {
								if (_key === key) {
									var item = element[key];
									selectedRowObj[key] = item;
								}
							}
						}
					}
				}
			}
		});
		render(selectedRowObj);
	}

	function render(selectedRowObj) {	
		var rootElement = currentDocument.querySelector(".modal-wrapper__inputs-container");

		while (rootElement.firstChild) {
			rootElement.removeChild(rootElement.firstChild);
		}

		var i = 0;

            for (var key in mappingDataTypes) {
                if (mappingDataTypes.hasOwnProperty(key)) {
                    var _element = mappingDataTypes[key];

                if (_element === "boolean") {
                    var newInput = document.createElement("input");
                    newInput.classList.add("modal-wrapper__row");
                    newInput.type = "checkbox";
                    newInput.id = key;
                    var newLabel = document.createElement("label");
                    // newLabel.setAttribute("for", "checkbox" + i++);
                    newLabel.textContent = key;
                    var newBr = document.createElement("br");
                    rootElement.appendChild(newInput);
                    rootElement.appendChild(newLabel);
                    rootElement.appendChild(newBr);

                    for (var keyInner in selectedRowObj) {
                        if (selectedRowObj.hasOwnProperty(keyInner)) {
                            var value = selectedRowObj[keyInner];

                            if (keyInner === key) {
                                newInput.checked = value;
                                newInput.id = key;
                                newInput.disabled = true;
                            }
                        }
                    }
                } else if (_element === "string") {
                    var _newInput = document.createElement("input");
                    _newInput.classList.add("modal-wrapper__row");
                    _newInput.type = "text";
                    _newInput.placeholder = key;
                    _newInput.id = key;
                    rootElement.appendChild(_newInput);

                    for (var _keyInner in selectedRowObj) {
                        if (selectedRowObj.hasOwnProperty(_keyInner)) {
                            var _value = selectedRowObj[_keyInner];

                            if (_keyInner === key) {
                                _newInput.value = _value;
                                _newInput.id = key;
                                _newInput.disabled = true;
                            }
                        }
                    }
                } else if (_element === "number") {
                    var _newInput2 = document.createElement("input");
                    _newInput2.classList.add("modal-wrapper__row");
                    _newInput2.type = "number";
                    _newInput2.placeholder = key;
                    _newInput2.id = key;
                    rootElement.appendChild(_newInput2);

                    for (var _keyInner2 in selectedRowObj) {
                        if (selectedRowObj.hasOwnProperty(_keyInner2)) {
                            var _value2 = selectedRowObj[_keyInner2];

                            if (_keyInner2 === key) {
                                _newInput2.value = _value2;
                                _newInput2.id = key;
                                _newInput2.disabled = true;
                            }
                        }
                    }
                }
            }
		}
	}
}

//функция отрисовки полей формы ввода данных. Для форм создания и обновления записи
function renderFieldsDialog(isCreate) {
	var currentDocument;

	if (isCreate && (checkedRow === undefined || checkedRow.getAttribute('parent-elem') !== null)) {
		document
			.querySelector(".control-panel-container__modal-create")
			.classList.add('control-panel-container__modal-create_open');
		currentDocument = document.querySelector(".control-panel-container__modal-create");
		render(isCreate, null, false);
	} else if (isCreate && checkedRow !== undefined && checkedRow.getAttribute('parent-elem') === null) {
		document
			.querySelector(".control-panel-container__modal-create")
			.classList.add('control-panel-container__modal-create_open');
		currentDocument = document.querySelector(".control-panel-container__modal-create");
		render(isCreate, null, true);
		
	} else if (!isCreate && checkedRow !== undefined) {
		document
			.querySelector(".control-panel-container__modal-update")
			.classList.add('control-panel-container__modal-update_open');
		currentDocument = document.querySelector(".control-panel-container__modal-update");
		var selectedRowObj = {};
		jsonData.forEach(function(element) {
			if (element.QuestionId === checkedRow.getAttribute("elem")) {
				for (var key in element) {
					if (element.hasOwnProperty(key)) {
						var item = element[key];
						selectedRowObj[key] = item;
					}
				}
			}
		});
		render(isCreate, selectedRowObj);
	}

	function render(isCreate, selectedRowObj, isChild) {
		var rootElement = currentDocument.querySelector(".modal-wrapper__inputs-container");

		while (rootElement.firstChild) {
			rootElement.removeChild(rootElement.firstChild);
		}

		// var i = 0;

		for (var key in mappingDataTypes) {
			if (mappingDataTypes.hasOwnProperty(key)) {
				var _element = mappingDataTypes[key];

				if (_element === "boolean") {
					var newInput = document.createElement("input");
					newInput.classList.add("modal-wrapper__row");
					newInput.type = "checkbox";
					newInput.id = key;
					var newLabel = document.createElement("label");
					// newLabel.setAttribute("for", "checkbox" + i++);
					newLabel.textContent = key;
					var newBr = document.createElement("br");
					rootElement.appendChild(newInput);
					rootElement.appendChild(newLabel);
					rootElement.appendChild(newBr);
					
					key === 'IsMain'? newInput.disabled = true: true;
					key === 'IsMain' && isChild === true? newInput.checked = false: true;
					key === 'IsMain' && isChild === false? newInput.checked = true: true;

					if (!isCreate) {
						for (var keyInner in selectedRowObj) {
							if (selectedRowObj.hasOwnProperty(keyInner)) {
								var value = selectedRowObj[keyInner];

								if (keyInner === key) {
									newInput.checked = value;
									newInput.id = key;
								}
							}
						}
					}
				} else if (_element === "string") {
					var _newInput = document.createElement("input");
					_newInput.classList.add("modal-wrapper__row");
					_newInput.type = "text";
					_newInput.placeholder = key;
					_newInput.id = key;
					rootElement.appendChild(_newInput);

					if (!isCreate) {
						for (var _keyInner in selectedRowObj) {
							if (selectedRowObj.hasOwnProperty(_keyInner)) {
								var _value = selectedRowObj[_keyInner];

								if (_keyInner === key) {
									_newInput.value = _value;
									_newInput.id = key;
								}
							}
						}
					}
				} else if (_element === "number") {
					var _newInput2 = document.createElement("input");
					_newInput2.classList.add("modal-wrapper__row");
					_newInput2.type = "number";
					_newInput2.placeholder = key;
					_newInput2.id = key;
					rootElement.appendChild(_newInput2);

					if (!isCreate) {
						for (var _keyInner2 in selectedRowObj) {
							if (selectedRowObj.hasOwnProperty(_keyInner2)) {
								var _value2 = selectedRowObj[_keyInner2];

								if (_keyInner2 === key) {
									_newInput2.value = _value2;
									_newInput2.id = key;
								}
							}
						}
					}
				}
			}
		}
	}
}