'use strict';

import {Router} from "../modules/Router";

export default class StaffListController{

    constructor(staffListModel, userModel, staffListView) {
        this._staffListModel = staffListModel;
        this._userModel = userModel;
        this._staffListView = staffListView;
    }

    _headerAvatarListener(){
        window.location.replace('/profile')
        // Router.redirect('/Profile');
    }

    // _cafeListButtonListener(){
    //     Router.redirect('/createCafe')
    // }



    async _makeContext(){
        let staffListContext = {
            staffList: {

                'Кафе у Бритни': [
                    {
                        staffID: '1',
                        photo:'https://i.pinimg.com/474x/e3/1b/52/e31b529370b3c841c11cf2a7d4ee9d53--stress-humor-britney-spears.jpg',
                        name: 'Бритни Спирс1',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '2',
                        photo:'https://i.pinimg.com/474x/e3/1b/52/e31b529370b3c841c11cf2a7d4ee9d53--stress-humor-britney-spears.jpg',
                        name: 'Бритни Спирс2',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '3',
                        photo:'https://i.pinimg.com/474x/e3/1b/52/e31b529370b3c841c11cf2a7d4ee9d53--stress-humor-britney-spears.jpg',
                        name: 'Бритни Спирс3',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '4',
                        photo:'https://i.pinimg.com/474x/e3/1b/52/e31b529370b3c841c11cf2a7d4ee9d53--stress-humor-britney-spears.jpg',
                        name: 'Бритни Спирс4',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                ],

                'Кафе у Фекалиса': [
                    {
                        staffID: '5',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис5',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '6',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис6',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '7',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис7',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '8',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис8',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                    {
                        staffID: '9',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис9',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                ],
                'Кафе одиночество': [
                    {
                        staffID: '10',
                        photo:'https://lastfm.freetls.fastly.net/i/u/ar0/a91fc5e0de5ee3ea7688e0f386999f79.jpg',
                        name: 'Мистер Фекалис10',
                        position: 'Официант и еще какая-то должность.Мастерски готовит суши и гречку с котлетами'
                    },
                ],

            }
            // await this._ListModel.context

        };

        staffListContext['header'] = {
            type: null,
            avatar: {
                photo: await this._userModel.photo,
                event: {
                    type: 'click',
                    listener: this._headerAvatarListener.bind(this)
                }
            }
        };
        return staffListContext;
    }

    async control(){
        this._staffListView.context = await this._makeContext();
        this._staffListView.render();
    }
}
