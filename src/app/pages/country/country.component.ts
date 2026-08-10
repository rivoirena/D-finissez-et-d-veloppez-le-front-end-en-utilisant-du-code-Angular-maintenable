import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import Chart from 'chart.js/auto';
import { Metric, Olympic, Participation } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  private olympicUrl = './assets/mock/olympic.json';
  public lineChart!: Chart<"line", string[], number>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public years: number[] = [];
  public medals: number[] = [];
  public metrics: Metric[] = [
    { label: 'Number of entries', value: this.totalEntries },
    { label: 'Total Number of medals', value: this.totalMedals },
    { label: 'Total Number of athletes', value: this.totalAthletes }
  ];
  public error!: string;

  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService) {
  }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.olympicService.getOlympics().subscribe(
      (data: Olympic[]) => {
        if (data && data.length > 0) {
          const selectedCountry = this.olympicService.getCountry(data, countryName ?? '');
          if (!selectedCountry) {
            return;
          }
          this.titlePage = selectedCountry?.country ?? '';
          this.years = this.olympicService.getCountryYears(selectedCountry);
          this.medals = this.olympicService.getCountryMedals(selectedCountry);
          this.metrics = this.olympicService.getCountryMetrics(selectedCountry);

        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.message
      }
    );
  }
}
