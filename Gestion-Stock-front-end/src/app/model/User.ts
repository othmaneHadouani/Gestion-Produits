import {Role} from "./Role";


export class User {

  constructor(
     public username?:string,
     public password?:string,
     public confirmedPassword?:string,
     public actived?:string ,
     public roles?:Role[]
  ){

  }

 /* public findRole(value:string):boolean{

    this.roles.forEach(role => {
      debugger
      if (role.roleName === value) {
        return true
      }
    })

    return false;
  }*/
}
