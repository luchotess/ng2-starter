import { NgModule, isDevMode }  from '@angular/core';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import { BrowserModule }        from '@angular/platform-browser';
import {
  UIRouterModule,
  UIView,
  StateService
}                               from 'ui-router-ng2';
import { AppComponent }         from 'app.component';
import { CoreModule }           from 'core/core.module';
import { AcquisitionModule }    from 'blog/blog.module';
import { ErrorModule }          from "errors/error.module";
import { AnalyticsService }  from "core/analytics-service/analytics.service";
import { LayoutModule } from "core/layout/layout.module";

let AngularModules = [
  BrowserModule,
  HttpModule,
  FormsModule,
];

let ProjectModules = [
  CoreModule,
  AcquisitionModule,
  ErrorModule,
];

@NgModule({
  imports     : [
    ...AngularModules,
    ...ProjectModules,
    UIRouterModule.forRoot({
      states   : [{
        name     : 'app',
        component: AppComponent,
        url      : '/',
        resolve  : [
          {
            token    : 'googleAnalytics',
            deps     : [StateService, AnalyticsService],
            resolveFn: (StateService: StateService,
                        AEPAnalyticsService: AnalyticsService) => {
              if (!isDevMode()) {
                StateService.defaultErrorHandler(() => {
                  console.log("View not allowed for current app state");
                });
              }

              return AEPAnalyticsService.getGoogleServiceID('GoogleAnalyticsID');
            }
          }
        ]
      }],
      otherwise: {state: 'app.error404'}
    }),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap   : [UIView]
})
export class AppModule {
}
