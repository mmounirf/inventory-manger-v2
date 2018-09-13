import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/product';
import { FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})


export class PaymentComponent implements OnInit {
  productsToBeSold = [];
  total = 0;
  paidInput: FormControl = new FormControl(0);
  constructor(
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public cart: any[],
    private databse: DatabaseService
  ) { }

  ngOnInit() {
    this.cart.forEach(item => {
      // Item not found before let's add it
      if (this.productsToBeSold.indexOf(item) === -1) {
        item.quantityToSell = 1;
        this.productsToBeSold.push(item);
      } else {
        // Item already added let's just increase its count and decrease its available quantity and quantity
        const index = this.productsToBeSold.indexOf(item);
        this.productsToBeSold[index]['quantityToSell']++;
      }
    });
    this.getTotal();
  }


  removeItem(index) {
    this.productsToBeSold[index].quantity += this.productsToBeSold[index].quantityToSell;
    this.productsToBeSold[index].quantityToSell = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].name === this.productsToBeSold[index].name) {
         this.cart.splice(i, 1);
         i--;
      }
   }
    this.productsToBeSold.splice(index, 1);
    this.getTotal();
  }

  increaseItem(index) {
    this.productsToBeSold[index].quantityToSell++;
    this.productsToBeSold[index].quantity--;
    this.getTotal();
  }

  decreaseItem(index) {
    this.productsToBeSold[index].quantityToSell--;
    this.productsToBeSold[index].quantity++;
    this.getTotal();
  }

  getTotal() {
    this.total = 0;
    this.productsToBeSold.forEach(item => {
      this.total +=  item.price * item.quantityToSell;
    });
    this.paidInput.setValidators(Validators.min(this.total));
    return this.total;
  }

  canIncrease(index): boolean {
    return this.productsToBeSold[index].quantity !== 0 ? true : false;
  }

  canDecrease(index): boolean {
    return this.productsToBeSold[index].quantityToSell <= 1 ? false : true;
  }

  paymentComplete() {
    this.databse.updateProducts(this.productsToBeSold);
    this.dialogRef.close(this.databse.getData('products'));
  }

}
