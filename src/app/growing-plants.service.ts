import { Injectable } from '@angular/core';
import { PlantComponent } from './plant/plant.component';

@Injectable({
  providedIn: 'root'
})
export class GrowingPlantsService {

  plants:PlantComponent[]=[];
  infos:{plantid:number,InitialWeight:number,EndWeight:number,Treatment:string,Xcoordinate:number,Ycoordinate:number,GroupFactors:string[]}[]=[];
  constructor() { }
}
