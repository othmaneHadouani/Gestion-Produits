import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Product} from "../model/product.model";
import {map} from "rxjs/operators";
import {Category} from "../model/category.model";


export class DataCat {
  constructor(private  products ){

  }
}


@Injectable({
  providedIn: 'root'
})
export class CatalogueService implements Resolve<DataCat> {
  public host:string="http://localhost:8080";


  public currentCategorie
  public categories: Array<Category>;
  public products: Array<Product>;
  public listCategories: Array<Category>;
  public aboutProducts:any;
  public aboutCategories:any;
  constructor(private http:HttpClient) {
  }

  public getProduct(url){
    return this.http.get(this.host+url);
  }


  addProduct(product:Product){
    return this.http.post(this.host+"/products/addProduct/",product).pipe(
      map((res :Product) =>{

        return res;
    })
    )
  }

  addCategory(category:Category){
    return this.http.post(this.host+"/categories/addCategory/",category).pipe(
      map((res :Category) =>{
        return res;
      })
    )
  }

  editProduct(product:Product){
    return this.http.put(this.host+"/products/editProduct/",product).pipe(
      map((res :Product) =>{

        return res;
      })
    )
  }
  editCategory(category:Category){
    return this.http.put(this.host+"/categories/editCategory/",category).pipe(
      map((res :Category) =>{
        return res;
      })
    )
  }
  onDeleteProduct(idProduct){

    return this.http.delete(this.host+"/products/delete/"+idProduct).subscribe(
      res =>{
        this.products = [...this.products.filter( product => product.id !=idProduct )]
      },
      err =>{
        console.log(err)
      }
    );
  }

  onDeleteCategory(idCat){

    return this.http.delete(this.host+"/categories/delete/"+idCat).subscribe(
      res =>{
        this.categories = [...this.categories.filter( cat => cat.id !=idCat )]
      },
      err =>{
        console.log(err)
      }
    );
  }

  public getProducts(motCle?:string,page?:number) : Observable<Product[]>{
    return this.http.get(this.host+"/products/getAllProducts?motCle="+motCle+"&page="+page).pipe(
      map( (res:any) =>{
        this.aboutProducts=res;
        this.products=res.content;
        return res.content
      }
    )
    )
  }

  public getProductsByCat(idCat:string,motCle?:string,page?:number) : Observable<Product[]>{
    return this.http.get(this.host+"/products/getProductsByCat/"+idCat+"?motCle="+motCle+"&page="+page).pipe(
      map( (res:any) =>{
          this.aboutProducts=res;
          this.products=res.content;
          return res.content
        }
      )
    )
  }

  public getCategories(motCle?:string,page?:number): Observable<Category[]>{

    if(motCle==undefined){
      return this.http.get(this.host+"/categories/getListCategories").pipe(
        map((res:any)=>{
          this.listCategories=res;
          return res
        })
      )
    }
    else{
      return this.http.get(this.host+"/categories/getAllCategories?motCle="+motCle+"&page="+page).pipe(
        map((res:any)=>{
          this.aboutCategories=res;
          this.categories=res.content;
          return res.content
        })
      )
    }


  }



  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public patchResource(url,data){
    return this.http.patch(url,data);
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataCat> | Promise<DataCat> | DataCat {
    return new DataCat(this.products);
  }


}

