import { Component, OnInit } from '@angular/core';
import {TranslationAPIService} from '../../services/translation-api.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languages: string[];
  new: string;

  constructor(private translationService: TranslationAPIService) { }

  ngOnInit() {
    this.new = '';
    this.translationService.getLanguages().subscribe(languages => {
      this.languages = languages;
    });
  }

  addLanguage() {
    this.translationService.addLanguage(this.new).subscribe(res => {
      this.languages.push(this.new);
      // this.translationService.setLanguagesUpdated(true);
      this.new = '';
    });
  }

  deleteLanguage(locale: string) {
    this.translationService.deleteLanguage(locale).subscribe(res => {
      this.languages = this.languages.filter(l => {
        return l !== locale;
      });
    });
  }
}
