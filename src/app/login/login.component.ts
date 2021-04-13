import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './login.model';
import { LoggingService } from 'src/app/shared/logging.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = null;
  password = null;
  error = null;

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
   this.loggingService.login(user).subscribe(reponse => {
      if( reponse.auth=== true){
      this.authService.logIn(reponse.isAdmin);
      this.router.navigate(["/home"]);

      }
      else{
        this.error = reponse.error;
      }
  });
  }

}
