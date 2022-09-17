import { Component,ElementRef,ViewChild,OnInit,AfterViewInit, HostListener, Inject } from '@angular/core';
import { GroupPasserService } from './group-passer.service';
import {GrowingPlantsService} from './growing-plants.service';
import {greenhouse} from './bundle';
import computations = greenhouse.computations;
import Init = computations.Init;
import { DOCUMENT } from '@angular/common';
import { TrayComponent } from './tray/tray.component';
import { GroupfactorComponent } from './groupfactor/groupfactor.component';
import {ColorPickerService} from "./color-picker.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'greenhouse';
  trays:number[]=[];
  nbtrays=12;
  plantGrown:boolean=false;
  CO2=350;
  drag="grab";
  default ="default";
  crosshair ="crosshair";
  //"url(./assets/colorPicker.jpg)"
  colorPickerIcon = "url(./assets/colorPicker3.jpg)";

  @ViewChild("greenhouse") greenhouse!:ElementRef;
  @ViewChild(GroupfactorComponent) groupfactor!:GroupfactorComponent;
  @ViewChild(TrayComponent) tray!:TrayComponent;
  @ViewChild("grimg") grimg!:ElementRef;
  @ViewChild("main") main!:ElementRef;

  constructor(private colorPicker:ColorPickerService,private grouppasser:GroupPasserService,private growingPlantService:GrowingPlantsService,@Inject(DOCUMENT) private document: Document) { 
    for(let i =1;i<this.nbtrays+1;i++){
      this.trays.push(i);
    }
  }

  @HostListener("window:resize")
  windresize(){
    this.setgrhcoordinates();
  }

  ngAfterViewInit() :void{
    this.setgrhcoordinates();
    //console.log(this.tray.Treatments);
  }

  isGroupChosen(){
    return this.grouppasser.groupchose;
  }

  isColorPicked(){
    return this.colorPicker.changeColor;
  }

  setgrhcoordinates(){
    //console.log(this.grimg.nativeElement.getBoundingClientRect());
    //console.log(this.greenhouse.nativeElement.getBoundingClientRect())
    this.grouppasser.grhouseleft=this.grimg.nativeElement.getBoundingClientRect().left;
    this.grouppasser.grhouseright=this.grimg.nativeElement.getBoundingClientRect().right;
    this.grouppasser.grhousetop=this.grimg.nativeElement.getBoundingClientRect().top;
    this.grouppasser.grhousebottom=this.grimg.nativeElement.getBoundingClientRect().bottom;
  }

  mouseUp(){
    if(this.grouppasser.circleReceive){
      this.grouppasser.circleReceive=false;
    }
    this.grouppasser.groupchose=false;
    console.log("upper level");
  }

  gatherInformation(){
    //let infos:{plantid:number,InitialWeight:number,EndWeight:number,Treatment:string,Xcoordinate:number,Ycoordinate:number,GroupFactors:string[]}[]=[];
    let id=1;
    for(let plant of this.growingPlantService.plants){
      let trtmnt = this.tray.Treatments[plant.treatment-1];
      //what if the position of the plant changes due to resize?
      let xcrdnt = 8*((plant.getPosition().left+plant.getPosition().right)/2-this.grimg.nativeElement.getBoundingClientRect().left)/this.grimg.nativeElement.width;
      let ycrdnt = 8*((plant.getPosition().bottom+plant.getPosition().top)/2-this.grimg.nativeElement.getBoundingClientRect().top)/this.grimg.nativeElement.height;
      let i =0;
      let grf=[];
      while(i<this.groupfactor.nbaddedgf){
        let gnb =plant.gfColorsNb[i];
        if(gnb!=-1){
          grf.push(this.groupfactor.groups[i][gnb-1].name);
        }
        else{
          grf.push("Default Group");
        }
        i+=1;
      }
      this.growingPlantService.infos.push({plantid:id,InitialWeight:plant.initialWeight,EndWeight:plant.endWeight,Treatment:trtmnt,Xcoordinate:xcrdnt,Ycoordinate:ycrdnt,GroupFactors:grf});
      id+=1;
    }
    //return infos;
  }

  showResults(a:HTMLAnchorElement){
    console.log("Download results");
    let header =["PlantId","InitialWeight","EndWeight","Treatment","X-coordinate","Y-coordinate"];
    let i=0;
    while(i<this.groupfactor.nbaddedgf){
      header.push(this.groupfactor.groupfactors[i]);
      i+=1;
    }
    let data = header.join(",");
    data+="\n";
    //let infos = this.gatherInformation();
    this.growingPlantService.infos.forEach(function(row) {  
      data += Object.values(row).join(',');  
      data += "\n";  
    });
    const blob = new Blob([data], { type: 'text/csv' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'GreenHouseResults.csv');
  }

  growPlants(dates:{begindate:number,beginmonth:number,enddate:number,endmonth:number}){
    this.growingPlantService.infos=[];
    console.log("plants grown");
    //Init.g;
    //this.initialWeight * RSF_N, this.initialWeight * RSF_L, this.initialWeight * RSF_A, this.initialWeight * RSF_S, this.x,this.y
    for(let plant of this.growingPlantService.plants){
      let xcrdnt = 8*((plant.getPosition().left+plant.getPosition().right)/2-this.grimg.nativeElement.getBoundingClientRect().left)/this.grimg.nativeElement.width;
      let ycrdnt = 8*((plant.getPosition().bottom+plant.getPosition().top)/2-this.grimg.nativeElement.getBoundingClientRect().top)/this.grimg.nativeElement.height;
      const  inie:Init = new Init(plant.initialWeight*plant.RSF_N,plant.initialWeight*plant.RSF_L,plant.initialWeight*plant.RSF_A,plant.initialWeight*plant.RSF_S,xcrdnt,ycrdnt);
      //inie.general(startday, startmonth, endday, endmonth, CO2, this.treatment.getNitrateLevel());
      inie.general(dates.begindate,dates.beginmonth,dates.enddate,dates.endmonth,this.CO2,this.tray.getColorPickerDoses()[plant.treatment-1]);
      plant.endWeight=inie.getWeight();
    }
    this.gatherInformation();
  }

}
