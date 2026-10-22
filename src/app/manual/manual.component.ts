import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manual',
  imports: [NgOptimizedImage, MatCardModule, MatIconModule],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualComponent {}
