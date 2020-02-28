import './headerStyles.css';

export function renderHeader() {
    let head = document.createElement('div');
    head.className = 'header';
    head.innerHTML = '<div class = "logoDiv">\n' +
        '        <img src="https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg" class="logo">\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="rightPart">\n' +
        '    <div class="navHeader">\n' +
        '    <input class="menu-btn" type="checkbox" id="menu-btn" />\n' +
        '    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>\n' +
        '    <ul class="menu">\n' +
        '        <li><a href="#myCafe">Мои кафе</a></li>\n' +
        '        <li><a href="#createCafe">Добавить</a></li>\n' +
        '        <li><a href="#profile">Профиль</a></li>\n' +
        '    </ul>\n' +
        '    </div>\n' +
        '</div>\n';


    return head;
}


export function renderBlankHeader() {
    let head = document.createElement('div');
    head.className = 'header';
    head.innerHTML = '<div class = "logoDiv">\n' +
        '        <img src="https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg" class="logo">\n' +
        '    </div>\n' +
        '\n' +
        '    <div class="rightPart">\n' +
        '    <div class="navHeader">\n' +
        '    <input class="menu-btn" type="checkbox" id="menu-btn" />\n' +
        '    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>\n' +
        '    <ul class="menu">\n' +
        '        <li><a href="#login">Логин</a></li>\n' +
        '        <li><a href="#reg">Зарегистрироваться</a></li>\n' +
        '    </ul>\n' +
        '    </div>\n' +
        '</div>\n';


    return head;
}





