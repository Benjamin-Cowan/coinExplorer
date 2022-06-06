import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyListPipe'
})
export class CurrencyListPipe implements PipeTransform {
  transform(currencies: any[], input: string) {
    if (input === '') { return currencies }
    else {
      let filteredList: any[] = [];
      currencies.forEach((currency) => {
        if (currency['name'].toLowerCase().includes(input.toLowerCase())) {
          filteredList.push(currency)
        }
      })
      return filteredList;
    }
  }

}
