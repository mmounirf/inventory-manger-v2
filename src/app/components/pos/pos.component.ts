import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatabaseService } from '../../providers/database.service';
import { SharedService } from '../../providers/shared.service';
import { MatDialog } from '@angular/material';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, AfterViewInit {
  products: any[];
  cart: any[] = [];
  constructor(private database: DatabaseService, private cartDialog: MatDialog, private sharedServices: SharedService) { }

  ngOnInit() {
    this.products = this.database.getData('products');
  }

  ngAfterViewInit() {
    this.sharedServices.generateBarcodes();
  }

  addToCart(product) {
    product.quantity --;
    this.cart.push(product);
  }

  openCart() {
    this.cartDialog.open(PaymentComponent, {
      width: '700px',
      data: this.cart
    }).afterClosed().subscribe((results) => {
      console.log(results);
    });
  }


  search(value) {
    if (!value) {
      this.sharedServices.generateBarcodes();
    }

  }
}
