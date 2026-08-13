import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  public pieChart!: Chart<"pie", number[], string>;
  @Input() countries: string[] = [];
  @Input() sumOfAllMedalsYears: number[] = [];

  constructor(private router: Router) {}
  
  ngOnChanges() {
    if (this.countries.length > 0) {
      this.buildPieChart(this.countries, this.sumOfAllMedalsYears);
    }
  }

  buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: '🏅',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#783C50', '#915F64', '#B4C8E6', '#BEDCF0', '#967DA0', '#87A0D7'],
          hoverOffset: 4
        }],
      },
      options: {
        plugins: {
          tooltip: {
            backgroundColor: '#0b868f',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            xAlign: 'center',
            yAlign: 'bottom',
            borderWidth: 1,
            displayColors: false,
            caretSize: 8,
            caretPadding: 4,
            cornerRadius: 8,

            callbacks: {
              title: (items) => {
                return items[0].label;
              },

              label: (context) => {
                return `🏅 ${context.raw}`;
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}
