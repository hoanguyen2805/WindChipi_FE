import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contacts } from '../models/contact';
import { ContactService } from '../service/contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formContact: FormGroup;
  constructor(private fb: FormBuilder, private contactsService: ContactService) { }

  ngOnInit(): void {
    this.formContact = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    })

  }
  onSubmit() {
    if(this.formContact.invalid){
      alert('Chưa nhập đủ các thông tin!')
      return;
    }
    const newContact: Contacts = new Contacts();
    var dt = new Date();

    newContact.full_name = this.formContact.value.fullName;
    newContact.email = this.formContact.value.email;
    newContact.phone = this.formContact.value.phone;
    newContact.message = this.formContact.value.message;
    // newContact.date_created = `${dt.getDate().toString().padStart(2, '0')}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getFullYear().toString().padStart(4, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;   
    this.contactsService.createContact(newContact).subscribe(
      res=> {
        alert('Thành công');
      },
      err=>{
        alert('Thất bại')
      }
    );
  }

}
