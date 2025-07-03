import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service';

// Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  number1 = 0;
  number2 = 0;
  operation = '';
  result: number | null = null;
  history: any[] = [];

  constructor(private calculatorService: CalculatorService) {}

  calculate() {
    if (!this.operation) {
      alert("Please select an operation.");
      return;
    }

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
