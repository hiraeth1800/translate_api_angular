import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import {FormsModule} from '@angular/forms';
import { LanguagesComponent } from './components/languages/languages.component';
import { KeysComponent } from './components/keys/keys.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'http://localhost:8080/api/languages/', '');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    LanguagesComponent,
    KeysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
