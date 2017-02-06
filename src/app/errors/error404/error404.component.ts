import { Component }    from '@angular/core';
import { StateService } from "ui-router-ng2";

@Component({
  templateUrl : './error404.component.html',
  styleUrls   : ['./error404.component.scss'],
})
export class Error404Component{
  constructor(private StateService: StateService) {}

  ngOnInit () {
    document.title = "We're Sorry! | AEP Energy";
  }

  goToZipcode () {
    this.StateService.go('app.zipcode')
  }
}
