import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation }           from '@angular/core';
import { Title }                from '@angular/platform-browser';
import { CONSTANTS }            from "app.constants";
import { PostsService }         from "blog/posts/posts.service";
import { AnalyticsService }  from "../../core/analytics-service/analytics.service";

@Component({
  templateUrl  : 'posts.component.html',
  styleUrls    : ['posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

  constructor (public PostsService        : PostsService,
               public AEPAnalyticsService : AnalyticsService,
               private Title              : Title) {
  }

  ngOnInit () {
    this.Title.setTitle("NG Starter Kit Blog");
    this.AEPAnalyticsService.triggerGoogleAnalytics("Blog");
  }
}
