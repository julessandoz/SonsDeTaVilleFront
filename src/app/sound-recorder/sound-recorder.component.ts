
import { Component, OnInit } from '@angular/core';
import { VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
  selector: 'app-sound-recorder',
  templateUrl: './sound-recorder.component.html',
  styleUrls: ['./sound-recorder.component.scss'],
})
export class SoundRecorderComponent implements OnInit{
  constructor() {}
  ngOnInit() {
    VoiceRecorder.requestAudioRecordingPermission();
  }

  startRecording() {
    console.log("Start recording")
  }

  stopRecording() {
    console.log("Stop recording")
  }
}
