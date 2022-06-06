import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { GraphResolverService } from 'src/app/services/graph-resolver.service';
import { HttpService } from 'src/app/services/http.service';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { GraphRoutingModule } from '../graph-routing/graph-routing.module';



@NgModule({
  declarations: [
    // GraphComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GraphRoutingModule
  ],
  providers: [
    HttpService,
    GraphResolverService,
    MaterialModule

  ]
})
export class GraphModule { }
