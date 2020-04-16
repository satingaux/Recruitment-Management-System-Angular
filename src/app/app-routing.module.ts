import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrComponent } from './hr/hr.component';
import { AllInterviewsListComponent } from './all-interviews-list/all-interviews-list.component';
import { UpdatesComponent } from './updates/updates.component';
import { AuthComponent } from './auth/auth.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AllUpdatesComponent } from './updates/all-updates/all-updates.component';
import { ChatsComponent } from './updates/chats/chats.component';

//This is my case
const routes: Routes = [
    {
        path: '',
        redirectTo: 'updates',
        pathMatch: 'full',
        // component: HrComponent
    },
    {
      path: 'updates',
      component: UpdatesComponent,
      children: [
        {
          path: '',
          redirectTo: 'allupdates',
          pathMatch: 'full',
        },
        {
          path: 'allupdates',
          component: AllUpdatesComponent
        },
        {
          path: 'chats',
          component: ChatsComponent
        }
      ]
    },
    {
        path: 'allinterviews',
        component: AllInterviewsListComponent
    },
    {
        path: 'sidenav',
        component: SideNavComponent,
        // canActivate: [AuthComponent],
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
