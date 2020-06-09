import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'chat',
                children: [{
                    path: '',
                    loadChildren: () => import('../chat-history/chat-history.module').then(m => m.ChatHistoryModule)
                }]
            },
            {
                path: 'members',
                children: [{
                    path: '',
                    loadChildren: () => import('../members/members.module').then(m => m.MembersModule)
                }],

            }
        ]
    },
    {
        path: '',
        redirectTo: '/main/chat',
        pathMatch: 'full'
    }
]
@NgModule({
    declarations: [MainComponent],
    imports: [RouterModule.forChild(routes), IonicModule]
})
export class MainModule {

}