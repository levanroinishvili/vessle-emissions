import { Component, inject, OnInit } from '@angular/core';
import { VesselsFacade } from '../../state/vessels/vessels.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'navtor-vessels',
  imports: [
    AsyncPipe,
    JsonPipe,
    ButtonModule,
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
