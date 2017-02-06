import { Injectable }   from '@angular/core';
import { StateService } from "ui-router-ng2";
import { HttpError }    from "errors/http-error.model";

declare let $:any;

@Injectable()
export class ErrorHandlerService {
  errorMap: any = {
    getPosts: {
      404: 'app.error-404',
      500: 'app.error-500'
    }
  };

  defaultErrorState: string = 'app.error-404';

  constructor(private StateService: StateService) {}

  private checkIfErrorCodeIsMapped(HttpError: HttpError) {
    return HttpError.context in this.errorMap &&
      HttpError.code in this.errorMap[HttpError.context]
  }

  handlerError (HttpError: HttpError) {
    this.StateService.go(this.checkIfErrorCodeIsMapped(HttpError) ?
      this.errorMap[HttpError.context][HttpError.code] :
      this.defaultErrorState
    );
  }
}
