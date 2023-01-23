import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss'],
})
export class CategoryButtonComponent implements OnInit {

  @Input() categoryName: string;
  @Input() backgroundColor: string; // can be red or white

  bgColor?: string;
  category?: Category;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.bgColor = this.backgroundColor === 'red' ? 'red' : 'white';
    this.http.get(`https://sons-de-ta-ville.onrender.com/categories/${this.categoryName}`).subscribe(data => {
      this.category = data as Category;
    })
  }

}
