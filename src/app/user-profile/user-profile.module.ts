import { SoundUserPageModule } from 'src/app/sound-user-page/sound-user-page.module';
import { SoundPlayerModule } from './../sound-player/sound-player.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";


@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        SoundPlayerModule,
        SoundUserPageModule
    ],
    declarations: [],
    exports: []
})
export class UserProfileModule {}