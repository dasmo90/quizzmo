import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quizzmo';
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log(this.title);
    this.fetchData();
  }

  private fetchData(): void {
    this.apiService.fetch().subscribe(
      (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
