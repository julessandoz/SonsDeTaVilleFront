import { FormsModule } from '@angular/forms';
import { CommentModule } from './../comment/comment.module';
import { SoundPlayerModule } from './../sound-player/sound-player.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundPageComponent } from '../sound-page/sound-page.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@NgModule({
  declarations: [SoundPageComponent, UserProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoundPlayerModule,
    CommentModule
  ],
  exports: [SoundPageComponent, UserProfileComponent]
})
export class SoundUserPageModule { }
