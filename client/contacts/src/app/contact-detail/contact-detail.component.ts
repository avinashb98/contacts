import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IContact } from '../contact-list/contact';
import { ContactService } from '../contact-list/contact.service';
import { MessageService } from '../message.service';

@Component({
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  pageTitle = 'Contact Detail';
  errorMessage = '';
  contact: IContact | undefined;
  message: string;
  status = 'idle';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      console.log(id);
      this.getContact(id);
      this.message = `Your OTP is ${this.generateOTP()}`;
    }
  }

  sendSMS() {
    this.status = 'sending';
    // this.messageService.sendSMS(this.contact.phone, this.message)
    this.messageService.sendSMS('+918527510313', this.message)
    .subscribe(
      (body: any) => {
        this.status = 'sent';
      },
      error => {
        this.errorMessage = <any>error;
        this.status = 'error';
      }
    );
  }

  getContact(id: string) {
    this.contactService.getContact(id).subscribe(
      (body: any) => this.contact = body.data.contact,
      error => this.errorMessage = <any>error);
  }


  generateOTP = () => {
    const OTPlength = 6;
    let OTP = '';
    for (let i = 0; i < OTPlength; i += 1) {
      OTP += `${Math.floor(Math.random() * 10)}`;
    }
    return OTP;
  }

  onBack(): void {
    this.router.navigate(['/contacts']);
  }

}
