import { Component } from '@angular/core';
// import { ProductService } from './products/product.service';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'India shopping Mart';
  menus: Array<string> = ['Home', 'Garments', 'Woman Dress Materials',
   'Men Dress Materials', 'Kids Dress Materials',
   'Kitchen Items', 'Sports Items'];
}
