
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    DataType: 'application/json'
  })
};

@Injectable()
export class ConfigService {
  private config: Object;
  private env: Object;

  constructor(private http: HttpClient) {}
  public getImageUrl(): string {
    return environment.imageUrl;
  }
}
