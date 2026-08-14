import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Metric, Olympic, Participation } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public countries: string[] = [];
  public sumOfAllMedalsYears: number[] = [];
  public metrics: Metric[] = [];
  public loading: boolean = true;
  public error: boolean = false;
  public errorMessage!: string;
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private olympicService: OlympicService) { }

  ngOnInit() {
    this.olympicService.getOlympics().subscribe({
      next: (data: Olympic[]) => {
        this.loading = false;

        if (!data || data.length === 0) {
          this.error = true;
          this.errorMessage = "Aucune donnée disponible pour le moment. Veuillez réessayer plus tard.";
          return;
        }
        
        this.metrics = this.olympicService.getHomeMetrics(data);
        this.countries = this.olympicService.getCountries(data);
        this.sumOfAllMedalsYears = this.olympicService.getTotalMedalsByCountry(data);
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.";
      }
    });
  }
}