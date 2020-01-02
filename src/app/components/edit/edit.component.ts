import { Component, OnInit } from '@angular/core';
import {TranslationAPIService} from '../../services/translation-api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  locale: string;
  translations: { key: string; translation: string }[];
  new: { locale: string, key: string; translation: string };

  constructor(private translationAPIService: TranslationAPIService) {
    this.locale = 'en';
    this.translations = [];
    this.new = { locale: this.locale, key: '', translation: ''};
    this.translationAPIService.getCurrentLanguage().subscribe(locale => {
      console.log('updated locale: ' + locale);
      this.locale = locale;
      this.getLanguage();
    });
    this.getLanguage();
  }

  ngOnInit() {

  }

  getLanguage() {
    this.translationAPIService.getLanguage(this.locale).subscribe(translatedObject => {
      this.translations = [];
      for (const prop in translatedObject) {
        if (Object.prototype.hasOwnProperty.call(translatedObject, prop)) {
          this.translations.push({key: prop.toString(), translation: translatedObject[prop]});
        }
      }
      this.translations = this.translations.sort((a, b) => {
        return (a.key < b.key) ? -1 : 1;
      });
    });
  }

  addTranslation() {
    this.new.locale = this.locale;
    this.translationAPIService.addTranslation(this.new).subscribe(res => {
      this.translations.push({ key: this.new.key.toUpperCase(), translation: this.new.translation});
      this.new = { locale: this.locale, key: '', translation: ''};
    });
  }

  deleteTranslation(translation: { key: string; translation: string }) {
    this.translationAPIService.deleteTranslation({ locale: this.locale, key: translation.key })
      .subscribe(res => {
        this.translations = this.translations.filter(t => {
          return t.key !== translation.key;
        });
      }
    );
  }

  updateTranslation(key: string, event) {
    this.translationAPIService.updateTranslation({locale: this.locale, key, translation: event.target.value})
      .subscribe(updatedTranslation => {
        // this.translations = this.translations.filter(t => t.key !== updatedTranslation.key);
        // this.translations.push({key: updatedTranslation.key, translation: updatedTranslation.translation});
    });
  }

}
