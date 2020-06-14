import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UiElementsModule } from '@web-chat/ui-elements';
const routes: Routes = [
  {
    path: '',
    component: ChatWindowComponent
  }
]

@NgModule({
  declarations: [ChatWindowComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    UiElementsModule
  ]
})
export class ChatWindowModule { }
