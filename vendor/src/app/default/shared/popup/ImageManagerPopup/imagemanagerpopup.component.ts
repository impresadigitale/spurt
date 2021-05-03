/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/index';
import { MediaSandbox } from '../../../../core/media/media.sandbox';
import { environment } from '../../../../../environments/environment';
import { HTTPStatus } from '../../../../core/providers/interceptor/request.interceptor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-imagemanagerpopup',
  templateUrl: './imagemanagerpopup.html',
  styleUrls: ['./imagemanagerpopup.scss']
})
export class ImagemanagerpopupComponent implements OnInit, OnDestroy {
  @ViewChild('filePath') filePath: ElementRef;
  // createFolder event
  public textValue: any;
  // openFolder event
  private currentFolder: string;
  // selectFile event
  private selectedFiles: any;
  // uploadImageAction event
  private selecetdFile: any;
  // image
  public imageUrls: string;
  // delete file
  private deleteImage: string;
  // ngOnDestroy event
  private subscriptions: Array<Subscription> = [];
  // loader
  public loader: any;
  // folder path show on top
  public folderPathName: string;
  public globalTempData: string;
  public refreshPath: string;
  public prefixPath = false;
  public createFolderEnable = false;
  public folderPathNames: string;
  public vendorPrefixId = JSON.parse(localStorage.getItem('vendorUserDetails')).vendorPrefixId;
  public prefixId = this.vendorPrefixId + '/';

  public checkedData: any = [];
  public unCheckData: any = [];
  public multipleSelected: any = [];


  constructor(
    public modal: NgbActiveModal,
    public mediaSandbox: MediaSandbox,
    private httpStatus: HTTPStatus, public toaster: ToastrService) {
    this.regSubscribeEvents();
    this.getHttpResponse();
  }

  getHttpResponse() {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    });
  }

  // Initially calls getBucketList event with empty param.
  /**
   * Handles ngOnInit,Initially calls getBucketList event with empty param.
   *
   *   and assigning  configService url
   */
  ngOnInit() {
    this.currentFolder = this.vendorPrefixId + '/';
    this.getBucketList(this.currentFolder);
    this.imageUrls = environment.imageUrl;
  }

  clickToOpen() {
    this.createFolderEnable = true;
  }

  /**
   * Handles form 'getBucketList' event. Calls sandbox bucketListApi.
   *
   * @param foldername create folder  event
   * @param limit as default '100'.
   */

  public getBucketList(foldername: string) {
    this.prefixPath = false;
    this.refreshPath = foldername;
    const params: any = {};
    params.folderName = foldername;
    params.limit = 100;
    this.folderPathName = foldername;
    this.mediaSandbox.bucketListApi(params);
    this.globalTempData = foldername;
    this.folderPathTitle(this.folderPathName);
  }

  public refresh() {
    this.prefixPath = false;
    const params: any = {};
    params.limit = 100;
    params.folderName = this.refreshPath;
    this.mediaSandbox.bucketListApi(params);
    this.folderPathTitle(this.folderPathName);
  }

  public getBucketLists(foldername: string) {
    this.prefixPath = true;
    const params: any = {};
    params.folderName = foldername;
    params.limit = 100;
    this.folderPathName = foldername;
    this.mediaSandbox.bucketListApi(params);
    this.globalTempData = foldername;
    this.folderPathTitles(this.folderPathName);
  }

  /**
   * Handles openFolder event .And calls getBucketList event
   *
   * @param folder create folder  by clicking the folder event
   */

  public openFolder(folder) {
    this.checkedData = [];
    this.unCheckData = [];
    this.multipleSelected = [];
    this.currentFolder = folder;
    this.getBucketList(folder);
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public enhanceName(file) {
    const newValue = file.split('/');
    return newValue[newValue.length - 1];
  }

  /**
   * Handles removeSlash event .
   *
   * @param data removes  the data by spliting by (/).
   */

  public removeSlash(data) {
    const newValue = data.split('/');
    return newValue[newValue.length - 2];
  }

  /**
   * Handles goBack event .
   *
   * @param path removes  the data by spliting by (/).
   *
   *check the conditon if it true store data in previousPath
   * else  store data in previousPath with previousPath.
   *
   * calls the getBucketList event
   */
  public goBack(path) {
    let previousPath: any;
    const tempPath = path.split('/');
    for (let i = 0; i < tempPath.length - 2; i++) {
      if (i === 0) {
        previousPath = tempPath[i] + '/';
      } else {
        previousPath = previousPath + tempPath[i] + '/';
      }
    }
    // this.folderPathNameUp=previousPath;
    if (previousPath === undefined) {
      previousPath = '';
    }
    this.getBucketList(previousPath);
  }

  /**
   * Handles deleteFile event .calls mediaSandbox deleteFile .
   *And subscribe for refreshing the page by calling getBucketList function.
   * @params file.
   */

  public deleteFile() {
    const params: any = {};
    params.fileName = this.deleteImage;
    this.mediaSandbox.deleteFile(params);
    this.mediaSandbox.getBucketDeleteFile$.subscribe(data => {
      if (data) {
        if (data.status === 1) {
          this.getBucketList(this.globalTempData);
          this.checkedData = [];
          this.unCheckData = [];
          this.multipleSelected = [];
        }
      }
    });
  }

  /**
   * Handles createFolder event .calls mediaSandbox getbuckcreatefolder .
   *
   * @param param.
   *
   * According to the condition it store the values in param.
   */
  public createFolder() {
    const param: any = {};
    if (this.currentFolder === '') {
      param.folderName = this.textValue + '/';
    } else {
      param.folderName = this.currentFolder + this.textValue + '/';
    }
    this.mediaSandbox.getbuckcreatefolder(param);
    this.mediaSandbox.getCreateFolderLoaded$.subscribe(data => {
      if (data === true) {
        this.createFolderEnable = false;
      }
    });
  }

  /**
   * Handles uploadImageAction event .calls  convertBase64 event.
   *
   * @param event.
   *
   * store the event in selecetdFile variable.
   */
  public uploadImageAction(event) {
    this.selecetdFile = event.target;
    if (this.selecetdFile) {
    }
    this.convertBase64(this.selecetdFile);
  }

  /**
   * Handles uploadImage event .calls  convertBase64 event.
   */
  public uploadImage() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  // Handles close event to close the image manager popup along with arguments
  close() {
    if (this.multipleSelected.length > 0) {
      this.modal.close(this.multipleSelected);
    } else {
      this.modal.close();
    }
  }

  /**
   * Handles convertBase64 event .converts the data into base 64 format.
   *
   * calls mediaSandbox getbuckupload
   *
   * @param inputValue from  uploadImageAction event.
   *
   * then calls close event.
   */
  private convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      const params: any = {};
      params.image = myReader.result;
      params.path = this.globalTempData;
      this.mediaSandbox.getbuckupload(params);
    };
    myReader.readAsDataURL(file);
  }

  /**
   * Handles regSubscribeEvents event .
   *
   * subscribe mediaSandbox getMediaCreatefold$
   *
   * subscribe mediaSandbox getMediaUpload$
   *
   * If the respose is succesfull then call getBucketList event.
   */
  private regSubscribeEvents() {
    this.subscriptions.push(
      this.mediaSandbox.getMediaCreatefold$.subscribe(create => {
        if (create && create.status === 1) {
          this.getBucketList(this.currentFolder);
        }
      })
    );
    this.subscriptions.push(
      this.mediaSandbox.getMediaUpload$.subscribe(upload => {
        if (upload && upload.status === 1) {
          this.getBucketLists(this.folderPathName);
        }
      })
    );
  }

  /** calls mediaSandbox searchFolders.
   * @param from event,
   * If no value it calls getBucketList.**/
  search_Folder(event) {
    if (event) {
      const param: any = {};
      param.folderName = this.vendorPrefixId + '/' + event;
      this.mediaSandbox.searchFolders(param);
    } else if (!event) {
      const folderPath = this.currentFolder;
      this.getBucketList(folderPath);
    }
  }

  folderPathTitles(file) {

  }

  folderPathTitle(file) {
    if (file.charAt(0) === '') {
    }

    this.folderPathNames = '';
    if (file !== '') {
      const tempData = file.split('/');
      for (let i = 0; i < tempData.length; i++) {
        this.folderPathNames += ' > ' + tempData[i];
      }
    }
  }

  // unsubscribing  all the subscribe event.
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public getImage(image) {
    let folderPath = '/';
    const tempData = image.split('/');
    const tempImage = tempData[tempData.length - 1];
    if (tempData.length > 1) {
      tempData.pop();
      folderPath = tempData.join('/') + '/';
    }
    this.globalTempData = tempData;
  }

   // store the checked file to delete
   fileCheckBox(event, file, ind) {
    this.deleteImage = event.target.value;
    if (event.target.checked === true) {
      this.checkedData.push(file);
  }
  if (event.target.checked === false) {
      this.unCheckData.push(file);
      this.unCheckData.forEach((value, index) => {
          this.checkedData = this.checkedData.filter(_value => {
              if (value === _value) {
                  return false;
              } else {
                  return true;
              }
          });
      });
    }
  }

  public selectFile(file) {
    const tempData = file.split('/');
    let folderPath: any = '';
    for (let i = 0; i < tempData.length - 1; i++) {
      folderPath = folderPath + tempData[i] + '/';
    }
    const param: any = {};
    param.containerName = folderPath;
    param.image = tempData[tempData.length - 1];
    this.multipleSelected.push(param);
    this.close();
  }

  registerImage() {
    this.checkedData.forEach(data => {
       if (data) {
          const tempData = data.split('/');
          let folderPath: any = '';
          for (let i = 0; i < tempData.length - 1; i++) {
            folderPath = folderPath + tempData[i] + '/';
          }
          const param: any = {};
          param.containerName = folderPath;
          param.image = tempData[tempData.length - 1];
          this.multipleSelected.push(param);
        }
    });
    this.close();
  }
}
