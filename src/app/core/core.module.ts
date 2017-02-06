import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { APIService }           from "core/api-resolver-service/api-resolver.service";
import { AEPUtilsService }      from "core/utils-service/aep-utils.service";
import { AnalyticsService }     from "core/analytics-service/analytics.service";
import { LoggerService }        from "core/logger-service/Logger.service";
import { FlagsService }         from "core/flags-service/Flags.service";
import { LayoutModule }         from "core/layout/layout.module";

let subModules = [];

@NgModule({
  imports     : [
    BrowserModule,
    LayoutModule
  ],
  declarations: subModules,
  exports     : [LayoutModule],
  providers   : [
    APIService,
    AEPUtilsService,
    AnalyticsService,
    LoggerService,
    FlagsService
  ],
  bootstrap   : []
})
export class CoreModule {}
