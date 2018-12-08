class Accordion
{
    constructor(node) {
        this.container = node;
        this.children = Array.prototype.filter.call(this.container.children, child => {
            if (child.dataset.accordionChild) {
                return true;
            }
        });

        this.children.forEach(child => {
            child.addEventListener('click', this.toggle.bind(this));
        })

        console.log(this.children);
    }

    toggle(e) {
        const target = e.target;
        const id = target.dataset.accordionChild || target.dataset.accordionChildTitle;
        const all = document.querySelectorAll('[data-accordion-child-title]');
        if (all) {
            all.forEach(child => {
                const childId = child.dataset.accordionChildTitle;
                    const title = document.querySelector(`[data-accordion-child-title="${childId}"]`);
                    const body = document.querySelector(`[data-accordion-child-body="${childId}"]`);                
                    
                    if (childId == id) {
                        body.classList.toggle('active');
                        title.classList.toggle('active');
                    } else {
                        body.classList.remove('active');
                        title.classList.remove('active');
                    }
            })
        }
        

    }
}

export const onInit = () => {
    const accordions = document.querySelectorAll('[data-accordion]');
    if (accordions && accordions.length) {
        accordions.forEach(accordion => {
            new Accordion(accordion);
        });
    }
}