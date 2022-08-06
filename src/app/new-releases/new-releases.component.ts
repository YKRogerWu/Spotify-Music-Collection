import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  //releases = data.albums.items;
  releases: Array<any> = [];
  musicDataSubscription: Subscription | undefined;

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

  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.musicDataSubscription = this.musicData
      .getNewReleases()
      .subscribe((data: any) => (this.releases = data.albums.items));
  }

  ngOnDestroy(): void {
    this.musicDataSubscription?.unsubscribe();
  }
}
