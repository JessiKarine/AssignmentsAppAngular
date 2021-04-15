import { Injectable } from '@angular/core';
import { Utilisateur } from '../login/login.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  uri = Config.getBaseUrl()+"/api/";
  constructor(private http:HttpClient) { }

  log(assignmentName:string, action:string) {
    console.log("L'assignment " + assignmentName + " " + action);
  }

  login(user:Utilisateur):Observable<any> {
    console.log("ato amin'ny login")
    return this.http.post(this.uri+"login", user);
  }

  register(user:Utilisateur):Observable<any> {
 
    console.log("ato amin'ny register")
    
    return this.http.post(this.uri+"register", user);
  }

}
