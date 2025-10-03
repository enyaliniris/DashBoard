<script setup>
import { state } from '@/apis/utils.js'

</script>

<template>
<div class="modal-mask" v-if="state.showModal">
    <div class="modal">
            <span>{{state.errorMessage}}</span>
            <button class="btn-close" @click="state.showModal = false">
                <img src="@/assets/img/close.png">
            </button>
    </div> 
</div>
</template>
