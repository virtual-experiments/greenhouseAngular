import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  nrows:number=3;
  ncolomns:number=4;
  nbPlants:number[]=[];
  //visible=true;
  constructor() { }

  ngOnInit(): void {
    for(let i =1;i<13;i++){
      let initw=Math.random()*3;
      if(Math.random()<0.5){
        initw+=10;
      }
      else{
        initw=10-initw;
      }
      this.nbPlants.push(Math.floor(initw));
    }
  }

}
