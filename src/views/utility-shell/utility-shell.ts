import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UtilityShellVue',
  props: ['data'],
  data() {
    return {
      apiConfig: '',
      metadata: '',
    };
  },
  methods: {},
  mounted() {
    this.apiConfig = <string>localStorage.getItem('apiConfig');
    this.metadata = this.$props.data;
  },
});
