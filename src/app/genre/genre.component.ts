import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../channel';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  category = "";
  genre = "";
  channels: Channel[];
  constructor(private route: ActivatedRoute, private channelService: ChannelService) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    this.genre = this.route.snapshot.paramMap.get('genre');
    this.channelService.getChannelsByGenre(this.genre)
      .subscribe(channels => this.channels = channels);
  }

}
