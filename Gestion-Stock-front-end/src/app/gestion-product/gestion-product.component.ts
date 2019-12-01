import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import {Product} from "../model/product.model";
import {Category} from "../model/category.model";
import * as cloneDeep from 'lodash/cloneDeep';


@Component({
  selector: 'app-gestion-product',
  templateUrl: './gestion-product.component.html',
  styleUrls: ['./gestion-product.component.css']
})
export class GestionProductComponent implements OnInit {

  constructor(private catService:CatalogueService,private modalService: NgbModal) { }

  product=new Product();

  categories:Array<Category> =new Array<Category>()


  ngOnInit() {

    this.catService.getCategories().subscribe(
      res=>{

        this.categories=res;
        console.log("sucsseful load categories")
      },
      err =>{
        console.log("err load categories")
      }
    );

    this.catService.getProducts("",0).subscribe(
      res=>{
        console.log("succefull load product")
      },
      err =>{
        console.log(err)
        console.log("error load product")
      }
    );

    }

  closeResult: string;

  openAdd(content) {
    this.product=new Product();
    this.modalService.open(content, { centered: true}).result.then((result) => {
      this.catService.addProduct(this.product).subscribe(
        res=>{
          this.catService.getProducts().subscribe(
            res=>{
              console.log("succefull load product")
            },
            err =>{
              console.log(err)
              console.log("error load product")
            }
          );

          console.log("succefull added product")
        },
        err =>{
          console.log(err)
          console.log("error added product")
        }
      );

      }, (reason) => {

    });
  }

  openEdit(content,product) {



    this.product = product;


    this.modalService.open(content, { centered: true}).result.then((result) => {

      this.catService.editProduct(this.product).subscribe(
        res=>{
          console.log("succefull adEdited  product")
        },
        err =>{
          console.log(err)
          console.log("error adEdited product")
        }
      );
    }, (reason) => {


    });
  }


  openDelete(content,idProduct) {


    this.modalService.open(content).result.then(

      (result) => {
        this.catService.onDeleteProduct(idProduct);

    }, (reason) => {


    });
  }

  getPage(motCle,page){

    this.catService.getProducts(motCle.value,page).subscribe(
      res=>{
        console.log("succefull load product")
      },
      err =>{
        console.log(err)
        console.log("error load product")
      }
    );

  }

  doSearch(data){

    console.log(data)

    this.catService.getProducts(data.motCle,0).subscribe(
      res=>{
        console.log("succefull load product")
      },
      err =>{
        console.log(err)
        console.log("error load product")
      }
    );

  }



}
