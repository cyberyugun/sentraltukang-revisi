import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from './data.service';
import { ConnectionService } from 'ng-connection-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbaroffComponent } from './snackbaroff/snackbaroff.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchTerm = '';
  status = 'ONLINE';
  isConnected = true;

  constructor(private _snackBar: MatSnackBar,private router: Router, private data: DataService,private connectionService: ConnectionService) {
    this.data.getProfile();
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      }
      else {
        this._snackBar.openFromComponent(SnackbaroffComponent, {
          duration: 2000,
        });
      }
    })
  }

  get token() {
    return localStorage.getItem('token');
  }

 

  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }

  search() {}
}
