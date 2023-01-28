import { CategoryButtonModule } from './../category-button/category-button.module';
import { SoundPageComponent } from './sound-page.component';
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
        FormsModule
    ],
    declarations: [SoundPageComponent],
    exports: [SoundPageComponent]
})
export class SoundPageModule { }