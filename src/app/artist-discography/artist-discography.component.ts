import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
  //artist = artistData;
  public albums: any;
  public artist: any;
  private sub: Subscription | undefined;
  private subAlbums: Subscription | undefined;

  transDateFormat = (dateString: string) => {
    let formattedDate = dateString.split('-'); //[yyyy, mm, dddd]
    let fullYear = formattedDate[0]; //yyyy
    let twoDigitYear = fullYear.substring(fullYear.length - 2, fullYear.length);

    return (
      parseInt(formattedDate[1], 10) +
      '/' +
      parseInt(formattedDate[2], 10) +
      '/' +
      twoDigitYear
    );
    //parseInt is to remove the leading '0'
  };

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.sub = this.musicData.getArtistById(id).subscribe((data) => {
      this.artist = data;
    });

    this.subAlbums = this.musicData
      .getAlbumsByArtistId(id)
      .subscribe((data) => {
        this.albums = data.items.filter(
          (curValue, index, self) =>
            self.findIndex(
              (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        );
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.subAlbums?.unsubscribe();
  }
}
