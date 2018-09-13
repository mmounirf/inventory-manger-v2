import { Component, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialogRef} from '@angular/material';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnChanges {
  separatorKeysCodes: number[] = [ENTER];
  filteredCats: Observable<string[]>;
  cats: string[] = [];
  allCats: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  productForm: FormGroup;
  @ViewChild('catInput') catInput: ElementRef<HTMLInputElement>;
  category: FormControl = new FormControl('');
  constructor(private formBuilder: FormBuilder, private database: DatabaseService, public dialogRef: MatDialogRef<AddProductComponent>) {
    this.productForm = this.formBuilder.group({
      name: new FormControl ('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      barcode: new FormControl('', [Validators.required]),
      category: this.category
    });

    this.filteredCats = this.category.valueChanges.pipe(
      startWith(null),
      map((cat: string | null) => cat ? this._filter(cat) : this.allCats.slice()));
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  onSubmit() {
    this.productForm.value['category'] = this.cats;
    let allProducts = this.database.getData('products');
    allProducts.push(this.productForm.value);
    this.database.setData('products', allProducts);
    this.dialogRef.close(this.database.getData('products'));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.cats.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.category.setValue(null);
  }

  remove(cat: string): void {
    const index = this.cats.indexOf(cat);

    if (index >= 0) {
      this.cats.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cats.push(event.option.viewValue);
    this.catInput.nativeElement.value = '';
    this.category.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCats.filter(cat => cat.toLowerCase().indexOf(filterValue) === 0);
  }

}
