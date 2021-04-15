import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false ;
  constructor(private authService : AuthService) {

  }

  ngOnInit(): void {
  }

  openMenu = () => { 
    this.isMenuOpen = !this.isMenuOpen
  }
}
