import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
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
import { EnvService } from '@myrmidon/ngx-tools';

@Component({
  selector: 'app-stats',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    '@pn-s': 'cognome',
    '@pn-m': 'antroponimo m.',
    '@rp': 'interpunzione dx',
    '@person': 'persona',
    '@tense': 'tempo',
    '@number': 'numero',
    '@len': 'lunghezza',
    '@clitic': 'clitica',
    '@i': 'corsivo',
    '@poss': 'possessivo',
    '@org-m': 'persona giuridica m.',
    '@foreign': 'forestierismo',
    '@n': 'cifre',
    '@deprel': 'dipendenza',
    '@pn-f': 'antroponimo f.',
    '@tn': 'toponimo',
    '@prontype': 'tipo di pronome',
    '@lp': 'interpunzione sx',
    '@definite': 'definito',
    '@numtype': 'numero',
    '@address': 'indirizzo',
    '@mood': 'modo',
    '@abbr': 'abbreviazione',
    '@degree': 'grado',
    '@verbform': 'forma verbale',
    '@b': 'grassetto',
  };

  // stats data
  public readonly data = signal<{ [key: string]: number } | undefined>(
    undefined,
  );

  // pie chart (derived from data)
  public readonly chartOptions = computed(() => {
    const data = this.data();
    if (!data) {
      return undefined;
    }
    const spanData = Object.entries(data)
      .filter(([key]) => key.startsWith('span.'))
      .map(([key, value]) => ({
        name: this._spanMap[key] || key,
        value,
      }));

    return {
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
  });

  // tags cloud (derived from data)
  public readonly cloudData = computed<CloudData[]>(() => {
    const data = this.data();
    if (!data) {
      return [];
    }
    return Object.entries(data)
      .filter(([key]) => key.startsWith('@'))
      .map(([key, value]) => ({
        text: this._attrMap[key] || key,
        weight: value,
      }));
  });

  public readonly zoomOnHoverOptions = signal<ZoomOnHoverOptions>({
    scale: 1.3,
    transitionTime: 1.2,
    delay: 0.1,
  });

  constructor(statsService: StatsService, envService: EnvService) {
    console.log(envService.get('apiUrl'));
    statsService.getStatistics().subscribe((data) => {
      this.data.set(data);
    });
  }
}
