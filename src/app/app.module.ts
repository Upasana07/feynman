import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { NewTopicComponent } from './core/new-topic/new-topic.component';
import { NewTopicModule } from './core/new-topic/new-topic.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    DashboardModule,
    NewTopicModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
