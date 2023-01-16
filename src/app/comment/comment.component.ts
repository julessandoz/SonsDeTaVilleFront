import { Comment } from './../models/comment';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DatePipe]
})
export class CommentComponent implements OnInit {

  

  @Input() comment: Comment;
  // comment = {
  //   _id: '1',
  //   author: {
  //     id: '1',
  //     username: 'julesSandoz',
  //     email: 'test@example.com',
  //     admin: false
  //   },
  //   comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
  //   date: new Date()
  // };
  commentDate: string;

  constructor(private datePipe: DatePipe){
    if(this.comment.date.getDate() == new Date().getDate() && this.comment.date.getMonth() == new Date().getMonth() && this.comment.date.getFullYear() == new Date().getFullYear()){
      this.commentDate = datePipe.transform(this.comment.date, 'HH:mm');
    } else {
      if (this.comment.date.getFullYear() == new Date().getFullYear()) {
        this.commentDate = datePipe.transform(this.comment.date, 'dd/MM');
      } else {
        this.commentDate = datePipe.transform(this.comment.date, 'dd/MM/yyyy');
      }
    }
  }

  ngOnInit() {}
}
