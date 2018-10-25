import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from './entry/entry.component';

const routes: Routes = [
  {path: '', component: EntryComponent},
  {path:'user', loadChildren: './users/users.module#UsersModule'},
  {path:'super-user', loadChildren:'./super-admin/super-admin.module#SuperAdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
