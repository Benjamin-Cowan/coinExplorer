import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  baseUrl = `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/`;
  constructor(private http: HttpClient) { }

  getCurrencies(start: string) {
    return this.http.get(this.baseUrl + `listing?start=${start}&limit=20000&sortBy=market_cap&sortType=desc&convert=USD,BTC,ETH&cryptoType=all&tagType=all&audited=false&aux=ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap`);
  }

  getCurrencyChartData(id: string, range: string) {
    var ranges = [`1D`, `7D`, `1M`, `3M`, `1Y`, `YTD`, `ALL`];
    return this.http.get(this.baseUrl + `detail/chart?id=${id}&range=${range}`);
  }
}
