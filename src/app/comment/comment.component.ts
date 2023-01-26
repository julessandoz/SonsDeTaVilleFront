import { Comment } from './../models/comment';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [DatePipe]
})
export class CommentComponent implements OnInit {

    comments : any = [];
    soundId: string = "638da12d40ae1f0493231fcc";

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get(`https://sons-de-ta-ville.onrender.com/comments?sound=${this.soundId}`).subscribe(data => {
        this.comments = data;

      });
    }
}

 /*  constructor(private datePipe: DatePipe){
    if(this.comment.date.getDate() == new Date().getDate() && this.comment.date.getMonth() == new Date().getMonth() && this.comment.date.getFullYear() == new Date().getFullYear()){
      this.commentDate = datePipe.transform(this.comment.date, 'HH:mm');
    } else {
      if (this.comment.date.getFullYear() == new Date().getFullYear()) {
        this.commentDate = datePipe.transform(this.comment.date, 'dd/MM');
      } else {
        this.commentDate = datePipe.transform(this.comment.date, 'dd/MM/yyyy');
      }
    }
  } */

