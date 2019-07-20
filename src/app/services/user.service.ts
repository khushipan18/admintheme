import { Injectable } from '@angular/core';
import {User} from '../models/user';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';
  constructor(private http : Http) { }



  getall(): Observable<User[]> {
    return this.http
      .get(this.apiUrl)
      .map((response: Response) => response.json())
      
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get(this.apiUrl + '/' + id)
      .map((response: Response) => response.json())
    
  }

  addUser(users: User): Observable<User> {
   
    return this.http
      .post(this.apiUrl, users)
      .map((response: Response) => response.json())
      
  }
  deleteUser(id: number): Observable<User> {
    return this.http
      .delete(this.apiUrl + '/' + id)
      .map((response: Response) => response.json())
      
  }




  
    
}
  

