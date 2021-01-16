import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CommentService } from '../service/comment.service';
import { Products } from '../models/product';
import { Comments } from '../models/comment';
import { OrderService } from '../service/order.servive';
import { ComponentShareService } from '../service/component-share.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  @ViewChild('content') textarea: ElementRef;
  comments: Comments[] = new Array();
  product: Products = new Products();
  soLuong: number = 1;
  relatedProducts: Products[] = new Array();
  listCart = new Array();
  khongco: boolean = false;

  formOrder: FormGroup;
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private commentService: CommentService, private orderService: OrderService,
    private componentShareService: ComponentShareService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: number = +params.get('id');
      this.getProductById(id);
    })
    this.formOrder = this.fb.group({
      size: ['S', Validators.required],
      so_luong: [1, [Validators.required, Validators.min(0)]]
    })
  }
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      res => {
        if (res === null) {
          console.log("Bị null");
          this.khongco = false;
          return;
        }
        this.khongco = true;
        this.product = res;
        if (this.product.total == 0) {
          this.soLuong = 0;
        }
        this.getRelatedProducts(this.product.categories_id.toString(), this.product.id.toString());
        this.getCommentByProductId(this.product.id.toString());
      }
    )
  }
  getRelatedProducts(category_id: String, product_id: String) {
    this.productService.getRelatedProducts(category_id, product_id).subscribe(
      res => this.relatedProducts = res
    )
  }
  getCommentByProductId(id: String) {
    this.commentService.getCommentByProductId(id).subscribe(
      res => this.comments = res
    )
  }
  myFunction(imgs) {
    let expandImg = document.getElementById("expandedImg") as HTMLImageElement;
    let imgText = document.getElementById("imgtext");
    // console.log(imgs.target);
    expandImg.src = imgs.target.src;
    expandImg.parentElement.style.display = "block";
  }
  giam() {
    if (this.formOrder.value.so_luong <= 1) {
      return;
    }
    else {
      this.formOrder.patchValue({
        so_luong: this.formOrder.value.so_luong - 1
      })
    }
  }
  tang() {
    if (this.formOrder.value.so_luong == this.product.total) {
      return;
    }
    else {
      this.formOrder.patchValue({
        so_luong: this.formOrder.value.so_luong + 1
      })
    }
  }
  saveComment(content: String) {
    if (content.trim() === "") {
      alert("Hãy nhập nội dung bình luận!");
      return;
    }
    else if (!!localStorage.getItem('token')) {
      var dt = new Date();
      const newComment: Comments = new Comments();
      newComment.comment_content = content;
      newComment.product_id = this.product.id;
      this.commentService.saveComment(newComment).subscribe(
        res => {
          alert("Thành Công");
          this.getCommentByProductId(this.product.id.toString());
          this.textarea.nativeElement.value = "";
        }
      )
    }
    else {
      alert("Hãy đăng nhập!");
      return;
    }
  }

  addCart() {
    if (this.product.total <= 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    if (!!localStorage.getItem('cart')) {
      this.listCart = JSON.parse(localStorage.getItem('cart'));
      this.listCart.push({ "product_id": this.product.id, "so_luong": this.formOrder.value.so_luong, "price": this.product.price, "image": this.product.images, "name": this.product.name, "size": this.formOrder.value.size });
      localStorage.setItem("cart", JSON.stringify(this.listCart));
      alert("Thành Công!");
    }
    else {
      this.listCart.push({ "product_id": this.product.id, "so_luong": this.formOrder.value.so_luong, "price": this.product.price, "image": this.product.images, "name": this.product.name, "size": this.formOrder.value.size });
      localStorage.setItem("cart", JSON.stringify(this.listCart));
      alert("Thành Công!");
    }
  }
  order() {
    if (this.product.total == 0) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    if (!!localStorage.getItem('token')) {

      this.componentShareService.nextMessage({
        "id_product": this.product.id, "so_luong": this.formOrder.value.so_luong, "size": this.formOrder.value.size
      });
      this.router.navigate(['/order-confirmation'])
    }
    else {
      alert("Hãy đăng nhập!");
      return;
    }

  }
}
