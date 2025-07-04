import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // calculate(data: { number1: number, number2: number, operation: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/calculate`, data);
  // }

  calculate(data: { expression: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/calculate`, data);
}


  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`);
  }
}
