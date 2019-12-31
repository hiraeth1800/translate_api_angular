import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {EditComponent} from './components/edit/edit.component';
import {LanguagesComponent} from './components/languages/languages.component';
import {KeysComponent} from './components/keys/keys.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', component: EditComponent},
  { path: 'languages', component: LanguagesComponent},
  { path: 'keys', component: KeysComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
