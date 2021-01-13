import { Component, OnInit } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { Comments } from '../models/comment';
@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrls: ['./comment-management.component.css']
})
export class CommentManagementComponent implements OnInit {
  comments: Comments[] = new Array();
  size: number = 0;
  currentPage = 1;
  searchText: string;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }

  search(page: number){
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.currentPage = 1;
    this.getSize();
    this.commentService.searchComment(this.searchText, page).subscribe(
      res => this.comments = res
    )

  }
  getSize() {
    if(this.searchText == undefined){
      this.searchText = "";
    }
    this.commentService.getSize(this.searchText).subscribe(
      res => this.size = res
    )
  }
  pageChanged(event: any): void {
    this.search(event.page - 1);
  }
  delete(id: number) {
    this.commentService.delete(id).subscribe(
      res => {
        alert("Xóa thành công!");
        window.location.reload();
      }
    )
  }

}
