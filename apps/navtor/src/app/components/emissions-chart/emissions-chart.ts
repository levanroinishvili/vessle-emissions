import { Component, computed, input } from '@angular/core';
import { Emission } from '../../models/emission.model';
import { HighchartsChartComponent } from 'highcharts-angular';
import { shipEmissionsToSeries } from '../../utils/emissions.utils';
import { BASE_CHART_OPTIONS } from '../../app.settings';

@Component({
  selector: 'navtor-emissions-chart',
  imports: [
    HighchartsChartComponent,
  ],
  templateUrl: './emissions-chart.html',
  styleUrl: './emissions-chart.css',
})
export class EmissionsChart {

  vessle = input.required<string>()
  emissions = input.required<Emission[] | null>()

  protected readonly chartOptions = computed<Highcharts.Options>(() => ({
    ...BASE_CHART_OPTIONS,
    title: {text: this.vessle() + (this.emissions() ? ' Emissions' : '')},
    series: shipEmissionsToSeries(this.emissions() ?? [])
  }))

}
