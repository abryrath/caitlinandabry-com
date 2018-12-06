class SubMenu
{
    constructor(node) {
        this.element = node;
        this.parentId = this.element.dataset.navParent;
        this.childContainer = document.querySelector(`[data-nav-child="${this.parentId}"]`);
        this.open = false;
        this.setChildOpen(this.open);
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    onClick (e) {
        console.log('click');
        this.open = !this.open;
        this.setChildOpen(this.open);
        e.stopPropagation();
    }

    setChildOpen(open) {
        // if (open) {
        //     this.childContainer.style.display = 'block';
        // } else {
        //     this.childContainer.style.display = 'none';
        // }
    }
}

export const onInit = () => {
    const navItems = document.querySelectorAll('[data-nav-parent]');
    if (navItems && navItems.length) {
        navItems.forEach(navParent => {
            new SubMenu(navParent);
        });
    }
};