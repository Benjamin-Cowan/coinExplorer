import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CryptoCurrencyListComponent } from './components/crypto-currency-list/crypto-currency-list.component';
import { GraphComponent } from './components/graph/graph.component';

import { CryptoCurrencyListResolverService } from './services/crypto-currency-list-resolver.service';
import { GraphResolverService } from './services/graph-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', resolve: { cryptoCurrencyList: CryptoCurrencyListResolverService }, pathMatch: 'full' },
  { path: 'home', component: CryptoCurrencyListComponent, resolve: { cryptoCurrencyList: CryptoCurrencyListResolverService } },
  { path: 'graph', component: GraphComponent, resolve: { graphResolverService: GraphResolverService } }
  // { path: '**', component: PageNotFoundComponent }


]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
