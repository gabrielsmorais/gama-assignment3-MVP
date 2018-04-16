import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {

  resultado: string;

  constructor(public user: UserService) {
    this.resultado = user.resultado;
  }

  ngOnInit() {
  }
}
