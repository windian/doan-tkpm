import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { Thread } from 'openai/resources/beta/threads/threads';
import { Message } from '../models/chatbox/message.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor() { }

  openAi = new OpenAI({
    apiKey: environment.openAiKey,
    dangerouslyAllowBrowser: true
  });
  assistant!: Assistant;
  thread!: Thread;

  async chat(msg: string): Promise<Message[]> {
    return new Promise<Message[]>(async (resolve, reject) => {
      if (!this.assistant) {
        this.assistant = await this.openAi.beta.assistants.create({
          model: 'gpt-3.5-turbo-0125',
          name: 'English Tutor',
          instructions: 'You are a personal English tutor. Chat with student casually to help them improve conversation skill',
        });
      }

      if (!this.thread) {
        this.thread = await this.openAi.beta.threads.create();
      }

      const run = await this.openAi.beta.threads.runs.createAndPoll(this.thread.id, {
        assistant_id: this.assistant.id,
        additional_instructions: 'If there is no topic or the topic is end try yo find new topic and start it.',
        additional_messages: [{ role: 'user', content: msg, },],
      });

      if (run.status == 'completed') {
        const messages = await this.openAi.beta.threads.messages.list(this.thread.id);
        const msgs: Message[] = [];
        for (const message of messages.getPaginatedItems()) {
          for (const content of message.content) {
            if (content.type == 'text') {
              msgs.push({
                role: message.role,
                content: (<TextContentBlock>content).text.value
              });
            }
          }
        }
        msgs.reverse();
        resolve(msgs);
      }
    });
  }
}
