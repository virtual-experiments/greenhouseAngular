import { Injectable } from '@angular/core';
import { PlantComponent } from './plant/plant.component';

@Injectable({
  providedIn: 'root'
})
export class GrowingPlantsService {

  plants:PlantComponent[]=[];

  constructor() { }
}
