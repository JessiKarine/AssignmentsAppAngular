import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})

export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;
  rendu=false;
  eleve=null;
  note=-1;
  remarques='';
  matiere=null;
  prof=null;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;


  constructor(private assignmentsService:AssignmentsService,
              private router:Router,private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.note = this.note;
    nouvelAssignment.matiere = this.matiere;
    nouvelAssignment.prof = this.prof;
    nouvelAssignment.remarques = this.remarques;
    nouvelAssignment.eleve = this.eleve;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log("Vita onSubmit");

         // et on navigue vers la page d'accueil qui affiche la liste
         //this.router.navigate(["/home"]);
      });
  }
  

}
