import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}
  private budgetData: any;

  getBudgetData(): Observable<any> {

    if (this.budgetData) {
      return (this.budgetData); // Return cached data as an Observable
    }
    this.budgetData = this.http.get('http://localhost:3000/budget');
    return this.http.get('http://localhost:3000/budget');
  }
}
