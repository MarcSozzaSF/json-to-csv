import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jsonData: any = [];
  constructor(private appService: AppService) {}

  readJson(event: any) {
    var file = event.srcElement.files[0];
    if (file) {
      let that = this;
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt: any) {
        that.jsonData = [];
        console.log(JSON.parse(evt.target['result']));
        that.jsonData = JSON.parse(evt.target['result']);
      };
      reader.onerror = function (evt) {
        console.log('error reading file');
      };
    }
  }

  download() {
    this.appService.downloadFile(this.jsonData, 'jsontocsv');
  }
}
