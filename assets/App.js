import { onInit as subMenu } from './modules/subMenu';
import { onInit as filter } from './modules/filter';
import { onInit as map } from './modules/map';
import { onInit as accordion } from './modules/accordion';

import './scss/app.scss';
class App
{
    constructor() {
        subMenu();
        filter();
        map();
        accordion();
    }
}

document.addEventListener('DOMContentLoaded', new App);