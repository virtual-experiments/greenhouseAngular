import { DragRef, Point } from '@angular/cdk/drag-drop';
import { CdkDragEnd } from '@angular/cdk/drag-drop/drag-events';
import { Component, ElementRef, OnInit, ViewChild ,ViewChildren, QueryList} from '@angular/core';
import { GroupPasserService } from '../group-passer.service';
import {ColorPickerService} from "../color-picker.service";
import { ContainerComponent } from '../container/container.component';


@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {
  //@ViewChild("circle") circle!:ElementRef;
  @ViewChild("tray") tray!:ElementRef;

  constructor(private grouppasser:GroupPasserService,private colorPicker:ColorPickerService) { }
  nbtrays=12;
  trays:number[]=[];
  addDisable:boolean=false;
  Treatments:string[]=[];
  nbTreatments:number[] = [];
  //doses:number[]=[];
  addedtreatments:number=1;
  colors:string[] = [ "green", "yellow","orange" ,"pink" , "red", "magenta", "blue","cyan","white", "gray"];
  traynb:number|null=null;
  
  ngOnInit(): void {
    this.traynb=1;
    for(let i =1;i<this.nbtrays+1;i++){
      this.trays.push(i);
    }
    this.Treatments.push("Treatment 1");
    this.nbTreatments.push(0);
    //this.doses.push(1);
    for(let i=2;i<12;i++){
      this.Treatments.push("");
      this.nbTreatments.push(i-1);
      //this.doses.push(1);
    } 
  }

  

  handleDragEnd(event: CdkDragEnd): void {
    if(event.source.element.nativeElement.getBoundingClientRect().left>400){
      event.source.reset()
    }

  }
  
  
  
  //treatement starts from 0
  colorPicked(treatment :number){
    this.colorPicker.color=this.colorPicker.doses[treatment]-1;
    this.colorPicker.treatment=treatment+1;
    this.colorPicker.changeColor=true;
    console.log(this.colorPicker.color);
  }

  addTreatment(){
    this.addedtreatments+=1;
    if(this.addedtreatments==11){
      this.addDisable=true;
    }
    this.Treatments[this.addedtreatments-1]="Treatment "+this.addedtreatments;
  }
  //treatment here starts with 0
  increaseDose(treatment:number){
    
    if(this.colorPicker.doses[treatment]<this.colorPicker.colors.length){
      //this.doses[treatment]+=1;
      this.colorPicker.doses[treatment]+=1;
      this.colorPicker.doseChange(treatment,this.colors[this.colorPicker.doses[treatment]-1])
      /**for(let fnct of this.colorPicker.callbacks[treatment]){
        fnct(this.colors[this.colorPicker.doses[treatment]],treatment+1);
      }**/
    }
  }
  //treatment here starts with 0
  decreaseDose(treatment:number){
    if(this.colorPicker.doses[treatment]>1){
      //this.doses[treatment]-=1;
      this.colorPicker.doses[treatment]-=1;
      this.colorPicker.doseChange(treatment,this.colors[this.colorPicker.doses[treatment]-1])
    }
  }

  getColorPicker(){
    return this.colorPicker;
  }

  prevTray(){
    if(this.traynb==null){
      return;
    }
    if(this.traynb>1){
      this.traynb -=1;
    }
  }

  nextTray(){
    if(this.traynb==null){
      return;
    }
    if(this.traynb<this.nbtrays){
      this.traynb +=1;
    }
  }

  getColorPickerDoses(){
    return this.colorPicker.doses;
  }
}
