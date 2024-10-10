import { Routes } from '@angular/router';

import { SearchComponent } from '@myrmidon/pythia-search';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';
import { WordsComponent } from './words/words.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'search/:term',
    component: SearchComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'index',
    component: WordsComponent,
  },
  {
    path: 'manual',
    component: ManualComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
