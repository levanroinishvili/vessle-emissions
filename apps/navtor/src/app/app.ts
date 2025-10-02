import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainMenu } from './components/main-menu/main-menu';

@Component({
  imports: [
    RouterModule,
    MainMenu,
  ],
  selector: 'navtor-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
