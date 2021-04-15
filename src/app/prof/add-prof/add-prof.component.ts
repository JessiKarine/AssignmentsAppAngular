import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfService } from 'src/app/prof-service.service';
import { Prof } from '../prof.model';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css']
})
export class AddProfComponent implements OnInit {
  prof:Prof;
  nom;
  prenom;
  image;
  constructor( private profService: ProfService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if((!this.nom) || (!this.prenom)) return;

    let newProf = new Prof();
    newProf.nom = this.nom;
    newProf.prenom = this.prenom;
    newProf.image = this.image;

    this.profService.addProf(newProf)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/list-prof"]);
      });
  }

}
