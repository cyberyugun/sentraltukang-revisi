import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbaroff',
  templateUrl: './snackbaroff.component.html',
  styleUrls: ['./snackbaroff.component.css']
})
export class SnackbaroffComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
reload(){
  location.reload();
}
}
