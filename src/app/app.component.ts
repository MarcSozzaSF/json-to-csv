import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-route',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private appService:AppService) {  }

    jsonData =  [
      {
        name: "Anil Singh",
        age: 33,
        average: 98,
        approved: true,
        description: "I am active blogger and Author."
      },
      {
        name: 'Reena Singh',
        age: 28,
        average: 99,
        approved: true,
        description: "I am active HR."
      },
      {
        name: 'Aradhya',
        age: 4,
        average: 99,
        approved: true,
        description: "I am engle."
      },
    ];

  download(){
    this.appService.downloadFile(this.jsonData, 'jsontocsv');
  }
}
