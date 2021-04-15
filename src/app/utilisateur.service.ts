import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from './shared/logging.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

}
