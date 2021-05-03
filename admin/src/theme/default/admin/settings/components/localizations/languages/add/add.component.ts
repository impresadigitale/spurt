/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';

@Component({
  selector: 'app-settings-language-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class LanguageAddComponent implements OnInit {

  public updatetTitle: number;
  public ImageUrl: any = '';
  @ViewChild('filePath') filePath: ElementRef;
  public language: FormGroup;
  public submitted = false;
  public name: FormControl;
  public code: FormControl;
  public sortorder: FormControl;
  public status: FormControl;
  public postImageUrl: any;
  public imageUrl: string;
  private languageInfo: any = [];
  private editLanguageId: any;

  constructor(
    public fb: FormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    public Sandbox: LanguagesSandbox,
    private router: Router,
    public service: LanguagesService,
    private configService: ConfigService
  ) {}

  get f() {
    return this.language.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls initForm, languageList.
   *
   * get image url from configService.
   */
  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.postImageUrl = './assets/upload-banner/upload.png';
    this.initForm();
    this.editLanguageId = this.route.snapshot.paramMap.get('id');
    this.languageList();
  }

  initForm() {
    this.name = new FormControl('',  Validators.compose([
      Validators.required,
      Validators.maxLength(32)
    ]));
    this.code = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(5)
    ]));
    this.sortorder = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);
    this.language = this.fb.group({
      name: this.name,
      code: this.code,
      sortorder: this.sortorder,
      status: this.status
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Laguage UpdateLanguage and AddLanguage function if form is valid.
   *
   * @param language entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.language.invalid) {
      this.validateAllFormFields(this.language);

      return;
    }
    const params: any = {};
    params.code = this.language.value.code;
    params.name = this.language.value.name;
    params.status = this.language.value.status;
    params.sortorder = this.language.value.sortorder;
    params.image = this.ImageUrl;
    if (this.languageInfo && this.languageInfo[0]) {
      params.languageId = this.languageInfo[0].languageId;
      this.Sandbox.updateLanguage(params);
    } else {
      this.Sandbox.addLanguage(params);
    }
  }

  cancel() {
    this.service.languageSetData('');
    this.router.navigate(['/settings/local/language']);
  }

  languageList() {
    this.languageInfo.push(this.service.languageGetData());
    if (this.languageInfo[0] !== null) {
      if (this.languageInfo[0] && this.languageInfo[0].name) {
        this.updatetTitle = 1;
        this.name = this.languageInfo[0].name;
        this.status = this.languageInfo[0].status;
        this.code = this.languageInfo[0].code;
        this.sortorder = this.languageInfo[0].sortorder;
        this.postImageUrl =
          this.imageUrl + '?path=' +
          `${this.languageInfo[0].imagePath}` + '&name=' +
          `${this.languageInfo[0].image}` +
          '&width=160&height=150';
        this.changeDetectRef.detectChanges();
        this.language.controls['name'].setValue(this.languageInfo[0].name);
        this.language.controls['code'].setValue(this.languageInfo[0].code);
        this.language.controls['sortorder'].setValue(
          this.languageInfo[0].sortOrder
        );
        this.language.controls['status'].setValue(
          this.languageInfo[0].isActive
        );
      }
    }
  }

  uploadButtonClick() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }

  uploadChange($event): void {
    this.convertBase64($event.target);
  }

  convertBase64(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = e => {
      this.postImageUrl = myReader.result;
      this.ImageUrl = myReader.result;
      this.changeDetectRef.detectChanges();
    };
    myReader.readAsDataURL(file);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
