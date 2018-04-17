import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../../core/user.model';
import { FormsModule } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router  
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      console.log(routeData);
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    })
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}
