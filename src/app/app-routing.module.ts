import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { AboutComponent } from './about/about.component';
import { AlbumComponent } from './album/album.component';
import { ArtistDiscographyComponent } from './artist-discography/artist-discography.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  {
    path: 'new-releases',
    component: NewReleasesComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService] },
  {
    path: 'album/:id',
    component: AlbumComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'artist/:id',
    component: ArtistDiscographyComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'search',
    component: SearchResultComponent,
    canActivate: [GuardAuthService],
  },
  {
    path: 'favourites',
    component: FavouritesComponent,
    canActivate: [GuardAuthService],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/new-releases', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}