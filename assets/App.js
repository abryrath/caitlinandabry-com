import { onInit as subMenu } from './modules/subMenu';
import { onInit as filter } from './modules/filter';
import { onInit as map } from './modules/map';

import './scss/app.scss';
class App
{
    constructor() {
        subMenu();
        filter();
        map();
    }
}

document.addEventListener('DOMContentLoaded', new App);