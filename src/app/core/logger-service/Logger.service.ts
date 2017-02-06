import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class LoggerService {
  log(message: string) {
    if (isDevMode()) {
      console.info(message);
    }
  }
}
