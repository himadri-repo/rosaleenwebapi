import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    public showHome: boolean = true;
    public showKitchen: boolean = false;
    public showSports: boolean = false;
    public showWomenDress: boolean = false;
    public showMenDress: boolean = false;
    public showKidsDress: boolean = false;

    constructor(private router: ActivatedRoute) {

    }

    ngOnInit(): void {
        const homeComponent: any = this;
        this.router.params.forEach(params => {
            console.log('I am initialized ' + homeComponent.showHome + ' - ' + homeComponent.showKitchen);

            if (params.id === '1') {
                this.showHome = true;
                this.showKitchen = false;
                this.showSports = false;
                this.showWomenDress = false;
                this.showMenDress = false;
                this.showKidsDress = false;
                console.log('I am in 1');
            } else if (params.id === '2') {
                this.showHome = false;
                this.showKitchen = true;
                this.showSports = false;
                this.showWomenDress = false;
                this.showMenDress = false;
                this.showKidsDress = false;
                console.log('I am in 2');
            } else if (params.id === '3') {
                this.showHome = false;
                this.showKitchen = false;
                this.showSports = true;
                this.showWomenDress = false;
                this.showMenDress = false;
                this.showKidsDress = false;
                console.log('I am in 3');
            } else if (params.id === '41') {
                this.showHome = false;
                this.showKitchen = false;
                this.showSports = false;
                this.showWomenDress = true;
                this.showMenDress = false;
                this.showKidsDress = false;
                console.log('I am in 41');
            } else if (params.id === '42') {
                this.showHome = false;
                this.showKitchen = false;
                this.showSports = false;
                this.showWomenDress = false;
                this.showMenDress = true;
                this.showKidsDress = false;
                console.log('I am in 42');
            } else if (params.id === '43') {
                this.showHome = false;
                this.showKitchen = false;
                this.showSports = false;
                this.showWomenDress = false;
                this.showMenDress = false;
                this.showKidsDress = true;
                console.log('I am in 43');
            }
        console.log('Id: ' + params.id + ' showHome: ' + this.showHome + ' showKitchen: '
                + this.showKitchen + ' showSports: ' + this.showSports);
        });
    }
}
