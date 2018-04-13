import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../core/user.model';
import { FormsModule } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'page-user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.scss']
})


export class UserComponent implements OnInit {

    user: FirebaseUserModel = new FirebaseUserModel();

    constructor(

        public userService: UserService,
        public authService: AuthService,
        private route: ActivatedRoute,
        private location: Location,
    ) {

    }

    ngOnInit(): void {
        this.route.data.subscribe(routeData => {
            let data = routeData['data'];
            if (data) {
                this.user = data;
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

    sumValue() {

        // this.questions.forEach(question => {
        //     question.alternatives = question.alternatives.filter(a => a.value != 0);
        // });

    }
}
