import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UiElementsModule} from '@web-chat/ui-elements';
const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  },
  {
    path: 'add',
    component: AddMemberComponent
  }]

@NgModule({
  declarations: [MembersComponent, AddMemberComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    UiElementsModule
  ]
})
export class MembersModule { }
