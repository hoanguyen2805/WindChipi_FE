import { Component, OnInit } from '@angular/core';
import { Contacts } from '../models/contact';
import { ContactService } from '../service/contact.service';
@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {
  contacts: Contacts[];
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.getContacts();
  }
  getContacts():void{
    this.contactService.getContacts().subscribe(
      list => this.contacts = list
    )
  }
}
