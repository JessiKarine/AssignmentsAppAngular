import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { CdkDragDrop ,   moveItemInArray ,   transferArrayItem} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments:Assignment[];
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  renduList : Assignment[] = [];
  nonRenduList : Assignment[] = [];
  openPopupNote : boolean = false ; 
  errorMessage : String ="aaaaaaaaaaa";
  error : boolean =false ;
  // on injecte le service de gestion des assignments
  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    console.log('AVANT AFFICHAGE');
    // on regarde s'il y a page= et limit = dans l'URL
    this.route.queryParams.subscribe(queryParams => {
      console.log("Dans le subscribe des queryParams")
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;

      this.getAssignments();
    });
      console.log("getAssignments() du service appelé");
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
      console.log(data.docs);
      this.parseDataToRenduAndNone(data.docs);
    });
  }
  parseDataToRenduAndNone = ( list : Assignment[]) =>{ 
    list.map(item => { 
      if(item.rendu){
        this.renduList.push(item);
      }
      else { 
        this.nonRenduList.push(item);
      }
    });
  }
  onDropNonRendu(event : CdkDragDrop<string[]> ) { 
    if(event.previousContainer == event.container){
       moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    }
    else { 
        transferArrayItem(event.previousContainer.data , event.container.data , event.previousIndex , event.currentIndex);
        let val = event.container.data[event.currentIndex] as  Object;
        let valtenaizy = val as Assignment;
        valtenaizy.rendu=false ; 
        this.assignmentsService.updateAssignment(valtenaizy)
        .subscribe(message => { 

        });
    }
  }
  onDropRendu(event : CdkDragDrop<string[]> ) { 
    
    if(event.previousContainer == event.container){
        moveItemInArray(event.container.data,event.previousIndex,event.currentIndex);
    }
    else {
       let ancienneValeur = (event.previousContainer.data[event.previousIndex] as Object) as Assignment;
       if(!ancienneValeur.note || ancienneValeur.note < 0 ) { 
          this.error=true ;
          this.errorMessage = "Cette assignments n'a pas encore de note";
          return ;
       }
       else { 
        transferArrayItem(event.previousContainer.data , event.container.data , event.previousIndex , event.currentIndex);
        let val = event.container.data[event.currentIndex] as  Object;
        let valtenaizy = val as Assignment;
        valtenaizy.rendu=true ; 
        this.assignmentsService.updateAssignment(valtenaizy)
        .subscribe(message => { 

        });
      }
        
    }
  }
  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event)
      .subscribe(message => {
        console.log(message);
      })
  }

  premierePage() {
    this.router.navigate(['/home'], {
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
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/home'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }
}
