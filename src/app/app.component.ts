import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslationAPIService} from './services/translation-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendTranslatedWithAPI';

  locales = ['en', 'nl', 'fr'];

  constructor(private translate: TranslateService, private translationAPIService: TranslationAPIService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    translationAPIService.updateLanguage('en');
  }

  selectLanguage(locale: string) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(locale);
    this.translationAPIService.updateLanguage(locale);
    this.translate.getTranslation('en').subscribe(res => {
      console.log(Object.keys(res));
    });
  }
}
