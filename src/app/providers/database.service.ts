import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  getData(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  setData(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }

  changeValue(path, key, value) {
    const dataToChange = this.getData(path);
    dataToChange[key] = value;
    this.setData(path, dataToChange);
    return this.getData(path);
  }

  getSettings() {
    return this.getData('settings');
  }

  getUser() {
    return this.getData('user');
  }

  updateSettings(newSettings) {
    this.setData('settings', newSettings);
    return this.getData('settings');
  }

  updateProducts(products) {
    const dataToChange = this.getData('products');
    for (let i = 0; i < products.length; i++) {
      const productToCheckAgainst = products[i]
      for (let j = 0; j < dataToChange.length; j++){
        if (dataToChange[j].barcode === productToCheckAgainst.barcode) {
          dataToChange[j].quantity = productToCheckAgainst.quantity;
        }
      }
    }
    this.setData('products', dataToChange);
  }
}
