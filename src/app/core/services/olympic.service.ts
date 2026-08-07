import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Olympic, Participation } from 'src/app/core/models/olympic.model';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }
}
