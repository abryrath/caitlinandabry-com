import Vue from 'vue';
import Lightbox from 'vue-simple-lightbox';

export default Vue.component('photo-lightbox', {
    props: ['photoData'],
    components: {
        Lightbox
    },
    data() {
        return {
            photos: this.photoData,
            options: {
                closeText: 'X',
                widthRatio: .5,
                heightRatio: .5
            },
        };
    },
});
            
