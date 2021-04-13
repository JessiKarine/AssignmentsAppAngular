import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './login.model';
import { LoggingService } from 'src/app/shared/logging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = null;
  password = null;

  constructor(private loggingService:LoggingService,
    private router:Router) {}

  ngOnInit(): void {
  }

  onSubmit(event) {
    if((!this.username) || (!this.password)) return;

   let user = new Utilisateur();
   user.username = this.username;
   user.password = this.password;
   this.loggingService.login(user);
   this.router.navigate(["/home"]);
    /*this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });*/
     // console.log('atooo', this.username)
  }

}
