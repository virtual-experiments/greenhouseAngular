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

  mean =10;
  sd = 2;
  //visible=true;
  constructor() { }

  ngOnInit(): void {
    for(let i =1;i<13;i++){
      let initw=this.NextGaussian(this.mean,this.sd);
      this.nbPlants.push(initw);
    }
  }

  boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
  }

  NextGaussian(mean:number, stddev:number) {
    const { z0, z1 } = this.boxMullerTransform();
    
    return z0 * stddev + mean;
  }

}
