import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CurrencyListPipe } from 'src/app/pipes/currency-list.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crypto-currency-list',
  templateUrl: './crypto-currency-list.component.html',
  styleUrls: ['./crypto-currency-list.component.css'],
})
export class CryptoCurrencyListComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkVirtualScrollViewport) viewPort: any;

  cryptoCurrencyList: any[] = [];
  currencyListFilter: string = '';
  selectedCurrency: any;
  scrollId = 0;

  constructor(private httpService: HttpService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) {
    this.route['queryParams'].subscribe(response => { this.scrollId = response['scrollId'] });
  }

  ngOnInit(): void {
    this.route['queryParams'].subscribe(response => { this.scrollId = response['scrollId'] });
    this.initializeCryptoCurrencyList();
    this.formatCryptoCurrencyList();



  }

  ngAfterViewInit(): void {
    setTimeout(() => { this.calculateHeaderWidth() }, 200);
    setTimeout(() => { this.route['queryParams'].subscribe(response => { this.viewPort.scrollToIndex(response['scrollId'], 'auto') }); }, 0);


  }

  initializeCryptoCurrencyList() {
    this.route.data.subscribe((response: any) => {
      this.cryptoCurrencyList = response[`cryptoCurrencyList`][`data`][`cryptoCurrencyList`];
    });
  }

  formatCryptoCurrencyList() {
    this.cryptoCurrencyList.forEach((element: any) => {
      element['quotes'][2]['price'] = Math.round(element['quotes'][2]['price'] * 100) / 100;
      element['quotes'][2]['percentChange24h'] = Math.round((element['quotes'][2]['percentChange24h'] * 100)) / 100;
      element['quotes'][2]['percentChange7d'] = Math.round(element['quotes'][2]['percentChange7d'] * 100) / 100;
      element['quotes'][2]['marketCap'] = Math.round(element['quotes'][2]['marketCap']);
      element['quotes'][2]['volume24h'] = Math.round(element['quotes'][2]['volume24h']);
      element['circulatingSupply'] = Math.round(element['circulatingSupply']);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateHeaderWidth();
  }

  onViewPortScroll($event: any) {
    this.calculateHeaderWidth();
    this.scrollId = $event;

  }

  calculateHeaderWidth() {
    for (var x = 0; x < 10; x++) {
      if (document.getElementById(`headerId${x.toString()}`)) {
        document.getElementById(`headerId${x.toString()}-${x.toString()}`)!['style']['width'] =
          document.getElementById(`headerId${x.toString()}`)!['offsetWidth'].toString() + 'px';
      }
    }
  }
  selectedIndexChange($event: any) {
    if ($event === 0) {
      setTimeout(() => { this.viewPort.scrollToIndex(this.scrollId, 'auto') }, 0);
    }

  }
}
