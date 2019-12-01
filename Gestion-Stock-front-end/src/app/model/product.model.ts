import {Category} from "./category.model";

export class Product{

  constructor(


  public id?:number,
  public name?:string,
  public description?:string,
  public currentPrice?:number,
  public quantity?:number,
  public category?:Category,


  ){

  }

}
