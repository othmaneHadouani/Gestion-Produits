import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Product} from "../model/product.model";
import {Category} from "../model/category.model";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../model/User";
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit {


  constructor(private authService:AuthenticationService,private modalService: NgbModal) { }

  user=new User();

  categories:Array<Category> =new Array<Category>()


  ngOnInit() {

    this.authService.getUsers("",0).subscribe(
      res=>{

        console.log("sucsseful load Users")
      },
      err =>{
        console.log("err load Users")
      }
    );

    this.authService.getRoles().subscribe(
      res=>{
        console.log("succefull load roles")
      },
      err =>{
        console.log(err)
        console.log("error load roles")
      }
    );

  }

  closeResult: string;

  openAdd(content) {
    this.user=new User();
    this.modalService.open(content, { centered: true}).result.then((result) => {
      this.authService.addUser(this.user).subscribe(
        res=>{
          this.authService.getUsers().subscribe(
            res=>{
              console.log("succefull load users")
            },
            err =>{
              console.log(err)
              console.log("error load users")
            }
          );

          console.log("succefull added users")
        },
        err =>{
          console.log(err)
          console.log("error added users")
        }
      );

    }, (reason) => {

    });
  }

  openEdit(content,user) {



    this.user = user;


    this.modalService.open(content, { centered: true}).result.then((result) => {

      this.authService.editUser(this.user).subscribe(
        res=>{
          console.log("succefull adEdited  user")
        },
        err =>{
          console.log(err)
          console.log("error adEdited user")
        }
      );
    }, (reason) => {


    });
  }


  openDelete(content,username) {


    this.modalService.open(content).result.then(

      (result) => {
        this.authService.onDeleteUser(username);

      }, (reason) => {


      });
  }

  getPage(motCle,page){

    this.authService.getUsers(motCle.value,page).subscribe(
      res=>{
        console.log("succefull load user")
      },
      err =>{
        console.log(err)
        console.log("error load user")
      }
    );

  }

  doSearch(data){

    console.log(data)

    this.authService.getUsers(data.motCle,0).subscribe(
      res=>{
        console.log("succefull load user")
      },
      err =>{
        console.log(err)
        console.log("error load user")
      }
    );

  }


}
