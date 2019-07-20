import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';

import { HttpModule } from '@angular/http';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '',     redirectTo: 'home',     pathMatch: 'full'   },
  {path : 'home',component:HomeComponent},
  { path: 'register', component: RegisterComponent },
  
  { path: 'not-found', component:NotfoundComponent },
  { path: 'login', component:LoginComponent  },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserdetailsComponent,
    AppNavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
