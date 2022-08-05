import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConnectVue',
  data() {
    return {
      apiConfig: ''
    };
  },
  methods: {},
  mounted() {
    this.apiConfig = <string>localStorage.getItem('apiConfig');
  }
});
