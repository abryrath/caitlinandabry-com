<template>
    <modal
        :name="'modal-' +id"
    >
        <div class="modal-container">
            <table>
                <tbody>
                    <tr>
                        <td>In the Epicentre?</td>
                        <td>{{ restaurant.epicentre ? 'Yes' : 'No' }}</td>
                    </tr>
                    <tr>
                        <td>Proximity to hotels</td>
                        <td>{{ restaurant.prox }}</td>
                    </tr>
                    <tr>
                        <td>More Info</td>
                        <td v-html="restaurant.desc"></td>
                    </tr>
                </tbody>
            </table>
            <button @click="$modal.hide('modal-'+id)">Close</button>
        </div>
    </modal>
</template>
<script src="./restaurantModal.js"></script>
