import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { IntervalEmissions } from '../models/emission.model';
import { CONFIG, ENDPOINTS } from '../app.settings';
import { DateString } from '../models/auxiliary';
import { map } from 'rxjs';
import { randomVicissitudes } from '../utils/dev-test/rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Identity } from '../utils/various';

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {

  private readonly httpClient = inject(HttpClient)

    allEmissions$ = this.httpClient.get<IntervalEmissions<DateString>[]>(ENDPOINTS.getEmissions).pipe(
      map(emissions => emissions.map(processEmission)),
      // Add random trouble: delays and occasional errors - only during development, but not on SSR
      CONFIG.simulateLife && isDevMode() && isPlatformBrowser(inject(PLATFORM_ID)) ? randomVicissitudes() : Identity,
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
