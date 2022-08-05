<template>
  <div class="container">
    <router-view />
  </div>
  <modal-component-vue
    title="Remove account?"
    :data="revokeData"
    ref="revokeModal"
  >
    <template #body
      ><p>Please confirm that you want to remove this account?</p></template
    >
    <template #okButtonText>Remove</template>
  </modal-component-vue>
  <modal-component-vue title="Consent" :data="consentData" ref="consentModal">
    <template #body
      ><certua-ob-consent
        v-if="!!consentData"
        :apiConfig="JSON.parse(apiConfig)"
        :metadata="consentData"
      >
      </certua-ob-consent>
    </template>
    <template #okButtonText>Remove</template>
  </modal-component-vue>
  <modal-component-vue
    title=""
    :data="utilityShellData"
    ref="utilityShellModal"
  >
    <template #body>
      <certua-ob-utility-shell
        v-if="!!utilityShellData"
        :apiConfig="JSON.parse(apiConfig)"
        :metadata="utilityShellData"
      >
      </certua-ob-utility-shell>
    </template>
    <template #okButtonText>Remove</template>
  </modal-component-vue>
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
import { CertuaEventbusService } from './certua-event-bus';
import { tap } from 'rxjs';
import ModalComponentVue from '@/components/ModalComponent.vue';

const modalRef = ref<HTMLElement | null>(null);
let modal: Modal;
let revokeModal = ref(ModalComponentVue);
let consentModal = ref(ModalComponentVue);
let utilityShellModal = ref(ModalComponentVue);

let revokeData = ref('');
let consentData = ref('');
let utilityShellData = ref(null);
let consentIsRefresh = false;
const apiConfig = localStorage.getItem('apiConfig') ?? '';

const certuaEventBus = new CertuaEventbusService();
function launchDemoModal() {
  modal.show();
}

function changeText() {
  revokeData.value = 'its changed';
}

onMounted(() => {
  if (modalRef.value) {
    modal = new Modal(modalRef.value);
  }
});
certuaEventBus.showConsentModal$
  .pipe(
    tap((data) => {
      consentData.value = data;
      consentIsRefresh = data.isRefresh;
      consentModal.value.show();
    })
  )
  .subscribe();
certuaEventBus.showRevokeModal$
  .pipe(
    tap((data) => {
      revokeData.value = data;
      revokeModal.value.show();
    })
  )
  .subscribe();
certuaEventBus.showUtilityShellModal$
  .pipe(
    tap((data) => {
      utilityShellData.value = data;
      utilityShellModal.value.show();
    })
  )
  .subscribe();

certuaEventBus.closeDialogEmitter.subscribe((data: string) => {
  if (data === 'consent') {
    consentModal.value.hide();
  } else if (data === 'utility-shell') {
    utilityShellModal.value.hide();
  }
});
</script>
