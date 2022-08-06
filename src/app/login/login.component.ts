import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User = new User();
  public warning = '';
  public loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm): void {
    if (this.user.userName != '' && this.user.password != '') {
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          this.loading = false;
          localStorage['access_token'] = success.token;
          this.router.navigate(['/new-releases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
