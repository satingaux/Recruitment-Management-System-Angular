import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrComponent } from './hr/hr.component';
import { AllInterviewsListComponent } from './all-interviews-list/all-interviews-list.component';

//This is my case
const routes: Routes = [
    {
        path: '',
        component: HrComponent
    },
    {
        path: 'allinterviews',
        component: AllInterviewsListComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
