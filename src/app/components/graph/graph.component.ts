import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  id: number = 0;
  range: string = '';
  scrollId: number = 0;
  graphData: any[] = [];
  chartOptions: any;
  chartOptionsV: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private httpService: HttpService, private appService: AppService) {
    this.appService.selectedCoin$.subscribe((selectedCoin: any) => {
      console.log(selectedCoin)
    })
    this.route['data'].subscribe((response: any) => {
      this.graphData = this.convertEpochArray(Object.keys(response['graphResolverService']['data']['points']), response['graphResolverService']['data']['points']);
      this.updateGraph();
    })
    this.route['queryParams'].subscribe(response => {
      this.id = response['id'];
      this.range = response['range'];
      this.scrollId = response['scrollId']
    });
  }
  ngOnInit(): void { }

  navigate(range: string) {
    this.router.navigate(['/graph'], { queryParams: { id: this.id, range: range, scrollId: this.scrollId } });
    this.httpService.getCurrencyChartData(this.id.toString(), range).subscribe((response: any) => {
      // this.chartOptions = this.chartOptions;
      this.graphData = this.convertEpochArray(Object.keys(response['data']['points']), response['data']['points']);
      this.updateGraph();

    })

  }



  xaxis = {
    categories: this.graphData[4],
    labels: {
      formatter: function (value: any) {
        //  console.log(value)
        return value;
      }
    }
  };
  yaxis = { show: true };
  xaxis1: any = {
    categories: this.graphData[4],
    labels: {
      formatter: function (value: any) {
        return value;
      }
    }
  };
  yaxis1: any = {
    showAlways: false,
    floating: true,
    axisTicks: {
      show: false
    },
    axisBorder: {
      show: false
    },
    labels: {
      show: false
    },
  };
  series0: any = [];

  series1: any = [];
  chart0: any = {
    events: {
      beforeMount: function (chartContext: any, config: any) {


      },
      mounted: function (chartContext: any, config: any) {

      }
    },
    toolbar: {
      show: false,
    },
    height: '300px',
    type: "line",
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 100,
      animateGradually: {
        enabled: true,
        delay: 100
      },
      dynamicAnimation: {
        enabled: true,
        speed: 100
      }
    }
  };
  chart1: any = {
    toolbar: {
      show: false,
    },
    height: '200px',
    type: "line",
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 100,
      animateGradually: {
        enabled: true,
        delay: 100
      },
      dynamicAnimation: {
        enabled: true,
        speed: 100
      }
    }
  };

  updateGraph() {
    this.series0 = [
      {
        name: "price",
        data: this.graphData[0]
      }
    ]

    this.xaxis = {
      categories: this.graphData[4],
      labels: {
        formatter: function (value: any) {
          //  console.log(value)
          return value;
        }
      }
    };
    this.xaxis1 = {
      categories: this.graphData[4],
      labels: {
        formatter: function (value: any) {
          return value;
        }
      }
    };
    this.series1 = [
      {
        name: "volume 24h",
        data: this.graphData[1]
      }
    ]
  }

  convertEpochArray(epochArray: string[], points: any) {
    var points0: any[] = [];
    var pointsA: any[] = [];
    var pointsB: any[] = [];
    var pointsC: any[] = [];
    for (var x = 0; x < epochArray.length; x++) {
      points0.push(points[epochArray[x]]['v'][0])
      pointsA.push(points[epochArray[x]]['v'][1])
      pointsB.push(points[epochArray[x]]['v'][2])
      pointsC.push(points[epochArray[x]]['v'][4])
    }
    var dates: any[] = [];
    epochArray.forEach((element: any) => {
      var date = new Date((parseInt(element) * 1000));
      dates.push(date.toLocaleString())
    });
    return [points0, pointsA, pointsB, pointsC, dates]
  }
  tooltipPrice: any;
  tooltipDate: any;
  tooltip24HVolume: any;
  tooltipMarketCap: any;
  tooltipCirculatingSuppy: any;

  tooltip = {
    custom: (tip: any) => {
      // series: any, seriesIndex: any, dataPointIndex: any, w: any
      // console.log(tip['series'])
      //  console.log(tip['seriesIndex'])
      //console.log(tip.series[tip.seriesIndex][tip.dataPointIndex])
      // tooltipPrice=
      this.tooltipDate = this.graphData[4][tip['dataPointIndex']]
      this.tooltip24HVolume = this.graphData[1][tip['dataPointIndex']]
      this.tooltipMarketCap = this.graphData[2][tip['dataPointIndex']]
      this.tooltipCirculatingSuppy = this.graphData[3][tip['dataPointIndex']]
      //console.log(tip['w'])
      return '<div  style="border:1px solid black;font-size:12px">'
        + 'Price: $' + (tip.series[tip.seriesIndex][tip.dataPointIndex]).toLocaleString()
        + '<br>'
        //  + 'Date: ' + this.graphData[4][tip['dataPointIndex']]
        //  + '<br>'
        + 'Volume 24H: $'
        + this.graphData[1][tip['dataPointIndex']].toLocaleString()
        + '<br>'
        + 'Market Cap: $'
        + this.graphData[2][tip['dataPointIndex']].toLocaleString()
        + '<br>'
        + 'Circulating Supply: ' + this.graphData[3][tip['dataPointIndex']].toLocaleString()
        + '</div>'
    }

    // var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];



  }


}
