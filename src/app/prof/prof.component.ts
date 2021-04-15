import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { ProfService } from '../prof-service.service';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Prof } from './prof.model';

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
  lsprof : Prof[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  constructor(
    private ProfService:ProfService,
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

      this.getProfs();
    });
      console.log("getProfs() du service appelé");
  }


  getProfs() {
    this.ProfService.getProfPagine(this.page, this.limit)
    .subscribe(data => {
      console.log(data);
      
      this.lsprof = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues : "+this.lsprof);
    });
  }




}
