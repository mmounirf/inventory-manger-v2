import { Injectable } from '@angular/core';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';
import { DatabaseService } from './database.service';
import * as JsBarcode from 'jsbarcode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private translate: TranslateService, private database: DatabaseService) { }
  changeLayoutDir() {
    switch (this.translate.getDefaultLang()) {
      case 'en':
        document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
      break;
      case 'ar':
        document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
      break;
      default:
      break;
    }
  }

  defaultLangChanged() {
    this.database.changeValue('settings', 'lang', this.translate.getDefaultLang());
    this.changeLayoutDir();
  }

  getDir() {
    return document.getElementsByTagName('body')[0].getAttribute('dir');
  }

  generateBarcodes() {
    for (let i = 0; i < document.getElementsByClassName('barcode-img').length; i++) {
      JsBarcode(document.getElementsByClassName('barcode-img')[i]).init();
    }
  }
}
