import { Component, Input } from '@angular/core';
import { Metric } from 'src/app/core/models/olympic.model';
import { MetricsComponent } from '../metrics/metrics.component';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [MetricsComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() titlePage: string = '';
  @Input() metrics: Metric[] = [];
}
