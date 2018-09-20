import { BrowserModule } from '@angular/platform-browser';
// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// This Module's Components
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        HomeComponent,
    ],
    exports: [
        HomeComponent,
    ]
})
export class HomeModule {

}
