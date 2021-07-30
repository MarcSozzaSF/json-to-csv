import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  jsonData: any = [];
  header: string[] = [
    'city',
    'cityNumber',
    'districtNumber',
    'incrementalNumber',
    'postcode',
    'street',
    'number',
    'locality',
    'localityNumber',
    'lastname',
    'firstname',
    'dateofbirth',
    'householdNumber',
    'registrationNumber',
    'cadastre',
    'resident',
  ];
  isFileJsonUpload = false;

  constructor(private appService: AppService) {}

  readJson(event: any) {
    var file = event.srcElement.files[0];
    if (file) {
      let that = this;
      var reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = function (evt: any) {
        that.jsonData = [];
        that.jsonData = JSON.parse(evt.target['result']);
        let firstLine = JSON.parse(evt.target['result'])[0];
        let newHeader: string[] = [];
        for (const item in firstLine) { newHeader.push(item)}
        that.header = newHeader.slice();
      };
      reader.onerror = function (evt) {
        console.log('error reading file');
      };
    }
  }

  download() {
    this.appService.downloadFile(this.jsonData, 'jsontocsv', this.header);
  }

  downloadSQL() {
    this.appService.downloadFile(this.jsonData, 'jsonToSql', this.header, 'SQL');
  }
}
