import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'; 
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  category = "";
  channels: Channel[];
  navigationSubscription;
  constructor(private route: ActivatedRoute, private channelService: ChannelService, private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit() {
    this.getChannels();
  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.getChannels();
  }
  getChannels(){
    this.category = this.route.snapshot.paramMap.get('category');
    this.channelService.getChannelsByCategory(this.category).subscribe(channels => this.channels = channels);
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
