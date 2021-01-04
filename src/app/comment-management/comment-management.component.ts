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
  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.getSize();
    this.pageChanged({ page: 1 });
  }
  getSize() {
    this.commentService.getSize().subscribe(
      res => this.size = res.length
    )
  }
  pageChanged(event: any): void {
    this.commentService.paging(event.page - 1).subscribe(
      res => this.comments = res
    )
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
