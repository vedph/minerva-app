import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-manual',
    imports: [CommonModule, MatCardModule, MatIconModule],
    templateUrl: './manual.component.html',
    styleUrl: './manual.component.scss'
})
export class ManualComponent {}
