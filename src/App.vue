<template>
  <div class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <button @click="launchDemoModal()" class="btn btn-primary">modal</button>
  </div>
  <div class="modal fade" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">Woo-hoo, you're reading this text in a modal!</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

const modalRef = ref<HTMLElement | null>(null);
let modal: Modal;
onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value);
  }
});

function launchDemoModal() {
  modal.show();
}
</script>
