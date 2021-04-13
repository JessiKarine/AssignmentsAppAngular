import { Injectable } from '@angular/core';
import { Utilisateur } from '../login/login.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  uri = "https://backmbdsmevajessi.herokuapp.com/api/login";
  constructor(private http:HttpClient) { }

  log(assignmentName:string, action:string) {
    console.log("L'assignment " + assignmentName + " " + action);
  }

  login(user:Utilisateur):Observable<any> {
 
    //this.loggingService.log(assignment.nom, " a été ajouté");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajouté !");*/
    console.log("ato amin'ny observable")
    return this.http.post(this.uri, user);
  }

}
