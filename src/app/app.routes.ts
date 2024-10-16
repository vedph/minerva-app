import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';
import { WordsComponent } from './words/words.component';
import { SearchComponent } from './search/search.component';
import { StatsComponent } from './stats/stats.component';

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
  {
    path: 'stats',
    component: StatsComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
