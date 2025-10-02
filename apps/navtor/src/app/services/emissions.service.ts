import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { IntervalEmissions } from '../models/emission.model';
import { LIFE_SIMULATOR, ENDPOINTS } from '../app.settings';
import { DateString } from '../models/auxiliary';
import { combineLatest, map } from 'rxjs';
import { randomVicissitudes } from '../utils/dev-test/rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Identity } from '../utils/various';
import { VesselService } from './vessel.service';
import { Vessel } from '../models/vessel.model';
import { ListedValueOf } from '../utils/type-helpers';

/** Ship and Emissions data merged together */
export type ShipEmissions = ListedValueOf<ReturnType<typeof mergeShipEmissions>>

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {

  private readonly httpClient = inject(HttpClient)
  private readonly vesselService = inject(VesselService)

    rawEmissions$ = this.httpClient.get<IntervalEmissions<DateString>[]>(ENDPOINTS.getEmissions).pipe(
      map(emissions => emissions.map(processEmission)),
      // Add random trouble: delays and occasional errors - only during development, but not on SSR
      LIFE_SIMULATOR.simulateRealLife && isDevMode() && isPlatformBrowser(inject(PLATFORM_ID)) ? randomVicissitudes() : Identity,
    )

    emissions$ = combineLatest([
      this.vesselService.allVessels$,
      this.rawEmissions$,
    ]).pipe(
      map(([vessel, emissions]) => mergeShipEmissions(vessel, emissions)),
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

function mergeShipEmissions(vessels: Vessel[], emissions: IntervalEmissions[]) {
  const knownIds = vessels.map(vessel => vessel.id)
  const unknownShipEmissions = emissions
    .filter(shipEmissions => ! knownIds.includes(shipEmissions.id))
    .map(shipEmissions => ({
      ...unknownVessel,
      id: shipEmissions.id,
      emissions: shipEmissions.timeSeries,
    }))
  return vessels.map(vessel => ({
    ...vessel,
    emissions: emissions.find(shipEmissions => shipEmissions.id === vessel.id)?.timeSeries ?? []
  }))
    // .filter(vesselEmissions => vesselEmissions.emissions.length) // Remove vessels without emissions info
    .concat(unknownShipEmissions)
    .map(shipEmissions => ({
      ...shipEmissions,
      noEmissionsData: shipEmissions.emissions.length === 0, // Mark ships with no emissions data with a boolean flag
    }))
}

const unknownVessel: Vessel = {
  id: NaN,
  name: 'Unknown Vessel',
  mmsi: NaN,
  imo: NaN,
  companyId: NaN,
  companyName: 'Unknown Company',
  startDate: new Date(NaN), // Invalid date
  active: false,
  vesselType: 'Container'
}
