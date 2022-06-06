import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cryptoCurrencyList: any[] = [];

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.httpService.getCurrencies(`1`).subscribe((response: any) => {
      console.log(response[`data`][`cryptoCurrencyList`])
      this.cryptoCurrencyList = response[`data`][`cryptoCurrencyList`];

    });

    this.httpService.getCurrencyChartData(`1`, `null`).subscribe((response: any) => {
      console.log(response[`data`][`points`])
    })

    this.activatedRoute.data.subscribe(response => { console.log(response) });
    */
  }


}
