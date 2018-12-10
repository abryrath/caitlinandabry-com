class MobileMenu
{
    constructor(node) {
        console.log('Creating MobileMenu');
        this.element = node;
        this.hamburger = document.querySelector('.Menu-mobile-hamburger');
        this.hamburger.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu(e) {
        console.log('howdy');
        this.element.classList.toggle('active');
    }
}

export const onInit = () => {
    const menu = document.querySelector('.Menu');
    if (menu) {
        if (window.screen.width < 770) {
            new MobileMenu(menu);
        }
    }
};