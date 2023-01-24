import { SoundPlayerModule } from './../../sound-player/sound-player.module';
import { SoundRecorderModule } from './../../sound-recorder/sound-recorder.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordSoundPageRoutingModule } from './record-sound-routing.module';

import { RecordSoundPage } from './record-sound.page';
import { CommentComponent } from 'src/app/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordSoundPageRoutingModule,
    SoundRecorderModule,
    SoundPlayerModule
  ],
  declarations: [RecordSoundPage, CommentComponent]
})
export class RecordSoundPageModule {}
