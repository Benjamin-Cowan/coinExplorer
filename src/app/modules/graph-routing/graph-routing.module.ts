import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { GraphResolverService } from 'src/app/services/graph-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: GraphComponent,
    children: [
      {
        path: 'graph/1D', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/7D', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/1M', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/3M', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/1Y', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/YTD', resolve: { graphList: GraphResolverService },
      },
      {
        path: 'graph/ALL', resolve: { graphList: GraphResolverService },
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GraphRoutingModule { }
