import { defineComponent } from 'vue';
import axios from 'axios';
import { from, map, tap } from 'rxjs';

export default defineComponent({
  name: 'StartVue',
  data() {
    return {
      showAccessToken: true,
      showContextToken: false,
      apiConfig: '',
      username: '',
      password: '',
      accessToken: '',
      contextToken: '',
      customConsent: false,
      userReference: ''
    };
  },
  mounted() {
    this.customConsent = localStorage.getItem('custom-consent') === 'true';
    this.apiConfig = <string>localStorage.getItem('apiConfig');
  },
  methods: {
    getAccessToken() {
      const authUrl =
        'https://iqdevauth.certua.io/oauth/token?grant_type=client_credentials';

      axios
        .post(
          authUrl,
          {},
          {
            auth: { username: this.username, password: this.password }
          }
        )
        .then((response) => {
          this.accessToken = response.data.access_token;
          this.showAccessToken = false;
          this.showContextToken = true;
        });
    },
    getContextToken() {
      const tokenUrl = 'https://iqdevdaas.certua.io/app/token';
      const apiUrl = 'https://iqdevdaas.certua.io/api';

      const body = {
        'client.integration.datasource.preference': ['OpenBanking', 'Yodlee'],
        'client.integration.user.reference': this.userReference // this is your reference for your client
      };
      from(
        axios.post(tokenUrl, body, {
          headers: { authorization: `Bearer ${this.accessToken}` }
        })
      )
        .pipe(
          map(
            (response: any) => (this.contextToken = response.data.context_token)
          ),
          tap((token) =>
            localStorage.setItem(
              'apiConfig',
              JSON.stringify({
                url: apiUrl,
                token: token
              })
            )
          ),
          tap(
            (_) => (this.apiConfig = <string>localStorage.getItem('apiConfig'))
          ),
          tap((_) => (this.showContextToken = false))
        )
        .subscribe();
    },
    consentTypeChanged() {
      localStorage.setItem('custom-consent', String(this.customConsent));
    }
  }
});
