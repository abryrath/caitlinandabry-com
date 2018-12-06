import { onInit as subMenu } from './modules/subMenu';
import { onInit as filter } from './modules/filter';
import './scss/app.scss';
class App
{
    constructor() {
        subMenu();
        filter();
    }
}

document.addEventListener('DOMContentLoaded', new App);