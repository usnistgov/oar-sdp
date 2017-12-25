import { Component, Input } from '@angular/core';
import {LandingPanelComponent} from './landing.component';
import { CartService } from '../datacart/cart.service';
import { Data } from '../datacart/data';

@Component({
   moduleId: module.id,
  selector: 'filedetails-resources',
  styleUrls: ['filedetails.component.css'],
 templateUrl: 'filedetails.component.html',
})

export class FileDetailsComponent {
   @Input() fileDetails: any[];
  @Input() record: any[];

  /**
   * Dependecy injection of the service with reflection by angular
   */
  constructor(private cartService : CartService ) {

  }

   download(){
       window.open(this.fileDetails["downloadURL"]);
       //alert("download here");
   }

  addtoCart(resId:string,resTitle:string,id:string,fileName:string,filePath:string,fileSize:number,downloadURL:string,fileFormat:string,dataset:string){
    let data : Data;
    data = {'resId':resId,'resTitle':resTitle,'id':id,'fileName':fileName,'filePath':filePath,'fileSize':fileSize,'downloadURL':downloadURL,'fileFormat':fileFormat,
      'dataset':dataset};
    this.cartService.addDataToCart(data);
  }

 }
