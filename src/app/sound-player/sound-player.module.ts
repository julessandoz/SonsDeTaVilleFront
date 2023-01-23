import { SoundPlayerComponent } from './sound-player.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";



@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [SoundPlayerComponent],
    exports: [SoundPlayerComponent]
})
export class SoundPlayerModule { }
