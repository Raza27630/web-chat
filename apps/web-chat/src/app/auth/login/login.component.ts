import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'web-chat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl(null, Validators.required)
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {

  }
  login() {
    if (this.email.valid) {
      this.authService.signIn(this.email.value).subscribe(() => {
        this.router.navigate(['main','chat']);
      });
    }
  }
}
