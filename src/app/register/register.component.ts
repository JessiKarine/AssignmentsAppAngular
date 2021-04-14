import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../login/login.model';
import { LoggingService } from 'src/app/shared/logging.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username = null;
  password = null;
  error = null;
  prenom = null;
  confirmpass = null;
  succes = null;
  constructor(private authService : AuthService , private loggingService:LoggingService,
    private router:Router) {}

  ngOnInit(): void {
  }

  onSubmit(event) {
    if((!this.username) || (!this.password)) return;

   let user = new Utilisateur();
   user.username = this.username;
   user.password = this.password;
   this.error=null;
   if(this.username !== this.confirmpass) this.error = "erreur durant la confirmation du mot de passe"
   else{
    this.loggingService.register(user).subscribe(reponse => {
        if( reponse.auth=== true){
          this.authService.logIn(reponse.isAdmin);
          this.succes = "felicitations,vous êtes inscris"

        }
        else{
          this.error = reponse.error;
        }
    });
    }
  }

}
