'use strict';
import './MultiSelect.scss';
import MultiSelectTemplate from './MultiSelect.hbs';

/** Компонента страницы лендинга */
export class MultiSelectComponent {

    /**
     * Инициализация компоненты страницы лендинга
     * @param {Element} parent элемент в котором будет располагаться компонента лендинга
     */
    constructor(parent = document.getElementById('application'), context) {
        this._parent = parent;
        this.data = context.data;
        this._context = context;
        this.options = context.options;
    }

    _initSelector(){
        let element = this._parent.getElementsByClassName('multiselect__container').item(0);
        Motus.ElementMultiselect.init(element, this.data, this._context.listener, this.options);
    }
    /** Отрисовка страницы лендинга */
    render() {
        this._parent.innerHTML = MultiSelectTemplate();
        this._initSelector();
    }
}

let Motus = {};

(function() {
    let createMultiselect = function(element, data, selectCb, options) {

        let labels = {};

        labels.emptyText = (options && options.emptyText) ? options.emptyText : 'Выберите ';
        labels.selectedText = (options && options.selectedText) ? options.selectedText : 'Выбрано';
        labels.selectedAllText = (options && options.selectedAllText) ? options.selectedAllText : 'Выбрать все';
        labels.title = (options && options.title) ? options.title : 'Поле';

        //define the elements
        let container = document.createElement('div');
        let multiselectLabel = document.createElement('div');
        let dataContainer = document.createElement('div');
        let button = document.createElement('button');
        let searchField = document.createElement('input');
        let clearSelection = document.createElement('span');
        let carret = document.createElement('b');
        let list = document.createElement('ul');

        //set the ids
        let timestamp = Math.round(new Date().getTime() * Math.random());
        container.setAttribute('id','multiselect_container_'+timestamp);
        dataContainer.setAttribute('id','multiselect_datacontainer_'+timestamp);
        multiselectLabel.setAttribute('id','multiselect_label_'+timestamp);
        button.setAttribute('id','multiselect_button_'+timestamp);
        list.setAttribute('id','multiselect_list_'+timestamp);

        let _fnIsChild = function(element, parent){
            let node = element.parentNode;
            while(node){
                if(node === parent){
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }

        let _selectionText = function(element) {
            let text = '';
            let selection = element.querySelectorAll('input:checked');
            if (selection.length === 0) {
                text = labels.emptyText;
            } else if (selection.length > 3) {
                text = selection.length + ' ' +labels.selectedText;
            } else {
                let arr = [];
                for (let i = 0; i < selection.length; i++) {
                    arr.push(selection[i].parentNode.textContent);
                }
                text = arr.join(',');
            }
            return text;
        };

        let _openList = function(e) {
            list.style.display = 'block';
            e.srcElement.children[0].focus();
        };

        let _selectItem = function(e) {
            let text = _selectionText(container);
            container
                .getElementsByTagName('button')[0]
                .children[0].setAttribute('placeholder', text);

            if(selectCb){
                let selectionElements = container.querySelectorAll('input:checked');
                let selection = [];
                for(let i=0; i < selectionElements.length; i++){
                    selection.push(selectionElements[i].value);
                }
                selectCb(selection);
            }

        };

        let _clearSearch = function() {
            let elements = container.getElementsByTagName('li');
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = '';
            }
        };

        let _performSearch = function(e) {
            if(e.which != 13 && e.which != 38 && e.which != 40){
                let active = list.getElementsByClassName('multiselect-label--active');
                if( active.length > 0 ){
                    active[0].classList.remove('multiselect-label--active');
                }
                let first = true;
                let filter = e.srcElement.value.toUpperCase();
                let elements = container.getElementsByTagName('li');
                for (let i = 0; i < elements.length; i++) {
                    let cb = elements[i].getElementsByTagName('label')[0].textContent;
                    if (cb.toUpperCase().indexOf(filter) !== -1) {
                        if(first){
                            first = false;
                            elements[i].children[0].children[0].classList.add('multiselect-label--active');
                        }
                        elements[i].style.display = '';
                    } else {
                        elements[i].style.display = 'none';
                    }
                }
            }
        };

        let _fnClearSelection = function(e){
            let inputs = list.getElementsByTagName('input');
            for(let i=0; i < inputs.length; i++){
                if(inputs[i].checked){
                    inputs[i].parentNode.click();
                }
            }
            e.stopPropagation();
        };

        let _fnSelectAll = function(e){
            let inputs = list.getElementsByTagName('input');
            for(let i=0; i < inputs.length; i++){
                if(!inputs[i].checked){
                    inputs[i].parentNode.click();
                }
            }
            e.stopPropagation();
        };

        container.classList.add('multiselect-container');
        multiselectLabel.classList.add('multiselect-label');
        multiselectLabel.innerHTML = labels.title;
        dataContainer.classList.add('multiselect-data-container');
        button.classList.add('multiselect-button');

        searchField.setAttribute('type', 'text');
        searchField.setAttribute('placeholder', labels.emptyText);
        searchField.classList.add('multiselect-text');
        searchField.addEventListener('keyup', _performSearch);

        clearSelection.classList.add('multiselect-clear');
        clearSelection.innerHTML = 'X';
        clearSelection.addEventListener('click', _fnClearSelection);

        carret.classList.add('carret');

        button.appendChild(searchField);
        button.appendChild(clearSelection);
        button.appendChild(carret);

        button.addEventListener('click', _openList);

        list.classList.add('multiselect-list');

        for (let i = -1; i < data.length; i++) {
            let item = document.createElement('li');
            let a = document.createElement('a');
            let label = document.createElement('label');
            let input = document.createElement('input');

            a.setAttribute('tabindex', '0');

            label.classList.add('multiselect-item-label');

            if(i == -1){
                a.addEventListener('click', _fnSelectAll);
                label.appendChild(document.createTextNode('Выбрать все'));
                label.classList.add('multiselect-item-label--select-all');
            }
            else{
                if (i == 0) {
                    label.classList.add('multiselect-item-label--active');
                }
                input.setAttribute('type', 'checkbox');
                input.setAttribute('class', 'multiselect-checkbox');

                label.appendChild(input);
                input.setAttribute('value', data[i].value);
                input.addEventListener('change', _selectItem);
                label.appendChild(document.createTextNode(data[i].label));
            }
            a.appendChild(label);
            item.appendChild(a);
            list.appendChild(item);
        }

        dataContainer.appendChild(button);
        dataContainer.appendChild(list);
        container.appendChild(multiselectLabel);
        container.appendChild(dataContainer);
        element.appendChild(container);

        //Change to the specific window
        document.addEventListener('click', function(e) {
            if ( !_fnIsChild(e.target, container) ) {
                list.style.display = 'none';
                searchField.value = '';
                _clearSearch();
            }
        });

        document.addEventListener('keyup', function(e) {
            if(list.style.display == 'block'){
                //mouse down
                if (e.which === 40) {
                    let active = list.getElementsByClassName(
                        'multiselect-label--active'
                    )[0];
                    let next = active.parentNode.parentNode.nextSibling;
                    //Find the next visible element
                    while(next && next.style && next.style.display == 'none'){
                        next = next.nextSibling;
                    }
                    if (next) {
                        active.classList.remove('multiselect-label--active');
                        next
                            .getElementsByClassName('multiselect-label')[0]
                            .classList.add('multiselect-label--active');
                        next.children[0].focus();
                        searchField.focus();
                        e.preventDefault();
                    }
                } else if (e.which === 38) {
                    //mouse up
                    let active = list.getElementsByClassName(
                        'multiselect-label--active'
                    )[0];
                    let prev = active.parentNode.parentNode.previousSibling;
                    //Find the previous visible element
                    while(prev && prev.style && prev.style.display === 'none'){
                        prev = prev.previousSibling;
                    }
                    if (prev) {
                        active.classList.remove('multiselect-label--active');
                        prev
                            .getElementsByClassName('multiselect-label')[0]
                            .classList.add('multiselect-label--active');
                        prev.children[0].focus();
                        searchField.focus();
                        e.preventDefault();
                    }
                } else if (e.which === 13) {
                    // enter
                    list.getElementsByClassName('multiselect-label--active')[0].click();
                    e.preventDefault();
                }
            }
        });
    };
    let exportObj = {
        init: function(element, data, selectCb, options) {
            createMultiselect(element, data, selectCb, options);
        }
    };

    Motus.ElementMultiselect = exportObj;

})();





let select = function(data){
    console.log(data);
};




