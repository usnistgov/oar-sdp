import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, Input} from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { Message } from 'primeng/components/common/api';
import { TreeModule,TreeNode, Tree, MenuItem,OverlayPanelModule,
  FieldsetModule,PanelModule,ContextMenuModule,
  MenuModule } from 'primeng/primeng';
import { CartService } from './cart.service';
import { CartEntity } from './cart.entity';
import { Observable } from 'rxjs/Observable';
import {ProgressSpinnerModule} from 'primeng/primeng';


//import * as jsPDF  from 'jspdf';

declare var Ultima: any;
declare var jQuery: any;
declare var saveAs: any;


@Component ({
  moduleId: module.id,
  selector: 'data-cart',
  templateUrl: 'datacart.component.html',
  styleUrls: ['datacart.component.css'],
  providers: [CartService ]
})

export class DatacartComponent implements OnInit, OnDestroy {
  layoutCompact: boolean = true;
  layoutMode: string = 'horizontal';
  profileMode: string = 'inline';
  msgs: Message[] = [];
  exception : string;
  errorMsg: string;
  status: string;
  errorMessage: string;
  errorMessageArray: string[];
  //searchResults: any[] = [];
  searchValue:string;
  recordDisplay:any[] = [];
  keyword:string;
  downloadZIPURL:string;
  summaryCandidate: any[];
  showSpinner : boolean = false;
  findId: string;
  leftmenu: MenuItem[];
  rightmenu: MenuItem[];
  similarResources: boolean = false;
  similarResourcesResults: any[]=[];
  qcriteria:string = '';
  selectedFile: TreeNode;
  isDOI = false;
  isEmail = false;
  citeString:string = '';
  type: string = '';
  process : any[];
  requestedId : string = '';
  isCopied: boolean = false;
  distdownload: string = '';
  serviceApi: string = '';
  metadata: boolean = false;
  cartEntities: CartEntity[];
  cols: any[];
  selectedData: any[];

  /**
   * Creates an instance of the SearchPanel
   *
   */
  constructor(private http: Http,private cartService: CartService) {
  }

  /**
   * If Search is successful populate list of keywords themes and authors
   */

  getDataCartList() {
    this.cartService.getAllCartEntities().then(function(result) {

      this.cartEntities = result;

    }.bind(this), function(err) {
      alert("something went wrong while fetching the products");
    });
  }

  downloadZIP() {
    let downloadURL: string[];
    let fileName: string[];
    let params: URLSearchParams = new URLSearchParams();
    let folderName:string;
    this.showSpinner = true;
    for (let selData of this.selectedData) {
      folderName = selData.data['resId'].split("/")[2] + "-" + selData.data['resTitle'].substring(0,20);
      console.log("folderName" + folderName);
      console.log("downloadURL" + selData.data['downloadURL']);
      console.log("fileName" + selData.data['id'] + selData.data['fileName']);
      console.log("filePath" + selData.data['filePath']);
      params.append('folderName', folderName);
      params.append('downloadURL', selData.data['downloadURL']);
      params.append('fileName', selData.data['id'] + selData.data['fileName']);
      params.append('filePath', selData.data['filePath']);
    }
    this.downloadFile(params).subscribe(blob => {
      saveAs(blob, "download.zip");this.showSpinner = false;
      }
    );

  }

  downloadFile(params): Observable<Blob> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.get("http://localhost:8083/oar-dist-service/cart?" + params, options)
      .map(res => res.blob())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Removes all cartInstances that are bound to the productId given.
   **/
  removeByDataId() {

    let dataId: any;
    // convert the map to an array
    for (let selData of this.selectedData) {
      dataId = selData.data['id'];

      // Filter out all cartEntities with given productId,  finally the new stuff from es6 can be used.
      this.cartEntities = this.cartEntities.filter(entry => entry.data.id != dataId);

      //save to localStorage
      this.cartService.saveListOfCartEntities(this.cartEntities);
    }
  }

  /**
   * Get the params OnInit
   */
  ngOnInit() {
    this.getDataCartList();
    this.cols = [
      {field: 'data.dataset', header: 'Dataset'},
      {field: 'data.fileName', header: 'File Name'},
      {field: 'data.fileSize', header: 'Size'},
      {field: 'data.fileFormat', header: 'Format '},
      {field: 'data.resId', header: 'ResId'},
      {field: 'data.resTitle', header: 'ResTitle'}
    ];
  }

  ngOnDestroy() {
  }

  /*
  ngAfterViewInit(){

    window.history.replaceState( {} , '#/id/', '/od/id/'+this.searchValue );
  }
*/
}
