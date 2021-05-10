import { Injectable } from '@angular/core';
import { Promise } from 'es6-promise';
import { Api } from '../../../../../../core/admin/providers/api/api';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class PermissionServices extends Api {
  private URL = environment.baseUrl;
  permissions: any = []; // Store the actions for which this user has permission
  currentUser: any;

  hasPermission(authGroup: string): Promise<boolean> | boolean {
    this.permissions = localStorage.getItem('permissions')
      ? JSON.parse(localStorage.getItem('permissions'))
      : {};
    const role: number = localStorage.getItem('adminUser')
      ? JSON.parse(localStorage.getItem('adminUser'))
      : {};
    const permissionKeys = this.permissions
      ? Object.keys(this.permissions)
      : [];
    if (role['usergroup'].groupId === 1) {
      return true;
    } else if (
      permissionKeys.length > 0 &&
      permissionKeys.indexOf(authGroup) > -1 &&
      this.permissions[authGroup]
    ) {
      return true;
    }
  }

  // This method is called once and a list of permissions is stored in the permissions property
  initializePermissions() {
    return new Promise((resolve, reject) => {
      // Call API to retrieve the list of actions this user is permitted to perform.
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      this.http
        .get<any>(this.URL + '/permission-module/permission-me')
        .subscribe(
          response => {
            const permissions = response.data;
            const permissionKeys = response.data
              ? Object.keys(response.data).filter(function (el) {
                return response.data[el] === true;
              })
              : [];
            permissions['sales'] = false;
            permissions['sales-payments'] = false;
            permissions['catalog'] = false;
            permissions['catalog-product'] = false;
            permissions['catalog-brand'] = false;
            permissions['catalog-category'] = false;
            permissions['catalog-product-option'] = false;
            permissions['catalog-rating-review'] = false;
            permissions['catalog-coupon'] = false;
            permissions['customers'] = false;
            permissions['customers-customer'] = false;
            permissions['customer-groups'] = false;
            permissions['cms'] = false;
            permissions['cms-pages'] = false;
            permissions['cms-banners'] = false;
            permissions['cms-blogs'] = false;
            permissions['services'] = false;
            permissions['services-lists'] = false;
            permissions['services-category'] = false;
            permissions['services-enquiry'] = false;
            permissions['services-lead'] = false;
            permissions['marketplace'] = false;
            permissions['marketplace-vendor'] = false;
            permissions['vendor-list'] = false;
            permissions['vendor-product'] = false;
            permissions['vendor-settings'] = false;
            permissions['marketplace-sales'] = false;
            permissions['marketplace-payments'] = false;
            permissions['settings'] = false;
            permissions['settings-role'] = false;
            permissions['settings-user'] = false;
            permissions['settings-general-setting'] = false;
            permissions['settings-site'] = false;
            permissions['settings-local'] = false;
            permissions['settings-personalize'] = false;


            // payment permission
            if ((permissionKeys.indexOf('list-order') > -1 && permissions['list-order'])) {
              permissions['sales'] = true;
            }
            if (
              (permissionKeys.indexOf('list-sales-payments') > -1 &&
                permissions['list-sales-payments'])
            ) {
              permissions['sales-payments'] = true;
              permissions['sales'] = true;
            }
            // product permission
            if (
              (permissionKeys.indexOf('create-product') > -1 &&
                permissions['create-product']) ||
              (permissionKeys.indexOf('list-product') > -1 &&
                permissions['list-product'])
            ) {
              permissions['catalog-product'] = true;
              permissions['catalog'] = true;
            }
            // create permission
            if (
              (permissionKeys.indexOf('create-category') > -1 &&
                permissions['create-category']) ||
              (permissionKeys.indexOf('list-category') > -1 &&
                permissions['list-category'])
            ) {
              permissions['catalog-category'] = true;
              permissions['catalog'] = true;
            }
            // create product option permission
            if (
              (permissionKeys.indexOf('create-product-option') > -1 &&
                permissions['create-product-option']) ||
              (permissionKeys.indexOf('list-product-option') > -1 &&
                permissions['list-category'])
            ) {
              permissions['catalog-product-option'] = true;
              permissions['catalog'] = true;
            }
            // list rating review permission
            if (
              permissionKeys.indexOf('list-rating-review') > -1 &&
              permissions['list-rating-review']
            ) {
              permissions['catalog-rating-review'] = true;
              permissions['catalog'] = true;
            }
            // create coupon permission
            if (
              permissionKeys.indexOf('create-coupon') > -1 &&
              permissions['create-coupon'] ||
              (permissionKeys.indexOf('list-coupon') > -1 &&
                permissions['list-coupon'])
            ) {
              permissions['catalog-coupon'] = true;
              permissions['catalog'] = true;
            }
            // create brand permission
            if (
              permissionKeys.indexOf('create-brands') > -1 &&
              permissions['create-brands'] ||
              (permissionKeys.indexOf('list-brands') > -1 &&
                permissions['list-brands'])
            ) {
              permissions['catalog-brand'] = true;
              permissions['catalog'] = true;
            }
            // customer list permission
            if (
              (permissionKeys.indexOf('create-customer') > -1 &&
                permissions['create-customer']) ||
              (permissionKeys.indexOf('list-customer') > -1 &&
                permissions['list-customer'])
            ) {
              permissions['customers-customer'] = true;
              permissions['customers'] = true;
            }
            // customer customer group permission
            if (
              (permissionKeys.indexOf('create-customer-group') > -1 &&
                permissions['create-customer-group']) ||
              (permissionKeys.indexOf('list-customer-group') > -1 &&
                permissions['list-customer-group'])
            ) {
              permissions['customer-groups'] = true;
              permissions['customers'] = true;
            }
            // pages permission
            if (
              (permissionKeys.indexOf('create-pages') > -1 &&
                permissions['create-pages']) ||
              (permissionKeys.indexOf('list-pages') > -1 &&
                permissions['list-pages'])
            ) {
              permissions['cms-pages'] = true;
              permissions['cms'] = true;
            }
            // banner permission
            if (
              (permissionKeys.indexOf('create-banners') > -1 &&
                permissions['create-banners']) ||
              (permissionKeys.indexOf('list-banners') > -1 &&
                permissions['list-banners'])
            ) {
              permissions['cms-banners'] = true;
              permissions['cms'] = true;
            }
            // blogs permission
            if (
              (permissionKeys.indexOf('create-blogs') > -1 &&
                permissions['create-blogs']) ||
              (permissionKeys.indexOf('list-blogs') > -1 &&
                permissions['list-blogs'])
            ) {
              permissions['cms-blogs'] = true;
              permissions['cms'] = true;
            }
            // service list permission
            if (
              (permissionKeys.indexOf('create-services') > -1 &&
                permissions['create-services']) ||
              (permissionKeys.indexOf('list-services') > -1 &&
                permissions['list-services'])
            ) {
              permissions['services-lists'] = true;
              permissions['services'] = true;
            }
            // service category permission
            if (
              (permissionKeys.indexOf('create-service-category') > -1 &&
                permissions['create-service-category']) ||
              (permissionKeys.indexOf('list-service-category') > -1 &&
                permissions['list-service-category'])
            ) {
              permissions['services-category'] = true;
              permissions['services'] = true;
            }
            // service enquiry permission
            if (
              permissionKeys.indexOf('list-service-enquiry') > -1 &&
              permissions['list-service-enquiry']
            ) {
              permissions['service-enquiry'] = true;
              permissions['services'] = true;
            }
            // service lead permission
            if (
              permissionKeys.indexOf('list-leads') > -1 &&
              permissions['list-leads']
            ) {
              permissions['services-lead'] = true;
              permissions['services'] = true;
            }
            if (
              (permissionKeys.indexOf('create-vendor') > -1 &&
                permissions['create-vendor']) ||
              (permissionKeys.indexOf('list-vendor') > -1 &&
                permissions['list-vendor'])
            ) {
              permissions['marketplace'] = true;
              permissions['marketplace-vendor'] = true;
              permissions['vendor-list'] = true;
            }
            if (
              (permissionKeys.indexOf('create-market-place-product') > -1 &&
                permissions['create-market-place-product']) ||
              (permissionKeys.indexOf('list-market-place-product') > -1 &&
                permissions['list-market-place-product'])
            ) {
              permissions['marketplace'] = true;
              permissions['marketplace-vendor'] = true;
              permissions['vendor-product'] = true;
            }
            if (
              (permissionKeys.indexOf('assign-category') > -1 &&
                permissions['assign-category']) ||
              (permissionKeys.indexOf('set-vendor-commission') > -1 &&
                permissions['set-vendor-commission'])
            ) {
              permissions['vendor-settings'] = true;
              permissions['marketplace-vendor'] = true;
              permissions['marketplace'] = true;
            }
            if (
              permissionKeys.indexOf('list-sales') > -1 &&
              permissions['list-sales']
            ) {
              permissions['marketplace'] = true;
              permissions['marketplace-sales'] = true;
            }
            if (
              (permissionKeys.indexOf('list-payment') > -1 &&
                permissions['list-payment']) ||
              (permissionKeys.indexOf('export-all-payment') > -1 &&
                permissions['export-all-payment'])
            ) {
              permissions['marketplace'] = true;
              permissions['marketplace-payments'] = true;
            }

            // setting role
            if (
              (permissionKeys.indexOf('list-role') > -1 &&
                permissions['list-role'])
            ) {
              permissions['settings'] = true;
              permissions['settings-role'] = true;
            }


            // setting user
            if (
              (permissionKeys.indexOf('list-user') > -1 &&
                permissions['list-user'])
            ) {
              permissions['settings'] = true;
              permissions['settings-user'] = true;
            }


            if (
              (permissionKeys.indexOf('list-country') > -1 &&
                permissions['list-country'])
            ) {
              permissions['settings-local'] = true;
              permissions['settings'] = true;
            }
            if (
              (permissionKeys.indexOf('list-language') > -1 &&
                permissions['list-language'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }
            if (
              (permissionKeys.indexOf('list-currency') > -1 &&
                permissions['list-currency'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }
            if (
              (permissionKeys.indexOf('list-tax') > -1 &&
                permissions['list-tax'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }
            if (
              (permissionKeys.indexOf('list-order-status') > -1 &&
                permissions['list-order-status'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }
            if (
              (permissionKeys.indexOf('list-stock-status') > -1 &&
                permissions['list-stock-status'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }
            if (
              (permissionKeys.indexOf('list-email-template') > -1 &&
                permissions['list-email-template'])
            ) {
              permissions['settings'] = true;
              permissions['settings-local'] = true;
            }


          // general settins

          if (
            (permissionKeys.indexOf('edit-general-settings') > -1 &&
            permissions['edit-general-settings'])
          ) {
            permissions['settings'] = true;
            permissions['settings-general-setting'] = true;
          }

          // pesonalize

           if (
            (permissionKeys.indexOf('edit-personalize-order') > -1 &&
            permissions['edit-personalize-order'])
          ) {
            permissions['settings'] = true;
            permissions['settings-personalize'] = true;
          }

          if (
            (permissionKeys.indexOf('edit-personalize-product') > -1 &&
            permissions['edit-personalize-product'])
          ) {
            permissions['settings'] = true;
            permissions['settings-personalize'] = true;
          }

          // site settings

          if (
            (permissionKeys.indexOf('edit-seo-url') > -1 &&
            permissions['edit-seo-url'])
          ) {
            permissions['settings'] = true;
            permissions['settings-site'] = true;
          }

          if (
            (permissionKeys.indexOf('edit-social-url') > -1 &&
            permissions['edit-social-url'])
          ) {
            permissions['settings'] = true;
            permissions['settings-site'] = true;
          }

          // localizations

          if (
            (permissionKeys.indexOf('list-zone') > -1 &&
            permissions['list-zone'])
          ) {
            permissions['settings'] = true;
            permissions['settings-local'] = true;
          }

            this.permissions = permissions;
            localStorage.setItem(
              'permissions',
              JSON.stringify(this.permissions)
            );
            resolve(true);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
