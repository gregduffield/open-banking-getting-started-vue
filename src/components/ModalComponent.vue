<script setup lang="ts">
import { onMounted, ref, defineProps, defineExpose } from 'vue';
import { Modal } from 'bootstrap';
const props = defineProps(['title', 'data']);

const modalRef = ref<HTMLElement | null>(null);
let modal: Modal;
onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value);
  }
});

function _show() {
  modal.show();
}

function _hide() {
  modal.hide();
}

function ok() {
  if (props.data.promise) {
    props.data.promise.resolve();
  } else {
    props.data.data.promise.resolve();
  }
  modal.hide();
}

function cancel() {
  if (props.data.promise) {
    props.data.promise.reject();
  } else {
    props.data.data.promise.resolve();
  }
  modal.hide();
}

function hideFooter() {
  return props.title === 'Remove account?' || props.title === 'Custom Consent';
}

defineExpose({ show: _show, hide: _hide });
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby=""
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer" v-show="!!hideFooter()">
          <slot name="footer"></slot>
          <button type="button" class="btn btn-secondary" @click="cancel()">
            Close
          </button>
          <button type="button" class="btn btn-secondary" @click="ok()">
            <slot name="okButtonText">Ok</slot>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
