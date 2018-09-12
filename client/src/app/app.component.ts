import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Image } from '../models/image.model';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private api: ApiService) { }
  searchControl = new FormControl;

  errorLog = '';

  images: Image[] = [];

  search() {
    this.api.search(this.searchControl.value).then((result: Image[]) => {
      this.images = result;
    }).catch(err => {
      this.errorLog = err.error;
    });
  }
  update() {
    this.api.updateImages().then(() => {
      this.search();
    }).catch(err => {
      this.errorLog = err.error;
    });
  }
}
