import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// myrmidon
import { EnvService } from '@myrmidon/ngx-tools';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly version = signal<string>('');

  constructor(env: EnvService) {
    this.version.set(env.get('version') || '');
  }
}
