import { Component, OnInit } from '@angular/core';

import { IMessage } from './message';
import { MessageService } from './message.service';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  pageTitle = 'Messages List';
  messages: IMessage[] = [];
  errorMessage = '';

  constructor(private messageService: MessageService) {

  }

  convertDate(message: any) {
    const [ day, time ] = message.sentAt.split('T');
    const formattedTime = time.split(':').slice(0, 2).join(':');
    message.sentAt = `${formattedTime} ${day}`;
    return message;
  }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (body: any) => {
        this.messages = body.data.messages
                          .reverse()
                          .map((message) => {
                            return this.convertDate(message);
                          });
      },
      error => this.errorMessage = <any>error
    );
  }
}
