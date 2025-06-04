
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { EnvService } from '@myrmidon/ngx-tools';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public version: string;
  public isSmall: boolean = false;

  constructor(
    env: EnvService,
    private _breakpointObserver: BreakpointObserver
  ) {
    this.version = env.get('version') || '';
  }

  public ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((state) => {
        this.isSmall = state.matches;
      });
  }
}
