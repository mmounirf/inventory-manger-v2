import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { DatabaseService } from '../../providers/database.service';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { SharedService } from '../../providers/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'price', 'category', 'quantity', 'barcode', 'actions'];
  allProducts = new MatTableDataSource<any[]>([]);
  constructor(
    private electron: ElectronService,
    private database: DatabaseService,
    private addProductDialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private sharedServices: SharedService
  ) {
    this.allProducts = new MatTableDataSource<any[]>(this.database.getData('products'));
  }

  ngAfterViewInit() {
    this.allProducts.paginator = this.paginator;
    this.allProducts.sort = this.sort;
    this.refresh();

  }

  ngOnInit() {

  }

  ngOnChanges() {


  }

  action(event, data){
    console.log(event)
    console.log(data)
  }

  search(value: string) {
    this.allProducts.filter = value.trim().toLowerCase();
    this.sharedServices.generateBarcodes();
  }



  addProduct() {
    this.addProductDialog.open(AddProductComponent, {
      width: '600px'
    }).afterClosed().subscribe(products => {
      this.refresh();
    });
  }

  refresh() {
    this.allProducts = new MatTableDataSource<any[]>(this.database.getData('products'));
    this.cdr.detectChanges();
    this.sharedServices.generateBarcodes();
  }

  delete() {

  }



}
