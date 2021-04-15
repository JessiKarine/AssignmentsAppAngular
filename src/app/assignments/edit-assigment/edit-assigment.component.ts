import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatiereServiceService } from 'src/app/matiere-service.service';
import { Matiere } from '../../matiere/matiere.model';
import { Prof } from '../../prof/prof.model';
import { ProfService } from 'src/app/prof-service.service';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;

  // pour le formulaire
  nom = '';
  dateDeRendu = null;
  rendu=false;
  eleve=null;
  note=-1;
  remarques='';
  matiere=null;
  prof=null;
  uneMatiere: Matiere[] = [];
  profs : Prof[] = [];

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private profService: ProfService,private matiereService: MatiereServiceService,
    private router:Router,private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
    /*this.getMatieres();
    this.getProfs();*/
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  getMatieres(){
    this.matiereService.getMatieres()
    .subscribe(data => {
      console.log(data);
      this.uneMatiere = data.docs;
     
    });
  }
  getProfs(){
    this.profService.getProfs()
    .subscribe(data => {
      console.log(data);
      this.profs = data.docs;
     
    });
  }
  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    /*const id: String = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });*/
    const id  = this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details matiere, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.getProfs();
      this.getMatieres();
      this.rendu = assignment.rendu;
      this.note = assignment.note;
      this.remarques = assignment.remarques;
      this.eleve = assignment.eleve;
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;

    //let nouvelAssignment = new Assignment();
    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.rendu = false;
    this.assignment.note = this.note;
    console.log("Note===="+this.note);
    this.assignment.matiere = this.matiere;
    this.assignment.matiere = new Matiere();
    this.assignment.matiere._id=this.matiere;
    this.assignment.prof = this.prof;
    this.assignment.remarques = this.remarques;
    console.log("remarques===="+this.remarques);
    this.assignment.eleve = this.eleve;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
