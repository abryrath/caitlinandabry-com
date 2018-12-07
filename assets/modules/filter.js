const filter = () => {
    window.filters = window.filters || [];
    const dataType = document.querySelector('[data-filter-data-type]').dataset.filterDataType;

    let queryString = '';
    window.filters.forEach(filter => {
        if (queryString.length) {
            queryString += '&';
        }
        queryString += filter.getFilterString();
    });

    const requestUrl = `/${dataType}/?${queryString}`
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

};

class DropdownFilter {
    constructor(node, type) {
        window.filters = window.filters || [];
        this.element = node;
        this.filterType = type;
        this.element.addEventListener('change', this.onChange.bind(this));
        window.filters.push(this);
    }

    onChange(e) {
        filter();
    }

    getValue() {
        return this.element.selectedOptions[0].value;
    }

    getFilterString() {
        return `${this.filterType}=${this.getValue()}`;
    }
}

class CheckboxFilterGroup {
    constructor(node, type) {
        window.filters = window.filters || [];
        this.element = node;
        this.checkboxes = [];
        this.filterType = type;
        Array.prototype.forEach.call(this.element.children, child => {
            if (child.type == 'checkbox') {
                if (child.dataset.label) {
                    document.querySelector(`label[for="${child.id}"]`).innerText = child.dataset.label;
                }
                child.addEventListener('change', this.onChange.bind(this));
                this.checkboxes.push(child);
            }
        });
        window.filters.push(this);
    }

    onChange(e) {
        filter();
    }

    getValues() {
        let values = '';
        Array.prototype.forEach.call(this.checkboxes, checkbox => {
            if (checkbox.checked) {
                if (values.length) {
                    values += ',';
                }
                values += checkbox.dataset.label;
            }
        });

        return values;
    }

    getFilterString() {
        return `${this.filterType}=${this.getValues()}`;
    }
}

export const onInit = () => {
    const filters = document.querySelectorAll('[data-filter]');
    if (filters && filters.length) {
        filters.forEach(filter => {
            const filterType = filter.dataset.filter;
            switch (filterType) {
                case 'cuisine':
                case 'cost':
                    new DropdownFilter(filter, filterType);
                    break;
                case 'epicentre':
                    new CheckboxFilterGroup(filter, filterType);
                    break;
                default:
                    console.log('no match');
            }    
        })
    }
};