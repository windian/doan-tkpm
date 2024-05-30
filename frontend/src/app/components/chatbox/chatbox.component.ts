import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ChatboxService } from '../../services/Chatbox/chatbox.service';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatChipsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent {
  msgs: [boolean, string][] = [
    [false, 'How are you today?'],
    [true, 'I\'m fine thank you'],
    [true, 'How about you?'],
    [true, 'Line 1\n\nLine Line Line Line Line Line Line Line 2\nLine Line Line Line 3\nLine Line 4']
  ];

  @ViewChild('msgInput') msgInput!: ElementRef<HTMLTextAreaElement>;

  constructor(public service: ChatboxService) {
  }

  addMessage(right: boolean, message: string) {
    this.msgs.push([right, message]);
  }

  micClick($event: MouseEvent) {
    throw new Error('Method not implemented.');
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

}
