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
import { OpenAI } from 'openai';
import { Assistant } from 'openai/resources/beta/assistants';
import { Thread } from 'openai/resources/beta/threads/threads';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { OpenAiService } from '../../services/open-ai.service';
import { Message } from '../../models/chatbox/message.model';
import { Renderer2, OnInit } from '@angular/core';

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

export class ChatboxComponent implements OnInit {
  @ViewChild('msgInput') msgInput!: ElementRef<HTMLTextAreaElement>;

  disableChat: boolean = false;

  async sendClick($event: MouseEvent) {
    if (this.disableChat) return;
    this.disableChat = true;

    var msg = this.msgInput.nativeElement.value;
    if (msg) {
      this.msgs.push({ role: 'user', content: msg });
      this.msgInput.nativeElement.value = '';
    }

    this.msgs = await this.openAiService.chat(msg);
    this.disableChat = false;
  }

  isRecording: boolean = false;

  msgs: Message[] = [
    // { role: 'user', content: 'Hello, can we talk about flower today?' },
    // { role: 'assistant', content: 'Of course! We can talk about flower today, I love flower. They are beautiful and amazing. What flower do you like?' },
  ];

  recognition!: SpeechRecognition;
  voices: SpeechSynthesisVoice[];
  isSpeaking: boolean = false;
  synth = window.speechSynthesis;

  constructor(
    public service: ChatboxService,
    public openAiService: OpenAiService,
    private renderer: Renderer2) {
    this.voices = this.synth.getVoices();
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
  ngOnInit(): void {
    this.loadExternalScript();
  }
  // async sendClick($event: MouseEvent) {
  //   var msg = this.msgInput.nativeElement.value;
  //   if (msg) {
  //     this.addMessage(true, msg);
  //     this.msgInput.nativeElement.value = '';

  //     var res = await this.service.send({ msg: msg });
  //     console.log('ChatboxComponent', res);
  //   }
  // }

  // async sendClick($event: MouseEvent) {
  //   var msg = this.msgInput.nativeElement.value;
  //   if (msg) {
  //     this.addMessage(true, msg);
  //     this.msgInput.nativeElement.value = '';

  //     var res = await this.service.sendGPT(msg);
  //     console.log('ChatboxComponent', res);
  //     const botResponse = res.choices[0].message.content.trim();
  //     this.addMessage(false, botResponse);
  //   }
  // }

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
    private loadExternalScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      var lbplugin_event_opt={"extension_enable":true,"dict_type":1,"dbclk_event":{"trigger":"none","enable":true,"display":2},"select_event":{"trigger":"none","enable":true,"display":1}};
      function loadScript(t,e){var n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){("loaded"===n.readyState||"complete"===n.readyState)&&(n.onreadystatechange=null,e())}:n.onload=function(){e()},n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}
      setTimeout(function(){
        if (document.getElementById("lbdictex_find_popup") == null) {
          loadScript("https://stc-laban.zdn.vn/dictionary/js/plugin/lbdictplugin.min.js?" + Date.now() % 1e4, function(){
            lbDictPlugin.init(lbplugin_event_opt)
          });
        }
      }, 1000);
    `;
    this.renderer.appendChild(document.head, script);
  
  }
}