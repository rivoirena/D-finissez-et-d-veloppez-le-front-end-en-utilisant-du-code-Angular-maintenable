import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Metric } from 'src/app/core/models/olympic.model';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss'
})
export class MetricsComponent {
  @Input() metrics!: Metric[];
}
