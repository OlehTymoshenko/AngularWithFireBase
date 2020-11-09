import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.services';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  constructor(
    public authService : AuthService
  ) { }

  ngOnInit(): void {

  }

}
