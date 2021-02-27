import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { NewTopicComponent } from './core/new-topic/new-topic.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
{ path: 'newtopic', component: NewTopicComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
