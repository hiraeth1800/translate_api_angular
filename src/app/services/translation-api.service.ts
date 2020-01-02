import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationAPIService {

  private localeObservable: Subject<string>;

  private languagesUrl = 'http://localhost:8080/api/languages';
  private translationsUrl = 'http://localhost:8080/api/translations';
  private keysUrl = 'http://localhost:8080/api/keys';

  constructor(private http: HttpClient) {
    this.localeObservable = new Subject();
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(this.languagesUrl);
  }

  getLanguage(locale: string): Observable<object> {
    return this.http.get<object>( this.languagesUrl + '/' + locale);
  }

  addLanguage(locale: string): Observable<object> {
    return this.http.post<object>(this.languagesUrl + '/add', locale);
  }

  deleteLanguage(locale: string): Observable<string> {
    return this.http.post<string>(this.languagesUrl + '/delete', locale);
  }

  addTranslation(translation: {locale: string, key: string, translation: string}) {
    return this.http.post(this.translationsUrl + '/add', translation);
  }

  deleteTranslation(translation: {locale: string, key: string}) {
    return this.http.post(this.translationsUrl + '/delete', translation);
  }

  updateTranslation(translation: {locale: string, key: string, translation: string}):
    Observable<{locale: string, key: string, translation: string}> {
    return this.http.put<{locale: string, key: string, translation: string}>(this.translationsUrl + '/update', translation);
  }

  getAllKeys(): Observable<string[]> {
    return this.http.get<string[]>(this.keysUrl);
  }

  getKeys(locale: string): Observable<string[]> {
    return this.http.get<string[]>(this.keysUrl + '/' + locale);
  }

  getMissingKeys(): Observable<object> {
    return this.http.get<object>(this.keysUrl + '/missing');
  }

  updateKeys(locale: string): Observable<string[]> {
      return this.http.post<string[]>(this.keysUrl + '/update/' + locale, {});
  }

  updateAllKeys() {
    return this.http.post<string[]>(this.keysUrl + '/update', {});
  }

  addKey(newKey: string): Observable<object> {
    return this.http.post(this.keysUrl + '/add', newKey);
  }

  deleteKey(key: string): Observable<object> {
    return this.http.post(this.keysUrl + '/delete/' + key, {});
  }

  updateLanguage(locale: string) {
    this.localeObservable.next(locale);
  }

  getCurrentLanguage(): Observable<string> {
    return this.localeObservable.asObservable();
  }
}
