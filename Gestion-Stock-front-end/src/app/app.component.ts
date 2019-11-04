import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  clicked1:boolean=false;
  clicked2:boolean=false;
  clicked3:boolean=false;
  currentCategorie;

  constructor(


              public catService:CatalogueService,
              private  router:Router,
              public authService:AuthenticationService
  ){}

  ngOnInit(): void {

  }

  onSelectedProducts() {
    this.catService.currentCategorie=undefined;
    this.router.navigateByUrl("");
    this.clicked1=true
    this.clicked2=this.clicked3=false

  }

  onProductsPromo() {
    this.catService.currentCategorie=undefined;
    this.router.navigateByUrl("acceuil/products/3/0/");
    this.clicked2=true
    this.clicked1=this.clicked3=false
  }

  onProductsDispo() {
    this.catService.currentCategorie=undefined;
    this.router.navigateByUrl("acceuil/products/4/0/");
    this.clicked2=true
    this.clicked1=this.clicked3=false
  }

  onGoToCaddy() {

    this.catService.currentCategorie=undefined;
    this.router.navigateByUrl("caddy");
    this.clicked3=true
    this.clicked1=this.clicked2=false
  }

  onLogin() {
    this.catService.currentCategorie=undefined;
    this.router.navigateByUrl('/login');
  }


  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  doSearch(data){

     if( this.catService.currentCategorie){

       console.log("ah")
       this.router.navigateByUrl("acceuil/products/2/"+this.catService.currentCategorie.id+"/"+data.motCle);
     }
    // else {
    //   this.router.navigateByUrl("acceuil/products/1/"+data.motCle+"/0");
    // }

     else {
       this.catService.currentCategorie=undefined
       this.router.navigateByUrl("acceuil/products/1/0/"+data.motCle);
     }

  }

  onGoToProductGestion(){
    this.router.navigateByUrl("/gestion-product")
  }

  onGoToCategoryGestion(){
    this.router.navigateByUrl("/gestion-category")
  }

  onGoToUtilisateurGestion(){
    this.router.navigateByUrl("/gestion-user")
  }


}
