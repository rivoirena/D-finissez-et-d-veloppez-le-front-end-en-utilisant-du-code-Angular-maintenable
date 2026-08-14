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
  public titlePage: string = '';
  public years: number[] = [];
  public medals: number[] = [];
  public metrics: Metric[] = [];
  public loading: boolean = true;
  public error: boolean = false;
  public errorMessage!: string;

  constructor(private route: ActivatedRoute, private router: Router, private olympicService: OlympicService) {
  }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.olympicService.getOlympics().subscribe({
      next: (data: Olympic[]) => {
        this.loading = false;
        
        if (!data || data.length === 0) {
          this.error = true;
          this.errorMessage = "Aucune donnée disponible pour le moment. Veuillez réessayer plus tard.";
          return;
        }

        const selectedCountry = this.olympicService.getCountry(data, countryName ?? '');
        if (!selectedCountry) {
          this.router.navigate(['not-found']);
          return;
        }

        this.titlePage = selectedCountry?.country ?? '';
        this.years = this.olympicService.getCountryYears(selectedCountry);
        this.medals = this.olympicService.getCountryMedals(selectedCountry);
        this.metrics = this.olympicService.getCountryMetrics(selectedCountry);
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.errorMessage = "Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.";
      }
    });
  }
}
