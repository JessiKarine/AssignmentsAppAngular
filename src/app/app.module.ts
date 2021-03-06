import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DragDropModule} from '@angular/cdk/drag-drop';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ProfComponent } from './prof/prof.component';
import { MatiereComponent } from './matiere/matiere.component';
import { AddProfComponent } from './prof/add-prof/add-prof.component';
import { EditProfComponent } from './prof/edit-prof/edit-prof.component';
import { ProfDetailComponent } from './prof/prof-detail/prof-detail.component';
import { EditMatiereComponent } from './matiere/edit-matiere/edit-matiere.component';
import { MatiereDetailComponent } from './matiere/matiere-detail/matiere-detail.component';
import { AddMatiereComponent } from './matiere/add-matiere/add-matiere.component';
import {MatStepperModule} from '@angular/material/stepper'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" ?? la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component:LoginComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent
    //canActivate : [AuthGuard]
  },
  {
    path:"add",
    component:AddAssignmentComponent,
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent,
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent,
    //canActivate : [AuthGuard]
  },
  {
    path:"login",
    component:LoginComponent
  
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path:"list-prof",
    component:ProfComponent
    //canActivate : [AuthGuard]
  },
  {
    path:"add-prof",
    component:AddProfComponent,
  },
  {
    path:"prof/:id",
    component:ProfDetailComponent,
  },
  {
    path:"prof/:id/edit",
    component:EditProfComponent,
    //canActivate : [AuthGuard]
  },
  {
    // idem avec  http://localhost:4200/home
    path:"list-matiere",
    component:MatiereComponent
    //canActivate : [AuthGuard]
  },
  {
    path:"add-matiere",
    component:AddMatiereComponent,
  },
  {
    path:"matiere/:id",
    component:MatiereDetailComponent,
  },
  {
    path:"matiere/:id/edit",
    component:EditMatiereComponent,
    //canActivate : [AuthGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfComponent,
    MatiereComponent,
    AddProfComponent,
    EditProfComponent,
    ProfDetailComponent,
    EditMatiereComponent,
    AddMatiereComponent,
    MatiereDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    DragDropModule,
    RouterModule.forRoot(routes), HttpClientModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
