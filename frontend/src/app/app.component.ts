import { Component } from '@angular/core';
import { CalculatorComponent } from './components/calculator/calculator.component';


@Component({
  selector: 'app-root',
  imports: [CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
