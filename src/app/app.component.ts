import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webapp';
  headerFooter: boolean;
  appNav

  constructor( private router: Router){
   
  }
ngOnInit(){
  this.router.events
  .subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.headerFooter = (event.url !== '/login' );
   
      
    }

    if (event instanceof NavigationEnd) {
      this.appNav = (event.url !== '/register' );
   
      
    }
  });
}
  

}
