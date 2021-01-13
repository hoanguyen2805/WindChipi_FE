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
  searchText: string;
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.getSize();
    this.pageChanged({page: 1});
  }

  search(page: number){
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.currentPage = 1;
    this.getSize();
    this.contactService.searchContact(this.searchText, page).subscribe(
      res => this.contacts = res
    )
  }

  getSize():void{
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.contactService.getSize(this.searchText).subscribe(
      res => this.size = res
    )
  }
  pageChanged(event: any): void {
    this.search(event.page - 1);
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
