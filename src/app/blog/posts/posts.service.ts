import { Injectable }           from '@angular/core';
import { Http }                 from '@angular/http';
import { APIHelper }            from '../../core/api-resolver-service/api.helper';
import { Observable }           from 'rxjs/Observable';
import { APIService }              from "../../core/api-resolver-service/api-resolver.service";
import { ErrorHandlerService }  from "errors/error-handler.service";
import { Post }                 from "blog/posts/post.model";

declare let $:any;

@Injectable()
export class PostsService {
  private rest      = {
    posts: {
      getPosts: 'post'
    }
  };

  constructor (private http: Http,
               private AEP_API: APIService,
               private ErrorHandlerService: ErrorHandlerService) {}

  getPosts (): Promise<Post> {
    return this.http.get(this.AEP_API.resolve(this.rest.posts.getPosts))
      .map(APIHelper.extractData)
      .toPromise()
      .catch((res: any): Observable<any> => {
        this.ErrorHandlerService.handlerError({
          code    : res.status,
          context : 'getPosts'
        });

        return Observable.throw(new Error(res.status));
      });
  }
}
