class LogicTransitionOnBoard {
    constructor (class_item) {
        this.px = 'px';
        //.................нажата ли кнопка мыши в данный момент
        this.is_down_to_item = false;
        //.....................елемент по которомы мы нажали
        this.element = null;
        //.................положение курсора мыши относительно окна браузера
        this.x_on_body = 0;
        this.y_on_body = 0;
        //.................положение курсора мыши относительно элемента который тянем
        this.x_offset = 0;
        this.y_offset = 0;
        //...................клас элемента кторый хотим двигать
        this.class_item = class_item
    }


    //...............инициализация
    start() {
        this._addEventListenerDown()
        this._addEventListenerUp()
    }


    //..........метод ждет пока нажмем кнопку мыши на элемент
    _addEventListenerDown() {
        //..................ищем все эелементы которые будем перемещать
        document.querySelectorAll(this.class_item).forEach(item => {
            item.addEventListener('mousedown', (e) => {
                //.............сетим элемент текущий который тянем
                this.element = item
                //..........проверка
                this.is_down_to_item = true
                //.................сетим положение курсора мыши относительно элемента который тянем
                this.x_offset = e.offsetX
                this.y_offset = e.offsetY
                this._changePosition()
            })
        })
    }
    //..........метод ждет пока отпустим кнопку мыши с элемента
    _addEventListenerUp() {
        //..................ищем все эелементы которые будем перемещать
        document.querySelectorAll(this.class_item).forEach(item => {
            item.addEventListener('mouseup', (e) => {
                //.....................копируем эелемент который тащили
                let current_elem = e.currentTarget
                //......................удаляем елемент со старого места в DOM
                this._helper_delete_element()
                //...................находим родителя элемента который тащили
                document.elementFromPoint(this.x_on_body, this.y_on_body).append(current_elem)
                //........................ удаляем стили CSS
                current_elem.style.position = ""
                current_elem.style.left = ""
                current_elem.style.top = ""
                //......................добавляем елемент в новое место в DOM
                this._helper_add_element()
                this.is_down_to_item = false
            })
        })
    }


    //................метод меняет позиционирование элемента который мы тянем
    _changePosition() {
        document.addEventListener('mousemove',  (e) => {
            if (this.is_down_to_item) {
                //......................сетим значения положения курсора мыши относительно окна браузера
                this.x_on_body = e.pageX;
                this.y_on_body = e.pageY;
                //........................добавляем стили элементу который тянем
                this.element.style.position = "absolute"
                this.element.style.left = this.x_on_body - this.x_offset + this.px
                this.element.style.top = this.y_on_body - this.y_offset + this.px
            }
        })
    }


    //..............скрываем на время элементы которые перемещаем
    _helper_delete_element() {
        //..................ищем все эелементы которые будем перемещать
        document.querySelectorAll(this.class_item).forEach(item => {
            item.style.display = "none"
        })
    }
    //..............возвращаем элементы которые перемещаем
    _helper_add_element() {
        //..................ищем все эелементы которые будем перемещать
        document.querySelectorAll(this.class_item).forEach(item => {
            item.style.display = ""
        })
    }
}


let aaa = new LogicTransitionOnBoard(".item")
aaa.start()

// let bbb = new LogicTransitionOnBoard(".board__column")
// bbb.start()


