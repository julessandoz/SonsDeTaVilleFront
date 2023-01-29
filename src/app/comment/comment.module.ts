import { CommentComponent } from 'src/app/comment/comment.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [CommentComponent],
    exports: [CommentComponent]
})

export class CommentModule { }