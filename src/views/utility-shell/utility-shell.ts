import { defineComponent, ref } from 'vue';
import { Modal } from 'bootstrap';
const modalRef = ref<HTMLElement | null>(null);
let modal: Modal;
export default defineComponent({
  name: 'UtilityShellVue',
  props: ['data', 'show'],
  data() {
    return {
      apiConfig: '',
      metadata: ''
    };
  },
  methods: {},
  mounted() {
    this.apiConfig = <string>localStorage.getItem('apiConfig');
    this.metadata = this.$props.data;
    if (modalRef.value) {
      modal = new Modal(modalRef.value);
    }
  }
});
