import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Product} from '../../model/product.model';
import {AuthenticationService} from '../../services/authentication.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    public catService:CatalogueService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthenticationService) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd ) {
        let url = val.url;
        let p1=this.route.snapshot.params.p1;
        if(p1==1){

          this.getProducts();
        }

        else if (p1==2){

          let idCat=this.route.snapshot.params.p2;
          this.getProductsByCat(idCat);

        }

      }
    });
    let p1=this.route.snapshot.params.p1;

    if(p1==1){
      this.getProducts();
    }
  }

  private getProducts(motCle="",page=0) {
    this.catService.getProducts(motCle,page).subscribe(
      res=>{
        console.log("succefull load product")
      },
      err =>{
        console.log("error load product")
      }
    );
  }


  private getProductsByCat(idCat,motCle="",page=0){
    debugger
    this.catService.getProductsByCat(idCat,motCle,page).subscribe(
      res=>{
        console.log("succefull load product")
      },
      err =>{
        console.log("error load product")
      }
    );

  }
  private getPage(motCle,page){

    if(this.catService.currentCategorie){
      this.getProductsByCat(this.catService.currentCategorie.id,motCle.value,page)
    }
    else {
      this.getProducts(motCle.value,page)
    }
  }

  private doSearch(data){


    if(this.catService.currentCategorie){
      this.getProductsByCat(this.catService.currentCategorie.id,data.motCle)
    }
    else {
      this.getProducts(data.motCle)
    }

  }

}
