import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CommentService } from '../service/comment.service';
import { Products } from '../models/product';
import { Comments } from '../models/comment';
import { OrderService } from '../service/order.servive';
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
  constructor(private route: ActivatedRoute, private productService: ProductService,
    private commentService: CommentService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: number = +params.get('id');
      this.getProductById(id);
    })
  }
  getProductById(id: number){
    this.productService.getProductById(id).subscribe(
      res => {
        if(res === null){
          console.log("Bị null");
          this.khongco = false;
          return;
        }
        this.khongco = true;
        this.product = res;
        if(this.product.total == 0){
          this.soLuong = 0;
        }
        this.getRelatedProducts(this.product.categories_id.toString(), this.product.id.toString());
        this.getCommentByProductId(this.product.id.toString());
      }
    )
  }
  getRelatedProducts(category_id: String, product_id: String){
    this.productService.getRelatedProducts(category_id, product_id).subscribe(
      res => this.relatedProducts = res
    )
  }
  getCommentByProductId(id: String){
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
    if (this.soLuong <= 1) {
      return;
    }
    else {
      this.soLuong = this.soLuong - 1;
    }
  }
  tang() {
    if(this.soLuong == this.product.total){
      return;
    }
    else{
      this.soLuong= this.soLuong + 1;
    }
  }
  saveComment(content: String){
    if(content.trim()===""){
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
    else{
      alert("Hãy đăng nhập!");
      return;
    }
  }

  addCart(){
    if(this.product.total <= 0){
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    if (!!localStorage.getItem('cart')){
      this.listCart = JSON.parse(localStorage.getItem('cart'));
      this.listCart.push({"product_id": this.product.id, "so_luong": this.soLuong, "price": this.product.price, "name": this.product.name});
      localStorage.setItem("cart", JSON.stringify(this.listCart));
      alert("Thành Công!");
    }
    else{
      this.listCart.push({"product_id": this.product.id, "so_luong": this.soLuong, "price": this.product.price, "name": this.product.name});
      localStorage.setItem("cart", JSON.stringify(this.listCart));
      alert("Thành Công!");
    }
  }
  order(){
    if(this.product.total == 0){
      alert("Sản phẩm đã hết hàng!");
      return;
    }
    if(!!localStorage.getItem('token')){
    this.orderService.save(+this.product.id, this.soLuong).subscribe(
      res => {
        alert("Thành công!");
        this.getProductById(+this.product.id);
        this.soLuong = 1;
      }
    )
    }
    else{
      alert("Hãy đăng nhập!");
      return;
    }
  }
}
