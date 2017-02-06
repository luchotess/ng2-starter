import { Injectable } from '@angular/core';

const API = process.env.API;

@Injectable()
export class APIService {
  private environments: any = {
    local  : '/api/'
  };

  resolve(restEndpoint: string) {
    return this.environments[API] + restEndpoint;
  }
}
