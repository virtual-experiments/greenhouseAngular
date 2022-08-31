import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatMenuModule} from '@angular/material/menu'; 
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TrayComponent } from './tray/tray.component';
import { GroupfactorComponent } from './groupfactor/groupfactor.component';
import { FormsModule } from '@angular/forms';
import { PlantComponent } from './plant/plant.component';
import { ContainerComponent } from './container/container.component'; 
import {ScrollingModule} from '@angular/cdk/scrolling'; 
import {MatSelectModule} from '@angular/material/select';
import { GrowthbarComponent } from './growthbar/growthbar.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TrayComponent,
    GroupfactorComponent,
    PlantComponent,
    ContainerComponent,
    GrowthbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatMenuModule,
    DragDropModule,
    FormsModule,
    ScrollingModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
