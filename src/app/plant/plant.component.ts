import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit,AfterViewInit, ViewChild , Input, HostListener} from '@angular/core';
import {ColorPickerService} from "../color-picker.service";
import { GroupPasserService } from '../group-passer.service';
import {GrowingPlantsService} from '../growing-plants.service';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit, AfterViewInit {
  @Input() initialWeight!: number;
  endWeight:number=0;
  @ViewChild("circle") circle!:ElementRef;
  gfColors:string[]=["","","",""];
  gfColorsNb:number[]=[-1,-1,-1,-1];
  circleColor:string="green";
  treatment:number=1;
  inGreenHouse=false;
  //NOT USED?
  position:{left:number,right:number,top:number,bottom:number}={left:0,right:0,top:0,bottom:0};

  RSF_N = 1.886;
  RSF_L = 0.606;
  RSF_A = 0.021;
  RSF_S = 0.394;

  constructor(private grouppasser:GroupPasserService,private colorPicker:ColorPickerService,private growingPlantService:GrowingPlantsService) { }

  @HostListener("window:resize")
  windresize(){
    //console.log("window resize");
    if(this.inGreenHouse){
      let rect = this.getPosition();
      const centerX = (rect.left+rect.right)/2;
      const centerY = (rect.top+rect.bottom)/2;
      if(centerX<this.grouppasser.grhouseleft || centerY<this.grouppasser.grhousetop || centerX>this.grouppasser.grhouseright || centerY>this.grouppasser.grhousebottom){
        this.inGreenHouse=false;
        this.position={left:0,right:0,top:0,bottom:0};
        let i=this.growingPlantService.plants.indexOf(this);
        if(i!=-1){
          this.growingPlantService.plants.splice(i);
        }
      }
    }
  }

  ngOnInit(): void {
    this.colorPicker.addcallback(this.redrawCircle,this);
  }


  ngAfterViewInit() :void{
    let ctx=this.circle.nativeElement.getContext("2d");
    const centerX = this.circle.nativeElement.width / 2;
    const centerY = this.circle.nativeElement.height / 2;
    const radius = this.circle.nativeElement.width / 2;
    ctx.fillStyle =this.circleColor;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,Math.PI*2,false);
    ctx.fill();
    ctx.fillStyle="rgb(0,0,0)";
    ctx.font = "12px Arial";
    const rounded = Math.round(this.initialWeight);
    ctx.fillText(rounded.toString(),centerX-centerX/4,centerY,this.circle.nativeElement.width /3);
  }

  ChangeColor(color:string,treatmentnb:number){
    if(treatmentnb==this.treatment){
      this.circleColor=color;
      this.redrawCircle(color,this.circle.nativeElement);
    }
  }

  handleDragEnd(event: CdkDragEnd): void {
    let rect = event.source.element.nativeElement.getBoundingClientRect();
    const centerX = (rect.left+rect.right)/2;
    const centerY = (rect.top+rect.bottom)/2;
    console.log("greenhouse bounds:");
    console.log(this.grouppasser.grhouseleft);
    console.log(this.grouppasser.grhousetop);
    //rect.left<this.grouppasser.grhouseleft || rect.top<this.grouppasser.grhousetop || rect.right>this.grouppasser.grhouseright || rect.bottom>this.grouppasser.grhousebottom
    if(centerX<this.grouppasser.grhouseleft || centerY<this.grouppasser.grhousetop || centerX>this.grouppasser.grhouseright || centerY>this.grouppasser.grhousebottom){
      event.source.reset();
      this.inGreenHouse=false;
      this.position={left:0,right:0,top:0,bottom:0};
      let i=this.growingPlantService.plants.indexOf(this);
      if(i!=-1){
        this.growingPlantService.plants.splice(i);
      }
    }
    else{
      this.inGreenHouse=true;
      this.position=rect;
      let i=this.growingPlantService.plants.indexOf(this);
      if(i==-1){
        this.growingPlantService.plants.push(this);
      }
      const width = this.grouppasser.grhouseright-this.grouppasser.grhouseleft;
      const height = this.grouppasser.grhousebottom-this.grouppasser.grhousetop;
      this.position.left=(rect.left-this.grouppasser.grhouseleft)/width;
      this.position.right=(rect.right-this.grouppasser.grhouseleft)/width;
      this.position.bottom = (rect.bottom-this.grouppasser.grhousetop)/height;
      this.position.top = (rect.top-this.grouppasser.grhousetop)/height;
    }
  }

  getPosition(){
    return this.circle.nativeElement.getBoundingClientRect();
  }

  redrawCircle(color:string,circle:HTMLCanvasElement){
    //let circl = this.circle.nativeElement;
    let ctx=circle.getContext("2d");
    if(ctx ==null){
      return;
    }
    const centerX = circle.width / 2;
    const centerY = circle.height / 2;
    const radius = circle.width / 2;//25/2
    ctx.clearRect(0,0,circle.width,circle.height);
    ctx.scale(1,1);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,Math.PI*2,false);
    ctx.fill();
    let i =0;
    while(i<4){
      let startangle=(i)*0.25*Math.PI;
      let endangle = (i+1)*0.25*Math.PI;
      if(this.gfColors[i]!=""){
        ctx.fillStyle = this.gfColors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        let x = centerX+radius*Math.cos(startangle);
        let y = centerY+radius*Math.sin(startangle);
        ctx.lineTo(x, y);
        //ctx.stroke();
        x = centerX+radius*Math.cos(endangle);
        y = centerY+radius*Math.sin(endangle);
        ctx.lineTo(x, y);
        //ctx.stroke();
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX,centerY,radius,startangle,endangle,false);
        ctx.fill();
      }
      i+=1;
      console.log("color change   ");
      
      this.colorPicker.changeColor=false;
      console.log(this.colorPicker.color);
      ctx.fillStyle="rgb(0,0,0)";
      ctx.font = "12px Arial";
      const rounded = Math.round(this.initialWeight);
      ctx.fillText(rounded.toString(),circle.width/2-circle.width/8,circle.height/2,circle.width/3);
      
    }
  }

  circleClicked(circle: HTMLCanvasElement){
    if(this.colorPicker.changeColor){
      this.treatment=this.colorPicker.treatment;
      this.colorPicker.addcallback(this.redrawCircle,this);
      this.redrawCircle(this.colorPicker.colors[this.colorPicker.color],this.circle.nativeElement);
    }
  }

  mouseUp(circle: HTMLCanvasElement){
    if(this.grouppasser.groupchose){
      this.grouppasser.circleReceive=true;
      let ctx=circle.getContext("2d");
      const centerX = circle.width / 2;
      const centerY = circle.height / 2;
      const radius = circle.width / 2;//25/2
      this.gfColors[this.grouppasser.groupFactornb-1]=this.grouppasser.color;
      this.gfColorsNb[this.grouppasser.groupFactornb-1]=this.grouppasser.groupnb;
      if(ctx==null){
        return;
      }
      const startangle = (this.grouppasser.groupFactornb-1)*Math.PI*0.25;
      const endangle = (this.grouppasser.groupFactornb)*Math.PI*0.25;
      ctx.fillStyle = this.grouppasser.color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      let x = centerX+radius*Math.cos(startangle);
      let y = centerY+radius*Math.sin(startangle);
      ctx.lineTo(x, y);
      x = centerX+radius*Math.cos(endangle);
      y = centerY+radius*Math.sin(endangle);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX,centerY,radius,startangle,endangle,false);
      ctx.fill();
      console.log("colored");
    }
    
    console.log("circle level");
  }

  clearCircle(x:number, y:number, radius:number,startangle:number,endangle:number,context:CanvasRenderingContext2D){
    context.beginPath();
    context.arc(x, y, radius, startangle, endangle, false);
    context.clip();
    context.clearRect(x - radius - 1, y - radius - 1,
                      radius * 2 + 2, radius * 2 + 2);
  }
}
