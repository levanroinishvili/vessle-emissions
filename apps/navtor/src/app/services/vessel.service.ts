import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENDPOINTS } from '../app.settings';
import { Vessel } from '../models/vessel.model';
import { DateString } from '../models/auxiliary';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  private readonly httpClient = inject(HttpClient)

    allVessels$ = this.httpClient.get<Vessel<DateString>[]>(ENDPOINTS.getVessels).pipe(
      map(vessles => vessles.map(processVessle)),
    )
}

const processVessle = (vessel: Vessel<DateString>): Vessel => ({
  ...vessel,
  startDate: new Date(vessel.startDate),
})
