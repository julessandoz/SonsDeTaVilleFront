import { HttpClient } from '@angular/common/http';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-record-sound',
  templateUrl: './record-sound.page.html',
  styleUrls: ['./record-sound.page.scss'],
})
export class RecordSoundPage implements OnInit {

  constructor(private http: HttpClient) {}

    recordedSound: boolean = false;
    soundFile: File;
    ngOnInit() {
    }

    async soundRecorded(fileName) {
      const contents: any = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
      });
      console.log(contents);
      this.soundFile = new File([contents.data], fileName, { type: 'audio/wav' });
      this.recordedSound = true;
    }
}

