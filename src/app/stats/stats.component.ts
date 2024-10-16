import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { NgxEchartsModule } from 'ngx-echarts';

import { StatsService } from '@myrmidon/pythia-api';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, NgxEchartsModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  private readonly _spanMap: { [key: string]: string } = {
    'span.fp-lat': $localize`latin phrase`,
    'span.p': $localize`paragraph`,
    'span.snt': $localize`sentence`,
    'span.tok': $localize`token`,
  };

  public data?: any;

  constructor(statsService: StatsService) {
    statsService.getStatistics().subscribe((data) => {
      this.data = data;
      this.drawSpanChart();
    });
  }

  public chartOptions: any;

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
          name: 'Span Data',
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
}
