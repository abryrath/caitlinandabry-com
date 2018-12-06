class Filter {
    constructor(node, type) {
        this.element = node;
        this.filterType = type;
        this.dataType = document.querySelector('[data-filter-data-type]').dataset.filterDataType;
        this.element.addEventListener('change', this.onChange.bind(this));
    }

    onChange(e) {
        console.log(e.target);
        const value = e.target.selectedOptions[0].value;
        const requestUrl = `/${this.dataType}/?${this.filterType}=${value}`
        fetch(requestUrl, {
            credentials: 'same-origin',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
        .then(res => res.text())
        .then(content => {
            const section = document.querySelector('.ThingsToDo');
            section.innerHTML = '';
            section.innerHTML = content;
        });
    }
}

export const onInit = () => {
    const filters = document.querySelectorAll('[data-filter]');
    if (filters && filters.length) {
        filters.forEach(filter => {
            switch (filter.dataset.filter) {
                case 'cuisine':
                case 'cost':
                    new Filter(filter, filter.dataset.filter);
                    break;
                default:
                    console.log('no match');
            }    
        })
    }
};