import { ErrorAlertService } from './../error-alert.service';
import { ApiCallService } from 'src/app/api-call.service';
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

  constructor(
    private api: ApiCallService,
    private errorAlert: ErrorAlertService
  ) {}

  ngOnInit() {
    this.bgColor = this.backgroundColor === 'red' ? 'red' : 'white';
    this.api.getCategoryByName(this.categoryName).subscribe(
      (data) => {
        this.category = data as Category;
      },
      (error) => {
        this.errorAlert.displayCategoryErrorAlert(error);
      }
    );
  }
}
