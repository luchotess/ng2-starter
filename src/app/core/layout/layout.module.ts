import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { DefaultHeaderComponent } from "core/layout/default-header/default-header.component";
import { DefaultFooterComponent } from "core/layout/default-footer/default-footer.component";

let subModules = [
  DefaultHeaderComponent,
  DefaultFooterComponent
];

@NgModule({
  imports     : [
    BrowserModule
  ],
  declarations: subModules,
  exports     : subModules,
  providers   : [],
  bootstrap   : subModules
})
export class LayoutModule {}
