import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CryptoCurrencyListComponent } from './components/crypto-currency-list/crypto-currency-list.component';
import { CurrencyListPipe } from './pipes/currency-list.pipe';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './components/graph/graph.component';
import { GraphModule } from './modules/graph/graph.module';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrencyListComponent,
    CurrencyListPipe,
    GraphComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    NgApexchartsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
