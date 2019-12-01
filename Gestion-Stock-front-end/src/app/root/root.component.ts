import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../services/catalogue.service";
import {Router} from "@angular/router";
import {eraseStyles} from "../../../node_modules/@angular/animations/browser/src/util";


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {


  constructor(public catService:CatalogueService,
              private  router:Router){}

  ngOnInit(): void {
    this.getCategories();

  }

  private getCategories() {
    this.catService.getCategories().subscribe(
      res=>{
           console.log("sucsseful load categories")
      },
      err =>{
        console.log("err load categories")
      }
    );
  }

  getProductsByCat(c) {
    console.log(c)
    this.catService.currentCategorie=c;
    this.router.navigateByUrl('acceuil/products/2/'+c.id);
  }


}
