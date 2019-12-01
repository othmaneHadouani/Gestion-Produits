import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {User} from "../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  @ViewChild("ff") form

   user :User =new User()
   newUser :User = new User()

  registr =false;
  login=true;
  compatible=false
  existe=false
  auth=false
  constructor(private authService:AuthenticationService,
              private router:Router,
            ) { }

  ngOnInit() {
  }

  onLogin(){



    this.authService.login(this.user).subscribe(

      res=>{

        this.router.navigateByUrl('');

      },err=>{

        this.auth=true
        console.log("error  login")
      },

      );

  }

  onRegistr(){


    if(this.newUser.confirmedPassword!==this.newUser.password){
      this.compatible=true
    }
    else {
      this.authService.addUser(this.newUser).subscribe(res=>{
          this.user = this.newUser
          this.onChangeForm()
        },
        error1 => {

          this.existe = true;
          console.log(this.form)
        })
    }

  }

  onChangeForm(){
    this.registr=!this.registr
    this.login=!this.login
  }

}
