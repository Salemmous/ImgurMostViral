import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchControl = new FormControl;

  images: Image[] = [];


  search() {
    console.log(this.searchControl.value);
  }
}
