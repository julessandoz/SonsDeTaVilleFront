import { CategoryButtonComponent } from 'src/app/category-button/category-button.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";



@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [CategoryButtonComponent],
    exports: [CategoryButtonComponent]
})
export class CategoryButtonModule { }