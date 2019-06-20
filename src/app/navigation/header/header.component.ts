import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private router: Router, private data: DataService) {
    this.data.getProfile();
  }
  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  get token() {
    return localStorage.getItem('token');
  }

 
  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }

}
