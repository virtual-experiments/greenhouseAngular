import { Component, OnInit } from '@angular/core';
import { GroupPasserService } from '../group-passer.service';

@Component({
  selector: 'app-groupfactor',
  templateUrl: './groupfactor.component.html',
  styleUrls: ['./groupfactor.component.css']
})
export class GroupfactorComponent implements OnInit {
  nbgf=[0,1,2,3];
  groupfactors=["Group Factor 1"," "," "," "];
  selectedgf=0;
  nbaddedgf =1;
  addDisable =false;
  groups:{color:string,name:string,nb:number}[][]=[[],[],[],[]];
  constructor(private grouppasser:GroupPasserService) { }

  ngOnInit(): void {
  }

  addgf(){
    this.nbaddedgf+=1;
    if(this.nbaddedgf==4){
      this.addDisable=true;
    }
    this.selectedgf = this.nbaddedgf-1;
    this.groupfactors[this.selectedgf] = "Group Factor" +this.nbaddedgf;
  }

  gfselected(i:number){
    this.selectedgf=i;
  }

  addgroup(){
    let i =this.selectedgf;
    if(this.groups[i].length<10){
      let l = this.groups[i].length;
      (this.groups[i]).push({color:this.randomColor(),name:"Group "+(l+1),nb:l+1});
    }
  }

  randomColor():string{
    let r=Math.floor(Math.random() * 256);
    let b=Math.floor(Math.random() * 256);
    let g=Math.floor(Math.random() * 256);
    return "rgb("+r+","+g+","+b+")";
  }

  colorPicked(g:number,group:{color:string,name:string,nb:number}){
    this.grouppasser.groupFactornb=g+1;
    this.grouppasser.groupchose=true;
    this.grouppasser.color=group.color;
    this.grouppasser.groupname=group.name;
    this.grouppasser.groupnb=group.nb;
  }

}
