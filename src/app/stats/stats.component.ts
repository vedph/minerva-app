import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { NgxEchartsModule } from 'ngx-echarts';
import {
  CloudData,
  TagCloudComponent,
  ZoomOnHoverOptions,
} from 'angular-tag-cloud-module';

import { StatsService } from '@myrmidon/pythia-api';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    NgxEchartsModule,
    TagCloudComponent,
  ],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  private readonly _spanMap: { [key: string]: string } = {
    'span.fp-lat': $localize`latin phrases`,
    'span.p': $localize`paragraphs`,
    'span.snt': $localize`sentences`,
    'span.tok': $localize`tokens`,
  };
  private readonly _attrMap: { [key: string]: string } = {
    '@giudicante': 'organo giudicante',
    '@gruppo-nr': 'gruppo',
    '@atto': 'atto',
    '@sesso-avv': 'sesso',
    '@gruppo-atto': 'gruppo atto',
    '@path': 'path',
    '@nascita-avv': 'anno nascita',
    '@materia': 'materia',
    '@sede-giudicante': 'sede giudicante',
    '@grado': 'grado',
    '@sede-raccolta': 'sede di raccolta',
    '@data': 'data',
    '@org-f': 'persona giuridica f.',
    '@gender': 'genere',
    '@email': 'email',
    '@pn-s': 'antroponimo ?',
    '@pn-m': 'antroponimo m.',
    '@rp': 'interpunzione',
    '@person': 'persona',
    '@tense': 'tempo',
    '@number': 'numero',
    '@len': 'lunghezza',
    '@clitic': 'clitica',
    '@i': 'corsivo',
    '@poss': 'possessivo',
    '@org-m': 'persona giuridica m.',
    '@foreign': 'forestierismo',
    '@n': 'n?',
    '@deprel': 'dipendenza',
    '@pn-f': 'antroponimo f.',
    '@tn': 'tn?',
    '@prontype': 'tipo di pronome',
    '@lp': 'lp?',
    '@definite': 'definite?',
    '@numtype': 'numero',
    '@address': 'indirizzo',
    '@mood': 'modo',
    '@abbr': 'abbreviazione',
    '@degree': 'grado',
    '@verbform': 'forma verbale',
    '@b': 'grassetto',
  };

  // stats data
  public data?: { [key: string]: number };

  // pie chart
  public chartOptions: any;
  // tags cloud
  public cloudData: CloudData[] = [];
  public zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3,
    transitionTime: 1.2,
    delay: 0.1,
  };

  constructor(statsService: StatsService) {
    statsService.getStatistics().subscribe((data) => {
      this.data = data;
      this.drawSpanChart();
      this.drawTagsCloud();
    });
  }

  private drawSpanChart(): void {
    if (!this.data) {
      return;
    }
    const spanData = Object.entries(this.data)
      .filter(([key, value]) => key.startsWith('span.'))
      .map(([key, value]) => ({
        name: this._spanMap[key] || key,
        value,
      }));

    this.chartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: spanData.map((item) => item.name),
      },
      series: [
        {
          name: $localize`Spans`,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: spanData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  private drawTagsCloud(): void {
    if (!this.data) {
      return;
    }
    this.cloudData = Object.entries(this.data)
      .filter(([key, value]) => key.startsWith('@'))
      .map(([key, value]) => ({
        text: this._attrMap[key] || key,
        weight: value,
      }));
  }
}
