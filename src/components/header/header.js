import './headerStyles.css'

export function renderHeader() {
    console.log("kek");
    const app = document.getElementById('app');
    var head = document.createElement('div')
    head.className = "header";
    head.innerHTML = "<div class = \"logoDiv\">\n" +
        "        <img src=\"https://sun9-30.userapi.com/c857120/v857120674/ded2f/D5blv62-tno.jpg\" class=\"logo\">\n" +
        "    </div>\n" +
        "\n" +
        "    <div class=\"rightPart\">\n" +
        "    <div class=\"navHeader\">\n" +
        "    <input class=\"menu-btn\" type=\"checkbox\" id=\"menu-btn\" />\n" +
        "    <label class=\"menu-icon\" for=\"menu-btn\"><span class=\"navicon\"></span></label>\n" +
        "    <ul class=\"menu\">\n" +
        "        <li><a href=\"#myCafe\">мои кафе</a></li>\n" +
        "        <li><a href=\"#staff\">работники</a></li>\n" +
        "        <li><a href=\"#add\">добавить</a></li>\n" +
        "        <li><a href=\"#stat\">статистика</a></li>\n" +
        "    </ul>\n" +
        "    </div>\n" +
        "    <div class = \"userPicDiv\">\n" +
        "        <img src=\"https://sun9-52.userapi.com/c857120/v857120621/e1197/AGVLHk62SEs.jpg\">\n" +
        "    </div>\n" +
        "</div>\n"


    return head
}



