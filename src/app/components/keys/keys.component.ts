import {Component, OnInit} from '@angular/core';
import {TranslationAPIService} from '../../services/translation-api.service';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {

  allKeys = [];
  keysPerLocale = [];
  missingKeys = {};
  new: string;

  constructor(private translationService: TranslationAPIService) {
    this.new = '';
    translationService.getAllKeys().subscribe(res => {
      this.allKeys = res;
    });
    this.getAllKeysPerLanguage();
    this.getMissingKeys();
  }

  getAllKeysPerLanguage() {
    this.keysPerLocale = [];
    this.translationService.getLanguages().subscribe(languages => {
      languages.forEach(l => {
        this.translationService.getKeys(l).subscribe(res => {
          this.keysPerLocale.push({locale: l, keys: res});
        });
      });
    });
  }

  getMissingKeys() {
    this.translationService.getMissingKeys().subscribe(missing => {
      this.missingKeys = missing;
    });
  }

  ngOnInit() {
  }

  updateKeys(locale: string) {
    this.translationService.updateKeys(locale).subscribe(res => {
      this.getMissingKeys();
      this.translationService.getKeys(locale).subscribe(keys => {
        this.keysPerLocale[this.keysPerLocale.indexOf(this.keysPerLocale.filter(kpl => kpl.locale === locale)[0])].keys = keys;
      });
    });
  }

  updateAllKeys() {
    this.translationService.updateAllKeys().subscribe(res => {
      this.missingKeys = {};
      this.getAllKeysPerLanguage();
    });
  }

  addKey() {
    this.translationService.addKey(this.new).subscribe(res => {
      this.getMissingKeys();
      this.getAllKeysPerLanguage();
      this.allKeys.push(this.new);
      this.new = '';
    });
  }

  deleteKey(key) {
    this.translationService.deleteKey(key).subscribe(res => {
      this.translationService.getAllKeys().subscribe(keys => {
        this.allKeys = keys;
      });
      this.getAllKeysPerLanguage();
      this.getMissingKeys();
    });
  }
}
