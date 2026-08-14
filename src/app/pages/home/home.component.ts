import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  public error!:string
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private olympicService: OlympicService) { }

  ngOnInit() {
    this.olympicService.getOlympics().subscribe({
      next: (data: Olympic[]) => {
        if (data && data.length > 0) {
          this.metrics = this.olympicService.getHomeMetrics(data);
          this.countries = this.olympicService.getCountries(data);
          this.sumOfAllMedalsYears = this.olympicService.getTotalMedalsByCountry(data);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.message;
      }
    });
  }
}