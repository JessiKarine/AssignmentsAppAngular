import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ProfService } from 'src/app/prof-service.service';
import { AuthService } from '../../shared/auth.service';
import { Prof } from '.././prof.model';

@Component({
  selector: 'app-prof-detail',
  templateUrl: './prof-detail.component.html',
  styleUrls: ['./prof-detail.component.css']
})
export class ProfDetailComponent implements OnInit {

  prof : Prof;
  constructor(
    private router: Router,
    private authService:AuthService,
    private route: ActivatedRoute,
    private profService: ProfService
  ) {}

  ngOnInit(): void {
    this.getProfById();
  }


  onClickEdit() {
    this.router.navigate(['prof/', this.prof._id, 'edit'], {
    
    });
  }

  isAdmin() {
    return this.authService.admin;
  }

  onDelete() {
    console.log("ato am delete");
    this.profService
      .deleteProf(this.prof)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // on cache l'affichage du détail
        this.prof = null;
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/prof-list']);
      });
  }

  getProfById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id  = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.profService.getProf(id).subscribe((prof) => {
      this.prof = prof;
    });
  }

}
