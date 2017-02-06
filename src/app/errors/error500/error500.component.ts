import { Component }    from '@angular/core';
import { StateService } from "ui-router-ng2";

@Component({
  templateUrl : 'error500.component.html',
  styleUrls   : ['error500.component.scss'],
})
export class Error500Component{
  constructor(private StateService: StateService) {}

  ngOnInit () {
    document.title = "We're Sorry! | AEP Energy";
  }

  goToZipcode () {
    this.StateService.go('app.zipcode')
  }
}
