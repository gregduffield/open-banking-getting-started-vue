import { Modal } from 'bootstrap';
import { ref } from 'Vue';

export class CertuaEventbusService {
  private data: any;
  private apiConfig = localStorage.getItem('apiConfig') ?? '';
  private modalRef = ref<HTMLElement | null>(null);
  private modal?: Modal;

  constructor() {
    window.CertuaEventBus().$on('open-dialog', (event: any) => {
      if (event.type === 'utility-shell') {
        this.showUtilityShell(event.payload);
      } else {
        console.log('event from daas: open-dialog', JSON.stringify(event));
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
      console.log('event from daas: close-dialog', JSON.stringify(event));
      this.modal?.hide();
    });

    window.CertuaEventBus().$on('redirection-request', (event: any) => {
      console.log('event from daas: redirection-request', JSON.stringify(event));
      localStorage.setItem('redirectionConf', JSON.stringify(event));
      window.open(event.url, '_self');
    });

    window.CertuaEventBus().$on('consent-channel', (event: any) => {
      console.log('event from daas: consent-channel', JSON.stringify(event));
      const consentGiven: boolean = event.data.consentGiven;
      if (consentGiven) {
        this.data.payload.promise.resolve();
      } else {
        this.data.payload.promise.reject();
      }
      this.modal?.hide();
    });

    window.CertuaEventBus().$on('utility-shell', (event: any) => {
      console.log('event from daas: utility-shell', JSON.stringify(event));
      this.showUtilityShell(event);
    });
  }

  showConsent(data: any, isRefresh = false) {
    this.data = data;
    // if (localStorage.getItem('custom-consent') === 'true') {
    //   const initialState: ModalOptions<CustomConsentComponent> = {
    //     initialState: {
    //       apiConfig: this.apiConfig,
    //       data: data,
    //       isRefresh,
    //     },
    //   };
    //   this.modalRef = this.bsModalService.show(CustomConsentComponent, initialState);
    // } else {
    //   const initialState: ModalOptions<ConsentComponent> = {
    //     initialState: {
    //       apiConfig: this.apiConfig,
    //       data: data,
    //       isRefresh,
    //     },
    //   };
    //   this.modalRef = this.bsModalService.show(ConsentComponent, initialState);
    // }
  }
  showRevokeModal(data: any) {
    // this.data = data;
    // const initialState: ModalOptions<RevokeModalComponent> = {
    //   initialState: { data },
    // };
    // this.modalRef = this.bsModalService.show(RevokeModalComponent, initialState);
  }
  confirmRevoke() {
    this.data.promise.resolve();
    this.modal?.hide();
  }
  cancelRevoke() {
    this.data.promise.reject();
    this.modal?.hide();
  }

  closeModal() {
    this.modal?.hide();
  }

  showUtilityShell(data: any) {
    // this.data = data;
    // const initialState: ModalOptions<UtilityShellComponent> = {
    //   initialState: {
    //     apiConfig: this.apiConfig,
    //     data: data,
    //   },
    // };
    // this.modalRef = this.bsModalService.show(UtilityShellComponent, initialState);
  }
}
