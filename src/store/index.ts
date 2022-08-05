import { createStore } from 'vuex';

export default createStore({
  state: { consentData: {} as any },
  getters: {},
  mutations: {
    updateConsentData: (state, data) => {
      state.consentData = data;
    }
  },
  actions: {},
  modules: {}
});
