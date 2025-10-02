import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmissionsFacade } from '../../state/emissions/emissions.facade';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectModule } from 'primeng/select';
import { EmissionsChart } from '../emissions-chart/emissions-chart';
import { DividerModule } from 'primeng/divider'

@Component({
  selector: 'navtor-emissions',
  imports: [
    AsyncPipe,
    ButtonModule,
    ProgressSpinnerModule,
    SelectModule,
    EmissionsChart,
    DividerModule,
  ],
  templateUrl: './emissions.html',
  styleUrl: './emissions.css',
})
export class Emissions implements OnInit {

  protected readonly emissionsFacade = inject(EmissionsFacade)

  ngOnInit(): void {
    this.emissionsFacade.load()
  }

}
