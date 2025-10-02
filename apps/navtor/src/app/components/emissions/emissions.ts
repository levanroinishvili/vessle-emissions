import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { EmissionsFacade } from '../../state/emissions/emissions.facade';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { EmissionsChart } from '../emissions-chart/emissions-chart';
import { DividerModule } from 'primeng/divider'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Emission } from '../../models/emission.model';
import { CHART_TYPES } from '../../app.settings';

@Component({
  selector: 'navtor-emissions',
  imports: [
    AsyncPipe,
    ButtonModule,
    ProgressSpinnerModule,
    SelectModule,
    EmissionsChart,
    DividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './emissions.html',
  styleUrl: './emissions.css',
})
export class Emissions implements OnInit {

  protected readonly emissionsFacade = inject(EmissionsFacade)
  protected readonly chartTypes = CHART_TYPES

  protected readonly vesselSelectorControl = new FormControl<Emission[] | null>(null)
  protected readonly chartTypeSelectorControl = new FormControl<string>(CHART_TYPES[0].value)

  protected readonly autoSelectFirstVessel = this.emissionsFacade.data$.pipe(
    takeUntilDestroyed(),
  ).subscribe(emissions => {
    const firstEnabled = emissions.find(e => ! e.noEmissionsData)
    this.vesselSelectorControl.setValue(firstEnabled?.emissions ?? null)
  })

  ngOnInit(): void {
    this.emissionsFacade.load()
  }

}
