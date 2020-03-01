import './headerStyles.css';
import headerTemplate from "./HeaderTemplate.hbs"

/**
 * Рендерит хедер для залогиненного пользотвателя
 * @returns {HTMLDivElement} Отредеренный хедер
 */
export function renderHeader() {
    let head = document.createElement('div');
    head.className = 'header';
    let headerData = {
        menuList: [{href: "#myCafe", text: "Мои кафе"}, {
            href: "#createCafe",
            text: "Добавить"
        }, {href: "#profile", text: "Профиль"}]
    };
    head.innerHTML = headerTemplate(headerData);
    return head;
}

/**
 * Рендерит хедер не для залогиненного пользователя
 * @returns {HTMLDivElement} Отредеренный хедер
 */
export function renderBlankHeader() {
    let head = document.createElement('div');
    head.className = 'header';
    let headerData = {
        menuList: [{href: "#login", text: "Войти"}, {
            href: "#reg",
            text: "Зарегистрироваться"
        }]
    };
    head.innerHTML = headerTemplate(headerData);
    return head;
}





