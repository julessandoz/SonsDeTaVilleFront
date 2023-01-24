import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { Buffer } from 'buffer';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-sound-recorder',
  templateUrl: './sound-recorder.component.html',
  styleUrls: ['./sound-recorder.component.scss'],
})
export class SoundRecorderComponent implements OnInit, AfterViewInit {
  constructor(private gestureCtrl: GestureController) {}
  recording: boolean;
  storedFileNames: FileInfo[] = [];
  soundBuffer: Buffer;

  ngOnInit() {
    VoiceRecorder.requestAudioRecordingPermission();
    this.loadFiles();
  }

  ngAfterViewInit() {
    // const holdPress = this.gestureCtrl.create({
      
    // });

    // holdPress.enable();
  }

  async loadFiles() {
    const files = await Filesystem.readdir({
      path: '',
      directory: Directory.Data,
    });
    this.storedFileNames = files.files;
    console.log('Files: ', this.storedFileNames)
  }

  startRecording() {
      console.log('Start recording');
      this.recording = true;
      VoiceRecorder.startRecording();
    }
  

  stopRecording() {
    console.log('Stop recording');
    this.recording = false;
    VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
      if (result.value && result.value.recordDataBase64) {
        const recordData = result.value.recordDataBase64;
        this.soundBuffer = Buffer.from(recordData, 'base64');
        console.log('Sound buffer: ', this.soundBuffer);
    }
    });
  }
}
