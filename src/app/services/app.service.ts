import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  _selectedCoin = new Subject<any>();
  selectedCoin$ = this._selectedCoin.asObservable();
  constructor() { }
  updateSelectedCoin(coin: any) { this._selectedCoin.next(coin) };
}
