import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit, OnDestroy {
  //album = albumData;
  public album: any;
  private sub: Subscription | undefined;

  addToFavourites(trackID: string) {
    // if (this.musicData.addToFavourites(trackID)) {
    //   this.snackBar.open('Adding to Favourites...', 'Done', { duration: 1500 });
    // }

    this.musicData.addToFavourites(trackID).subscribe(
      (success) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      (err) => {
        this.snackBar.open('Unable to add song to Favourites', 'Cancel', {
          duration: 1500,
        });
      }
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.sub = this.musicData.getAlbumById(id).subscribe((data) => {
      this.album = data;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
