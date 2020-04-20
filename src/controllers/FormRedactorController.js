'use strict';



/** Контроллер редактирования карточки */
export default class FormRedactorController {

    constructor(formModel, formRedactorView) {
        this._formModel = formModel;
        this._formRedactorView = formRedactorView;

    }

    async update() {
        // await this._formModel.update();
    }

    /** Запуск контроллера */
    async control() {
        // await this.update();

        // this._appleCard.context = this._makeContext();
        this.updateView();

        // let cardRedactorBottom =
        //     document.getElementsByClassName('card').item(0);
        // cardRedactorBottom.scrollIntoView({block: 'start', behavior: 'smooth'});

    }
    async updateView(){
        this._formRedactorView._formModel = this._formModel;
        this._formRedactorView.render();
        this.addListeners()
    }

    /**
     * Создание контекста для CardRedactorView
     * @return {Promise<{appleCard: any}>}
     * @private
     */
    _makeContext() {
        let formModelContext = {
            formModel: this._formModel.context
        };
        return formModelContext;
    }


    addListeners() {
        let addButton = document.getElementsByClassName('form-creator-container__button').item(0);
        addButton.addEventListener('click', this.addCell.bind(this));

        let deleteButtons = document.getElementsByClassName('big-form-cell__delete');
        for(let i = 0; i < deleteButtons.length; i++){
            const context = {
                cell_id: deleteButtons.item(i).id.split('-')[2],
                _formModel : this._formModel,
                updateView : this.updateView.bind(this),
            };
            deleteButtons.item(i).addEventListener('click',this.removeCell.bind(context));
        }


    }

    addCell() {
        console.log('add cell');
        this._formModel._cells.push({
            cell_id: this._formModel._cells.length + 1,
            question: 'Вопрос',
            answerType: 'text',
            answerOptions: null,
        },);
        //todo render
        this.updateView();
    }

    removeCell() {
        const lengthBefore = this._formModel._cells.length;
        this._formModel._cells =this._formModel._cells.filter(item => item.cell_id != this.cell_id);
        const lengthAfter = this._formModel._cells.length;
        //If remove => set new id for cells
        if (lengthAfter !== lengthBefore) {
            for (let i = 0; i < this._formModel._cells.length; i++) {
                this._formModel._cells[i].cell_id = i;
            }
            this.updateView();
        }


    }

    addOption(cell_id) {
        for (let i = 0; i < this._formModel._cells.length; i++) {
            if (this._formModel._cells[i].cell_id === cell_id) {
                this._formModel._cells[i].options.push({
                    cell_id: cell_id,
                    option_id: this._formModel._cells[i].options.length + 1,
                    text: 'Вариант'
                });
                //todo render
            }
        }
    }

    removeOption(cell_id, option_id) {
        for (let i = 0; i < this._formModel._cells.length; i++) {
            if (this._formModel._cells[i].cell_id === cell_id) {
                const lengthBefore = this._formModel._cells[i].options.length;
                this._formModel._cells[i].options = this._formModel._cells[i].options.filter(function (option) {
                    return option.option_id !== option_id
                });
                const lengthAfter = this._formModel._cells[i].options.length;
                if (lengthAfter !== lengthBefore) {
                    for (let i = 0; i < this._formModel._cells[i].options.length; i++) {
                        this._formModel._cells[i].options[i].option_id = i;
                    }
                    //todo render
                }
            }
        }

    }
}
