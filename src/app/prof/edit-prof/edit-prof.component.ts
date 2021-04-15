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
    this.getProfById();
  }
  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.prenom)) return;

    this.prof.nom = this.nom;
    this.prof.prenom = this.prenom;
    this.prof.image = this.image;

    this.profService.updateProf(this.prof)
      .subscribe(message => {
        console.log("message "+message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/list-prof"]);
      })

  }

  getProfById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id  = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.profService.getProf(id).subscribe((prof) => {
      this.nom = prof.nom;
      this.prenom = prof.prenom;
      this.image = prof.image;
      this.prof = prof;
      console.log("prof : "+this.prof.nom)
    });
  }
}
