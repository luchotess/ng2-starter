import { Component,
         ViewEncapsulation,
         Inject }               from '@angular/core';
import { StateService }         from "ui-router-ng2";
import { AnalyticsService }  from "core/analytics-service/analytics.service";

@Component({
  templateUrl   : './app.component.html',
  styleUrls     : ['./app.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent {
  constructor(private StateService: StateService,
              private AEPAnalyticsService: AnalyticsService,
              @Inject('googleAnalytics')
              private googleAnalytics : any) {}

  ngOnInit() {
    if (this.StateService.current.name == 'app') {
      this.goToBlog();
    }

    this.AEPAnalyticsService.setAnalyticsID(this.googleAnalytics);
  }

  goToBlog() {
    this.StateService.go('app.blog');
  }
}
