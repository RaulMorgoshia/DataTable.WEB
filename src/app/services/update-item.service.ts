import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  no: string;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateItemService {

  private apiUrl = 'http://localhost:5178/api/Items'; // Your API URL

  constructor(private http: HttpClient) { }

  // Update an item
  updateItem(id: number, item: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    return this.http.put<any>(url, item, { headers });
  }
}
