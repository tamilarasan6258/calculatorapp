import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  number1 = 0;
  number2 = 0;
  operation = 'add';
  result: number | null = null;
  history: any[] = [];

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    this.calculatorService.calculate({
      number1: this.number1,
      number2: this.number2,
      operation: this.operation
    }).subscribe(res => {
      this.result = res.result;
      this.loadHistory();
    });
  }

  loadHistory() {
    this.calculatorService.getHistory().subscribe(data => {
      this.history = data;
    });
  }

  ngOnInit() {
    this.loadHistory();
  }
}
