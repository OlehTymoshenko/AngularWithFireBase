import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.services';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public authService : AuthService
  ) { }

  ngOnInit(): void {
  }

}
