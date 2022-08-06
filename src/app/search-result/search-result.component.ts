import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  results:any;
  searchQuery:String | undefined;
  private sub: Subscription | undefined;

  constructor(private route:ActivatedRoute,private musicData:MusicDataService) { }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    let queryParams=this.route.snapshot.queryParams['q'];
    this.searchQuery=queryParams;
    this.sub = this.musicData.searchArtists(queryParams).subscribe(data => {
      this.results = data.artists.items.filter(element => {
        return element.images.length>0;
      });
    });
  }
}
