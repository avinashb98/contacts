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

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(
      (body: any) => {
        this.messages = body.data.messages;
      },
      error => this.errorMessage = <any>error
    );
  }
}
