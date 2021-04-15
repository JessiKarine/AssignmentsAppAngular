import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Matiere } from './matiere/matiere.model';
import { LoggingService } from './shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class MatiereServiceService {
  Matiere:Matiere[];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  uri = "http://localhost:8010/api/matiere";
  //uri = "https://backmadagascar2021.herokuapp.com/api/Matiere"

  getMatieres():Observable<any> {
    console.log("Dans le service de gestion des Matiere...")
    //return of(this.Matiere);
    return this.http.get<Matiere[]>(this.uri);
  }

  getMatierePagine(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(this.uri+"?page="+page + "&limit="+limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getMatiereAsPromise():Promise<Matiere[]> {
    console.log("Dans le service de gestion des Matiere...")
    //return of(this.Matiere);
    return this.http.get<Matiere[]>(this.uri).toPromise();
  }

  getMatiere(id:number):Observable<Matiere> {
    //let assignementCherche = this.Matiere.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Matiere>(this.uri + "/" + id)
    .pipe(
      // traitement 1
      map(a => {
        return a;
      }),
      tap(a => {
        console.log("TRACE DANS TAP : j'ai reçu " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getMatiere by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  generateId():number {
    return Math.round(Math.random()*100000);
  }

  addMatiere(Matiere:Matiere):Observable<any> {
   // Matiere._id = this.generateId()+"";
    //this.loggingService.log(Matiere.nom, " a été ajouté");

    /*this.Matiere.push(Matiere);


    return of("Service: Matiere ajouté !");*/

    return this.http.post(this.uri, Matiere);
  }

  updateMatiere(Matiere:Matiere):Observable<any> {
    // besoin de ne rien faire puisque l'Matiere passé en paramètre
    // est déjà un élément du tableau

    //let index = this.Matiere.indexOf(Matiere);

    //console.log("updateMatiere l'Matiere passé en param est à la position " + index + " du tableau");
    this.loggingService.log(Matiere.nom, " a été modifié");

    return this.http.put(this.uri, Matiere);
  }

  deleteMatiere(Matiere:Matiere):Observable<any> {
    /*
    let index = this.Matiere.indexOf(Matiere);

    this.Matiere.splice(index, 1);
    */


    this.loggingService.log(Matiere.nom, " a été supprimé");

    return this.http.delete(this.uri + "/" + Matiere._id);

  }

}
