import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metric, Olympic, Participation, Country } from 'src/app/core/models/olympic.model';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) { }

  getOlympics(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }

  getTotalCountries(data: Olympic[]): number {
    return data.length;
  }

  getTotalJos(data: Olympic[]): number {
    return Array.from(
      new Set(
        data
          .map((olympic: Olympic) =>
            olympic.participations.map((participation: Participation) => participation.year)
          )
          .flat()
      )
    ).length;
  }

  getHomeMetrics(data: Olympic[]): Metric[] {
    return [
      { label: 'Total Countries', value: this.getTotalCountries(data) },
      { label: 'Total Olympic Games', value: this.getTotalJos(data) }
    ];
  }

  getCountryMetrics(selectedCountry: Olympic): Metric[] {
    const totalEntries = selectedCountry.participations.length;
    const totalMedals = selectedCountry.participations.reduce(
      (accumulator: number, participation: Participation) => accumulator + participation.medalsCount,
      0
    );
    const totalAthletes = selectedCountry.participations.reduce(
      (accumulator: number, participation: Participation) => accumulator + participation.athleteCount,
      0
    );
    return [
      { label: 'Total Entries', value: totalEntries },
      { label: 'Total Medals', value: totalMedals },
      { label: 'Total Athletes', value: totalAthletes }
    ];
  }

  getCountry(data: Olympic[], countryID: number): Olympic | undefined {
    return data.find((olympic: Olympic) => olympic.id === countryID);
  }

  getTotalMedalsByCountry(data: Olympic[]): number[] {
    return data.map(
      (olympic: Olympic) =>
        olympic.participations.reduce(
          (acc: number, participation: Participation) =>
            acc + participation.medalsCount,
          0
        )
    );
  }

  getCountryYears(country: Olympic): number[] {
    return country.participations.map(
      (participation: Participation) => participation.year
    );
  }

  getCountryMedals(country: Olympic): number[] {
    return country.participations.map(
      (participation: Participation) => participation.medalsCount
    );
  }

  getCountries(data: Olympic[]): Country[] {
    return data.map(olympic => ({
      id: olympic.id,
      label: olympic.country
    }));
  }
}
