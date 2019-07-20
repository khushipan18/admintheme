import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router,ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {User} from '../models/user'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
currentuser : User;
id: number;
users : User [] = [];
  constructor(private us:UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();

    


  }

    

  private loadAllUsers() {
    this.us.getall().pipe(first()).subscribe(users => {
        this.users = users;
    });
}

onDelete(id) {

  this.users.forEach((p: User) => {
    if (p.id == this.route.snapshot.params.id) {
      this.id === p.id;
      
    }
  // updated //
  if(confirm('Are you sure?')){

 this.us.deleteUser(p.id).subscribe((user : User) => {


  const index = this.users.findIndex(user =>p.id === id);
  if(index >= 0){
 
      this.users.splice(index,1);

  }
  console.log('User deleted successfully!');  },  ); 

  }
  



  }); 

 
  
  }
}


