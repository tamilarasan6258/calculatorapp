import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorService } from '../../services/calculator.service';
import { Calculation } from '../../models/calculation.model';

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
  expression = '';
  result: number | null = null;
  // history: any[] = [];
  history: Calculation[] = [];

  buttons = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+','(',')'];

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.loadHistory();
    // Listen for keyboard events
    window.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  ngOnDestroy() {
    // Clean up event listener
    window.removeEventListener('keydown', this.handleKeyPress.bind(this));
  }

  append(value: string) {
    this.expression += value;
  }

  clear() {
    this.expression = '';
  }

  calculate() {
    if (!this.expression) {
      alert("Please enter an expression.");
      return;
    }

    this.calculatorService.calculate({ expression: this.expression })
      .subscribe(res => {
        this.result = res.result;
        this.loadHistory();
      });
  }

  loadHistory() {
    this.calculatorService.getHistory()
      .subscribe(data => {
        this.history = data;
      });
  }

  handleKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.','(',')'];

    if (allowedKeys.includes(event.key)) {
      this.append(event.key);
    } else if (event.key === 'Enter') {
      this.calculate();
    } else if (event.key === 'Backspace') {
      this.expression = this.expression.slice(0, -1);
    } else if (event.key === 'Escape') {
      this.clear();
    }
  }
}

