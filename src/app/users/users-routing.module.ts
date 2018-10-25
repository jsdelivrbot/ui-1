import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { ProfileComponent } from './profile/profile.component';
import { OnboardComponent } from './onboard/onboard.component';
import { BenefitsDetailsComponent } from './profile/children/benefits-details/benefits-details.component';
import { CareerDetailsComponent } from './profile/children/career-details/career-details.component';
import { CompensationDetailsComponent } from './profile/children/compensation-details/compensation-details.component';
import { ImmigrationDetailsComponent } from './profile/children/immigration-details/immigration-details.component';
import { JobDetailsComponent } from './profile/children/job-details/job-details.component';
import { ProfilePersonalComponent } from './profile/children/profile-personal/profile-personal.component';
import { SocialDetailsComponent } from './profile/children/social-details/social-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  // {path: 'profile/view_/:_id', component:ProfileComponent},
  {
    path: 'profile/view', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'personal', pathMatch: 'full' },
      { path: 'employee-benefits', component: BenefitsDetailsComponent },
      { path: 'career', component: CareerDetailsComponent },
      { path: 'compensation', component: CompensationDetailsComponent },
      { path: 'legalDocs', component: ImmigrationDetailsComponent },
      { path: 'job-details', component: JobDetailsComponent },
      { path: 'profile', component: ProfilePersonalComponent },
      { path: 'social', component: SocialDetailsComponent }
    ]
  },
  { path: 'onboard', component: OnboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
