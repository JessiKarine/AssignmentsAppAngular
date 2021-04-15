import { Component, OnInit } from '@angular/core';
import { Prof } from '../Prof.model';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.css']
})
export class EditProfComponent implements OnInit {
  prof:Prof;
  nom;
  prenom;
  image;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.prenom)) return;

    this.prof.nom = this.nom;
    this.prof.prenom = this.prenom;

   /* this.profService.updateAssignment(this.prof)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })*/

  }
}
