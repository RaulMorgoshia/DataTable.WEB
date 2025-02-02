

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateItemService {
  private apiUrl = 'http://localhost:5178/api/Items';

  constructor(private http: HttpClient) { }

  /**
   * Create a new item.
   * @param item The item object to be created.
   * @returns Observable of the created item.
   */
  createItem(item: { id: number; no: string; name: string; description: string; price: number }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<any>(this.apiUrl, item, { headers });
  }
}
