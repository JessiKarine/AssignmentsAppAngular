import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfService } from 'src/app/prof-service.service';
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
  constructor( private profService: ProfService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.prenom)) return;

    this.prof.nom = this.nom;
    this.prof.prenom = this.prenom;

    this.profService.updateProf(this.prof)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/prof-list"]);
      })

  }
}
