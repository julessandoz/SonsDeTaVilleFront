import { CategoryButtonModule } from './../category-button/category-button.module';
import { SoundPlayerComponent } from 'src/app/sound-player/sound-player.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CategoryButtonModule
    ],
    declarations: [SoundPlayerComponent],
    exports: [SoundPlayerComponent]
})
export class SoundPlayerModule { }