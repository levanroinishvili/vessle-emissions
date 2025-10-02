import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmissionsFacade } from '../../state/emissions/emissions.facade';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'navtor-emissions',
  imports: [
    AsyncPipe,
    JsonPipe,
    ButtonModule,
    ProgressSpinnerModule,
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
