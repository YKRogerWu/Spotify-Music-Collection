/*********************************************************************************
 * WEB422 – Assignment 06
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or * distributed to other students.
 *
 * Name: Roger Wu | Student ID: 146740204 | Date: 2022-08-07
 * Angular App (Deployed) Link: 
 * User API (Heroku) Link: https://morning-ravine-01265.herokuapp.com/
 * ********************************************************************************/
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web422-a4';
  searchString: String = '';
  public token: any;
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
