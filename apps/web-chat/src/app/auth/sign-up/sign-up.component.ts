import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '@web-chat/api-interfaces';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'web-chat-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  isProfilePicScreen$ = new BehaviorSubject(false);
  profilePic$ = new Subject<string>();
  userForm: FormGroup;
  user: User;
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
      this.authService.signUp(this.userForm.value).subscribe((user) => {
        this.user = user;
        this.isProfilePicScreen$.next(true);
      });
    }
  }
  changeAvatar($event: any) {
    const file = $event.target.files[0] as File;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.profilePic$.next(e.target.result as string);
    }
    fileReader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('file', file);
    this.authService.uploadAvatar(formData).pipe(switchMap(
      (uploadResult) => this.authService.updateAvatarUrl(this.user._id, uploadResult['filename']))).subscribe(() => {
        this.skipUpload();
      });
  }
  createInput() {
    const el = document.createElement('input');
    el.type = 'file';
    el.accept = 'image/*';
    el.click();
    el.onchange = (e) => this.changeAvatar(e);
  }
  skipUpload() {
    this.router.navigate(['main', 'chat']);
  }
}
