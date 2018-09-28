<template>
    <lightbox
        id="photo-lightbox"
        :images="photos"
        :image_class=" 'img-responsive img-rounded' "
        :album_class=" 'album' "
        :options="options">
    </lightbox>
</template>
<script src="./photoLightbox.js"></script>
