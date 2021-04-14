import { Matiere } from "./matiere.model";
import { Prof } from "./prof.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  eleve:string;
  note:number;
  remarques:string;
  matiere:Matiere;
  prof:Prof;
}
