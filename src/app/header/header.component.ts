import { Component, OnInit } from '@angular/core';
import { Categories } from '../models/categories';
import { CategoriesService } from '../service/categories.service';
import { AuthService } from "../service/auth.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  listCategories: Categories[];
  formSearch: FormGroup;
  constructor(private categoriesService: CategoriesService, private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.isLogged = this.authService.loggedIn();
    this.formSearch = this.fb.group({
      category: ['0'],
      keyword: ['']
    })
  }
  getCategories(): void {
    this.categoriesService.getCategories().subscribe(
      res => {
        this.listCategories = res;
        // console.log(res);
      }
    )
  }
  openNav() {
    document.getElementById("mySidenav").style.display = "flex";
  }
  closeNav() {
    document.getElementById("mySidenav").style.display = "none";
  }
  logout() {
    // localStorage.setItem("url", this.router.url);
    this.authService.logout();
    window.location.reload();
    // const url: string = localStorage.getItem("url");
    // if (url) {
    //   this.router.navigate([url]);
    // }
    // else {
    //   this.router.navigate(["/"]);
    // }
  }
  onSubmitSearch() {
    const category = this.formSearch.value.category;
    const keyword = this.formSearch.value.keyword;
    if (keyword) {
      this.router.navigate([`/search-products/${category}/${keyword}`]);
    }
    else {
      this.router.navigate([`/search-products/${category}`]);
    }
  }
  luuLink() {
    localStorage.setItem("url", this.router.url);
  }
}
