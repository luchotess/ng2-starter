import { Injectable }   from '@angular/core';
import { StateService } from "ui-router-ng2";

declare let $:any;
declare let ga:Function;

@Injectable()
export class AEPUtilsService {

  constructor (private StateService: StateService) {}

  isJqueryDefined() {
    return typeof $ === 'function';
  }

  setNumericRestrictionTo (element: string) {
    if (this.isJqueryDefined()) {
      $(element).numeric({
        allowPlus: false,
        allowMinus: false,
        allowThouSep: false,
        allowDecSep: false
      });
    }
  }

  customizeCheckbox () {
    if (this.isJqueryDefined()) {
      $('.checkbox').checkbox();
    }
  }

  scrollTo (position: any, speed: any) {
    if (this.isJqueryDefined()) {
      $('html, body').animate({scrollTop: position}, speed);
    }
  }

  preventUserFromLeave (active: boolean) {
    window.onbeforeunload = active ?
      function () { return "You work will be lost."; } :
      function () {};
  }

  isProductionEnv() {
    return window.location.hostname == 'enroll.aepenergy.com';
  }


  completeOldAppURl (urlSuffix: string) {
    let env = window.location.hostname;
    let url: string;

    switch (env) {
      case 'lim-dev2-ecox-01.aepenergy.com':
        url = 'http://lim-dev2-enrx-01.aepenergy.com:8080/enrollment/';
        break;
      case 'lim-fnt2-ecox-01.aepenergy.com':
        url = 'http://lim-fnt2-enrx-01.aepenergy.com:8080/enrollment/';
        break;
      case 'chi-uat1-ecox-01.aepenergy.com':
        url = 'http://chi-uat1-enrx-01.bluestarenergy.com:8080/enrollment/';
        break;
      case 'chi-str1-ecox-01.aepenergy.com':
        url = 'http://chi-str1-enrx-01.bluestarenergy.com:8080/enrollment/';
        break;
      case 'chi-prd1-ecox-01.aepenergy.com':
        url = 'https://myaccount.aepenergy.com/enrollment/';
        break;
      case 'enroll.aepenergy.com':
        url = 'https://myaccount.aepenergy.com/enrollment/';
        break;
      default:
        url = 'http://lim-dev2-enrx-01.aepenergy.com:8080/enrollment/';
    }

    return `${url}${urlSuffix}`;
  }

  triggerCodeHandler (code: string) {
    switch (code) {
      case 'COMINGSOON':
        this.StateService.go('app.error-coming-soon');
        break;

      case 'NOT_IN_SERVICE_MARKET':
        this.StateService.go('app.error-not-service-market');
        break;

      case 'QUOTE':
        window.open("http://www.aepenergy.com/business/quote");
        break;

      case 'REQUEST_A_QUOTE':
        window.location.replace("https://www.aepenergy.com/commercial/request-a-quote/");
        break;

      case 'NOSERVICE':
        this.StateService.go('app.error-not-service-market');
        break;

      case 'CUSTOMER_TYPE_NOT_SUPPORTED':
        window.location.replace(this.getCustomerNotSupportedURL());
        break;
    }
  }

  getCustomerNotSupportedURL () {
    return this.completeOldAppURl(`campaign/${this.StateService.params["param_1"]}/${this.StateService.params["param_2"]}`);
  }

}
