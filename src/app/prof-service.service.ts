import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Prof } from './prof/prof.model';
import { LoggingService } from './shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class ProfService {
  Prof:Prof[];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  uri = "http://localhost:8010/api/prof";
  //uri = "https://backmadagascar2021.herokuapp.com/api/Prof"

  getProfs():Observable<any> {
    console.log("Dans le service de gestion des prof...")
    //return of(this.Prof);
    return this.http.get<Prof[]>(this.uri);
  }

  getProfPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Prof[]>(this.uri+"?page="+page + "&limit="+limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getProfAsPromise():Promise<Prof[]> {
    console.log("Dans le service de gestion des Prof...")
    //return of(this.Prof);
    return this.http.get<Prof[]>(this.uri).toPromise();
  }

  getProf(id:string):Observable<Prof> {
    //let assignementCherche = this.Prof.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Prof>(this.uri + "/" + id)
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
      catchError(this.handleError<any>('### catchError: getProf by id avec id=' + id))
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

  addProf(Prof:Prof):Observable<any> {
   // Prof._id = this.generateId()+"";
    //this.loggingService.log(Prof.nom, " a été ajouté");

    /*this.Prof.push(Prof);


    return of("Service: Prof ajouté !");*/

    return this.http.post(this.uri, Prof);
  }

  updateProf(Prof:Prof):Observable<any> {
    // besoin de ne rien faire puisque l'Prof passé en paramètre
    // est déjà un élément du tableau

    //let index = this.Prof.indexOf(Prof);

    //console.log("updateProf l'Prof passé en param est à la position " + index + " du tableau");
    this.loggingService.log(Prof.nom, " a été modifié");

    return this.http.put(this.uri, Prof);
  }

  deleteProf(Prof:Prof):Observable<any> {
    /*
    let index = this.Prof.indexOf(Prof);

    this.Prof.splice(index, 1);
    */


    this.loggingService.log(Prof.nom, " a été supprimé");

    return this.http.delete(this.uri + "/" + Prof._id);

  }

  /*peuplerBD() {
    ProfGeneres.forEach(a => {
      let nouvelProf = new Prof();
      nouvelProf.nom = a.nom;
      nouvelProf.id = a.id;
      nouvelProf.dateDeRendu = new Date(a.dateDeRendu);
      nouvelProf.rendu = a.rendu;

      this.addProf(nouvelProf)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }
*/
  // autre version qui permet de récupérer un subscribe une fois que tous les inserts
  // ont été effectués
 /* peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddProf = [];

    ProfGeneres.forEach((a) => {
      const nouvelProf = new Prof();

      nouvelProf.id = a.id;
      nouvelProf.nom = a.nom;
      nouvelProf.dateDeRendu = new Date(a.dateDeRendu);
      nouvelProf.rendu = a.rendu;

      appelsVersAddProf.push(this.addProf(nouvelProf));
    });
    return forkJoin(appelsVersAddProf); // renvoie un seul Observable pour dire que c'est fini
  }*/
}
