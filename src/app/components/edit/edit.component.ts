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
  }

  ngOnInit() {
    this.locale = 'en';
    this.translationAPIService.getCurrentLanguage().subscribe(locale => {
      this.locale = locale;
      this.getLanguage();
    });
    this.translations = [];
    this.new = { locale: this.locale, key: '', translation: ''};
    this.getLanguage();
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
    this.translationAPIService.addTranslation(this.new).subscribe(res => {
      console.log(res);
      this.translations.push({ key: this.new.key, translation: this.new.translation});
      this.new = { locale: this.locale, key: '', translation: ''};
    });
  }

  deleteTranslation(translation: { key: string; translation: string }) {
    this.translationAPIService.deleteTranslation({ locale: this.locale, key: translation.key, translation: translation.translation })
      .subscribe(res => {
        this.translations = this.translations.filter(t => {
          return t.key !== translation.key;
        });
      }
    );
  }

}
