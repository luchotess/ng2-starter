import { Injectable } from '@angular/core';
import { APP_FLAGS }  from 'app.flags';

@Injectable()
export class FlagsService {
  currentEnvironment: string = "";

  environments: any = {
    'localhost'                      : 'LOCAL',
    'lim-dev2-ecox-01.aepenergy.com' : 'DEV',
    'lim-fnt2-ecox-01.aepenergy.com' : 'FNT',
    'chi-uat1-ecox-01.aepenergy.com' : 'UAT',
    'chi-str1-ecox-01.aepenergy.com' : 'STR',
    'chi-prd1-ecox-01.aepenergy.com' : 'PRD'
  };

  levels: any = {
    LOCAL     : ["LOCAL"],
    DEV       : ["LOCAL", "DEV"],
    FNT       : ["LOCAL", "DEV", "FNT"],
    UAT       : ["LOCAL", "DEV", "FNT", "STR", "UAT"]
  };

  check(releaseFlag: string, optionalFlags: Array<string> = []) {
    let flagLevel           = APP_FLAGS[releaseFlag];
    this.currentEnvironment = this.environments[window.location.hostname];

    if (flagLevel) {
      return this.isReleased(flagLevel) ? true : this.checkFlagStatus(flagLevel, optionalFlags);
    } else {
      console.error("Feature Flag not found.")
    }
  }

  checkFlagStatus (flagLevel: string, optionalFlags: Array<string>) {
    let flagStatus = this.levels[flagLevel].indexOf(this.currentEnvironment) !== -1;

    return optionalFlags.length == 0 ?
      flagStatus :
      optionalFlags.some((flag) => flag == this.currentEnvironment) || flagStatus;
  }

  isReleased (flagLevel: string) {
    return flagLevel === "RELEASED"
  }
}
