import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarPipe } from './avatar.pipe';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AvatarComponent, AvatarPipe],
  exports: [AvatarComponent]
})
export class UiElementsModule { }
