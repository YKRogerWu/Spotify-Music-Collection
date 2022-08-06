import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  private sub: Subscription | undefined;
  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.sub = this.musicData
      .getFavourites()
      .subscribe((data: { tracks: any[] }) => {
        this.favourites = data.tracks;
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  
  removeFromFavourites(id: any) {
    this.sub = this.musicData.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }
}
