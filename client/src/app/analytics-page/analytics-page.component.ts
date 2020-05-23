import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'
import {AnalyticsService} from '../shared/services/analytics.service'
import {AnalyticsPage} from '../shared/interfaces'
import {Subscription} from 'rxjs'
import {Chart} from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  aSub: Subscription

  average: number
  pending = true

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    this.aSub = this.service.getAnalytics()
      .subscribe((data: AnalyticsPage) => {
        this.average = data.average

        gainConfig.labels = data.chart.map(item => item.label)
        gainConfig.data = data.chart.map(item => item.gain)

        orderConfig.labels = data.chart.map(item => item.label)
        orderConfig.data = data.chart.map(item => item.order)

        // // **** temp Gain ****
        // gainConfig.labels.push('08.05.2020')
        // gainConfig.data.push(1500)
        //
        // gainConfig.labels.push('09.05.2020')
        // gainConfig.data.push(1200)
        //
        // gainConfig.labels.push('10.05.2020')
        // gainConfig.data.push(1600)
        //
        // gainConfig.labels.push('11.05.2020')
        // gainConfig.data.push(1500)
        //
        // gainConfig.labels.push('12.05.2020')
        // gainConfig.data.push(1300)
        //
        // gainConfig.labels.push('13.05.2020')
        // gainConfig.data.push(1800)
        //
        // gainConfig.labels.push('14.05.2020')
        // gainConfig.data.push(1600)
        // // **** temp ****


        // // **** temp Order ****
        // orderConfig.labels.push('08.05.2020')
        // orderConfig.data.push(5)
        //
        // orderConfig.labels.push('09.05.2020')
        // orderConfig.data.push(3)
        //
        // orderConfig.labels.push('10.05.2020')
        // orderConfig.data.push(6)
        //
        // orderConfig.labels.push('11.05.2020')
        // orderConfig.data.push(4)
        //
        // orderConfig.labels.push('12.05.2020')
        // orderConfig.data.push(7)
        //
        // orderConfig.labels.push('13.05.2020')
        // orderConfig.data.push(4)
        //
        // orderConfig.labels.push('14.05.2020')
        // orderConfig.data.push(2)
        // // **** temp ****

        const gainCtx = this.gainRef.nativeElement.getContext('2d')
        const orderCtx = this.orderRef.nativeElement.getContext('2d')
        gainCtx.canvas.height = '300px'
        orderCtx.canvas.height = '300px'

        new Chart(gainCtx, createChartConfig(gainConfig))
        new Chart(orderCtx, createChartConfig(orderConfig))

        this.pending = false
      })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }

}
