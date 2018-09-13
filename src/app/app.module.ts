import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatStepperModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatChipsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatDialogModule,
  MatRippleModule,
  MatBadgeModule,
  MatDividerModule
} from '@angular/material';
import { FirstRunComponent } from './components/first-run/first-run.component';
import { DatabaseService } from './providers/database.service';
import { AddProductComponent } from './components/add-product/add-product.component';
import { PosComponent } from './components/pos/pos.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SearchPipe } from './pipes/search.pipe';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    FirstRunComponent,
    AddProductComponent,
    PosComponent,
    PaymentComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatRippleModule,
    MatBadgeModule,
    MatDividerModule
  ],
  providers: [ElectronService, DatabaseService],
  bootstrap: [AppComponent],
  entryComponents: [AddProductComponent, PaymentComponent]
})
export class AppModule { }
