/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';

import store from '@/store'; // path to store file
import { SubEvent } from 'sub-events';
export class CertuaEventbusService {
  private data: any;
  private apiConfig = localStorage.getItem('apiConfig') ?? '';

  private showConsentModal = new Subject<any>();
  private showCustomConsentModal = new Subject<any>();
  private showUtilityShellModal = new Subject<any>();
  private showRevokeModalSubject = new Subject<any>();

  public showRevokeModal$ = this.showRevokeModalSubject.asObservable();
  public showConsentModal$ = this.showConsentModal.asObservable();
  public showCustomConsentModal$ = this.showCustomConsentModal.asObservable();
  public showUtilityShellModal$ = this.showUtilityShellModal.asObservable();

  public closeDialogEmitter: SubEvent<string> = new SubEvent();
  constructor() {
    window.CertuaEventBus().$on('open-dialog', (event: any) => {
      if (event.type === 'utility-shell') {
        // console.log(
        //   'event from daas: open-dialog - utility-shell',
        //   JSON.stringify(event)
        // );
        this.showUtilityShell(event.payload);
      } else {
        //console.log('event from daas: open-dialog', JSON.stringify(event));
        switch (event.payload.operation) {
          case 'link':
            this.showConsent(event);
            break;
          case 'refresh':
            this.showConsent(event, true);
            break;
          case 'revoke':
            this.showRevokeModal(event.payload);
            break;
        }
      }
    });

    window.CertuaEventBus().$on('close-dialog', (event: any) => {
      //console.log('event from daas: close-dialog', JSON.stringify(event));
      this.closeDialogEmitter.emit('utility-shell');
    });

    window.CertuaEventBus().$on('redirection-request', (event: any) => {
      //console.log(
      //  'event from daas: redirection-request',
      //  JSON.stringify(event)
      //);
      localStorage.setItem('redirectionConf', JSON.stringify(event));
      window.open(event.url, '_self');
    });

    window.CertuaEventBus().$on('consent-channel', (event: any) => {
      //console.log('event from daas: consent-channel', JSON.stringify(event));
      const consentGiven: boolean = event.data.consentGiven;
      if (consentGiven) {
        store.state.consentData.payload.promise.resolve();
      } else {
        store.state.consentData.payload.promise.reject();
      }
      this.closeDialogEmitter.emit('consent');
    });

    window.CertuaEventBus().$on('utility-shell', (event: any) => {
      //console.log('event from daas: utility-shell', JSON.stringify(event));
      this.showUtilityShell(event);
    });
  }

  showConsent(data: any, isRefresh = false) {
    this.data = data;

    store.commit('updateConsentData', data);
    if (localStorage.getItem('custom-consent') === 'true') {
      this.showCustomConsentModal.next({
        apiConfig: this.apiConfig,
        data: data.payload,
        isRefresh
      });
    } else {
      this.showConsentModal.next({
        apiConfig: this.apiConfig,
        data: data.payload,
        isRefresh
      });
    }
  }
  showRevokeModal(data: any) {
    this.showRevokeModalSubject.next(data);
  }

  showUtilityShell(data: any) {
    this.showUtilityShellModal.next(data);
  }
}
