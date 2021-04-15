import { Matiere } from "../matiere/matiere.model";
import { Prof } from "../prof/prof.model";
import { Eleve } from "./eleve.model";

export class Assignment {
  _id?:string;
  id:number;
  nom:string;
  dateDeRendu:Date;
  rendu:boolean;
  eleve:Eleve;
  note:number;
  remarques:string;
  matiere:Matiere;
  prof:Prof;
}
