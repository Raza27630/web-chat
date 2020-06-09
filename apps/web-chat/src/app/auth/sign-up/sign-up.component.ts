import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'web-chat-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router) {

  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      displayName: [, Validators.required],
      userEmail: [, Validators.required]
    });
  }
  signUp() {
    if (this.userForm.valid) {
      this.authService.signUp(this.userForm.value).subscribe(() => {
        this.router.navigate(['main', 'chat']);
      })
    }
  }
}
