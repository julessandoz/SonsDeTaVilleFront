import { SoundRecorderComponent } from './sound-recorder.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    declarations: [SoundRecorderComponent],
    exports: [SoundRecorderComponent]
})

export class SoundRecorderModule { }