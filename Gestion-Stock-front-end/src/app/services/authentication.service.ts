import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {map, publish} from "rxjs/operators";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {from, Observable} from "rxjs";
import * as jwt_decode from "jwt-decode"
import {Category} from "../model/category.model";
import {User} from "../model/User";
import {Product} from "../model/product.model";
import {Role} from "../model/Role";
import {stringify} from "querystring";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  implements Resolve<Data>{
  public host:string="http://localhost:8090";

  public authenticatedUser:User=new User()
  public listUsers:User[];
  public listRoles:User[];
  public users:User[];
  public roles:User[];
  public aboutUsers;
  public aboutRoles;


  constructor(private http:HttpClient) {
    this.loadUser();
  }

  login(user:User){

   return  this.http.post(this.host+"/login",{username:user.username,password:user.password},{observe: 'response'})
     .pipe(
         map(
           userData => {

             let tokenStr= userData.headers.get('Authorization');
             localStorage.setItem('token', tokenStr);
             this.addUserToLocalStorage(tokenStr)
             return this.authenticatedUser;
           }
         )

       )
  }

  loadUser(){

    if(this.isAuthenticated()){

      this.authenticatedUser=JSON.parse(localStorage.getItem("user"));
    }
  }

  isAdmin(){
    if(this.authenticatedUser){

      let table = []
      this.authenticatedUser.roles.forEach(role =>{
        table.push(role.roleName)
      });

      return table.indexOf("ADMIN") > -1
    }

     return false;

  }

  public isAuthenticated(): boolean {

    let token = this.getToken();
    if(!token) {
      return false;
    }

    const date = this.getTokenExpirationDate(token);

    if(date === undefined){
      return false;
    }

    return (date.valueOf() > new Date().valueOf());
  }

  logout(){

    this.authenticatedUser=undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
  }



  getToken(){
    return localStorage.getItem("token");
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  addUserToLocalStorage(token: string){
    const decoded = jwt_decode(token);

    let roles =[]
    decoded.roles.forEach(role=>{
      roles.push(new Role(role));
    })

    this.authenticatedUser =new User(decoded.sub,null,null,null,roles)
    localStorage.setItem("user",JSON.stringify(this.authenticatedUser))

  }


  onChangeUsername(username){

    let user ={
      newUserName:username,
      lastUserName:this.authenticatedUser
    }

    return this.http.post(this.host+"/editUserName",user).pipe(
      map(res=>{


        return res;
      })
    );

  }

  onChangePassword(password,confirmedPassword){
    let user ={
      username:this.authenticatedUser,
      password:password,
      confirmedPassword:confirmedPassword
    }


    return this.http.post(this.host+"/editPassword",user).pipe(
      map(res=>{


        return res;
      })
    );

  }

  public getUsers(motCle?:string,page?:number): Observable<User[]>{

    if(motCle==undefined){
      return this.http.get(this.host+"/users/getListUsers").pipe(
        map((res:User[])=>{
          this.listUsers=res;
          return res
        })
      )
    }
    else{
      return this.http.get(this.host+"/users/getAllUsers?motCle="+motCle+"&page="+page).pipe(
        map((res:any)=>{
          this.aboutUsers=res;
          this.users=res.content;
          return res.content
        })
      )
    }


  }

  public getRoles(motCle?:string,page?:number): Observable<User[]>{

    if(motCle==undefined){
      return this.http.get(this.host+"/roles/getListRoles").pipe(
        map((res:User[])=>{
          this.listRoles=res;
          return res
        })
      )
    }
    else{
      return this.http.get(this.host+"/roles/getAllRoles?motCle="+motCle+"&page="+page).pipe(
        map((res:any)=>{
          this.aboutRoles=res;
          this.roles=res.content;
          return res.content
        })
      )
    }


  }

  addUser(user:User){
    return this.http.post(this.host+"/users/register/",user).pipe(
      map((res :User) =>{
        return res;
      })
    )
  }

  editUser(user:User){
    return this.http.put(this.host+"/users/register/",user).pipe(
      map((res :User) =>{
        return res;
      })
    )
  }
  onDeleteUser(username:string){
    return this.http.delete(this.host+"/users/delete/"+username).pipe(
      map((res :any) =>{

        this.users = [...this.users.filter(user=> username != user.username)]
        return res;
      })
    )
  }

  onDeleteRole(roleName:string){
    return this.http.delete(this.host+"/users/delete/"+roleName).pipe(
      map((res :any) =>{

        this.users = [...this.users.filter(user=> roleName != user.username)]
        return res;
      })
    )
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Data> | Promise<Data> | Data {

    return new Data(this.isAuthenticated(),this.authenticatedUser);

  }
}

export class Data {
  constructor(private  authenticated ,private authenticatedUser){

  }
}
