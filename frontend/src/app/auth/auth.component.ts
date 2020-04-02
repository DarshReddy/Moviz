import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

interface TokenObject {
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

  registerMode = false;

  constructor(
    private apiservice: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges() {
    const mrToken = this.cookieService.get('mr-token');
    if (mrToken) {
      this.router.navigate(['/movies']);
    }
  }

  saveForm() {
    if (!this.registerMode) {
      this.apiservice.loginUser(this.authForm.value).subscribe(
        ( result: TokenObject ) => {
          this.cookieService.set('mr-token', result.token, 1, '/', '', true);
          this.router.navigate(['/movies']);
        },
        error => console.log(error)
      );
    } else {
      this.apiservice.registerUser(this.authForm.value).subscribe(
        ( result ) => {
          this.router.navigate(['/auth']);
          alert('Registered Succesfully');
        }
      );
    }
  }

  formDisabled() {
    if (this.authForm.value.username.length && this.authForm.value.password.length) {
      return false;
    }
    return true;
  }
}
