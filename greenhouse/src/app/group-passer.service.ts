import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupPasserService {
  groupchose:boolean=false;
  circleReceive:boolean=false;
  groupFactornb:number=-1;
  color:string="";
  groupname:string="";
  //It starts with 1
  groupnb:number=0;


  grhouseleft=0;
  grhousebottom=0;
  grhousetop=0;
  grhouseright=0;

  
  constructor() { }
}
