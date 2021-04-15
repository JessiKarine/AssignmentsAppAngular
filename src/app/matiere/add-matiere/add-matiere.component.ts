import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServiceService } from 'src/app/matiere-service.service';
import { ProfService } from 'src/app/prof-service.service';
import { Prof } from 'src/app/Prof/Prof.model';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent implements OnInit {
  matiere:Matiere;
  nom;
  prof:Prof[] = [];
  image;
  idProf ;
  constructor( private matiereService: MatiereServiceService,
    private profService: ProfService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getProfs();
  }


  onSubmit(event) {
    if((!this.nom) || (!this.idProf)) return;

    let newMatiere = new Matiere();
    newMatiere.nom = this.nom;
    newMatiere.prof = new Prof();
    newMatiere.prof._id=this.idProf;
    newMatiere.image = this.image;

    this.matiereService.addMatiere(newMatiere)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/list-matiere"]);
      });
  }

  getProfs(){
    this.profService.getProfs()
    .subscribe(data => {
      console.log(data);
      this.prof = data.docs;
     
    });
  }

}
