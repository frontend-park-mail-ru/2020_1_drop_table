'use strict';

import {ajax} from '../utils/ajax';
import {constants} from '../utils/constants';

/** Модель лендинга (пока статическая) */
export default class LandingModel { // Пока пустой и статичный
    constructor() {
        this.clear();
    }

    clear(){
        this.cafes = [];
    }

    async getNearestCafes(latitude, longitude, radius) {
        await ajax(constants.PATH + `/api/v1/cafe/get_by_geo?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
            'GET',
            {},
            (response) => {
                if(response.errors === null){
                    this.cafes = response.data ? response.data : [];
                    return
                }
                throw response.errors;
            }
        )
    }
}
