import { onInit as subMenu } from './modules/subMenu';
import './scss/app.scss';
class App
{
    constructor() {
        subMenu();
    }
}

document.addEventListener('DOMContentLoaded', new App);