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
  size: number = 0;
  currentPage = 1;
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.getSize();
    this.pageChanged({page: 1});
  }
  getSize():void{
    this.contactService.getSize().subscribe(
      res => this.size = res.length
    )
  }
  pageChanged(event: any): void {
    // console.log(this.currentPage);
    this.contactService.paging(event.page - 1).subscribe(
      res => this.contacts = res
    )
  }
  delete(id: number){
    console.log(id);
    this.contactService.delete(id).subscribe(
      res => {
        alert("Đã xóa!");
        window.location.reload();
      }
    )
  }
}
