import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  updateImages() {
    return this.http.post(config.apiUri + 'update', {}).toPromise().catch(err => {
      console.error(err);
    });
  }
  search(term: string) {
    return this.http.get(config.apiUri + 'search/' + term, {}).toPromise().catch(err => {
      console.error(err);
    });
  }
}
