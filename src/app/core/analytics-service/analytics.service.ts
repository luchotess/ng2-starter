import { Injectable }           from '@angular/core';
import { Http }                 from '@angular/http';
import { APIHelper }            from '../api-resolver-service/api.helper';
import { Observable }           from 'rxjs/Observable';
import { APIService }              from "../api-resolver-service/api-resolver.service";
import { LoggerService }        from "core/logger-service/Logger.service";

declare let ga:Function;

@Injectable()
export class AnalyticsService {
  private rest = {
    GoogleAnalyticsID       : 'marketing/track',
    GoogleAdwordsID         : 'marketing/adwords'
  };

  public googleAnalyticsID  : string = '';
  public googleAdwordsID    : string = '';

  constructor (private Http: Http,
               private AEP_API: APIService,
               private LoggerService: LoggerService) {}

  setAnalyticsID(res: any) {
    if (res && res.googleTrack) {
      this.googleAnalyticsID = res.googleTrack.googleID;
      this.googleAdwordsID   = res.googleTrack.adWordsID;

      ga('create', this.googleAnalyticsID, window.location.hostname);

      this.LoggerService.log(`Analytics service started for: ${window.location.hostname}`);
      this.LoggerService.log(`Analytics ID  : ${res.googleTrack.googleID}`);
      this.LoggerService.log(`AdWords ID    : ${res.googleTrack.adWordsID}`);
    } else {
      this.LoggerService.log("Track HTTP Call Error");
    }
  }

  getGoogleServiceID (Service: string) {
    return this.Http.get(this.AEP_API.resolve(this.rest[Service]))
      .map(APIHelper.extractData)
      .toPromise()
      .catch((res: any): Observable<any> => {
        return Observable.throw(new Error(res.status));
      });
  }

  triggerGoogleAnalytics (page: string) {
    if (typeof ga !== 'undefined') {
      ga('set', 'page', `/${page}`);
      ga('send', 'pageview');
    }
  }
}

