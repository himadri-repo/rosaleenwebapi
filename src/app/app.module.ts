import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// This Module's Components
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';

import { HomeModule } from '../home/home.module';

const appRoutes: Routes = [
    {path: 'home/:id', component: HomeComponent },
];

@NgModule({
    imports: [
        BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes), HomeModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule {

}
