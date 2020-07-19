import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StringUtils {
   createKeywords(name) {
    // const arrName = [''];
    let curName = '';
     const words = this.replaceTv(name.toLowerCase()).split(' ');
     const arrName = [''];

     for(let i = 0;i<words.length;i++){
       let curName2 = '';
       words[i].split('').forEach(letter => {
         curName2 += letter;
         arrName.push(curName2);
       });
     }
     name.toLowerCase().split('').forEach(letter => {
       curName += this.replaceTv(letter);
       arrName.push(curName);
     });
     return arrName;
  }

   replaceTv(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
}
