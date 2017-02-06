import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode }         from '@angular/core';
import { AppModule }              from './app/app.module';

const ENV = process.env.NODE_ENV = process.env.ENV;

if (ENV === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
