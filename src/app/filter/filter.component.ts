import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryButtonComponent } from '../category-button/category-button.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  result: string;
  chosenDate: string;
  datePickerOn:boolean = false;
  rangeValue: number = 0;
  categories: any = [];

  constructor(private http:HttpClient, private modalCtrl: ModalController) {
    this.chosenDate = new Date().toISOString();
    /* this.date = date.toLocaleDateString(); */
   }

   ngOnInit() {
    this.http.get(`https://sons-de-ta-ville.onrender.com/categories/`)
    .subscribe((data) =>{
      console.log(data)
      this.categories = data;
    })
   }

   updateDate(){
    console.log(this.chosenDate);
   }
  

}
