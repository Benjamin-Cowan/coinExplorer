import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GraphResolverService implements Resolve<any>{

  constructor(private httpService: HttpService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.httpService.getCurrencyChartData(route['queryParams']['id'], route['queryParams']['range'])
  }

}
