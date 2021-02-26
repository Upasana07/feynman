import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NewTopicComponent } from './core/new-topic/new-topic.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'newtopic', component: NewTopicComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
