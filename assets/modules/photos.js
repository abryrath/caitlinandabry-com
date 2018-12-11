class Photos {
    constructor(node) {
        this.container = node;
        this.open = false;
        this.modal = document.querySelector('.Photos-modal');

        Array.prototype.forEach.call(document.querySelectorAll('.Photos-card'), card => {
            card.addEventListener('click', this.toggleModal.bind(this));
        });

        document.querySelector('[data-next]').addEventListener('click', this.next.bind(this));
        document.querySelector('[data-prev]').addEventListener('click', this.prev.bind(this));
        document.querySelector('[data-close]').addEventListener('click', this.toggleModal.bind(this));

        this.photos = JSON.parse(this.container.dataset.photos);
        this.active = this.photos.length > 0 ? this.photos[this.index] : null;
        this.index = 0;
        this.photoWindow = document.querySelector('[data-photo-window]');
        this.infoText = document.querySelector('[data-info]');
        this.updateInfoText();


        window.addEventListener('keydown', e => {
            console.log(e.keyCode);
            if (this.open) {
                switch (e.keyCode) {
                    case 27:
                        this.toggleModal();
                        break;
                    case 37:
                        this.prev();
                        break;
                    case 39:
                        this.next();
                        break;
                    default:
                        console.log('not registered: ', e.keycode);
                }
            }
        })
    }

    toggleModal(e = false) {
        console.log('toggle');
        this.open = !this.open;

        if (e && e.target.dataset.photoIndex) {
            this.setActivePhoto(e.target.dataset.photoIndex);
            this.updateInfoText();
        }

        let classList = this.modal.classList;
        this.open ? classList.add('active') : classList.remove('active');
    }

    setActivePhoto(i) {
        this.setIndex(i);
        this.photoWindow.src = this.photos[this.index].src;
    }

    setIndex(i) {
        i = parseInt(i);

        if (i < 0) {
            this.index = this.photos.length - 1;
        } else if (i < this.photos.length && i > 0) {
            this.index = i;
        } else {
            this.index = 0;
        }

        console.log(this.index);
    }

    next() {
        this.setActivePhoto(this.index + 1);
        this.updateInfoText();
    }

    prev() {
        this.setActivePhoto(this.index - 1)
        this.updateInfoText();
    }

    updateInfoText() {
        this.infoText.innerText = `${this.index+1} / ${this.photos.length}`;
    }
}

export const onInit = () => {
    const photos = document.querySelector('[data-photos]');
    if (photos) {
        new Photos(photos);
    }
};