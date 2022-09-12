import { Injectable } from '@angular/core';
import { PlantComponent } from './plant/plant.component';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {

  changeColor:boolean=false;
  colors = ["green", "yellow","orange" ,"pink" , "red", "magenta", "blue","cyan","white", "gray"];
  //The color index of the chosen treatment
  color:number=0;
  //treatment number of the chosen treatment
  treatment:number=1;
  callbacks:{fnct:((color: string,circle:HTMLCanvasElement)=>void),plant:PlantComponent}[][]=[];
  doses:number[]=[];
  nbDoses:number=11;
  constructor() { 
    for(let i=0;i<this.nbDoses;i++){
      this.callbacks.push([]);
      this.doses.push(1);
    }
  }
  //treatment starts with 1
  addcallback(fnct:(color: string,circle:HTMLCanvasElement)=>void,plant:PlantComponent){
    this.callbacks[this.treatment-1].push({fnct:fnct,plant:plant});
    console.log("callback added....")
  }



  //trnb starts from 0.
  doseChange(trnb:number,newcolor:string){
    console.log(this.callbacks[trnb].length);
    for(let c of this.callbacks[trnb]){
      if(trnb+1==c.plant.treatment){
        //console.log(newcolor)
        c.plant.redrawCircle(newcolor,c.plant.circle.nativeElement)
      }
      //fnct(this.colors[this.colorPicker.doses[trnb]],trnb+1);
    }
  }
}
