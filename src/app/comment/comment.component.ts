import { User } from './../models/user';
import { Comment } from './../models/comment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DatePipe],
})
export class CommentComponent implements OnInit {
  @Output() openAuthorProfile: EventEmitter<User> = new EventEmitter();
  @Input() comment: Comment;
  commentDate: string;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.comment.date = new Date(this.comment.date);
    if (
      this.comment.date.getDate() == new Date().getDate() &&
      this.comment.date.getMonth() == new Date().getMonth() &&
      this.comment.date.getFullYear() == new Date().getFullYear()
    ) {
      this.commentDate = this.datePipe.transform(this.comment.date, 'HH:mm');
    } else {
      if (this.comment.date.getFullYear() == new Date().getFullYear()) {
        this.commentDate = this.datePipe.transform(this.comment.date, 'dd/MM');
      } else {
        this.commentDate = this.datePipe.transform(this.comment.date, 'dd/MM/yyyy');
      }
    }
  }

  seeAuthorProfile(author: User) {
    this.openAuthorProfile.emit(author);
  }
}