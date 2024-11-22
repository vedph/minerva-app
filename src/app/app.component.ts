import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { EnvService } from '@myrmidon/ng-tools';
import { AppSettingsService } from '@myrmidon/pythia-core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatTooltipModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public version: string;
  public isSmall: boolean = false;

  constructor(
    settings: AppSettingsService,
    env: EnvService,
    private _breakpointObserver: BreakpointObserver
  ) {
    this.version = env.get('version') || '';
    // TODO customize settings here like in this sample:
    settings.termDistrDocNames = ['materia', 'giudicante', 'nascita-avv'];
  }

  public ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state) => {
        this.isSmall = state.matches;
      });
  }
}
