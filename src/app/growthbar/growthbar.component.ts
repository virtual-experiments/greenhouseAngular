import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-growthbar',
  templateUrl: './growthbar.component.html',
  styleUrls: ['./growthbar.component.css']
})
export class GrowthbarComponent implements OnInit {

  nbdays:number[]=[];
  nbmonths:number[]=[];
  begindate:number=1;
  beginmonth:number=1;
  enddate:number=1;
  endmonth:number=1;
  @Output() grow = new EventEmitter<{begindate:number,beginmonth:number,enddate:number,endmonth:number}>();
  @Output() viewOutput = new EventEmitter<HTMLAnchorElement>();
  constructor() {
    for(let i =1;i<32;i++){
      this.nbdays.push(i);
    }
    for(let i =1;i<13;i++){
      this.nbmonths.push(i);
    }
   }

  ngOnInit(): void {
  }

  growPlants(){
    this.grow.emit({begindate:this.begindate,beginmonth:this.beginmonth,enddate:this.enddate,endmonth:this.endmonth});
  }

  viewOutputClicked(d:HTMLAnchorElement){
    this.viewOutput.emit(d);
  }
}
