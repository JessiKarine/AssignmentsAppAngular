import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereServiceService } from '../matiere-service.service';
import { Matiere } from './matiere.model';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  lsmatiere : Matiere[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  constructor(
    private matiereService:MatiereServiceService,
              private route:ActivatedRoute,
              private router:Router
  ) {}

  ngOnInit(): void {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams prof liste")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getMatieres();
    });
      console.log("getProfs() du service appelé");
  }


  getMatieres() {
    this.matiereService.getMatierePagine(this.page, this.limit)
    .subscribe(data => {
      console.log(data);
      
      this.lsmatiere = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues : "+this.lsmatiere);
    });
  }

  premierePage() {
    this.router.navigate(['/list-matiere'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    /*
    this.page = this.nextPage;
    this.getAssignments();*/
    this.router.navigate(['/list-matiere'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/list-matiere'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/list-matiere'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

}
