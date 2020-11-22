import { Component, OnInit } from '@angular/core';
import { Categories } from '../models/categories';
import { CategoriesService } from '../service/categories.service';
import { AuthService } from "../service/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  listCategories: Categories[];
  constructor(private categoriesService: CategoriesService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.getCategories();
    this.isLogged = this.authService.loggedIn();
  }
  getCategories():void{
    this.categoriesService.getCategories().subscribe(
      res => this.listCategories = res
    )
  }
  openNav() {
      document.getElementById("mySidenav").style.display = "flex";
  }
  closeNav(){
    document.getElementById("mySidenav").style.display = "none";
  }
  logout(){
    localStorage.removeItem('token');
  }
}
