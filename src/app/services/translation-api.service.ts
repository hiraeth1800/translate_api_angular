import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationAPIService {

  private localeObservable: Subject<string>;

  constructor(private http: HttpClient) {
    this.localeObservable = new Subject();
  }

  getLanguage(locale: string): Observable<object> {
    return this.http.get<object>('http://localhost:8080/api/language/' + locale);
  }

  addTranslation(translation: {locale: string, key: string, translation: string}) {
    return this.http.post('http://localhost:8080/api/language/translation/add', translation);
  }

  deleteTranslation(translation: {locale: string, key: string, translation: string}) {
    return this.http.post('http://localhost:8080/api/language/translation/delete', translation);
  }

  updateLanguage(locale: string) {
    this.localeObservable.next(locale);
  }

  getCurrentLanguage(): Observable<string> {
    return this.localeObservable.asObservable();
  }
}
