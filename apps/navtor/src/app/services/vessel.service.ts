import { HttpClient } from '@angular/common/http';
import { inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { LIFE_SIMULATOR, ENDPOINTS } from '../app.settings';
import { Vessel } from '../models/vessel.model';
import { DateString } from '../models/auxiliary';
import { map } from 'rxjs';
import { randomVicissitudes } from '../utils/dev-test/rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Identity } from '../utils/various';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  private readonly httpClient = inject(HttpClient)

    allVessels$ = this.httpClient.get<Vessel<DateString>[]>(ENDPOINTS.getVessels).pipe(
      map(vessles => vessles.map(processVessle)),
      // Add random trouble: delays and occasional errors - only during development, but not on SSR
      LIFE_SIMULATOR.simulateRealLife && isDevMode() && isPlatformBrowser(inject(PLATFORM_ID)) ? randomVicissitudes() : Identity,
    )
}

const processVessle = (vessel: Vessel<DateString>): Vessel => ({
  ...vessel,
  startDate: new Date(vessel.startDate),
})
