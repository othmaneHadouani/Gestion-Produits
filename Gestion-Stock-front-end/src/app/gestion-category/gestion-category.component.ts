import { Component, OnInit } from '@angular/core';
import {Product} from "../model/product.model";
import {CatalogueService} from "../services/catalogue.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Category} from "../model/category.model";


@Component({
  selector: 'app-gestion-category',
  templateUrl: './gestion-category.component.html',
  styleUrls: ['./gestion-category.component.css']
})
export class GestionCategoryComponent implements OnInit {

  constructor(private catService:CatalogueService,private modalService: NgbModal) { }

  public category;

  ngOnInit() {

    this.catService.getCategories('',0).subscribe(
      res=>{

        console.log("sucsseful load categories")
      },
      err =>{
        console.log("err load categories")
      }
    );


  }

  closeResult: string;

  openAdd(content) {
    this.category=new Category();
    this.modalService.open(content, { centered: true}).result.then((result) => {
      this.catService.addCategory(this.category).subscribe(
        res=>{
          this.catService.getCategories('',0).subscribe(
            res=>{
              console.log("succefull load category")
            },
            err =>{
              console.log(err)
              console.log("error load category")
            }
          );

          console.log("succefull added category")
        },
        err =>{
          console.log(err)
          console.log("error added category")
        }
      );


    }, (reason) => {

    });
  }

  openEdit(content,category) {



    this.category = category;


    this.modalService.open(content, { centered: true}).result.then((result) => {

      this.catService.editCategory(this.category).subscribe(
        res=>{
          console.log("succefull adEdited  category")
        },
        err =>{
          console.log(err)
          console.log("error adEdited category")
        }
      );
    }, (reason) => {


    });
  }


  openDelete(content,idCat) {


    this.modalService.open(content).result.then(

      (result) => {
        this.catService.onDeleteCategory(idCat);

      }, (reason) => {


      });
  }

  getPage(motCle,page){

    this.catService.getCategories(motCle.value,page).subscribe(
      res=>{
        console.log("succefull load categorie")
      },
      err =>{
        console.log(err)
        console.log("error load categorie")
      }
    );

  }

  doSearch(data){

    console.log(data)

    this.catService.getCategories(data.motCle,0).subscribe(
      res=>{
        console.log("succefull load Categories")
      },
      err =>{
        console.log(err)
        console.log("error load Categories")
      }
    );

  }

}
