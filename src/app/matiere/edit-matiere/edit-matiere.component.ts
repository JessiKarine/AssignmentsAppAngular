import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServiceService } from 'src/app/matiere-service.service';
import { ProfService } from 'src/app/prof-service.service';
import { Prof } from 'src/app/prof/prof.model';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css']
})
export class EditMatiereComponent implements OnInit {

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
    this.getMatiereById();
  }
  onSubmit(event) {
    // on va modifier l'assignment
    console.log("profff : "+ this.idProf);
    if((!this.nom) || (!this.idProf)) return;

    this.matiere.nom = this.nom;
    this.matiere.prof._id = this.idProf;
    this.matiere.image = this.image;

    this.matiereService.updateMatiere(this.matiere)
      .subscribe(message => {
        console.log("message "+message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/list-matiere"]);
      })

  }

  getMatiereById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id  = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details matiere, id = ' + id);
    this.matiereService.getMatiere(id).subscribe((matiere) => {
      this.nom = matiere.nom;
      this.getProfs();
      this.idProf = matiere.prof._id;
      this.image = matiere.image;
      this.matiere = matiere;
      console.log("matiere : "+this.matiere.nom)
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
