import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilterSandbox } from '../../../../../../../../core/admin/settings/siteSettings/filter/filter.sandbox';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



@Component({
  selector: 'app-filters',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class FiltersAddComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public filterForm: FormGroup;
  public submitted = false;
  private offset = 0;
  public pageSize = '10';
  private keyword = '';
  public selectedCategory: any = [];
  public section = [];
  public sectionName: any = [];
  public sectionItem: any = [];
  public categoryType = 'varient';
  public selectedVarient = [];
  public selectedFilter = [];
  public selectedAttribute = [];
  public categoryIds = [];
  public selectedAttributeList = [];
  public attributeListData = [];
  public varientListData = [];
  public mainArray = [];
  public selectedValues = [];
  public editFilterId: any = '';
  public checkValueExist: any;
  public attributeValue: any = '';
  public editMode = false;

  // mat chip variables
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  public attributeCtrl = new FormControl();
  public attributeValueArray = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public visible = true;
  public selectable = true;
  public removable = true;


  constructor(public categorySandbox: CategoriesSandbox, public sandbox: FilterSandbox,
              private router: Router,
              private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initFilterForm();
    this.editFilterId = this.route.snapshot.paramMap.get('id');
    this.categoryList();
    this.varientList();
    this.attributeList();
    if (this.editFilterId) {
      this.detailsFilter();
    } else {
      this.sandbox.clearVarientData('');
    }
    this.subscribeVarientList();
    this.detailsFilterSubscribe();
    this.subscribeAttributeList();
  }

  public initFilterForm(): void {
    this.filterForm = this.fb.group({
      filterName: ['',  Validators.required],
      categoryId: ['', Validators.required],
    },
    );
  }

  categoryList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = this.keyword;
    param.sortOrder = '';
    this.categorySandbox.categoryList(param);
  }

  varientList() {
    const param: any = {};
    param.limit = '';
    param.offset = this.offset;
    param.count = '';
    this.sandbox.varientList(param);
  }

  attributeList() {
    const param: any = {};
    param.limit = '';
    param.offset = this.offset;
    param.count = '';
    this.sandbox.attributeList(param);

  }
  onChange(event) {
    if (event) {
      this.selectedCategory = event;
    }
  }
  changeType(event) {
   this.categoryType = event.target.value;
  }
  changeVarient(event, item) {
    if (event.target.checked === true) {
      item.checkData = true;
      item.varientsValue.forEach(element => {
        element.checkData = true;
      });
      this.varientListData.forEach(element => {
         if (item.id !== element.id) {
          element.disableData = true;
         }
      });
      this.selectedVarient.push(item);
    } else if (event.target.checked === false) {
     item.checkData = false;
     item.varientsValue.forEach(element => {
      element.checkData = false;
    });
    this.selectedVarient = [];
    this.varientListData.forEach(element => {
      if (element.addedData == 1) {
        element.disableData = true;
      } else {
        element.disableData = false;
      }
    });
    }
  }

  addVarientFilter(val) {
    this.selectedValues = [];
    val.forEach(element => {
      this.selectedFilter.push({'name': element.name, 'id': element.variantParentId, 'parentId': element.id, 'values': this.selectedValues, 'sectionType': this.categoryType})
    });
    this.selectedFilter.forEach(element => {
      val.forEach(element1 => {
      if (element.id == element1.variantParentId) {
        element1.checkData = false;
        element1.varientsValue.forEach(element2 => {
          if (element2.checkData) {
            element.values.push({'valueId': element2.id, 'valueName': element2.valueName});
          }
        });
      }
    });
    });

    this.varientListData.forEach(element => {
      this.selectedFilter.forEach(element1 => {
        if (element.id == element1.id) {
         element.addedData = 1;
        }
      });
    });
    this.varientListData.forEach(element => {
      if (element.addedData == 1) {
        element.disableData = true;
      } else {
        element.disableData = false;
      }
    });
    this.selectedVarient = [];
  }

  updateVarientFilter(val) {
    this.editMode = false;
    this.selectedFilter.forEach(element => {
      val.forEach(element1 => {
        if (element.id == element1.variantParentId) {
         element.values = [];
         element1.varientsValue.forEach(element2 => {
           if (element2.checkData) {
            element.values.push({'valueId': element2.id, 'valueName': element2.valueName});
           }
         });
        }
      });
    });

    this.selectedVarient = [];
    this.varientListData.forEach(element => {
      this.selectedFilter.forEach(element1 => {
        if (element.id == element1.id) {
         element.addedData = 1;
        }
      });
      val.forEach(element2 => {
        if (element.id == element2.id) {
             element.checkData = false;
        }
      });
    });
    this.varientListData.forEach(element => {
      if (element.addedData == 1) {
        element.disableData = true;
      } else {
        element.disableData = false;
      }
    });
  }


  updateAttributeFilter(val) {
    this.editMode = false;
    this.selectedFilter.forEach(element => {
      val.forEach(element1 => {
        if (element.id == element1.attributeId) {
          element.values = [];
          this.attributeValueArray.forEach(attr => {
            element.values.push({'valueId': '', 'valueName': attr});
          });
        }
      });
    });

    this.attributeValue = '';
    this.attributeValueArray = [];

    this.attributeListData.forEach(element => {
      element.attribute.forEach(element1 => {
        val.forEach(element2 => {
          if (element2.attributeId == element1.attributeId) {
            element1.checkData = false;
            element1.addedData = 1;
          }
        });
      });
    });
    this.attributeListData.forEach(element => {
      element.attribute.forEach(element1 => {
          if (element1.addedData == 1) {
            element1.disableData = true;
          } else {
            element1.disableData = false;
          }
      });
    });
    this.selectedAttribute = [];
  }


  addAttributeFilter(val) {
    this.selectedValues = [];
    this.selectedAttribute = [];
    val.forEach(element => {
      this.selectedFilter.push({'name': element.attributeName, 'id': element.attributeId, 'values': this.selectedValues, 'sectionType': this.categoryType});
    });
    this.selectedFilter.forEach(element => {
      val.forEach(element1 => {
        if (element.id == element1.attributeId) {
          element.values = [];
          this.attributeValueArray.forEach(attr => {
            element.values.push({'valueId': '', 'valueName': attr});
          });
       }
      });
    });
    this.attributeValue = '';
    this.attributeValueArray = [];
    this.attributeListData.forEach(element => {
        element.attribute.forEach(element1 => {
          val.forEach(element2 => {
            if (element2.attributeId == element1.attributeId) {
              element1.checkData = false;
              element1.addedData = 1;
            }
          });
        });
      });
      this.attributeListData.forEach(element => {
        element.attribute.forEach(element1 => {
            if (element1.addedData == 1) {
              element1.disableData = true;
            } else {
              element1.disableData = false;
            }
        });
      });
  }

  clearValue(val, item) {
    val.checkData = false;
  }

  clearAttributeValue(val) {
      val.checkData = false;
      this.selectedAttribute = this.selectedAttribute.filter(data => {
        if (data.attributeId === val.attributeId) {
          return false;
        } else {
          return true;
        }
       });
  }


  changeAttribute(event, item, val) {
    if (event.target.checked === true) {
      item.checkData = true;
      this.attributeListData.forEach(element => {
        element.attribute.forEach(element1 => {
          if (element1.attributeId !== item.attributeId) {
            element1.disableData = true;
          }
        });
      });
      this.selectedAttribute.push(item);
    } else if (event.target.checked === false) {
      item.checkData = false;
      this.selectedAttribute = [];

      this.attributeListData.forEach(element => {
        element.attribute.forEach(element1 => {
          if (element1.addedData == 1) {
            element1.disableData = true;
          } else {
            element1.disableData = false;
          }
        });
      });
    }
  }


  clearSelectedFilter(item) {
    this.selectedFilter = this.selectedFilter.filter(data => {
      if (data.id === item.id) {
        return false;
      } else {
        return true;
      }
     });
     this.varientListData.forEach(element => {
       if (element.id == item.id) {
         element.addedData = 0;
         element.disableData = false;
       }
     });
     this.attributeListData.forEach(element => {
       element.attribute.forEach(element1 => {
         if (item.id == element1.attributeId) {
          element1.addedData = 0;
          element1.disableData = false;
         }
       });
     });
  }

  subscribeVarientList() {
    this.subscriptions.push(this.sandbox.varientList$.subscribe((response: any) => {
      if (response && response.length > 0) {
        this.varientListData = response;
      }
    }));
  }

  subscribeAttributeList() {
    this.subscriptions.push(this.sandbox.attributeList$.subscribe((response: any) => {
      if (response && response.length > 0) {
         this.attributeListData = response;
      }
    }));
  }

  saveFilter() {
    this.submitted = true;
    this.categoryIds = [];
    this.sectionItem =[];
    this.section =      [];
    if (!this.filterForm.valid) {
      this.validateAllFormFields(this.filterForm);
      $('input.ng-invalid').first().focus();
      return;
    }
    this.filterForm.value.categoryId.forEach(element => {
      this.categoryIds.push(element.categoryId);
    });
    this.selectedFilter.forEach(element => {
      this.sectionItem = [];
      element.values.forEach(element1 => {
          this.sectionItem.push(element1.valueName);
      });
      this.section.push(
        {'sectionType': element.sectionType === 'varient' ? 1 : 2,
        'sectionName': element.name,
        'sectionItem': this.sectionItem,
        'sectionId': element.sectionType === 'varient' ? element.parentId : element.id,
      }
        );
    });
    const params: any = {};
    params.filterName = this.filterForm.value.filterName;
    params.categoryId = this.categoryIds;
    params.section = this.section;
    if (this.editFilterId) {
      params.editId = this.editFilterId;
      this.sandbox.updateFilter(params);
    } else {
      this.sandbox.createFilter(params);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  detailsFilter() {
    this.sandbox.getFilter(this.editFilterId);
  }

  detailsFilterSubscribe() {
    this.subscriptions.push(this.sandbox.getFilter$.subscribe((response: any) => {
      if (response && response.filterName) {
         this.categoryType = 'varient';
         this.filterForm.controls['filterName'].setValue(response.filterName);
         this.filterForm.controls['categoryId'].setValue(response.siteFilterCategory);
         this.selectedFilter = [];
         response.siteFiltersection.forEach(element => {
           if (element.sectionType === 1) {
            this.selectedFilter.push({'name': element.sectionName, 'id': 'var' + element.sectionId, 'parentId': element.sectionId, 'values': this.selectedValues, 'sectionType': element.sectionType == 1 ? 'varient' : 'attribute'})
           } else {
            this.selectedFilter.push({'name': element.sectionName, 'id': element.sectionId, 'values': this.selectedValues, 'sectionType': element.sectionType == 1 ? 'varient' : 'attribute'})

           }
         });
         this.selectedFilter.forEach(element => {
           response.siteFiltersection.forEach(element1 => {
             if (element.name == element1.sectionName) {
                element.values = [];
                element1.sectionItem.forEach(element5 => {
                  element.values.push({'valueId': element5.id, 'valueName': element5.itemName})
                });
             }
           });
         });
         this.varientListData.forEach(element => {
           this.selectedFilter.forEach(element1 => {
             if (element.id == element1.id) {
                element.disableData = true;
                element.addedData = 1;
             }
           });
         });
         this.attributeListData.forEach(element => {
           element.attribute.forEach(element1 => {
             this.selectedFilter.forEach(element2 => {
               if (element2.id == element1.attributeId) {
                element1.disableData = true;
                element1.addedData = 1;
               }
             });
           });
         });
      }
    }));
  }

  editSelectedFilter(item) {
    this.categoryType = item.sectionType;
    this.editMode = true;
    if (item.sectionType == 'varient') {
     this.selectedVarient = [];

     this.varientListData.forEach(element => {
       if (element.variantParentId == item.id) {
         element.checkData = true;
         element.varientsValue.forEach(element1 => {
           item.values.forEach(element2 => {
             if (element1.valueName == element2.valueName) {
               element1.checkData = true;
             }
           });
         });
       } else {
         element.checkData = false;
         element.disableData = true;
       }
     });
     this.varientListData.forEach(element => {
       if (element.variantParentId == item.id) {
        this.selectedVarient.push(element);
       }
     });
    } else  if (item.sectionType == 'attribute') {
      this.selectedAttribute = [];
      this.attributeListData.forEach(element => {
        element.attribute.forEach(element1 => {
          if (element1.attributeId == item.id) {
            element1.checkData = true;
            this.selectedAttribute.push(element1);
            item.values.forEach(element2 => {
              // this.attributeValue = element2.valueName;
              this.attributeValueArray.push(element2.valueName);
            });
          } else {
            element1.checkData = false;
            element1.disableData = true;
          }
        });
      });

    }
  }

  searchVarient(event) {
    this.sandbox.searchVarient(event.target.value);
  }

  searchAttribute(event) {
    this.sandbox.searchAttribute(event.target.value);
  }

  cancel() {
    this.router.navigate(['/settings/sitesettings/filter/list']);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.attributeValueArray.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
    this.attributeCtrl.setValue(null);
  }

  remove(value: string): void {
    const index = this.attributeValueArray.indexOf(value);
    if (index >= 0) {
      this.attributeValueArray.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
