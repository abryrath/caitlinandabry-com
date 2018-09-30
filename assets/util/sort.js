export default {
    sortAsc(a, b) {
        if (a > b) {
            return 1;
        } else if (b > a) {
            return -1;
        }
        return 0;
    },
    sortDesc(a, b) {
        return this.sortAsc(b, a);
    },
    restaurantSort(data, type, dir) {
        console.log('restaurantSort(..., '+type+', '+dir+')');
        if (type.indexOf('alpha') >= 0) {
            dir == 'asc' ? data.sort(this.sortAsc) : data.sort(this.sortDesc);
        }
        return data;
    },
};
