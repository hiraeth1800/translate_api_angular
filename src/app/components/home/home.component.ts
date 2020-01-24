import { Component, OnInit } from '@angular/core';
import {TranslationAPIService} from '../../services/translation-api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  getTranslation(key: string) {
    let translation = key.toUpperCase();
    this.translate.get(key).subscribe(res => {
      console.log(res);
      translation = res;
    })
    return translation;
  }

}
