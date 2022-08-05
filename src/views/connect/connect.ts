import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConnectVue',
  data() {
    return {
      apiConfig: JSON.parse(<string>localStorage.getItem('apiConfig'))
    };
  },
  methods: {},
  mounted() {
    this.apiConfig = JSON.parse(<string>localStorage.getItem('apiConfig'));
  }
});
