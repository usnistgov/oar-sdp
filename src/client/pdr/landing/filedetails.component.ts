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
  addFileSpinner: boolean = false;

  /**
   * Dependecy injection of the service with reflection by angular
   */
  constructor(private cartService : CartService ) {
    this.cartService.watchAddFileCart().subscribe(value => {
      this.addFileSpinner = value;
    });
  }

   download(){
       window.open(this.fileDetails["downloadURL"]);
       //alert("download here");
   }

  addtoCart(resId:string,resTitle:string,resFilePath:string,id:string,fileName:string,filePath:string,fileSize:number,downloadURL:string,fileFormat:string,dataset:string,downloadedStatus:boolean){
    this.cartService.updateFileSpinnerStatus(true);
    console.log("status" + this.addFileSpinner);

    let data : Data;
    data = {'resId':resId,'resTitle':resTitle,'resFilePath':'resFilePath','id':id,'fileName':fileName,'filePath':filePath,'fileSize':fileSize,'downloadURL':downloadURL,'fileFormat':fileFormat,'downloadedStatus':downloadedStatus
      };
    this.cartService.addDataToCart(data);
    setTimeout(()=> {
      this.cartService.updateFileSpinnerStatus(false);
    }, 3000);
    //this.cartService.addDataToCart(data);
    console.log("status after" + this.addFileSpinner);
  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

 }
