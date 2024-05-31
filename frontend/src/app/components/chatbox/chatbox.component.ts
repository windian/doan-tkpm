import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatboxService } from '../../services/chatbox/chatbox.service';
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatChipsModule, MatTooltipModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent {
  @ViewChild('msgInput') msgInput!: ElementRef<HTMLTextAreaElement>;

  isRecording: boolean = false;

  msgs: [boolean, string][] = [
    [false, 'How are you today?'],
    [true, 'I\'m fine thank you'],
    [true, 'How about you?']
  ];

  recognition!: SpeechRecognition;
  voices: SpeechSynthesisVoice[];
  isSpeaking: boolean = false;
  synth = window.speechSynthesis;

  constructor(public service: ChatboxService) {
    this.voices = this.synth.getVoices();
  }

  addMessage(right: boolean, message: string) {
    this.msgs.push([right, message]);
  }

  speakClick(msg: string) {

    if (this.synth.speaking) return;
    const utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.voice = this.voices[1];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    this.synth.speak(utterThis);
  }

  micClick($event: MouseEvent) {
    if (this.isRecording)
      this.stopRecoding();
    else
      this.startRecoding();
  }

  async sendClick($event: MouseEvent) {
    var msg = this.msgInput.nativeElement.value;
    if (msg) {
      this.addMessage(true, msg);
      this.msgInput.nativeElement.value = '';

      var res = await this.service.send({ msg: msg });
      console.log('ChatboxComponent', res);
    }
  }

  stopRecoding() {
    if (this.recognition) this.recognition.stop();
    this.isRecording = false;
  }

  startRecoding() {
    var that = this;
    that.isRecording = true;

    if (this.recognition) this.recognition.stop();
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.start();

    this.recognition.onresult = function (event) {
      var length = event.results.length;
      var latestResult = event.results[length - 1][0];

      const textarea = that.msgInput.nativeElement;
      if (textarea.value.length > 0) textarea.value += '\n';
      textarea.value += latestResult.transcript.trim();

      setTimeout(() => { textarea.scrollTop = textarea.scrollHeight; }, 1);
    }

    this.recognition.onspeechend = function () {
      that.recognition.stop();
      that.isRecording = false;
    }

    this.recognition.onerror = function (event) {
      that.isRecording = false;
    }
  }
}
