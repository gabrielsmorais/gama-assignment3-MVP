import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  resultado: string;

  constructor(
    public user: UserService,
    private location : Location,
    public authService: AuthService,
  ) {
    this.resultado = user.resultado;
  }

  ngOnInit() {
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
