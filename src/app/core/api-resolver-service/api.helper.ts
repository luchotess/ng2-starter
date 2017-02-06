import { Response }     from '@angular/http';
import { Observable }   from 'rxjs/Observable';

export class APIHelper {
    static extractData(res: Response) {
        let body = res.json();
        return body;
    }

    static handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
