import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  downloadFile(data: any, filename = 'data', header: string[], type = 'CSV') {
    let csvData =
      type === 'CSV'
        ? this.ConvertToCSV(data, header)
        : this.convertToSQL(data, header);

    let blob =
      type === 'CSV'
        ? new Blob(['\ufeff' + csvData], {
            type: 'text/csv;charset=utf-8;',
          })
        : new Blob([csvData], {
            type: 'text/csv;charset=utf-8;',
          });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    if (type === 'CSV') {
      dwldLink.setAttribute('download', filename + '.csv');
    } else {
      dwldLink.setAttribute('download', filename + '.sql');
    }

    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + array[i][head];
      }
      line = line.slice(1);
      str += line + '\r\n';
    }
    return str;
  }

  convertToSQL(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'INSERT INTO database (';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }

    row = row.slice(0, row.length - 1);

    row += ')';
    row += '\r\n';
    row += 'VALUES';

    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '(';
      for (let index in headerList) {
        let head = headerList[index];
        line += '';
        line +=  array[i][head] + ',';
      }
      line = line.slice(0, line.length - 1);
      str += line + '),\r\n';
    }

    str = str.slice(0, str.length - 3);

    return str;
  }
}
