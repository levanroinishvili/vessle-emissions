import { Component, inject, OnInit } from '@angular/core';
import { VesselsFacade } from '../../state/vessels/vessels.facade';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'navtor-vessels',
  imports: [
    AsyncPipe,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './vessels.html',
  styleUrl: './vessels.css',
})
export class Vessels implements OnInit {

  protected readonly vesselsFacade = inject(VesselsFacade)

  ngOnInit(): void {
    this.vesselsFacade.load()
  }

}
