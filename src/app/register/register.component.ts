import { Component, OnInit } from '@angular/core';

import {FormGroup,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router,ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  users : User;
  id: number;
  registerForm:FormGroup;
  control: AbstractControl ;
  loading :false;
  addNew: boolean;
 // registerForm: FormGroup;
  fvalidate:string  = '^[a-zA-Z]+$';
    UserName: any;
  constructor(private formBuilder: FormBuilder,
    private us : UserService ,
    private router : Router,
     private route: ActivatedRoute) {

        this.users = new User();
        this.addNew = true;
      }

    ngOnInit() {
    
        this.registerForm = this.formBuilder.group({
            UserName: ['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])],
           
            email: ['', [Validators.required, Validators.email]],
     
            PhoneNumber: ['',[ Validators.required,Validators.pattern('[1-9]{1}[0-9]{9}')]],
            Password: ['', [Validators.required, Validators.minLength(6)]],
            CnfPassword:['',[Validators.required]]
            
        },
        {
          validator: MustMatch('Password', 'CnfPassword')
      }
        
        
        );

        this.route.params.subscribe(params => {
            if (params['id'] !== 'new') {
              this.id = +params.id;
      
              if (isNaN(this.id)) return;
      
              this.us.getUser(this.id).subscribe(
                (users: User) => {
                  this.users = users;
                  this.addNew = false;
                },
                (error: Error) => {
                  console.log('error:', error);
                }
              );
            }
          });



    }



    get f() { return this.registerForm.controls; }

    onSubmit() {
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
           
       
      this.users.UserName = this.registerForm.value.UserName;
      this.users.Email = this.registerForm.value.email;
      this.users.PhoneNumber = this.registerForm.value.PhoneNumber;
      this.users.Password = this.registerForm.value.Password;
      this.users.CnfPassword = this.registerForm.value.CnfPassword;
      
      if(this.addNew){

        this.us.addUser(this.users).subscribe((users : User)=>{

            console.log('User created successfully!');
          this.router.navigate(['/home']);
        })
      }
      
    
       

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    
}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
