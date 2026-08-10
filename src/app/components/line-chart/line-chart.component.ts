import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  public lineChart!: Chart<"line", number[], number>;
  @Input() years: number[] = [];
  @Input() medals: number[] = [];

  constructor(private router: Router) {}
  
  ngOnChanges() {
    if (this.medals.length > 0) {
          this.buildChart(this.years, this.medals);
    }
  }

  buildChart(years: number[], medals: number[]) {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }

}
