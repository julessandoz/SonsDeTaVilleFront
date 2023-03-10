import { SoundUserPageModule } from 'src/app/sound-user-page/sound-user-page.module';
import { CommentModule } from './../comment/comment.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SoundPlayerModule } from '../sound-player/sound-player.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SoundPlayerModule,
        FormsModule,
        CommentModule,
        SoundUserPageModule
    ],
    declarations: [],
    exports: []
})
export class SoundPageModule { }