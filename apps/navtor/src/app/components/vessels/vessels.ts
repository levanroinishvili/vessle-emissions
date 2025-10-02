import { Component, inject, OnInit } from '@angular/core';
import { VesselsFacade } from '../../state/vessels/vessels.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'navtor-vessels',
  imports: [
    AsyncPipe,
    JsonPipe,
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
