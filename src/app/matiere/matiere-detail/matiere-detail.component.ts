import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServiceService } from 'src/app/matiere-service.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Matiere } from '../matiere.model';

@Component({
  selector: 'app-matiere-detail',
  templateUrl: './matiere-detail.component.html',
  styleUrls: ['./matiere-detail.component.css']
})
export class MatiereDetailComponent implements OnInit {

  matiere : Matiere;
  constructor(
    private router: Router,
    private authService:AuthService,
    private route: ActivatedRoute,
    private matiereService: MatiereServiceService
  ) {}

  ngOnInit(): void {
    this.getMatiereById();
  }


  onClickEdit() {
    this.router.navigate(['matiere/', this.matiere._id, 'edit'], {
    
    });
  }

  isAdmin() {
    return this.authService.admin;
  }

  onDelete() {
    console.log("ato am delete");
    this.matiereService
      .deleteMatiere(this.matiere)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // on cache l'affichage du détail
        this.matiere = null;
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/list-matiere']);
      });
  }

  getMatiereById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id  = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.matiereService.getMatiere(id).subscribe((matiere) => {
      this.matiere = matiere;
    });
  }

}
