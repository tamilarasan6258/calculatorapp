import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calculation } from '../models/calculation.model';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = environment.api_baseurl;

  constructor(private http: HttpClient) {}

  calculate(data: { expression: string }): Observable<{ result: number }> {
    return this.http.post<{ result: number }>(`${this.apiUrl}/calculate`, data);
  }

  getHistory(): Observable<Calculation[]> {
    return this.http.get<Calculation[]>(`${this.apiUrl}/history`);
  }
}
