import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IntervalEmissions } from '../models/emission.model';
import { ENDPOINTS } from '../app.settings';
import { DateString } from '../models/auxiliary';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {

  private readonly httpClient = inject(HttpClient)

    allEmissions$ = this.httpClient.get<IntervalEmissions<DateString>[]>(ENDPOINTS.getEmissions).pipe(
      map(emissions => emissions.map(processEmission)),
    )
}

const processEmission = (intervals: IntervalEmissions<DateString>): IntervalEmissions => ({
  ...intervals,
  timeSeries: intervals.timeSeries.map(timeSeries => ({
    ...timeSeries,
    report_from_utc: new Date(timeSeries.report_from_utc),
    report_to_utc: new Date(timeSeries.report_to_utc),
  }))
})
