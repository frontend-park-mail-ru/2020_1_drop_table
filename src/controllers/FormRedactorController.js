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
    control() {
        // await this.update();

        // this._appleCard.context = this._makeContext();

        this.updateView();

    }
    updateView(){
        this._formRedactorView._formModel = this._formModel;
        this._formRedactorView.render();
        this.addListeners();
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
        let cells = document.getElementsByClassName('form-creator-container__cells-container__cell');

        for(let i = 0; i < cells.length; i++){
            this._addCellListeners(cells.item(i));
        }
    }

    _makePreview(){
        console.log('make preview', this.cellContext)
        this._formRedactorView.renderCell(this.cellContext,'small');
    }
    _addCellListeners(cell) {
        let deleteButton = cell.getElementsByClassName('big-form-cell__delete').item(0);
        let context = {
            cell_id: Number(deleteButton.id.split('-')[2]),
            _formModel: this._formModel,
            updateView: this.updateView.bind(this),
        };
        deleteButton.addEventListener('click', this.removeCell.bind(context));


        let previewButton = cell.getElementsByClassName('big-form-cell__save').item(0);
        context = {
            _formRedactorView : this._formRedactorView,
            cellContext: this._formModel._cells[previewButton.id.split('-')[2]],
        };
        console.log('cellContext', context);
        previewButton.addEventListener('click', this._makePreview.bind(context));

        let typesContainer = cell.getElementsByClassName('big-form-cell__answer-type__types').item(0);
        let types = cell.getElementsByClassName('big-form-cell__answer-type__types__type');
        for (let i = 0; i < types.length; i++) {
            let context = {
                cell_id: Number(typesContainer.id.split('-')[1]),
                _formModel: this._formModel,
                updateView: this.updateView.bind(this),
                type: types.item(i).id.split('-')[2],
            };
            types.item(i).addEventListener('click', this.setType.bind(context));
        }

        let questionInput = cell.getElementsByClassName('big-form-cell__question_input').item(0);

        context = {
            cell_id: Number(questionInput.id.split('-')[1]),
            _formModel: this._formModel,
            input : questionInput,
        };

        questionInput.addEventListener('change', this.changeQuestion.bind(context));


        let addOptionButton =
                cell.getElementsByClassName('big-form-cell__answer-options__options_add-button').item(0);
        if (addOptionButton) {
            context = {
                cell_id: Number(addOptionButton.id.split('-')[2]),
                _formModel: this._formModel,
                updateView: this.updateView.bind(this),
            };
            addOptionButton.addEventListener('click', this.addOption.bind(context));

            let options = cell.getElementsByClassName('big-form-cell__answer-options__options__list__cell');
            for (let i = 0; i < options.length; i++) {
                let deleteButton = options.item(i).getElementsByClassName(
                    'big-form-cell__answer-options__options__list__cell__button').item(0);
                context = {
                    cell_id: Number(options.item(i).id.split('-')[1]),
                    option_id: Number(options.item(i).id.split('-')[2]),
                    _formModel: this._formModel,
                    updateView: this.updateView.bind(this),
                };
                deleteButton.addEventListener('click', this.removeOption.bind(context));

                let input = options.item(i).
                    getElementsByClassName('big-form-cell__answer-options__options__list__cell_input').item(0);
                context = {
                    cell_id: Number(options.item(i).id.split('-')[1]),
                    option_id: Number(options.item(i).id.split('-')[2]),
                    _formModel: this._formModel,
                    updateView: this.updateView.bind(this),
                    input: input
                }
                input.addEventListener('change', this.changeOptionText.bind(context))

            }
        }
    }


    changeQuestion(){
        this._formModel._cells[this.cell_id].question = this.input.value
    }

    setType() {
        this._formModel._cells[this.cell_id].answerType = this.type;
        this.updateView();
    }

    addCell() {
        this._formModel._cells.push({
            cell_id: this._formModel._cells.length, //+1
            question: 'Вопрос',
            answerType: 'text',
            answerOptions: [],
        },);
        //todo render
        this.updateView();
    }

    removeCell() {
        const lengthBefore = this._formModel._cells.length;
        this._formModel._cells =this._formModel._cells.filter(item => item.cell_id !== this.cell_id);
        const lengthAfter = this._formModel._cells.length;
        //If remove => set new id for cells
        if (lengthAfter !== lengthBefore) {
            for (let i = 0; i < this._formModel._cells.length; i++) {
                this._formModel._cells[i].cell_id = i;
            }
            this.updateView();
        }


    }

    addOption() {
        for (let i = 0; i < this._formModel._cells.length; i++) {
            if (this._formModel._cells[i].cell_id === this.cell_id) {
                this._formModel._cells[i].answerOptions.push({
                    cell_id: this.cell_id,
                    option_id: this._formModel._cells[i].answerOptions.length,
                    text: 'Вариант'
                });
                //todo render
                this.updateView();
            }
        }
    }

    removeOption() {
        for (let i = 0; i < this._formModel._cells.length; i++) {
            if (this._formModel._cells[i].cell_id === this.cell_id) {
                const lengthBefore = this._formModel._cells[i].answerOptions.length;
                this._formModel._cells[i].answerOptions = this._formModel._cells[i].answerOptions.
                    filter(option => option.option_id !== this.option_id);
                const lengthAfter = this._formModel._cells[i].answerOptions.length;
                if (lengthAfter !== lengthBefore) {
                    for (let j = 0; j < lengthAfter; j++) {
                        this._formModel._cells[i].answerOptions[j].option_id = j;
                    }
                    this.updateView();
                }
            }
        }
    }

    changeOptionText() {
        if(this._formModel._cells[this.cell_id] && this._formModel._cells[this.cell_id].answerOptions[this.option_id]){
            this._formModel._cells[this.cell_id].answerOptions[this.option_id].text = this.input.value
            // this.updateView();
        }

    }
}
