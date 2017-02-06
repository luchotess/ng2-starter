import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { UIRouterModule } from "ui-router-ng2";
import { CoreModule }     from 'core/core.module';
import { PostsComponent } from "blog/posts/posts.component";
import { PostsService }   from "blog/posts/posts.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    UIRouterModule.forChild({ states: [
      {
        name      : 'app.posts',
        component : PostsComponent,
        url       : 'acquisition/offers',
        resolve: [
          {
            token : 'posts',
            deps  : [PostsService],
            resolveFn: (PostsService: PostsService) => {
              return PostsService.getPosts();
            }
          }
        ]
      }
    ]})
  ],
  declarations: [
    PostsComponent,
  ],
  providers: [
    PostsService,
  ],
  bootstrap: [
    PostsComponent,
  ]
})
export class AcquisitionModule {}
