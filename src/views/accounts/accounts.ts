import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AccountsVue',
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
