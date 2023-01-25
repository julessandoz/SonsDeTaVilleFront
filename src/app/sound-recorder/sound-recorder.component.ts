import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { Buffer } from 'buffer';
import { GestureController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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
  durationDisplay: string;
  duration: number=0;
  @ViewChild('recordButton', { read: ElementRef }) recordButton: ElementRef;
  timeoutId: any;
  @Output() soundRecorded = new EventEmitter<string>()

  ngOnInit() {
    VoiceRecorder.requestAudioRecordingPermission();
    this.loadFiles();
  }

  ngAfterViewInit() {
    const holdPress = this.gestureCtrl.create(
      {
        el: this.recordButton.nativeElement,
        threshold: 0,
        gestureName: 'hold-press',
        onStart: () => {
          Haptics.impact({ style: ImpactStyle.Medium });
          this.startRecording();
          this.calculateDuration();
          this.timeoutId = setTimeout(() => {
            Haptics.impact({ style: ImpactStyle.Medium });
            this.stopRecording();
          }, 30000);
        },
        onEnd: () => {
          clearTimeout(this.timeoutId);
          Haptics.impact({ style: ImpactStyle.Medium });
          this.stopRecording();
        },
      },
      true
    );

    holdPress.enable();
  }

  calculateDuration() {
    if (!this.recording) {
      this.duration = 0;
      this.durationDisplay = '30 secondes restantes';
      return;
    }
    this.duration+=1;
    console.log(this.duration)
      const remainingSeconds = (30 - this.duration).toString().padStart(2, '0');
      this.durationDisplay = `${remainingSeconds} secondes restantes`;
      console.log(`Duration: ${this.duration} seconds`);
    setTimeout(() => {
      this.calculateDuration();
    }, 1000);
  }

  async loadFiles() {
    const files = await Filesystem.readdir({
      path: '',
      directory: Directory.Data,
    });
    this.storedFileNames = files.files;
    console.log('Files: ', this.storedFileNames);
  }

  startRecording() {
    if (!this.recording) {
      console.log('Start recording');
      this.recording = true;
      VoiceRecorder.startRecording();
    }
  }

  stopRecording() {
    if (this.recording) {
      console.log('Stop recording');
      this.recording = false;
      VoiceRecorder.stopRecording().then(async (result: RecordingData) => {
        if (result.value && result.value.recordDataBase64) {
          const recordData = result.value.recordDataBase64;
          const fileName = `sound-${new Date().getTime()}.wav`;
          const file = await Filesystem.writeFile({
            path: fileName,
            data: recordData,
            directory: Directory.Data,
          });
          this.soundRecorded.emit(fileName)
        }
      });
    }
  }
}
