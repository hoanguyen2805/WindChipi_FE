import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ProductService } from '../service/product.service';
import { Products } from '../models/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: false, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  slider = [
    { "url": "/assets/images/slider/slide01.jpg" },
    { "url": "/assets/images/slider/slide02.jpg" },
    { "url": "/assets/images/slider/slide03.jpg" }
  ];
  newProducts: Products[] = new Array();
  hotProducts: Products[] = new Array();
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getHotProducts().subscribe(
      res => this.hotProducts = res
    )
    this.productService.getNewProducts().subscribe(
      res => this.newProducts = res
    )
  }
}
