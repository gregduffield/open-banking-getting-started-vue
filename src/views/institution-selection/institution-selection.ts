import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InstitutionSelectionVue',
  data() {
    return {
      apiConfig: '',
    };
  },
  methods: {},
  mounted() {
    this.apiConfig = <string>localStorage.getItem('apiConfig');
  },
});
