import { Component, OnInit } from '@angular/core';

import { IContact } from './contact';
import { ContactService } from './contact.service';

@Component({
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  pageTitle = 'Contact List';
  contacts: IContact[] = [];
  errorMessage = '';

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      (body: any) => {
        this.contacts = body.data.contacts;
      },
      error => this.errorMessage = <any>error
    );
  }
}
