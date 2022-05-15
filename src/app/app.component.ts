import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-time-picker-library';
  public form: any;

  constructor() {
    this.form = new FormGroup({
      time: new FormControl('12:40 AM'),
      time2: new FormControl('12:40 AM'),
      time3: new FormControl('12:40 AM'),
      time4: new FormControl('12:40 AM'),
    });
  }

  ngOnInit(): void {}

  onTimeChange($event: any) {
    console.log($event);
  }
}
