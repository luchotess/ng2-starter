import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { UIRouterModule }       from "ui-router-ng2";
import { CoreModule }           from 'core/core.module';
import { Error404Component }    from 'errors/error404/error404.component';
import { Error500Component }    from "errors/error500/error500.component";
import { ErrorHandlerService }  from "errors/error-handler.service";

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    UIRouterModule.forChild({ states: [
      {
        name      : 'app.error404',
        component : Error404Component,
        url       : 'acquisition/not-found'
      },
      {
        name      : 'app.error500',
        component : Error500Component,
        url       : 'acquisition/internal-error'
      }
    ]})
  ],
  declarations: [
    Error404Component,
    Error500Component
  ],
  providers: [
    ErrorHandlerService
  ]
})
export class ErrorModule {}
