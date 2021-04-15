import { Matiere } from "../matiere/matiere.model";
import { Prof } from "../Prof/Prof.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  eleve:{ 
    nom  : String;
  };
  note:number;
  remarques:string;
  matiere:Matiere;
  prof:Prof;
}
