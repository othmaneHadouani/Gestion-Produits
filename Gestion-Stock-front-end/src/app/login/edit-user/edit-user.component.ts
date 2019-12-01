import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


   mode1 = false;
   mode2 = false;

  constructor(private authService:AuthenticationService,
              private router:Router) { }

  ngOnInit() {
  }

  changeToMode1(){
    this.mode1=true;
    this.mode2=false;
  }

  changeToMode2(){

    this.mode2=true;
    this.mode1=false;
  }

  onChangeUsername(data){

    this.authService.onChangeUsername(data.username).subscribe(res=>{

        this.router.navigateByUrl('/login');
      },
      error1 => {

        console.log("honaka error")
      })

  }

  onChangePassword(data){

    this.authService.onChangePassword(data.password,data.confirmedPassword).subscribe(res=>{

        this.router.navigateByUrl('/login');
      },
      error1 => {

        console.log("honaka error")
      })

  }


}
