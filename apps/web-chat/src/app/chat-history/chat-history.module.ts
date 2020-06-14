import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatHistoryComponent } from './chat-history.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UiElementsModule } from '@web-chat/ui-elements';

const routes: Routes = [
  {
    path: '',
    component: ChatHistoryComponent
  }
]

@NgModule({
  declarations: [ChatHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    UiElementsModule
  ]
})
export class ChatHistoryModule { }
