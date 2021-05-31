define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/apidoc/main.js",
    "group": "/home/piccirillo/Scrivania/spurt/api/src/public/apidoc/main.js",
    "groupTitle": "/home/piccirillo/Scrivania/spurt/api/src/public/apidoc/main.js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/api/address/delete-address/:id",
    "title": "Delete Address API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/delete-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "DeleteApiAddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/address/addresslist",
    "title": "Address List API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/addresslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressAddresslist"
  },
  {
    "type": "get",
    "url": "/api/address/get-address-list/:id",
    "title": "Get Customer Address  API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/get-address-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressGetAddressListId"
  },
  {
    "type": "post",
    "url": "/api/address/add-address",
    "title": "Add Customer Address API",
    "group": "Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/add-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addAddress error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PostApiAddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/address/update-address/:id",
    "title": "Update Address API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/update-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PutApiAddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/vendor-setting/get-vendor-settings",
    "title": "Get Vendor Setting API",
    "group": "Admin-Vendor-Setting",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get vendor settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-setting/get-vendor-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorSettingController.ts",
    "groupTitle": "Admin-Vendor-Setting",
    "name": "GetApiVendorSettingGetVendorSettings"
  },
  {
    "type": "post",
    "url": "/api/vendor-setting/create-vendor-settings",
    "title": "Create Vendor Settings API",
    "group": "Admin-Vendor-Setting",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "defaultCommission",
            "description": "<p>default commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"defaultCommission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created Vendor Setting.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-setting/create-vendor-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorSettingController.ts",
    "groupTitle": "Admin-Vendor-Setting",
    "name": "PostApiVendorSettingCreateVendorSettings"
  },
  {
    "type": "delete",
    "url": "/api/admin-coupon/delete-coupon/:vendorCouponId",
    "title": "Delete Vendor Coupon API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor coupon.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/delete-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Vendor Coupon API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "DeleteApiAdminCouponDeleteCouponVendorcouponid"
  },
  {
    "type": "get",
    "url": "/api/admin-coupon/admin-coupon-list",
    "title": "Admin Vendor Coupon List API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter Coupon Name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Vendor Coupon List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/admin-coupon-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "GetApiAdminCouponAdminCouponList"
  },
  {
    "type": "get",
    "url": "/api/admin-coupon/coupon-detail",
    "title": "Coupon Detail API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorCouponId",
            "description": "<p>VendorCouponId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully got vendor coupon detail\",\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/coupon-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon Detail API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "GetApiAdminCouponCouponDetail"
  },
  {
    "type": "get",
    "url": "/api/admin-coupon/coupon-usage-list",
    "title": "Coupon Usage list API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponId",
            "description": "<p>couponId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"couponId\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"coupon usage List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/coupon-usage-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "GetApiAdminCouponCouponUsageList"
  },
  {
    "type": "post",
    "url": "/api/admin-coupon/add-coupon",
    "title": "Add Vendor Coupon API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/add-coupon"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "PostApiAdminCouponAddCoupon"
  },
  {
    "type": "put",
    "url": "/api/admin-coupon/update-coupon/:vendorCouponId",
    "title": "Edit Vendor Coupon API",
    "group": "Admin_Coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-coupon/update-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CouponController.ts",
    "groupTitle": "Admin_Coupon",
    "name": "PutApiAdminCouponUpdateCouponVendorcouponid"
  },
  {
    "type": "delete",
    "url": "/api/admin-delivery-location/delete-delivery-location/:deliveryLocationId",
    "title": "Delete Delivery Location API",
    "group": "Admin_Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"deliveryLocationId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted delivery location.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/delete-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "DeleteApiAdminDeliveryLocationDeleteDeliveryLocationDeliverylocationid"
  },
  {
    "type": "get",
    "url": "/api/admin-delivery-location/delivery-location-list",
    "title": "Delivery Location List API",
    "group": "Admin_Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter delivery location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Location List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/delivery-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "GetApiAdminDeliveryLocationDeliveryLocationList"
  },
  {
    "type": "get",
    "url": "/api/admin-delivery-location/download-delivery-location",
    "title": "Download Delivery Location",
    "group": "Admin_Delivery_Location",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the file..!!\",\n     \"status\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/download-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "GetApiAdminDeliveryLocationDownloadDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/admin-delivery-location/add-delivery-location",
    "title": "Add Delivery Location API",
    "group": "Admin_Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>zipCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>locationName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Location Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/add-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Admin Delivery Location error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "PostApiAdminDeliveryLocationAddDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/admin-delivery-location/import-delivery-location",
    "title": "Import Delivery Location",
    "group": "Admin_Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "deliveryLocationData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/import-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "PostApiAdminDeliveryLocationImportDeliveryLocation"
  },
  {
    "type": "put",
    "url": "/api/admin-delivery-location/update-delivery-location/:deliveryLocationId",
    "title": "Update Delivery Location API",
    "group": "Admin_Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>Location Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Updated successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-delivery-location/update-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/DeliveryLocationController.ts",
    "groupTitle": "Admin_Delivery_Location",
    "name": "PutApiAdminDeliveryLocationUpdateDeliveryLocationDeliverylocationid"
  },
  {
    "type": "delete",
    "url": "/api/admin-product-answer/delete-answer/:answerId",
    "title": "Delete Answer API",
    "group": "Admin_Product_Answer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Question.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/delete-answer/:answerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "DeleteApiAdminProductAnswerDeleteAnswerAnswerid"
  },
  {
    "type": "get",
    "url": "/api/admin-product-answer/answer-list",
    "title": "Answer List API",
    "group": "Admin_Product_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "questionId",
            "description": "<p>questionId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get answer list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/answer-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "GetApiAdminProductAnswerAnswerList"
  },
  {
    "type": "post",
    "url": "/api/admin-product-answer/add-answer",
    "title": "Add Answer API",
    "group": "Admin_Product_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "questionId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"answer\" : \"\",\n     \"questionId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Answer created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/add-answer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "PostApiAdminProductAnswerAddAnswer"
  },
  {
    "type": "put",
    "url": "/api/admin-product-answer/make-default-answer/:answerId",
    "title": "Make Default Answer API",
    "group": "Admin_Product_Answer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Updated Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/make-default-answer/:answerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "answer  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "PutApiAdminProductAnswerMakeDefaultAnswerAnswerid"
  },
  {
    "type": "put",
    "url": "/api/admin-product-answer/update-answer/:answerId",
    "title": "Update Answer API",
    "group": "Admin_Product_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": "<p>answer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"answer\" : \"\",\n     \"questionId\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Answer is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/update-answer/:answerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "PutApiAdminProductAnswerUpdateAnswerAnswerid"
  },
  {
    "type": "put",
    "url": "/api/admin-product-answer/update-answer-status/:answerId",
    "title": "Update Answer status API",
    "group": "Admin_Product_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status should be 0 | 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Status Updated Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-answer/update-answer-status/:answerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "answer  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductAnswerController.ts",
    "groupTitle": "Admin_Product_Answer",
    "name": "PutApiAdminProductAnswerUpdateAnswerStatusAnswerid"
  },
  {
    "type": "delete",
    "url": "/api/admin-product-question/delete-question/:questionId",
    "title": "Delete Question API",
    "group": "Admin_Product_Question",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Question.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-question/delete-question/:questionId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Question error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductQuestionController.ts",
    "groupTitle": "Admin_Product_Question",
    "name": "DeleteApiAdminProductQuestionDeleteQuestionQuestionid"
  },
  {
    "type": "get",
    "url": "/api/admin-product-question/question-list",
    "title": "Question List API",
    "group": "Admin_Product_Question",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get question list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-question/question-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "question error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductQuestionController.ts",
    "groupTitle": "Admin_Product_Question",
    "name": "GetApiAdminProductQuestionQuestionList"
  },
  {
    "type": "post",
    "url": "/api/admin-product-question/add-question",
    "title": "Add Question API",
    "group": "Admin_Product_Question",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"question\" : \"\",\n     \"productId\" : \"\",\n     \"answer\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Question created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-question/add-question"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Question error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductQuestionController.ts",
    "groupTitle": "Admin_Product_Question",
    "name": "PostApiAdminProductQuestionAddQuestion"
  },
  {
    "type": "put",
    "url": "/api/admin-product-question/update-question/:questionId",
    "title": "Update Question API",
    "group": "Admin_Product_Question",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": "<p>question</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"question\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Question is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-question/update-question/:questionId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateQuestion error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductQuestionController.ts",
    "groupTitle": "Admin_Product_Question",
    "name": "PutApiAdminProductQuestionUpdateQuestionQuestionid"
  },
  {
    "type": "put",
    "url": "/api/admin-product-question/update-question-status/:questionId",
    "title": "Update Question status API",
    "group": "Admin_Product_Question",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status should be 0 | 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" status updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-product-question/update-question-status/:questionId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateQuestion error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductQuestionController.ts",
    "groupTitle": "Admin_Product_Question",
    "name": "PutApiAdminProductQuestionUpdateQuestionStatusQuestionid"
  },
  {
    "type": "get",
    "url": "/api/admin-quotation/quotation-request-list",
    "title": "Quotation Request List",
    "group": "Admin_Quotation",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"productName\": \"\",\n     \"startDate\": \"\",\n     \"endDate\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-quotation/quotation-request-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "quotation List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AdminQuotationController.ts",
    "groupTitle": "Admin_Quotation",
    "name": "GetApiAdminQuotationQuotationRequestList"
  },
  {
    "type": "delete",
    "url": "/api/vendor-category/delete-vendor-category/:id",
    "title": "Delete Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/delete-vendor-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "DeleteApiVendorCategoryDeleteVendorCategoryId"
  },
  {
    "type": "get",
    "url": "/api/vendor-category/vendorCategoryList/:id",
    "title": "Vendor Category List API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor category list\",\n     \"data\":{\n      \"vendorId\" : \"\",\n      \"vendorCategoryId\" : \"\",\n      \"categoryId\" : \"\",\n      \"commission\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/vendorCategoryList/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "GetApiVendorCategoryVendorcategorylistId"
  },
  {
    "type": "post",
    "url": "/api/vendor-category/create-vendor-category",
    "title": "Create Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"categoryId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added category\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/create-vendor-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "PostApiVendorCategoryCreateVendorCategory"
  },
  {
    "type": "put",
    "url": "/api/vendor-category/update-vendor-category",
    "title": "Update Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"categoryId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully update\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/update-vendor-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "PutApiVendorCategoryUpdateVendorCategory"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-detail",
    "title": "Order Detail API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-list",
    "title": "Order List API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderOrderList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/vendor-order-list",
    "title": "Vendor Order list API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, company name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountFrom",
            "description": "<p>search by starting amount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountTo",
            "description": "<p>search by ending Amount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorIds",
            "description": "<p>search by vendorIds</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>search by orderStatus</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/vendor-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderVendorOrderList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/vendor-order-log-list",
    "title": "Vendor Order Log List API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor order log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/vendor-order-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderVendorOrderLogList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/export-bulk-order-payment-list",
    "title": "Export Bulk Order Payment List API",
    "group": "Admin_Vendor_Payment",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully export payment list\",\n     \"data\": \"{}\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/export-bulk-order-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Export error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentExportBulkOrderPaymentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-archive-list",
    "title": "Vendor Payment Archive List API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment Archive list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-archive-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentArchiveList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-dashboard-count",
    "title": "Payment Dashboard Count API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Payment Dashboard..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-dashboard-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentDashboardCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-detail",
    "title": "Payment Detail API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Payment Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentDetail"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-list",
    "title": "Payment List API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-list-count",
    "title": "Payment List Count API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/vendor-order-payment-export",
    "title": "Admin vendor order payment export",
    "group": "Admin_Vendor_Payment",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor order payment List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/vendor-order-payment-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentVendorOrderPaymentExport"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor-payment/make-vendor-payment-archive",
    "title": "Make Vendor Payment Archive API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorPaymentId",
            "description": "<p>VendorPaymentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorPaymentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archived Payments\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/make-vendor-payment-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "PostApiAdminVendorPaymentMakeVendorPaymentArchive"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/bulk-vendor-product-excel-list",
    "title": "Bulk Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/bulk-vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductBulkVendorProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-count",
    "title": "Vendor Product Count API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor product count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Admin Vendor Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-detail/:id",
    "title": "Vendor Product Detail API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-excel-list",
    "title": "Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-list",
    "title": "Vendor Product List API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor product list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductList"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-excel-list",
    "title": "Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiVendorProductVendorProductExcelList"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor-product/create-vendor-product",
    "title": "Create Vendor Product API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorProductCommission",
            "description": "<p>vendorProductCommission</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>pincodeBasedDelivery</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"hsn\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"manufacturerId\" : \"\",\n     \"categoryId\" : \"\",\n     \"manufacturerId\" : \"\",\n     \"productSlug\" : \"\",\n     \"pincodeBasedDelivery\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":,\n     \"isActive\":,\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"vendorProductCommission\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Vendor product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/create-vendor-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PostApiAdminVendorProductCreateVendorProduct"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/add-product-status/:id",
    "title": "Add Vendor Product Status API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>either should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/add-product-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductAddProductStatusId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/approve-product/:id",
    "title": "Product Approval API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "approvalFlag",
            "description": "<p>approval flag should be 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"approvalFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully approved product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/approve-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductApproveProductId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/update-vendor-product-commission",
    "title": "Update Vendor Product Commission",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "commission",
            "description": "<p>Commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully update product commission.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/update-vendor-product-commission"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductUpdateVendorProductCommission"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/update-vendor-product/:id",
    "title": "Update Vendor Product API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorProductCommission",
            "description": "<p>vendorProductCommission</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>pincodeBasedDelivery</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"pincodeBasedDelivery\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"hsn\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"id\":\"\"\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":\"\"\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"vendorProductCommission\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/update-vendor-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductUpdateVendorProductId"
  },
  {
    "type": "delete",
    "url": "/api/admin-vendor/delete-vendor/:id",
    "title": "Delete single Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/delete-vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "DeleteApiAdminVendorDeleteVendorId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/customer-document-list",
    "title": "Get Customer Document List",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"search\" : \"\",\n     \"vendorId\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer document list\",\n\"data\":{},\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/customer-document-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorCustomerDocumentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/download-customer-document/:customerDocumentId",
    "title": "Download Customer Document API",
    "group": "Admin_vendor",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerDocumentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully download customer document file.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/download-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorDownloadCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendor-count",
    "title": "Vendor Count API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendor-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Admin Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendor-details/:id",
    "title": "Vendor Details API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor Details\",\n\"data\":{\n\"vendorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendor-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorDetailsId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendor-excel-list",
    "title": "Vendor Excel",
    "group": "Admin_vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Vendor Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendor-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendorlist",
    "title": "Vendor List API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendorlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorlist"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor/add-vendor",
    "title": "Add Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Vendor firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Vendor lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Vendor email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Vendor mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Vendor password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Vendor confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Vendor avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCoverImage",
            "description": "<p>companyCoverImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyCountryId",
            "description": "<p>company country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"commission\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyDescription\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"companyCountryId\" : \"\",\n     \"pincode\" : \"\",\n     \"companyCoverImage\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"mailStatus\" : \"\",\n     \"paymentInformation\": \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/add-vendor"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PostApiAdminVendorAddVendor"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor/delete-multiple-vendor",
    "title": "Delete Multiple Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted vendors.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/delete-multiple-vendor"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PostApiAdminVendorDeleteMultipleVendor"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/approve-vendor/:id",
    "title": "Vendor Approval API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "approvalFlag",
            "description": "<p>approval flag should be 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"approvalFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully approved vendor.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/approve-vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorApproveVendorId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-order/make-archive/:orderId",
    "title": "Make Archive/revoke API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "archiveFlag",
            "description": "<p>archive flag should should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"archiveFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully .\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/make-archive/:orderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorOrderMakeArchiveOrderid"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/update-vendor-commission/:vendorId",
    "title": "Update Vendor Commission API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated vendor commission\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/update-vendor-commission/:vendorId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorUpdateVendorCommissionVendorid"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/Update-Vendor/:id",
    "title": "Update Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Vendor firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Vendor lastName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCoverImage",
            "description": "<p>companyCoverImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyCountryId",
            "description": "<p>company country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"avatar\" : \"\",\n     \"commission\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyCoverImage\" : \"\",\n     \"companyDescription\" : \"\",\n     \"paymentInformation\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"companyCountryId\" : \"\",\n     \"pincode\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor Updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/Update-Vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorUpdateVendorId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/update-vendor-slug",
    "title": "Update Vendor Name Slug API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Vendor Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/update-vendor-slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "admin vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorUpdateVendorSlug"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/verify-customer-document/:customerDocumentId",
    "title": "Verify Customer Document API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "documentStatus",
            "description": "<p>documentStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"documentStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully verify customer document list\",\n\"data\":{},\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/verify-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorVerifyCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "delete",
    "url": "/api/attribute/delete-attribute/:id",
    "title": "Delete Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Attribute.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/delete-attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "DeleteApiAttributeDeleteAttributeId"
  },
  {
    "type": "get",
    "url": "/api/attribute/Attributelist",
    "title": "Attribute list API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Attribute list API\",\n     \"data\":{\n      \"groupId\" : \"\",\n      \"attributeName\" : \"\",\n      \"sortOrder\" : \"\",\n      \"attributeId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/Attributelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "GetApiAttributeAttributelist"
  },
  {
    "type": "get",
    "url": "/api/attribute/get-attribute/:id",
    "title": "Get Attribute  API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get attribute\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/get-attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "GetApiAttributeGetAttributeId"
  },
  {
    "type": "post",
    "url": "/api/attribute/add-attribute",
    "title": "Add Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "groupId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"attributeName\" : \"\",\n     \"groupId\" : \"\",\n     \"sortOrder\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created attribute.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/add-attribute"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "PostApiAttributeAddAttribute"
  },
  {
    "type": "put",
    "url": "/api/attribute/update-attribute/:id",
    "title": "Update Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeName",
            "description": "<p>attributeName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"attributeName\" : \"\",\n     \"groupId\" : \"\",\n     \"sortOrder\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated attribute.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/update-attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "PutApiAttributeUpdateAttributeId"
  },
  {
    "type": "delete",
    "url": "/api/attribute-group/delete-attribute-group/:id",
    "title": "Delete Attribute group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Attribute group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/delete-attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "DeleteApiAttributeGroupDeleteAttributeGroupId"
  },
  {
    "type": "get",
    "url": "/api/attribute-group/AttributeGrouplist",
    "title": "Attribute Group list API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Attribute Group list API\",\n     \"data\":{\n      \"groupId\" : \"\",\n      \"attributeGroupName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/AttributeGrouplist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "GetApiAttributeGroupAttributegrouplist"
  },
  {
    "type": "get",
    "url": "/api/attribute-group/get-attribute-group/:id",
    "title": "Get Attribute Group  API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get attribute Group\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/get-attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "GetApiAttributeGroupGetAttributeGroupId"
  },
  {
    "type": "post",
    "url": "/api/attribute-group/add-attribute-group",
    "title": "Add Attribute group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeGroupName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"attributeGroupName\" : \"\",\n     \"sortOrder\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created attribute group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/add-attribute-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "PostApiAttributeGroupAddAttributeGroup"
  },
  {
    "type": "put",
    "url": "/api/attribute-group/update-attribute-group/:id",
    "title": "Update Attribute Group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeGroupName",
            "description": "<p>attributeGroupName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"attributeGroupName\" : \"\",\n     \"sortOrder\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated attribute group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/update-attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "PutApiAttributeGroupUpdateAttributeGroupId"
  },
  {
    "type": "delete",
    "url": "/api/auth/delete-user/:id",
    "title": "Delete User",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>UserId</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is deleted successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/delete-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "DeleteApiAuthDeleteUserId"
  },
  {
    "type": "get",
    "url": "/api/auth/logout",
    "title": "Log Out API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully logout\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/logout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Logout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthLogout"
  },
  {
    "type": "get",
    "url": "/api/auth/userlist",
    "title": "User List API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get user list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/userlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthUserlist"
  },
  {
    "type": "post",
    "url": "/api/auth/create-user",
    "title": "Create User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New User is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/create-user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthCreateUser"
  },
  {
    "type": "post",
    "url": "/api/auth/edit-profile",
    "title": "Edit Profile API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User phoneNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>User avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"address\" : \"\",\n     \"avatar\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated User.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/edit-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthEditProfile"
  },
  {
    "type": "post",
    "url": "/api/auth/forgot-password",
    "title": "Forgot Password API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"email\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you. Your password send to your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthLogin"
  },
  {
    "type": "put",
    "url": "/api/auth/change-password",
    "title": "Change Password API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User oldPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User newPassword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Password changed\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthChangePassword"
  },
  {
    "type": "put",
    "url": "/api/auth/update-user/:id",
    "title": "Update User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/update-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthUpdateUserId"
  },
  {
    "type": "delete",
    "url": "/api/banner/delete-banner/:id",
    "title": "Delete Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "DeleteApiBannerDeleteBannerId"
  },
  {
    "type": "get",
    "url": "/api/banner/banner-count",
    "title": "Banner Count API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get banner count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/banner-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerCount"
  },
  {
    "type": "get",
    "url": "/api/banner/banner-detail",
    "title": "Banner Detail API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "bannerId",
            "description": "<p>BannerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Banner detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/banner-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "banner Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerDetail"
  },
  {
    "type": "get",
    "url": "/api/banner/banner-excel-list",
    "title": "Banner Excel",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "bannerId",
            "description": "<p>bannerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Banner Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/banner-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "banner Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerExcelList"
  },
  {
    "type": "get",
    "url": "/api/banner/bannerlist",
    "title": "Banner List API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got banner list\",\n     \"data\":\"{\n     \"bannerId\": \"\",\n     \"title\": \"\",\n     \"content\": \"\",\n     \"image\": \"\",\n     \"imagePath\": \"\",\n     \"link\": \"\",\n     \"position\": \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/bannerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerlist"
  },
  {
    "type": "post",
    "url": "/api/banner/add-banner",
    "title": "Add Banner API",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>link</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"image\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New banner is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/add-banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerAddBanner"
  },
  {
    "type": "post",
    "url": "/api/banner/delete-banner",
    "title": "Delete Multiple Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "bannerId",
            "description": "<p>bannerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Banner.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "bannerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerDeleteBanner"
  },
  {
    "type": "put",
    "url": "/api/banner/update-banner/:id",
    "title": "Update Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "bannerId",
            "description": "<p>Banner bannerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Banner title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Banner image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Banner content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Banner link</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": "<p>Banner position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"bannerId\" : \"\",\n     \"title\" : \"\",\n     \"image\" : \"\",\n     \"content\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/update-banner/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PutApiBannerUpdateBannerId"
  },
  {
    "type": "delete",
    "url": "/api/blog/delete-blog/:id",
    "title": "Delete Blog API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "blogId",
            "description": "<p>blogId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"blogId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Blog.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/delete-blog/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "DeleteApiBlogDeleteBlogId"
  },
  {
    "type": "get",
    "url": "/api/blog/blog-count",
    "title": "Blog Count API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get blog count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/blog-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "GetApiBlogBlogCount"
  },
  {
    "type": "get",
    "url": "/api/blog/blog-detail",
    "title": "Blog Detail API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "blogId",
            "description": "<p>Blog Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Blog detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/blog-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "GetApiBlogBlogDetail"
  },
  {
    "type": "get",
    "url": "/api/blog/blog-list",
    "title": "Blog List API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Blog list\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/blog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "GetApiBlogBlogList"
  },
  {
    "type": "post",
    "url": "/api/blog/add-blog",
    "title": "Add Blog API",
    "group": "Blog",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status/isActive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>meta tag title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>meta tag description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>meta tag keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedBlogId",
            "description": "<p>relatedBlogId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"categoryId\" : \"\",\n     \"description\" : \"\"\n     \"image\" : \"\",\n     \"status\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagkeyword\" : \"\",\n     \"relatedBlogId\" : [],\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New blog is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/add-blog"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Add Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "PostApiBlogAddBlog"
  },
  {
    "type": "post",
    "url": "/api/blog/delete-multiple-blog",
    "title": "Delete Multiple Blog API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "blogId",
            "description": "<p>Blog Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"BlogId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Blog.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/delete-multiple-blog"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete multiple Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "PostApiBlogDeleteMultipleBlog"
  },
  {
    "type": "put",
    "url": "/api/blog/update-blog/:id",
    "title": "Update Blog API",
    "group": "Blog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>category id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status/isActive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>meta tag title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>meta tag description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>meta tag keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedBlogId",
            "description": "<p>relatedBlogId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"categoryId\" : \"\",\n     \"description\" : \"\"\n     \"image\" : \"\",\n     \"status\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagkeyword\" : \"\",\n     \"relatedBlogId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated blog.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/blog/update-blog/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BlogController.ts",
    "groupTitle": "Blog",
    "name": "PutApiBlogUpdateBlogId"
  },
  {
    "type": "delete",
    "url": "/api/delete-category/:id",
    "title": "Delete Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delete-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "DeleteApiDeleteCategoryId"
  },
  {
    "type": "get",
    "url": "/api/category-count",
    "title": "Category Count API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category count.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryCount"
  },
  {
    "type": "get",
    "url": "/api/category-detail",
    "title": "Category Detail API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Category detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryDetail"
  },
  {
    "type": "get",
    "url": "/api/category-list-intree",
    "title": "Category List InTree API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-list-intree"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryListIntree"
  },
  {
    "type": "get",
    "url": "/api/categorylist",
    "title": "Category List API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/categorylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategorylist"
  },
  {
    "type": "post",
    "url": "/api/add-category",
    "title": "Add Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/add-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PostApiAddCategory"
  },
  {
    "type": "put",
    "url": "/api/update-category/:id",
    "title": "Update Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/update-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategoryId"
  },
  {
    "type": "put",
    "url": "/api/update-category-slug",
    "title": "Update Category Slug API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/update-category-slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategorySlug"
  },
  {
    "type": "delete",
    "url": "/api/country/delete-country/:id",
    "title": "Delete Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/delete-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "DeleteApiCountryDeleteCountryId"
  },
  {
    "type": "get",
    "url": "/api/country/countrylist",
    "title": "Country List API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     \"status\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/countrylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "GetApiCountryCountrylist"
  },
  {
    "type": "post",
    "url": "/api/country/add-country",
    "title": "Add Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Country status field required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/add-country"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PostApiCountryAddCountry"
  },
  {
    "type": "put",
    "url": "/api/country/update-country/:id",
    "title": "Update Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Country countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/update-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PutApiCountryUpdateCountryId"
  },
  {
    "type": "delete",
    "url": "/api/currency/delete-currency/:id",
    "title": "Delete Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"currencyId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/delete-currency/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "DeleteApiCurrencyDeleteCurrencyId"
  },
  {
    "type": "get",
    "url": "/api/currency/currencylist",
    "title": "Currency List API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get currency list\",\n     \"data\":{\n      \"currencyId\" : \"\",\n      \"title\" : \"\",\n      \"code\" : \"\",\n      \"value\" : \"\",\n      \"update\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/currencylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "GetApiCurrencyCurrencylist"
  },
  {
    "type": "post",
    "url": "/api/currency/add-currency",
    "title": "Add Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/add-currency"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PostApiCurrencyAddCurrency"
  },
  {
    "type": "put",
    "url": "/api/currency/update-currency/:id",
    "title": "Update Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "currencyId",
            "description": "<p>Currency currencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"currencyId\" : \"\",\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/update-currency/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PutApiCurrencyUpdateCurrencyId"
  },
  {
    "type": "delete",
    "url": "/api/customer/delete-customer/:id",
    "title": "Delete Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/delete-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "DeleteApiCustomerDeleteCustomerId"
  },
  {
    "type": "get",
    "url": "/api/customer/allcustomer-excel-list",
    "title": "All Customer Excel",
    "group": "Customer",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/allcustomer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerAllcustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-count",
    "title": "Customer Count API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customer-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerCount"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-details/:id",
    "title": "Customer Details API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer Details\",\n\"data\":{\n\"customerGroupId\" : \"\",\n\"username\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"password\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"newsletter\" : \"\",\n\"status\" : \"\",\n\"safe\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customer-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerDetailsId"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-excel-list",
    "title": "Customer Excel",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/customer/customerlist",
    "title": "Customer List API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerGroup",
            "description": "<p>search by customerGroup</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>search by date</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/recent-customerlist",
    "title": "Recent Customer List API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"location\" : \"\",\n     \"name\" : \"\",\n     \"created date\" : \"\",\n     \"isActive\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/recent-customerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerRecentCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/today-customercount",
    "title": "Today Customer Count API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today customer count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/today-customercount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerTodayCustomercount"
  },
  {
    "type": "delete",
    "url": "/api/customer-group/delete-customer-group/:id",
    "title": "Delete Customer Group API",
    "group": "CustomerGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"groupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customerGroup.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/delete-customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "CustomerGroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "DeleteApiCustomerGroupDeleteCustomerGroupId"
  },
  {
    "type": "get",
    "url": "/api/customer-group/customergroup-list",
    "title": "customergroup-list API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get customer group list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/customergroup-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customergroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "GetApiCustomerGroupCustomergroupList"
  },
  {
    "type": "post",
    "url": "/api/customer-group/create-customer-group",
    "title": "Create customer group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Customer group is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/create-customer-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PostApiCustomerGroupCreateCustomerGroup"
  },
  {
    "type": "put",
    "url": "/api/customer-group/update-customer-group/:id",
    "title": "Update Customer Group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"colorcode\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer Group is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/update-customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "update-customer-group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PutApiCustomerGroupUpdateCustomerGroupId"
  },
  {
    "type": "post",
    "url": "/api/customer/add-customer",
    "title": "Add Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Customer Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/add-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiCustomerAddCustomer"
  },
  {
    "type": "post",
    "url": "/api/customer/delete-customer",
    "title": "Delete Multiple Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted customer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/delete-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiCustomerDeleteCustomer"
  },
  {
    "type": "put",
    "url": "/api/customer/update-customer/:id",
    "title": "Update Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/update-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PutApiCustomerUpdateCustomerId"
  },
  {
    "type": "delete",
    "url": "/api/CustomerAddress/delete-address/:id",
    "title": "Delete Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/delete-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "DeleteApiCustomeraddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/CustomerAddress/get-address-list",
    "title": "Get Customer Address List API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/get-address-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "GetApiCustomeraddressGetAddressList"
  },
  {
    "type": "post",
    "url": "/api/CustomerAddress/add-address",
    "title": "Add Customer Address API",
    "group": "Customer_Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"countryId\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/add-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addAddress error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PostApiCustomeraddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/CustomerAddress/update-address/:id",
    "title": "Update Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "company",
            "description": "<p>company</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"countryId\" : \"\",\n     \"addressType\" : \"\",\n     \"company\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated  customer address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/update-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PutApiCustomeraddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/customer-cart/customer-cart-list",
    "title": "Customer Cart List API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Customer Cart List\",\n     \"data\":{\n      \"productId\" : \"\",\n      \"name\" : \"\",\n      \"quantity\" : \"\",\n      \"productPrice\" : \"\",\n      \"total\" : \"\",\n      \"image\" : \"\",\n      \"containerName\" : \"\",\n      \"optionName\" : \"\",\n      \"optionValueName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/customer-cart-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Cart error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "GetApiCustomerCartCustomerCartList"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/add-cart",
    "title": "Add to cart API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productPrice",
            "description": "<p>productPrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tirePrice",
            "description": "<p>tirePrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionName",
            "description": "<p>optionName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionValueName",
            "description": "<p>optionValueName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientName",
            "description": "<p>VarientName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOptionId",
            "description": "<p>productVarientOptionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "skuName",
            "description": "<p>skuName</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"productPrice\" : \"\",\n     \"tirePrice\" : \"\",\n     \"quantity\" : \"\",\n     \"optionName\" : \"\",\n     \"optionValueName\" : \"\",\n     \"varientName\" : \"\",\n     \"productVarientOptionId\" : \"\",\n     \"skuName\" : \"\",\n     \"type\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added product to cart\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/add-cart"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCustomerCartAddCart"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/delete-cart-item",
    "title": "Delete Cart items API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "cartId",
            "description": "<p>cartId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"cartId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted items.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/delete-cart-item"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "cartDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCustomerCartDeleteCartItem"
  },
  {
    "type": "post",
    "url": "/api/customer-coupon/apply-coupon",
    "title": "Apply Coupon API",
    "group": "Customer_Coupon",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponCode",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": false,
            "field": "productDetail",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.skuName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.productPrice",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.quantity",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.total",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponCode\":\"\";\n     \"emailId\":\"\";\n     \"productDetail\" : [\n     {\n     \"productId\" : \"\",\n     \"productPrice\" : \"\",\n     \"skuName\" : \"\",\n     \"quantity\" : \"\",\n     \"total\" : \"\",\n     }\n     ],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added product to cart\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-coupon/apply-coupon"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer coupon  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerCouponController.ts",
    "groupTitle": "Customer_Coupon",
    "name": "PostApiCustomerCouponApplyCoupon"
  },
  {
    "type": "delete",
    "url": "/api/delivery-location/delete-delivery-location/:deliveryLocationId",
    "title": "Delete Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"deliveryLocationId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted delivery location.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/delete-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "DeleteApiDeliveryLocationDeleteDeliveryLocationDeliverylocationid"
  },
  {
    "type": "get",
    "url": "/api/delivery-location/delivery-location-list",
    "title": "Delivery Location List API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter delivery location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Location List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/delivery-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "GetApiDeliveryLocationDeliveryLocationList"
  },
  {
    "type": "get",
    "url": "/api/delivery-location/download-delivery-location",
    "title": "Download Delivery Location",
    "group": "Delivery_Location",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the file..!!\",\n     \"status\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/download-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "GetApiDeliveryLocationDownloadDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-location/add-delivery-location",
    "title": "Add Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>zipCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>locationName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Location Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/add-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PostApiDeliveryLocationAddDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-location/import-delivery-location",
    "title": "Import Delivery Location",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "deliveryLocationData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/import-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PostApiDeliveryLocationImportDeliveryLocation"
  },
  {
    "type": "put",
    "url": "/api/delivery-location/update-delivery-location/:deliveryLocationId",
    "title": "Update Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>Location Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Updated successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/update-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PutApiDeliveryLocationUpdateDeliveryLocationDeliverylocationid"
  },
  {
    "type": "delete",
    "url": "/api/delivery-person/delete-delivery-person/:id",
    "title": "Delete Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted delivery person.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/delete-delivery-person/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "DeleteApiDeliveryPersonDeleteDeliveryPersonId"
  },
  {
    "type": "get",
    "url": "/api/delivery-order/assigned-list",
    "title": "Assigned Order List API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":[{\n     \"customerId\" : \"\",\n     \"createdDate\" : \"\",\n     \"allocatedDate\" : \"\",\n     \"orderId\" : \"\",\n     \"orderPrefixId\" : \"\",\n     \"status\" : \"\",\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-order/assigned-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryOrderController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryOrderAssignedList"
  },
  {
    "type": "get",
    "url": "/api/delivery-order/assigned-location-list",
    "title": "Assigned Location List API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get list\",\n     \"data\":[{\n     \"customerId\" : \"\",\n     \"createdDate\" : \"\",\n     \"allocatedDate\" : \"\",\n     \"orderId\" : \"\",\n     \"orderPrefixId\" : \"\",\n     \"status\" : \"\",\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-order/assigned-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryOrderController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryOrderAssignedLocationList"
  },
  {
    "type": "get",
    "url": "/api/delivery-order/completed-list",
    "title": "Completed Order List API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":[{\n     \"customerId\" : \"\",\n     \"createdDate\" : \"\",\n     \"allocatedDate\" : \"\",\n     \"orderId\" : \"\",\n     \"orderPrefixId\" : \"\",\n     \"status\" : \"\",\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-order/completed-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryOrderController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryOrderCompletedList"
  },
  {
    "type": "get",
    "url": "/api/delivery-order/delivery-status-list",
    "title": "Delivery Status List API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get delivery status list\",\n     \"data\":[{\n     \"status\" : \"\",\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-order/delivery-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryOrderController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryOrderDeliveryStatusList"
  },
  {
    "type": "get",
    "url": "/api/delivery-person/delivery-person-list-delivery-allocation",
    "title": "List Delivery Person for delivery allocation API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"status\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Person List Successfully\"\n     \"data\" : \"{\n     \"id\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"email\" : \"\",\n     \"password\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"isActive\" : \"\",\n     }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/delivery-person-list-delivery-allocation"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryPersonDeliveryPersonListDeliveryAllocation"
  },
  {
    "type": "get",
    "url": "/api/delivery-person/list-delivery-person",
    "title": "List Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"status\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Person List Successfully\"\n     \"data\" : \"{\n     \"id\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"email\" : \"\",\n     \"password\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"isActive\" : \"\",\n     }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/list-delivery-person"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryPersonListDeliveryPerson"
  },
  {
    "type": "get",
    "url": "/api/delivery-user/me",
    "title": "User Profile",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get user profile details\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-user/me"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryUserController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryUserMe"
  },
  {
    "type": "post",
    "url": "/api/delivery-order/update-delivery-status",
    "title": "Delivery Status List API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "statusId",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allocatedId",
            "description": "<p>allocated Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>comment</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get delivery status list\",\n     \"data\":[{\n     \"status\" : \"\",\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-order/update-delivery-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryOrderController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryOrderUpdateDeliveryStatus"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/add-delivery-allocation",
    "title": "Add Delivery Allocation API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deliveryPersonId",
            "description": "<p>deliveryPersonId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorOrderId\" : \"\",\n     \"deliveryPersonId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Allocation Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/add-delivery-allocation"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonAddDeliveryAllocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/add-delivery-person",
    "title": "Add Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Delivery Person mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allLocation",
            "description": "<p>allLocation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Delivery Person Image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"allLocation\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"location\" : \"\",\n     \"image\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Person Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/add-delivery-person"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonAddDeliveryPerson"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/login",
    "title": "Login",
    "group": "Delivery_Person",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User EmailId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonLogin"
  },
  {
    "type": "post",
    "url": "/api/delivery-user/change-password",
    "title": "Change Password",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your password changed successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-user/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Change Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryUserController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryUserChangePassword"
  },
  {
    "type": "post",
    "url": "/api/delivery-user/login",
    "title": "Login",
    "group": "Delivery_Person",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"userName\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-user/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/delivery/DeliveryUserController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryUserLogin"
  },
  {
    "type": "put",
    "url": "/api/delivery-person/update-delivery-person/:id",
    "title": "Update Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allLocation",
            "description": "<p>allLocation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"location\" : \"\",\n     \"allLocation\" : \"\",\n     \"image\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Updated successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/update-delivery-person/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PutApiDeliveryPersonUpdateDeliveryPersonId"
  },
  {
    "type": "get",
    "url": "/api/delivery-store/delivery-location-list",
    "title": "Delivery Location List API",
    "group": "Delivery_Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter delivery location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Location List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-store/delivery-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/DeliveryController.ts",
    "groupTitle": "Delivery_Store",
    "name": "GetApiDeliveryStoreDeliveryLocationList"
  },
  {
    "type": "delete",
    "url": "/api/email-template/delete-email-template/:id",
    "title": "Delete EmailTemplate API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailTemplateId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/delete-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "DeleteApiEmailTemplateDeleteEmailTemplateId"
  },
  {
    "type": "get",
    "url": "/api/email-template/email-templatelist",
    "title": "EmailTemplate List API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get emailTemplate list\",\n     \"data\":{\n     \"id\" : \"\",\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/email-templatelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "GetApiEmailTemplateEmailTemplatelist"
  },
  {
    "type": "post",
    "url": "/api/email-template/add-email-template",
    "title": "Add Email Template API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/add-email-template"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PostApiEmailTemplateAddEmailTemplate"
  },
  {
    "type": "put",
    "url": "/api/email-template/update-email-template/:id",
    "title": "Update EmailTemplate API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/update-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "emailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PutApiEmailTemplateUpdateEmailTemplateId"
  },
  {
    "type": "delete",
    "url": "/api/language/delete-language/:id",
    "title": "Delete Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"languageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/delete-language/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "DeleteApiLanguageDeleteLanguageId"
  },
  {
    "type": "get",
    "url": "/api/language/languageList",
    "title": "Language List API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>inactive-&gt; 0, active-&gt; 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/languagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "GetApiLanguageLanguagelist"
  },
  {
    "type": "post",
    "url": "/api/language/add-language",
    "title": "Add Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/add-language"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PostApiLanguageAddLanguage"
  },
  {
    "type": "put",
    "url": "/api/language/update-language/:id",
    "title": "Update Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/update-language/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PutApiLanguageUpdateLanguageId"
  },
  {
    "type": "delete",
    "url": "/api/manufacturer/delete-manufacturer/:id",
    "title": "Delete Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "DeleteApiManufacturerDeleteManufacturerId"
  },
  {
    "type": "get",
    "url": "/api/manufacturer/manufacturer-detail",
    "title": "Manufacturer Detail API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacurerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Manufacturer detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/manufacturer-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "manufacturer Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "GetApiManufacturerManufacturerDetail"
  },
  {
    "type": "get",
    "url": "/api/manufacturer/manufacturer-excel-list",
    "title": "Manufacturer Excel",
    "group": "Manufacturer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Manufacturer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/manufacturer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "manufacturer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "GetApiManufacturerManufacturerExcelList"
  },
  {
    "type": "get",
    "url": "/api/manufacturer/manufacturerlist",
    "title": "Manufacturer List API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;active 1-&gt;inactive</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "GetApiManufacturerManufacturerlist"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/create-manufacturer",
    "title": "Create Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/create-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerCreateManufacturer"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/delete-manufacturer",
    "title": "Delete Multiple manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted manufacturer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "manufacturerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerDeleteManufacturer"
  },
  {
    "type": "put",
    "url": "/api/manufacturer/update-manufacturer/:id",
    "title": "Update Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>Manufacturer manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>Manufacturer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/update-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PutApiManufacturerUpdateManufacturerId"
  },
  {
    "type": "delete",
    "url": "/api/order/delete-order/:id",
    "title": "Delete Single Order API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "DeleteApiOrderDeleteOrderId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n     \"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiAdminVendorOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/order/back-order-list",
    "title": "Back Order List",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Back Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/back-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "back order List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderBackOrderList"
  },
  {
    "type": "get",
    "url": "/api/order/bulk-order-cancel-excel-list",
    "title": "Bulk Order Cancel Excel list",
    "group": "Order",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Bulk Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/bulk-order-cancel-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderBulkOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/failed-order-list",
    "title": "Failed Order List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/failed-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderFailedOrderList"
  },
  {
    "type": "get",
    "url": "/api/order/order-cancel-excel-list",
    "title": "Order Cancel Excel list",
    "group": "Order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-cancel-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-cancel-request-list",
    "title": "Order Cancel Request List",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-cancel-request-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Request List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCancelRequestList"
  },
  {
    "type": "get",
    "url": "/api/order/order-count",
    "title": "Order Count API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get order count\",\n     \"data\":{\n     \"count\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCount"
  },
  {
    "type": "get",
    "url": "/api/order/order-count-for-list",
    "title": "Order Count For Order List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-count-for-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCountForList"
  },
  {
    "type": "get",
    "url": "/api/order/order-detail",
    "title": "Order Detail API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/order/order-excel-list",
    "title": "Order Excel",
    "group": "Order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Order Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/order/order-product-log-list",
    "title": "Order Product Log List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order product log list\",\n     \"data\":{\n     \"orderProductLogId\" : \"\",\n     \"orderProductId\" : \"\",\n     \"productId\" : \"\",\n     \"orderId\" : \"\",\n     \"name\" : \"\",\n     \"model\" : \"\",\n     \"quantity\" : \"\",\n     \"trace\" : \"\",\n     \"total\" : \"\",\n     \"tax\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"trackingUrl\" : \"\",\n     \"trackingNo\" : \"\",\n     \"isActive\" : \"\",\n     \"createdDate\" : \"\",\n     \"modifiedDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-product-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderProductLog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderProductLogList"
  },
  {
    "type": "get",
    "url": "/api/order/orderlist",
    "title": "Order List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderlist"
  },
  {
    "type": "get",
    "url": "/api/order/orderLoglist",
    "title": "Order Log List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/order/saleslist",
    "title": "Sales List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get sales count list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/saleslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "sales error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSaleslist"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-amount",
    "title": "today Order Amount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get today order amount\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderAmount"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-count",
    "title": "Today OrderCount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderCount"
  },
  {
    "type": "get",
    "url": "/api/order/total-order-amount",
    "title": "total Order Amount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get total order amount\",\n     \"data\":{\n     \"count\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/total-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTotalOrderAmount"
  },
  {
    "type": "get",
    "url": "/api/order/update-bulk-order-cancel-request",
    "title": "Update bulk Order Cancel Request Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Bulk order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-bulk-order-cancel-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderUpdateBulkOrderCancelRequest"
  },
  {
    "type": "post",
    "url": "/api/order/delete-order",
    "title": "Delete Order API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderDeleteOrder"
  },
  {
    "type": "post",
    "url": "/api/order/order-change-status",
    "title": "Change Order Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>order Status Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderDetails\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order change status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-change-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderOrderChangeStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-main-order",
    "title": "update FailedOrder into mainOrder API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentStatus",
            "description": "<p>1-&gt;paid 2-&gt;unpaid</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentRefId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentDetail",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"paymentStatus\" : \"\",\n  \"paymentMethod\" : \"\",\n  \"paymentRefId\" : \"\",\n  \"paymentDetail\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your order.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-main-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateMainOrder"
  },
  {
    "type": "post",
    "url": "/api/order/update-order-product-shipping-information",
    "title": "update order product shipping information API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderProductId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateOrderProductShippingInformation"
  },
  {
    "type": "post",
    "url": "/api/order/update-payment-status",
    "title": "update payment Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentStatusId",
            "description": "<p>1-&gt;paid 2-&gt;fail 3-&gt; refund</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"paymentStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated payment status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-payment-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdatePaymentStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-shipping-information",
    "title": "update shipping information API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateShippingInformation"
  },
  {
    "type": "put",
    "url": "/api/order/update-order-cancel-request/:orderProductId",
    "title": "Update Order Cancel Request Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-cancel-request/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PutApiOrderUpdateOrderCancelRequestOrderproductid"
  },
  {
    "type": "put",
    "url": "/api/order/update-order-product-status/:orderProductId",
    "title": "Update Order Product Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>OrderStatus orderStatusId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderProductStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-status/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PutApiOrderUpdateOrderProductStatusOrderproductid"
  },
  {
    "type": "delete",
    "url": "/api/order-status/delete-order-status/:id",
    "title": "Delete OrderStatus API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/delete-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "DeleteApiOrderStatusDeleteOrderStatusId"
  },
  {
    "type": "get",
    "url": "/api/order-status/order-status-list",
    "title": "OrderStatus List API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get orderStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderStatusList"
  },
  {
    "type": "post",
    "url": "/api/order-status/create-order-status",
    "title": "Create OrderStatus API",
    "group": "OrderStatus",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>priority</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n     \"priority\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New OrderStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/create-order-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createOrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PostApiOrderStatusCreateOrderStatus"
  },
  {
    "type": "put",
    "url": "/api/order-status/update-order-status/:id",
    "title": "Update OrderStatus API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>OrderStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>priority</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/update-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PutApiOrderStatusUpdateOrderStatusId"
  },
  {
    "type": "delete",
    "url": "/api/page/delete-page/:id",
    "title": "Delete Page API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted page.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/delete-page/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "DeleteApiPageDeletePageId"
  },
  {
    "type": "get",
    "url": "/api/page/page-count",
    "title": "Page Count API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/page-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePageCount"
  },
  {
    "type": "get",
    "url": "/api/page/page-detail",
    "title": "Page Detail API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Page detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/page-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "page Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePageDetail"
  },
  {
    "type": "get",
    "url": "/api/page/pagelist",
    "title": "Page List API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/pagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePagelist"
  },
  {
    "type": "post",
    "url": "/api/page/add-page",
    "title": "Add Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageGroupId",
            "description": "<p>pageGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"pageGroupId\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"active\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New page is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/add-page"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageAddPage"
  },
  {
    "type": "post",
    "url": "/api/page/delete-page",
    "title": "Delete Multiple Page API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Page.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/delete-page"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageDeletePage"
  },
  {
    "type": "put",
    "url": "/api/page/update-page/:id",
    "title": "Update Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageGroupId",
            "description": "<p>pageGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"pageGroupId\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Page is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/update-page/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updatePage error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PutApiPageUpdatePageId"
  },
  {
    "type": "delete",
    "url": "/api/page-group/delete-page-group/:id",
    "title": "Delete Page group API",
    "group": "Page_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/delete-page-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "DeleteApiPageGroupDeletePageGroupId"
  },
  {
    "type": "get",
    "url": "/api/page-group/get-page-group/:id",
    "title": "Get Page Group  API",
    "group": "Page_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Group\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/get-page-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "GetApiPageGroupGetPageGroupId"
  },
  {
    "type": "get",
    "url": "/api/page-group/PageGrouplist",
    "title": "Page Group list API",
    "group": "Page_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Page Group list API\",\n     \"data\":{\n      \"groupId\" : \"\",\n      \"pageGroupName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/PageGrouplist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "GetApiPageGroupPagegrouplist"
  },
  {
    "type": "post",
    "url": "/api/page-group/add-page-group",
    "title": "Add Page group API",
    "group": "Page_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageGroupName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageGroupName\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/add-page-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "PostApiPageGroupAddPageGroup"
  },
  {
    "type": "put",
    "url": "/api/page-group/update-page-group/:id",
    "title": "Update Page Group API",
    "group": "Page_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageGroupName",
            "description": "<p>pageGroupName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageGroupName\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/update-page-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "PutApiPageGroupUpdatePageGroupId"
  },
  {
    "type": "get",
    "url": "/api/payment/archive-payment-list",
    "title": "Archive Payment List API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Archive payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/archive-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentArchivePaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/archive-payment-list-count",
    "title": "Archive Payment List Count API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Archive payment count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/archive-payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentArchivePaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/payment/bulk-export-payment-archive-list",
    "title": "Bulk Export Payment Archive List API",
    "group": "Payment",
    "sampleRequest": [
      {
        "url": "/api/payment/bulk-export-payment-archive-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentBulkExportPaymentArchiveList"
  },
  {
    "type": "get",
    "url": "/api/payment/bulk-export-payment-list",
    "title": "Bulk Export Payment List API",
    "group": "Payment",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/bulk-export-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentBulkExportPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/export-payment-archive-list",
    "title": "Export Payment Archive List API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentArchiveId",
            "description": "<p>paymentArchiveId</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/payment/export-payment-archive-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentExportPaymentArchiveList"
  },
  {
    "type": "get",
    "url": "/api/payment/export-payment-list",
    "title": "Export Payment List API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentId",
            "description": "<p>paymentId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/export-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentExportPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/payment-list",
    "title": "Payment List API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/payment-list-count",
    "title": "Payment List Count API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentPaymentListCount"
  },
  {
    "type": "post",
    "url": "/api/payment/make-payment-archive",
    "title": "Make Payment Archive API",
    "group": "Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentId",
            "description": "<p>paymentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"paymentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archived this payment\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/make-payment-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "PostApiPaymentMakePaymentArchive"
  },
  {
    "type": "get",
    "url": "/api/permission-module/get-permission",
    "title": "Get Permission API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refType",
            "description": "<p>1-&gt;role 2-&gt;user</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refId",
            "description": "<p>refId roleId | userId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got permission data\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/get-permission"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModuleGetPermission"
  },
  {
    "type": "get",
    "url": "/api/permission-module/list",
    "title": "Permission Module List API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModuleList"
  },
  {
    "type": "get",
    "url": "/api/permission-module/permission-me",
    "title": "Permission Me API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got permission for user\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/permission-me"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModulePermissionMe"
  },
  {
    "type": "post",
    "url": "/api/permission-module/add-permission",
    "title": "Add Permission API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refType",
            "description": "<p>1-&gt;role 2-&gt;user</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refId",
            "description": "<p>refId roleId | userId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>stringified data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added permission\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/add-permission"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "PostApiPermissionModuleAddPermission"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-product/:id",
    "title": "Delete Single Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductDeleteProductId"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-product-varient-option/:id",
    "title": "Delete Product Varient Option API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product-varient-option/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductDeleteProductVarientOptionId"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-tire-price/:id",
    "title": "Delete Product Tire Price API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-tire-price/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductDeleteTirePriceId"
  },
  {
    "type": "get",
    "url": "/api/product/allproduct-excel-list",
    "title": "AllProduct Excel sheet",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/allproduct-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductAllproductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/customerProductView-list/:id",
    "title": "Customer product View List",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/customerProductView-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerProductView List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductCustomerproductviewListId"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-count",
    "title": "Dashboard Count API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get dashboard count\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardCount"
  },
  {
    "type": "get",
    "url": "/api/product/download-product-sample",
    "title": "Download Product Import Sample Zip",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the file..!!\",\n     \"status\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/download-product-sample"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDownloadProductSample"
  },
  {
    "type": "get",
    "url": "/api/product/Get-Product-rating",
    "title": "Get product Rating API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/Get-Product-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductGetProductRating"
  },
  {
    "type": "get",
    "url": "/api/product/get-product-tire-price-list",
    "title": "Get product tire price list API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get tire price list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/get-product-tire-price-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductGetProductTirePriceList"
  },
  {
    "type": "get",
    "url": "/api/product/inventory-product-list",
    "title": "Invendory Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/inventory-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductInventoryProductList"
  },
  {
    "type": "get",
    "url": "/api/product/product-count",
    "title": "Product Count API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product count\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productCount error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductCount"
  },
  {
    "type": "get",
    "url": "/api/product/product-detail/:id",
    "title": "Product Detail API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/product/product-excel-list",
    "title": "Product Excel",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/product-rating-list",
    "title": "Product Rating and review List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limits</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": \"1\"\n     \"message\": \"Successfully get product rating list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-rating-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productRatingList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductRatingList"
  },
  {
    "type": "get",
    "url": "/api/product/productlist",
    "title": "Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductlist"
  },
  {
    "type": "get",
    "url": "/api/product/recent-selling-product",
    "title": "Recent Selling Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully listed recent product selling!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/recent-selling-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Selling Product List error",
          "content": "HTTP/1.1 500 Internal Server Errorproduct",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductRecentSellingProduct"
  },
  {
    "type": "get",
    "url": "/api/product/top-selling-productlist",
    "title": "Top selling ProductList API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top selling product..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-selling-productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top selling product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopSellingProductlist"
  },
  {
    "type": "get",
    "url": "/api/product/viewLog-list",
    "title": "Product View Log List",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/viewLog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ViewLog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductViewlogList"
  },
  {
    "type": "post",
    "url": "/api/product/add-product",
    "title": "Add Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "hasTirePrice",
            "description": "<p>hasTirePrice</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tirePrices",
            "description": "<p>tirePrices</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productAttribute",
            "description": "<p>productAtrribute</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "weight",
            "description": "<p>weight</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "length",
            "description": "<p>length</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>pincodeBasedDelivery</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"productSlug\" : \"\",\n     \"upc\" : \"\",\n     \"hsn\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"hasTirePrice\" : \"\",\n     \"manufacturerId\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":,\n     \"isActive\":,\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n     \"tirePrices\":[\n     {\n     \"quantity\":\"\"\n     \"price\":\"\"\n     }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountQuantity\":\"\"\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n     \"productAttribute\":[ {\n              \"attributeId\":\"\"\n              \"text\":\"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/add-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AddProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductAddProduct"
  },
  {
    "type": "post",
    "url": "/api/product/add-tire-price",
    "title": "Add tire price API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "hasTirePrice",
            "description": "<p>send 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "quantity",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"hasTirePrice\" : \"\",\n     \"productId\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added tire price.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/add-tire-price"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "tire price error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductAddTirePrice"
  },
  {
    "type": "post",
    "url": "/api/product/delete-product",
    "title": "Delete Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductDeleteProduct"
  },
  {
    "type": "post",
    "url": "/api/product/import-product-data",
    "title": "Import product Data",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/import-data"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import product Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductImportProductData"
  },
  {
    "type": "post",
    "url": "/api/product/update-product/:id",
    "title": "Update Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "hasTirePrice",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "weight",
            "description": "<p>weight</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "length",
            "description": "<p>length</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "tirePrices",
            "description": "<p>tirePrices</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>pincodeBasedDelivery</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productAttribute",
            "description": "<p>productAttribute</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"hsn\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"hasTirePrice\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"pincodeBasedDelivery\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"id\":\"\"\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":\"\"\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"tirePrices\":[\n     {\n     \"quantity\":\"\"\n     \"price\":\"\",\n     \"skuName\":\"\"\n     }\n     ]\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"skuName\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"skuName\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n       \"productAttribute\":[{\n           \"attributeId\":\"\"\n           \"text\":\"\"\n       }],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateProductId"
  },
  {
    "type": "post",
    "url": "/api/product/update-sku",
    "title": "update sku API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated sku.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-sku"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateSku"
  },
  {
    "type": "post",
    "url": "/api/product/update-stock",
    "title": "Update Stock API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "hasStock",
            "description": "<p>send 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": false,
            "field": "productStock",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.skuId",
            "description": "<p>skuId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.outOfStockThreshold",
            "description": "<p>for setting out of stock threshold</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.notifyMinQuantity",
            "description": "<p>notifyMinQuantity</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.minQuantityAllowedCart",
            "description": "<p>minQuantityAllowedCart</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.maxQuantityAllowedCart",
            "description": "<p>maxQuantityAllowedCart</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.enableBackOrders",
            "description": "<p>enableBackOrders</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"hasStock\" : \"\",\n     \"productId\" : \"\",\n     \"productStock\": [{\n     \"skuId\" : \"\",\n     \"outOfStockThreshold\" : \"\",\n     \"notifyMinQuantity\" : \"\",\n     \"minQuantityAllowedCart\" : \"\",\n     \"maxQuantityAllowedCart\" : \"\",\n     \"enableBackOrders\" : \"\",\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product stock.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-stock"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "stock error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateStock"
  },
  {
    "type": "put",
    "url": "/api/product/Product-rating-status/:id",
    "title": "Product Rating Status API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status should be 0-&gt; In-Active or 1-&gt; Active</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully updated review status.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/Product-rating-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductProductRatingStatusId"
  },
  {
    "type": "put",
    "url": "/api/product/update-product-slug",
    "title": "Update Product Slug API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Product Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product-slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateProductSlug"
  },
  {
    "type": "put",
    "url": "/api/product/update-todayDeals/:id",
    "title": "Update Today Deals API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "todayDeals",
            "description": "<p>TodayDeals should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"todayDeals\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product to today Deals.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-todayDeals/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "todayDeals error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateTodaydealsId"
  },
  {
    "type": "get",
    "url": "/api/media/image-resize",
    "title": "Resize Image On The Fly",
    "group": "Resize-Image",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully resize image\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/image-resize"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to resize the image\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "Resize-Image",
    "name": "GetApiMediaImageResize"
  },
  {
    "type": "delete",
    "url": "/api/role/delete-role/:id",
    "title": "Delete Role API",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"roleId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Role.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/delete-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "DeleteApiRoleDeleteRoleId"
  },
  {
    "type": "get",
    "url": "/api/role/rolelist",
    "title": "Role List API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get role list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/rolelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetApiRoleRolelist"
  },
  {
    "type": "post",
    "url": "/api/role/create-role",
    "title": "Create Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Role is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/create-role"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostApiRoleCreateRole"
  },
  {
    "type": "put",
    "url": "/api/role/update-role/:id",
    "title": "Update Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"slug\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Role is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/update-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PutApiRoleUpdateRoleId"
  },
  {
    "type": "delete",
    "url": "/api/service/delete-service-enquiry/:id",
    "title": "Delete Enquiry API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"enquiryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted service Enquiry.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/delete-service-enquiry/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "DeleteApiServiceDeleteServiceEnquiryId"
  },
  {
    "type": "delete",
    "url": "/api/service/delete-service/:id",
    "title": "Delete Service API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"serviceId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted service.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/delete-service/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "DeleteApiServiceDeleteServiceId"
  },
  {
    "type": "get",
    "url": "/api/service/leads-excel-list",
    "title": "leads Excel download",
    "group": "Service",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "leadsId",
            "description": "<p>leadsId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the leads excel list..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/leads-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceLeadsExcelList"
  },
  {
    "type": "get",
    "url": "/api/service/service-count",
    "title": "Service Count API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the service count.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/service-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceServiceCount"
  },
  {
    "type": "get",
    "url": "/api/service/service-detail",
    "title": "Service Detail API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "serviceId",
            "description": "<p>serviceId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"serviceId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the service detail.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/service-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceServiceDetail"
  },
  {
    "type": "get",
    "url": "/api/service/service-enquiry-list",
    "title": "Service Enquiry List API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get service enquiry list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/service-enquiry-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceServiceEnquiryList"
  },
  {
    "type": "get",
    "url": "/api/service/service-excel-list",
    "title": "service Excel download",
    "group": "Service",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "serviceId",
            "description": "<p>service Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the service excel list..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/service-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceServiceExcelList"
  },
  {
    "type": "get",
    "url": "/api/service/service-list",
    "title": "Service List API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get service list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/service-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "GetApiServiceServiceList"
  },
  {
    "type": "post",
    "url": "/api/service/add-service",
    "title": "Add Service API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Service title(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Service description</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>Service mobile(required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Service price</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Service image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Service metaTagTitle(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Service metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Service metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>inactive-&gt; 0, active-&gt; 1 (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : [],\n     \"title\" : \"\",\n     \"description\" : \"\",\n     \"mobile\" : \"\",\n     \"price\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagdescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n     \"image\":[{\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Service.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/add-service"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "PostApiServiceAddService"
  },
  {
    "type": "post",
    "url": "/api/service/delete-multiple-enquiry",
    "title": "Delete Multiple Enquiry API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "enquiryId",
            "description": "<p>EnquiryId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"EnquiryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Enquiry.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/delete-multiple-enquiry"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "PostApiServiceDeleteMultipleEnquiry"
  },
  {
    "type": "post",
    "url": "/api/service/delete-multiple-service",
    "title": "Delete Multiple Service API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "serviceId",
            "description": "<p>ServiceId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"ServiceId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Service.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/delete-multiple-service"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "PostApiServiceDeleteMultipleService"
  },
  {
    "type": "put",
    "url": "/api/service/update-service/:id",
    "title": "Update Service API",
    "group": "Service",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Service title(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Service description</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>Service mobile(required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Service price</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Service image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Service metaTagTitle(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Service metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Service metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>inactive-&gt; 0, active-&gt; 1 (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n     \"title\" : \"\",\n     \"description\" : \"\",\n     \"mobile\" : \"\",\n     \"price\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagdescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated service.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service/update-service/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceController.ts",
    "groupTitle": "Service",
    "name": "PutApiServiceUpdateServiceId"
  },
  {
    "type": "delete",
    "url": "/api/service-category/delete-service-category/:id",
    "title": "Delete Service Category API",
    "group": "Service_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"Id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Service Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/delete-service-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "service category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "DeleteApiServiceCategoryDeleteServiceCategoryId"
  },
  {
    "type": "get",
    "url": "/api/service-category/service-category-count",
    "title": "Service Category Count API",
    "group": "Service_Category",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the service category count.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/service-category-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "GetApiServiceCategoryServiceCategoryCount"
  },
  {
    "type": "get",
    "url": "/api/service-category/service-category-detail",
    "title": "Service Category Detail API",
    "group": "Service_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "serviceCategoryId",
            "description": "<p>serviceCategoryId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Service Category detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/service-category-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "service category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "GetApiServiceCategoryServiceCategoryDetail"
  },
  {
    "type": "get",
    "url": "/api/service-category/service-category-list",
    "title": "Service Category List API",
    "group": "Service_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Sort order ( 1-&gt;ASC,  2-&gt;DESC )</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/service-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "GetApiServiceCategoryServiceCategoryList"
  },
  {
    "type": "post",
    "url": "/api/service-category/add-service-category",
    "title": "Add Service Category API",
    "group": "Service_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Service Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Service Category image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Service Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Service Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Service Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Service Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Service Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Service Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Service Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/add-service-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "PostApiServiceCategoryAddServiceCategory"
  },
  {
    "type": "put",
    "url": "/api/service-category/update-service-category/:id",
    "title": "Update Service Category API",
    "group": "Service_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>ServiceCategory name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>ServiceCategory image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>ServiceCategory  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>ServiceCategory sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>ServiceCategory metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>ServiceCategory metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>ServiceCategory metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>ServiceCategory status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Service Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/service-category/update-service-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Service Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ServiceCategoryController.ts",
    "groupTitle": "Service_Category",
    "name": "PutApiServiceCategoryUpdateServiceCategoryId"
  },
  {
    "type": "get",
    "url": "/api/settings/get-settings",
    "title": "Get Setting API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/get-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "GetApiSettingsGetSettings"
  },
  {
    "type": "post",
    "url": "/api/settings/create-settings",
    "title": "Create Settings API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>store url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeywords",
            "description": "<p>metaTagKeywords</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeName",
            "description": "<p>storeName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeOwner",
            "description": "<p>storeOwner</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeAddress",
            "description": "<p>storeAddress</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "zoneId",
            "description": "<p>zoneId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeEmail",
            "description": "<p>storeEmail</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeTelephone",
            "description": "<p>storeTelephone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeFax",
            "description": "<p>storeFax</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLogo",
            "description": "<p>storeLogo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailLogo",
            "description": "<p>emailLogo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "invoiceLogo",
            "description": "<p>invoiceLogo</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maintenanceMode",
            "description": "<p>maintenanceMode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLanguageName",
            "description": "<p>storeLanguageName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "storeCurrencyId",
            "description": "<p>storeCurrencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeImage",
            "description": "<p>storeImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "invoicePrefix",
            "description": "<p>invoicePrefix</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>orderStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryProductCount",
            "description": "<p>productCount should be 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "itemsPerPage",
            "description": "<p>ItemsPerPage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "facebook",
            "description": "<p>facebook</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "twitter",
            "description": "<p>twitter</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "instagram",
            "description": "<p>instagram</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "google",
            "description": "<p>google</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"url\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeywords\" : \"\",\n     \"storeName\" : \"\",\n     \"storeOwner\" : \"\",\n     \"storeAddress\" : \"\",\n     \"countryId\" : \"\",\n     \"zoneId\" : \"\",\n     \"storeEmail\" : \"\",\n     \"storeTelephone\" : \"\",\n     \"storeFax\" : \"\",\n     \"storeLogo\" : \"\",\n     \"invoiceLogo\" : \"\",\n     \"emailLogo\" : \"\",\n     \"maintenanceMode\" : \"\",\n     \"storeLanguageName\" : \"\",\n     \"storeCurrencyId\" : \"\",\n     \"storeImage\" : \"\",\n     \"invoicePrefix\" : \"\",\n     \"orderStatus\" : \"\",\n     \"categoryProductCount\" : \"\",\n     \"itemsPerPage\" : \"\",\n     \"google\" : \"\",\n     \"instagram\" : \"\",\n     \"facebook\" : \"\",\n     \"twitter\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created setting.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/create-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "PostApiSettingsCreateSettings"
  },
  {
    "type": "get",
    "url": "/api/settlement/settlement/:id",
    "title": "Settlement Detail API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get settlement detail\",\n\"data\":{\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/settlement/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementSettlementId"
  },
  {
    "type": "get",
    "url": "/api/settlement/settlement-list",
    "title": "Settlement list API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountFrom",
            "description": "<p>search by starting amount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountTo",
            "description": "<p>search by ending Amount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/settlement-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementSettlementList"
  },
  {
    "type": "get",
    "url": "/api/settlement/settlement-report-excel",
    "title": "Settlement Report excel download",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorsId",
            "description": "<p>vendorsId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "settlementFlag",
            "description": "<p>1-&gt;settled 2-&gt;not settled</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatus",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download total settlement report excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/settlement-report-excel"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Settlement report excel error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementSettlementReportExcel"
  },
  {
    "type": "get",
    "url": "/api/settlement/settlement-report-list",
    "title": "Settlement Report list API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorsId",
            "description": "<p>vendorsId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "settlementFlag",
            "description": "<p>1-&gt;settled 2-&gt;not settled</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>search by orderStatus</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Settlement report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/settlement-report-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementSettlementReportList"
  },
  {
    "type": "get",
    "url": "/api/settlement/total-sales-report-excel",
    "title": "Total sales report excel download",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountFrom",
            "description": "<p>search by amountFrom</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountTo",
            "description": "<p>search by amountTo</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download total sales report excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/total-sales-report-excel"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Total sales report excel error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementTotalSalesReportExcel"
  },
  {
    "type": "get",
    "url": "/api/settlement/total-sales-report-list",
    "title": "Total Sales Report list API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountFrom",
            "description": "<p>search by amountFrom</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountTo",
            "description": "<p>search by amountTo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got total sales report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/total-sales-report-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementTotalSalesReportList"
  },
  {
    "type": "get",
    "url": "/api/settlement/total-vendor-sales-report-excel",
    "title": "Total Vendor sales report excel download",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "allVendor",
            "description": "<p>allVendor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorsId",
            "description": "<p>vendorsId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download total sales report excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/total-vendor-sales-report-excel"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Total vendor sales report excel error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementTotalVendorSalesReportExcel"
  },
  {
    "type": "get",
    "url": "/api/settlement/vendor-sales-report-list",
    "title": "Vendor Sales Report list API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "allVendor",
            "description": "<p>allVendor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorsId",
            "description": "<p>vendorsId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor sales report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/vendor-sales-report-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "GetApiSettlementVendorSalesReportList"
  },
  {
    "type": "post",
    "url": "/api/settlement/create-settlement",
    "title": "Create settlement API",
    "group": "Settlement",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"vendorOrderId\" : [],\n}],\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New settlement is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/create-settlement"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "PostApiSettlementCreateSettlement"
  },
  {
    "type": "post",
    "url": "/api/settlement/delete-multiple-settlement",
    "title": "Delete Multiple Settlement API",
    "group": "Settlement",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "settlementId",
            "description": "<p>settlementId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"settlementId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted settlement.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settlement/delete-multiple-settlement"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Settlement Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/SettlementController.ts",
    "groupTitle": "Settlement",
    "name": "PostApiSettlementDeleteMultipleSettlement"
  },
  {
    "type": "delete",
    "url": "/api/site-filter/delete-site-filter/:id",
    "title": "Delete Site Filter API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted filter.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/delete-site-filter/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "SiteFilter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "DeleteApiSiteFilterDeleteSiteFilterId"
  },
  {
    "type": "get",
    "url": "/api/site-filter/filter-detail/:id",
    "title": "filter Detail API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got filter detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/filter-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "filter Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "GetApiSiteFilterFilterDetailId"
  },
  {
    "type": "get",
    "url": "/api/site-filter/site-filter-list",
    "title": "Site Filter List",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get site filter list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/site-filter-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "GetApiSiteFilterSiteFilterList"
  },
  {
    "type": "post",
    "url": "/api/site-filter/create-site-filter",
    "title": "Create site filter API",
    "group": "Site_Filter",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "filterName",
            "description": "<p>filterName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "section",
            "description": "<p>section</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "seection.sectionId",
            "description": "<p>sectionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "seection.sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "section.sectionType",
            "description": "<p>sectionType</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "section.sectionItem",
            "description": "<p>sectionItem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"filterName\" : \"\",\n     \"categoryId\" : \"\",\n     \"section\" : [{\n         \"sectionId\": \"\",\n         \"sectionName\": \"\",\n         \"sectionType\":\"\",\n         \"sectionItem\":\"\"\n}],\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New filter is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/create-site-filter"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "PostApiSiteFilterCreateSiteFilter"
  },
  {
    "type": "put",
    "url": "/api/site-filter/update-site-filter/:id",
    "title": "Update site filter API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "filterName",
            "description": "<p>filterName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "section",
            "description": "<p>section</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "section.sectionId",
            "description": "<p>sectionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "section.sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "section.sectionType",
            "description": "<p>sectionType 1-&gt; varient 2-&gt; attribute</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "section.sectionItem",
            "description": "<p>sectionItem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"filterName\" : \"\",\n     \"categoryId\" : \"\",\n     \"section\" : [{\n         \"sectionId\": \"\",\n         \"sectionName\": \"\",\n         \"sectionType\":\"\",\n         \"sectionItem\":\"\"\n}],",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated site filter.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/update-site-filter/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "PutApiSiteFilterUpdateSiteFilterId"
  },
  {
    "type": "delete",
    "url": "/api/stock-status/delete-stock-status/:id",
    "title": "Delete Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"stockStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/delete-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "DeleteApiStockStatusDeleteStockStatusId"
  },
  {
    "type": "get",
    "url": "/api/stock-status/stock-status-list",
    "title": "Stock Status List",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get stockStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/stock-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "GetApiStockStatusStockStatusList"
  },
  {
    "type": "post",
    "url": "/api/stock-status/create-stock-status",
    "title": "Create Stock Status API",
    "group": "StockStatus",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New StockStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/create-stock-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createStockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PostApiStockStatusCreateStockStatus"
  },
  {
    "type": "put",
    "url": "/api/stock-status/update-stock-status/:id",
    "title": "Update Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>StockStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>StockStatus status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/update-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PutApiStockStatusUpdateStockStatusId"
  },
  {
    "type": "get",
    "url": "/api/customer/get-profile",
    "title": "Get Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n      \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/get-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerGetProfile"
  },
  {
    "type": "get",
    "url": "/api/customer/login-log-list",
    "title": "Login Log list API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get login log list\",\n     \"data\":{\n     \"id\"\n     \"customerId\"\n     \"emailId\"\n     \"firstName\"\n     \"ipAddress\"\n     \"createdDate\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Front error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerLoginLogList"
  },
  {
    "type": "get",
    "url": "/api/list/orderLoglist",
    "title": "Order Log List API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderPrefixId",
            "description": "<p>orderPrefixId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order log list\",\n     \"data\":{\n     \"orderStatus\" : \"\",\n     \"createdDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order log error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store",
    "name": "GetApiListOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/manufacturers/manufacturerlist",
    "title": "Manufacturer List API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturers/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ManufacturerController.ts",
    "groupTitle": "Store",
    "name": "GetApiManufacturersManufacturerlist"
  },
  {
    "type": "get",
    "url": "/api/pages/get_pagedetails/:slugName",
    "title": "Page Details API",
    "group": "Store",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Details\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/get_pagedetails/:slugName"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPagesGet_pagedetailsSlugname"
  },
  {
    "type": "get",
    "url": "/api/pages/pagelist",
    "title": "Page List API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/pagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPagesPagelist"
  },
  {
    "type": "get",
    "url": "/api/product-store/featureproduct-list",
    "title": "Feature Product List",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword search by name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sku",
            "description": "<p>search by sku</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get feature product List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/featureproduct-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "FeatureProduct List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreFeatureproductList"
  },
  {
    "type": "get",
    "url": "/api/product-store/Get-Category",
    "title": "Get Category API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>categoryId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the category.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Get-Category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetCategory"
  },
  {
    "type": "get",
    "url": "/api/product-store/Get-Product-rating",
    "title": "Get product Rating API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Get-Product-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetProductRating"
  },
  {
    "type": "get",
    "url": "/api/product-store/get-rating-statistics",
    "title": "Get Rating Statistics API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review statistics.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/get-rating-statistics"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetRatingStatistics"
  },
  {
    "type": "get",
    "url": "/api/product-store/product-compare",
    "title": "Product Compare API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Product Compared\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/product-compare"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product compare error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductCompare"
  },
  {
    "type": "get",
    "url": "/api/product-store/productdetail/:productslug",
    "title": "Product Detail API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/productdetail/:productslug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductdetailProductslug"
  },
  {
    "type": "get",
    "url": "/api/product-store/todayDeals-list",
    "title": "Today Deals List",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>search by sku</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get today deals product List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/todayDeals-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "TodayDeals List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreTodaydealsList"
  },
  {
    "type": "post",
    "url": "/api/customer/change-password",
    "title": "Change Password API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your password changed successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Change Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerChangePassword"
  },
  {
    "type": "post",
    "url": "/api/customer/edit-profile",
    "title": "Edit Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Customer Image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"image\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your profile.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/edit-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerEditProfile"
  },
  {
    "type": "post",
    "url": "/api/customer/forgot-password",
    "title": "Forgot Password API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you,Your password send to your mail id please check your email.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Forgot Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/customer/login",
    "title": "login API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>send as normal | facebook | gmail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"type\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/Oauth-login",
    "title": "Oauth login API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>source</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oauthData",
            "description": "<p>oauthData</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"source\" : \"\",\n     \"oauthData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n        \"password\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/Oauth-login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerOauthLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/register",
    "title": "register API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for registering with us and please check your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/register"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerRegister"
  },
  {
    "type": "put",
    "url": "/api/product-store/update-featureproduct/:id",
    "title": "Update Feature Product API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "isFeature",
            "description": "<p>product isFeature should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"isFeature\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated feature Product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/update-featureproduct/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "isFeature error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "PutApiProductStoreUpdateFeatureproductId"
  },
  {
    "type": "get",
    "url": "/api/list/answer-list",
    "title": "Answer List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "questionId",
            "description": "<p>questionId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully got answer list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/answer-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListAnswerList"
  },
  {
    "type": "get",
    "url": "/api/list/banner-list",
    "title": "Banner List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Banner list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/banner-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBannerList"
  },
  {
    "type": "get",
    "url": "/api/list/blog/blog-detail/:blogSlug",
    "title": "Blog Detail API",
    "group": "Store_List",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get blog Detail\",\n     \"data\":{\n     \"id\" : \"\",\n     \"title\" : \"\",\n     \"categoryId\" : \"\",\n     \"description\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"isActive\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/blog/blog-detail/:blogSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBlogBlogDetailBlogslug"
  },
  {
    "type": "get",
    "url": "/api/list/blog/blog-list",
    "title": "Blog List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get blog list\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/blog/blog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBlogBlogList"
  },
  {
    "type": "get",
    "url": "/api/list/category-list",
    "title": "Category List Tree API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"keyorder\": \"\",\n     \"sortOrder\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"category list shown successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/country-list",
    "title": "Country List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/country-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "countryFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCountryList"
  },
  {
    "type": "get",
    "url": "/api/list/custom-product-list",
    "title": "Custom Product List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryslug",
            "description": "<p>categoryslug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>ASC OR DESC</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attribute",
            "description": "<p>attribute</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variant",
            "description": "<p>variant</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/custom-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCustomProductList"
  },
  {
    "type": "get",
    "url": "/api/list/filter-detail/:categorySlug",
    "title": "get filter detail API",
    "group": "Store_List",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get  Detail\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/filter-detail/:categorySlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Store list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListFilterDetailCategoryslug"
  },
  {
    "type": "get",
    "url": "/api/list/get-payment-setting",
    "title": "Get payment setting API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment setting\",\n     \"data\":{\n     \"plugin_name\"\n     \"plugin_avatar\"\n     \"plugin_avatar_path\"\n     \"plugin_type\"\n     \"plugin_status\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/get-payment-setting"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "get payment setting error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListGetPaymentSetting"
  },
  {
    "type": "get",
    "url": "/api/list/language-list",
    "title": "Language List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"status\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/language-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListLanguageList"
  },
  {
    "type": "get",
    "url": "/api/list/product-count",
    "title": "Product Count API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryslug",
            "description": "<p>categoryslug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variant",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attribute",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Product Count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product count error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductCount"
  },
  {
    "type": "get",
    "url": "/api/list/productlist",
    "title": "Product List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>orderBy 0-&gt;desc 1-&gt;asc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in boolean or number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductlist"
  },
  {
    "type": "get",
    "url": "/api/list/question-list",
    "title": "Question List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get question list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/question-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "question error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListQuestionList"
  },
  {
    "type": "get",
    "url": "/api/list/related-blog-list",
    "title": "Related Blog List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "blogSlug",
            "description": "<p>Blog Slug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"blogSlug\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Blog List Showing Successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/related-blog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Blog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListRelatedBlogList"
  },
  {
    "type": "get",
    "url": "/api/list/related-product-list",
    "title": "Related Product List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Product List Showing Successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/related-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListRelatedProductList"
  },
  {
    "type": "get",
    "url": "/api/list/specific-category-list",
    "title": "Specific Category List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"parentInt\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Category listed successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/specific-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListSpecificCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/widget-list",
    "title": "Widget List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Widget list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/widget-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Widget List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListWidgetList"
  },
  {
    "type": "get",
    "url": "/api/list/zone-list",
    "title": "Zone List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/zone-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListZoneList"
  },
  {
    "type": "post",
    "url": "/api/list/add-related-product",
    "title": "Add a Related Product",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>Related Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"relatedProductId\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Product adding successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/add-related-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Product Adding error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiListAddRelatedProduct"
  },
  {
    "type": "post",
    "url": "/api/list/contact-us",
    "title": "Contact Us API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"message\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your mail send to admin..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/contact-us"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Contact error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiListContactUs"
  },
  {
    "type": "get",
    "url": "/api/store-question-answer/abuse-reason-list",
    "title": "Answer Abuse Reason List",
    "group": "Store_Question_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-question-answer/abuse-reason-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Abuse reason List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuestionAndAnswerController.ts",
    "groupTitle": "Store_Question_Answer",
    "name": "GetApiStoreQuestionAnswerAbuseReasonList"
  },
  {
    "type": "post",
    "url": "/api/store-question-answer/add-answer",
    "title": "Add Answer API",
    "group": "Store_Question_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "answer",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "questionId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"question\" : \"\",\n     \"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Answer created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-question-answer/add-answer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Answer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuestionAndAnswerController.ts",
    "groupTitle": "Store_Question_Answer",
    "name": "PostApiStoreQuestionAnswerAddAnswer"
  },
  {
    "type": "post",
    "url": "/api/store-question-answer/add-question",
    "title": "Add Question API",
    "group": "Store_Question_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "question",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"question\" : \"\",\n     \"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Question created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-question-answer/add-question"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Question error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuestionAndAnswerController.ts",
    "groupTitle": "Store_Question_Answer",
    "name": "PostApiStoreQuestionAnswerAddQuestion"
  },
  {
    "type": "post",
    "url": "/api/store-question-answer/add-report-abuse",
    "title": "Add Report Abuse API",
    "group": "Store_Question_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "remark",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "answerId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "reasonId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"remark\" : \"\",\n     \"answerId\" : \"\",\n     \"reasonId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully posted your report\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-question-answer/add-report-abuse"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Report Abuse error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuestionAndAnswerController.ts",
    "groupTitle": "Store_Question_Answer",
    "name": "PostApiStoreQuestionAnswerAddReportAbuse"
  },
  {
    "type": "post",
    "url": "/api/store-question-answer/update-like-status",
    "title": "Update Answer Like and DisLike API",
    "group": "Store_Question_Answer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "answerId",
            "description": "<p>answerId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "type",
            "description": "<p>1-&gt; like 2-&gt; dislike</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"answerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully updated\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-question-answer/update-like-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateQuestion error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuestionAndAnswerController.ts",
    "groupTitle": "Store_Question_Answer",
    "name": "PostApiStoreQuestionAnswerUpdateLikeStatus"
  },
  {
    "type": "get",
    "url": "/api/quotation/quotation-request-list",
    "title": "Quotation Request List",
    "group": "Store_Quotation",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"keyword\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/quotation/quotation-request-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "quotation List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuotationController.ts",
    "groupTitle": "Store_Quotation",
    "name": "GetApiQuotationQuotationRequestList"
  },
  {
    "type": "post",
    "url": "/api/quotation/quotation-request",
    "title": "quotation request API",
    "group": "Store_Quotation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantityUnit",
            "description": "<p>quantityUnit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderValue",
            "description": "<p>orderValue</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "purpose",
            "description": "<p>1-&gt; for reselling 2-&gt; for business 3-&gt; for home use</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "comments",
            "description": "<p>comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"quantityUnit\" : \"\",\n     \"orderValue\" : \"\",\n     \"purpose\" : \"\",\n     \"comments\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Requested for quote\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/quotation/quotation-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "quotation  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/QuotationController.ts",
    "groupTitle": "Store_Quotation",
    "name": "PostApiQuotationQuotationRequest"
  },
  {
    "type": "get",
    "url": "/api/store-service/category-list",
    "title": "Category List API",
    "group": "Store_Service",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-service/category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ServiceController.ts",
    "groupTitle": "Store_Service",
    "name": "GetApiStoreServiceCategoryList"
  },
  {
    "type": "get",
    "url": "/api/store-service/service-list",
    "title": "Service List API",
    "group": "Store_Service",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId in number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get service list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-service/service-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "store-service error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ServiceController.ts",
    "groupTitle": "Store_Service",
    "name": "GetApiStoreServiceServiceList"
  },
  {
    "type": "post",
    "url": "/api/store-service/service-enquiry",
    "title": "Add Service Enquiry API",
    "group": "Store_Service",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "serviceId",
            "description": "<p>serviceId(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email(required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobile",
            "description": "<p>mobile(required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "comments",
            "description": "<p>comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"serviceId\" : \"\",\n     \"name\" : \"\",\n     \"email\" : \"\",\n     \"mobile\" : \"\",\n     \"comments\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your enquiry is sended successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-service/store-enquiry"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Enquiry error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ServiceController.ts",
    "groupTitle": "Store_Service",
    "name": "PostApiStoreServiceServiceEnquiry"
  },
  {
    "type": "get",
    "url": "/api/orders/order-cancel-reason-list",
    "title": "Order Cancel Reason List",
    "group": "Store_order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-cancel-reason-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order cancel reason List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderCancelReasonList"
  },
  {
    "type": "get",
    "url": "/api/orders/order-detail",
    "title": "My OrderDetail",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/orders/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/orders/order-list",
    "title": "My Order List",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderList"
  },
  {
    "type": "get",
    "url": "/api/orders/track-order-product",
    "title": "Track Order",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Track Order..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/track-order-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Track Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersTrackOrderProduct"
  },
  {
    "type": "post",
    "url": "/api/orders/add-rating",
    "title": "Add Rating  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>productRatings</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your reviews and ratings!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/add-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "rating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersAddRating"
  },
  {
    "type": "post",
    "url": "/api/orders/add-reviews",
    "title": "Add Reviews  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added reviews!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/add-reviews"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "reviews error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersAddReviews"
  },
  {
    "type": "post",
    "url": "/api/orders/back-order-checkout",
    "title": "Checkout",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDetail",
            "description": "<p>Product Details</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": "<p>paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingLastName",
            "description": "<p>Shipping Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCompany",
            "description": "<p>Shipping Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>ShippingCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingZone",
            "description": "<p>Shipping Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressFormat",
            "description": "<p>Shipping Address Format</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentFirstName",
            "description": "<p>Payment First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentLastName",
            "description": "<p>Payment Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentCompany",
            "description": "<p>Payment Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_1",
            "description": "<p>Payment Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_2",
            "description": "<p>Payment Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCity",
            "description": "<p>Payment City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentPostCode",
            "description": "<p>Payment PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCountryId",
            "description": "<p>PaymentCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentZone",
            "description": "<p>Payment Zone</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponDiscountAmount",
            "description": "<p>couponDiscountAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponData",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetail\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"varientName\" : \"\",\n     \"productVarientOptionId\" : \"\",\n     \"skuName\" : \"\",\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponDiscountAmount\" : \"\",\n     \"couponData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/back-order-checkout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Checkout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersBackOrderCheckout"
  },
  {
    "type": "post",
    "url": "/api/orders/customer-checkout",
    "title": "Checkout",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDetail",
            "description": "<p>Product Details</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": "<p>paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingLastName",
            "description": "<p>Shipping Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCompany",
            "description": "<p>Shipping Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>ShippingCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingZone",
            "description": "<p>Shipping Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressFormat",
            "description": "<p>Shipping Address Format</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentFirstName",
            "description": "<p>Payment First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentLastName",
            "description": "<p>Payment Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentCompany",
            "description": "<p>Payment Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_1",
            "description": "<p>Payment Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_2",
            "description": "<p>Payment Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCity",
            "description": "<p>Payment City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentPostCode",
            "description": "<p>Payment PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCountryId",
            "description": "<p>PaymentCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentZone",
            "description": "<p>Payment Zone</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponDiscountAmount",
            "description": "<p>couponDiscountAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponData",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gstNo",
            "description": "<p>gstNo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetails\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"varientName\" : \"\",\n     \"productVarientOptionId\" : \"\",\n     \"skuName\" : \"\",\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponDiscountAmount\" : \"\",\n     \"couponData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/customer-checkout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Checkout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersCustomerCheckout"
  },
  {
    "type": "post",
    "url": "/api/orders/order-cancel-request",
    "title": "order cancel request API",
    "group": "Store_order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "reasonId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"description\" : \"\",\n     \"orderProductId\" : \"\",\n     \"reasonId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully posted your cancel request\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-cancel-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Request error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersOrderCancelRequest"
  },
  {
    "type": "delete",
    "url": "/api/customer/wishlist-product-delete/:id",
    "title": "Delete Product From Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"wishlistProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you deleted the product from wishlist successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-delete/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "DeleteApiCustomerWishlistProductDeleteId"
  },
  {
    "type": "get",
    "url": "/api/customer/wishlist-product-list",
    "title": "WishList Product List",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the wishlist Product List\",\n     \"status\": \"1\",\n     \"data\": \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "GetApiCustomerWishlistProductList"
  },
  {
    "type": "post",
    "url": "/api/customer/add-product-to-wishlist",
    "title": "Add Product To Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptionValueId",
            "description": "<p>Product Option Value Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"ProductOptionValueId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you product added to the wishlist successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/add-product-to-wishlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Add Product To Wishlist error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "PostApiCustomerAddProductToWishlist"
  },
  {
    "type": "delete",
    "url": "/api/tax/delete-tax/:taxId",
    "title": "Delete Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/delete-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "DeleteApiTaxDeleteTaxTaxid"
  },
  {
    "type": "get",
    "url": "/api/tax/tax-list",
    "title": "Tax List API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get tax list\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/tax-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "GetApiTaxTaxList"
  },
  {
    "type": "post",
    "url": "/api/tax/add-tax",
    "title": "Add Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/add-tax"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PostApiTaxAddTax"
  },
  {
    "type": "put",
    "url": "/api/tax/update-tax/:taxId",
    "title": "Update Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/update-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PutApiTaxUpdateTaxTaxid"
  },
  {
    "type": "delete",
    "url": "/api/varients/delete-varient/:id",
    "title": "Delete Varient API",
    "group": "Varients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted varients.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/varients/delete-varient/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Varients error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/VarientsController.ts",
    "groupTitle": "Varients",
    "name": "DeleteApiVarientsDeleteVarientId"
  },
  {
    "type": "get",
    "url": "/api/varients/varients-detail",
    "title": "Varients Detail API",
    "group": "Varients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Varients detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/varients/varients-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "varients Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/VarientsController.ts",
    "groupTitle": "Varients",
    "name": "GetApiVarientsVarientsDetail"
  },
  {
    "type": "get",
    "url": "/api/varients/varientslist",
    "title": "Varients List API",
    "group": "Varients",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get varient list\",\n     \"data\":{\n     \"id\" : \"\",\n     \"name\" : \"\",\n     \"type\" : \"\",\n     \"sortOrder\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/varients/varientslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/VarientsController.ts",
    "groupTitle": "Varients",
    "name": "GetApiVarientsVarientslist"
  },
  {
    "type": "post",
    "url": "/api/varients/add-varients",
    "title": "Add Varients API",
    "group": "Varients",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "varientsValue",
            "description": "<p>varientsValue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientsValue.valueName",
            "description": "<p>valueName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientsValue.sortOrder",
            "description": "<p>valueName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"type\" : \"\",\n     \"name\" : \"\",\n     \"sortOrder\" : \"\",\n     \"varientsValue\" : [{\n     \"valueName\" : \"\",\n     \"sortOrder\" : \"\",\n}]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"varients is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/varients/add-varients"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "varients error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/VarientsController.ts",
    "groupTitle": "Varients",
    "name": "PostApiVarientsAddVarients"
  },
  {
    "type": "put",
    "url": "/api/varients/update-varients/:id",
    "title": "Update Varients API",
    "group": "Varients",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "varientsValue",
            "description": "<p>varientsValue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientsValue.valueName",
            "description": "<p>valueName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientsValue.sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "varientsValue.id",
            "description": "<p>varient value id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"type\" : \"\",\n     \"name\" : \"\",\n     \"sortOrder\" : \"\",\n     \"varientsValue\" : [{\n     \"id\" : \"\",\n     \"valueName\" : \"\",\n     \"sortOrder\" : \"\",\n}]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Varients are updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/varients/update-varients/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateVarients error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/VarientsController.ts",
    "groupTitle": "Varients",
    "name": "PutApiVarientsUpdateVarientsId"
  },
  {
    "type": "get",
    "url": "/api/vendor/customer-document-list",
    "title": "Get Vendor Document List",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer document list\",\n\"data\":{},\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/customer-document-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorCustomerDocumentList"
  },
  {
    "type": "get",
    "url": "/api/vendor/download-customer-document/:customerDocumentId",
    "title": "Download Vendor Document API",
    "group": "Vendor",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerDocumentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully download customer document file.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/download-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorDownloadCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "get",
    "url": "/api/vendor/order-graph",
    "title": "order graph API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>1-&gt; thisWeek 2-&gt; thisMonth 3-&gt; thisYear</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order statics..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/order-graph"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order statics error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorOrderGraph"
  },
  {
    "type": "get",
    "url": "/api/vendor/total-Dashboard-counts",
    "title": "Total Dashboard Counts",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got total dashboard counts\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/total-Dashboard-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorTotalDashboardCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor/vendor-category-list",
    "title": "Vendor Category List API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor category list\",\n     \"data\":{\n      \"vendorId\" : \"\",\n      \"vendorCategoryId\" : \"\",\n      \"categoryId\" : \"\",\n      \"commission\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/vendor-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorVendorCategoryList"
  },
  {
    "type": "get",
    "url": "/api/vendor/vendor-profile",
    "title": "Vendor Get Profile  API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully got vendor Details\",\n\"data\":{\n\"vendorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/vendor-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorVendorProfile"
  },
  {
    "type": "post",
    "url": "/api/vendor/forgot-password",
    "title": "Forgot Password API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"email\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you. Your password send to your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/vendor/login",
    "title": "login API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully loggedIn\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorLogin"
  },
  {
    "type": "post",
    "url": "/api/vendor/register",
    "title": "register API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "contactPersonName",
            "description": "<p>contactPersonName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Vendor Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Vendor Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"contactPersonName\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for registering with us for selling your product and please check your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/register"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorRegister"
  },
  {
    "type": "post",
    "url": "/api/vendor/upload-customer-document",
    "title": "Upload Vendor Document",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/upload-customer-document"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Customer Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorUploadCustomerDocument"
  },
  {
    "type": "put",
    "url": "/api/vendor/change-password",
    "title": "Change Password API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User newPassword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Password changed\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PutApiVendorChangePassword"
  },
  {
    "type": "put",
    "url": "/api/vendor/edit-vendor/:customerId",
    "title": "Edit Vendor API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Avatar</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Designation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>Company Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>Company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCoverImage",
            "description": "<p>CompanyCoverImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>Company Address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>Company Address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>Company City</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>Company State</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyCountryId",
            "description": "<p>Company Country Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>Company Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>Company Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>Company Website</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>Company Gst Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>Company Pan Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"avatar\" : \"\",\n     \"designation\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyCoverImage\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"companyCountryId\" : \"\",\n     \"pincode\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"paymentInformation\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Edited successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/edit-vendor/:customerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Edit Vendor API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PutApiVendorEditVendorCustomerid"
  },
  {
    "type": "delete",
    "url": "/api/vendor-order/delete-vendor-order/:id",
    "title": "Delete Vendor Order API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Vendor Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/delete-order/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "DeleteApiVendorOrderDeleteVendorOrderId"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/archive-order-export",
    "title": "Archive Order Export API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorOrderArchiveId",
            "description": "<p>vendorOrderArchiveId</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/archive-order-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderArchiveOrderExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/archive-order-list",
    "title": "Archive Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/archive-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderArchiveOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/archive-order-list-count",
    "title": "Archive Order list count API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive order list count\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/archive-order-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderArchiveOrderListCount"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/bulk-archive-order-export",
    "title": "Bulk Archive Order Export API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/bulk-archive-order-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderBulkArchiveOrderExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/bulk-vendor-order-cancel-excel-list",
    "title": "Bulk Order Cancel Excel list",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Bulk Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/bulk-vendor-order-cancel-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderBulkVendorOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/cancel-order-list",
    "title": "Cancel Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got cancel order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/cancel-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderCancelOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-counts",
    "title": "order counts",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-detail/:vendorOrderId",
    "title": "Order Detail API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-detail/:vendorOrderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderDetailVendororderid"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorOrderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-invoice-export-pdf",
    "title": "Order Invoice Export PDF API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-invoice-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderInvoiceExportPdf"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-list",
    "title": "Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deliverylist",
            "description": "<p>deliverylist</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/recent-order-list",
    "title": "Recent Vendor Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get recent order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/recent-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderRecentOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/sales-report-export-list",
    "title": "sales report excel download",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountFrom",
            "description": "<p>search by amountFrom</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "amountTo",
            "description": "<p>search by amountTo</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download total sales report excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/sales-report-export-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Total sales report excel error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderSalesReportExportList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/sales-report-list",
    "title": "Sales Report list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor sales report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/sales-report-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderSalesReportList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/today-vendor-order-count",
    "title": "Today Vendor Order Count API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/today-vendor-order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderTodayVendorOrderCount"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/top-selling-productlist",
    "title": "Top selling ProductList API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>1-&gt; thisWeek 2-&gt; thisMonth 3-&gt; thisYear</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top selling product..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/top-selling-productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top selling product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderTopSellingProductlist"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/update-bulk-vendor-order-cancel-request",
    "title": "Update bulk Vendor Order Cancel Request Status API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Bulk order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-bulk-vendor-order-cancel-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderUpdateBulkVendorOrderCancelRequest"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-invoice-list",
    "title": "Vendor Invoice List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor invoice list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-invoice-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor invoice error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorInvoiceList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-order-cancel-excel-list",
    "title": "Vendor Order Cancel Excel list",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Vendor Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-order-cancel-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Order Cancel Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-order-status-list",
    "title": "OrderStatus List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order status list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrderStatusList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-orders-based-status-list",
    "title": "Vendor order List based on order status API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-orders-based-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrdersBasedStatusList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendorOrderLoglist",
    "title": "Vendor Order Log List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendorOrderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendororderloglist"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/make-vendor-order-archive",
    "title": "Make Vendor Order Archive API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>Vendor Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorOrderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archive\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/make-vendor-order-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderMakeVendorOrderArchive"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/order-invoice-export-send-email-pdf",
    "title": "Order Invoice Export Send Email API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-invoice-export-send-email-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderOrderInvoiceExportSendEmailPdf"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/revoke-vendor-order-archive",
    "title": "Revoke Vendor Order Archive API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderArchiveId",
            "description": "<p>Vendor Order Archive Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorOrderArchiveId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Revoked Archive\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/revoke-vendor-order-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderRevokeVendorOrderArchive"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/update-shipping-information",
    "title": "update shipping information API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>VendorOrderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderUpdateShippingInformation"
  },
  {
    "type": "put",
    "url": "/api/vendor-order/update-order-status/:vendorOrderId",
    "title": "Update OrderStatus API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "subOrderStatusId",
            "description": "<p>OrderStatus subOrderStatusId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"subOrderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-order-status/:vendorOrderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PutApiVendorOrderUpdateOrderStatusVendororderid"
  },
  {
    "type": "put",
    "url": "/api/vendor-order/update-vendor-order-cancel-request/:orderProductId",
    "title": "Update Vendor Order Cancel Request Status API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-vendor-order-cancel-request/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PutApiVendorOrderUpdateVendorOrderCancelRequestOrderproductid"
  },
  {
    "type": "delete",
    "url": "/api/vendor-product/delete-product/:id",
    "title": "Delete Single Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted your product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "DeleteApiVendorProductDeleteProductId"
  },
  {
    "type": "delete",
    "url": "/api/vendor-product/delete-product-varient-option/:id",
    "title": "Delete Product Varient Option API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-product-varient-option/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "DeleteApiVendorProductDeleteProductVarientOptionId"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/product-counts",
    "title": "order counts",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductProductCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-detail/:id",
    "title": "Vendor Product Detail API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductVendorProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-list",
    "title": "Vendor Product List API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get your product list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductVendorProductList"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/create-vendor-product",
    "title": "Create Vendor Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>send 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"hsn\" : \"\",\n     \"image\" : \"\",\n     \"productSlug\" : \"\",\n     \"pincodeBasedDelivery\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"manufacturerId\" : \"\",\n     \"upc\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"others\" : \"\",\n     \"productSlug\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":,\n     \"isActive\":,\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Vendor product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/create-vendor-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PostApiVendorProductCreateVendorProduct"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/delete-product",
    "title": "Delete Multiple Products API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PostApiVendorProductDeleteProduct"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/add-vendor-product-status/:id",
    "title": "Add Vendor Product Status API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>either should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/add-vendor-product-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductAddVendorProductStatusId"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/update-quotation-available/:id",
    "title": "Update Quotation Available API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "quotationAvailable",
            "description": "<p>quotationAvailable should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"quotationAvailable\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product for Quotation Available.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/update-quotation-available/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "quotation available error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductUpdateQuotationAvailableId"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/update-vendor-product/:id",
    "title": "Update Vendor Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincodeBasedDelivery",
            "description": "<p>send 0 OR 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"hsn\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"pincodeBasedDelivery\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":\"\"\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n      }]\n      }],\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"manufacturerId\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated vendor products.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/update-vendor-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductUpdateVendorProductId"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/archive-payment-export",
    "title": "Archive Payment Export API",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorPaymentArchiveId",
            "description": "<p>vendorPaymentArchiveId</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/archive-payment-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesArchivePaymentExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/archive-payment-list",
    "title": "Archive-Payment list API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/archive-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesArchivePaymentList"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/archive-payment-list-count",
    "title": "Archive-Payment list count API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive payment list count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/archive-payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesArchivePaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/bulk-archive-payment-export",
    "title": "Bulk Archive Payment Export API",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/bulk-archive-payment-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesBulkArchivePaymentExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/earning-export",
    "title": "Vendor Earning Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor earning List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/earning-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesEarningExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/payment-counts",
    "title": "payment counts",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment counts\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/payment-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesPaymentCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/payment-list",
    "title": "Payment list API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesPaymentList"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/payment-list-count",
    "title": "Payment list Count API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment list count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesPaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/product-earning-export",
    "title": "Vendor Product Earning Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor product earning List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/product-earning-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesProductEarningExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/sales-export",
    "title": "Sales list Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor sales List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/sales-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesSalesExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/vendor-earning-list",
    "title": "Vendor Earning List API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get your product earnings list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/vendor-earning-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesVendorEarningList"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/vendor-sales-export",
    "title": "Vendor sales list Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor sales List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/vendor-sales-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesVendorSalesExport"
  },
  {
    "type": "post",
    "url": "/api/vendor-sales/make-vendor-payment-archive",
    "title": "Make Vendor Payment Archive API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorPaymentId",
            "description": "<p>VendorPaymentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorPaymentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archived Payments\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/make-vendor-payment-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "PostApiVendorSalesMakeVendorPaymentArchive"
  },
  {
    "type": "delete",
    "url": "/api/widget/delete-widget/:id",
    "title": "Delete widget API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"widgetId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Widget.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/delete-widget/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "DeleteApiWidgetDeleteWidgetId"
  },
  {
    "type": "get",
    "url": "/api/widget/productlist",
    "title": "Product List for widget API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetProductlist"
  },
  {
    "type": "get",
    "url": "/api/widget/widget-count",
    "title": "Widget Count API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got widget count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/widget-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetWidgetCount"
  },
  {
    "type": "get",
    "url": "/api/widget/widget-detail",
    "title": "Widget Detail API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "widgetId",
            "description": "<p>widgetId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got widget detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/widget-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetWidgetDetail"
  },
  {
    "type": "get",
    "url": "/api/widget/widget-list",
    "title": "Widget List API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Widget list\",\n     \"data\":\"{\n     \"widgetId\": \"\",\n     \"title\": \"\",\n     \"content\": \"\",\n     \"metaTagTitle\": \"\",\n     \"metaTagDescription\": \"\",\n     \"metaTagKeyword\": \"\",\n     \"widgetlinkType\": \"\",\n     \"position\": \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/widget-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetWidgetList"
  },
  {
    "type": "post",
    "url": "/api/widget/add-widget",
    "title": "Add Widget API",
    "group": "Widget",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "widgetLinkType",
            "description": "<p>widgetLinkType 1-&gt; catgeory 2-&gt; product</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "refId",
            "description": "<p>refId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"widgetLinkType\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"position\" : \"\",\n     \"refId\" : [],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Widget is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/add-widget"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "PostApiWidgetAddWidget"
  },
  {
    "type": "put",
    "url": "/api/widget/update-widget/:id",
    "title": "Update widget API",
    "group": "Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>widget title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>widget content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagkeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "widgetLinkType",
            "description": "<p>widgetLinkType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": "<p>widget position</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "refId",
            "description": "<p>refId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"widgetLinkType\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"position\" : \"\",\n     \"refId\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated widget.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/update-widget/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "PutApiWidgetUpdateWidgetId"
  },
  {
    "type": "delete",
    "url": "/api/zone/delete-zone/:id",
    "title": "Delete Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zoneId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/delete-zone/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "DeleteApiZoneDeleteZoneId"
  },
  {
    "type": "get",
    "url": "/api/zone/zone-list",
    "title": "Zone List API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/zone-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "GetApiZoneZoneList"
  },
  {
    "type": "post",
    "url": "/api/zone/add-zone",
    "title": "Add Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/add-zone"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PostApiZoneAddZone"
  },
  {
    "type": "put",
    "url": "/api/zone/update-zone/:id",
    "title": "Update Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zoneId\" : \"\",\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/update-zone/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PutApiZoneUpdateZoneId"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-count",
    "title": "bucket-object-count",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "marker",
            "description": "<p>from where to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object count!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaBucketObjectCount"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-list",
    "title": "bucket-object-list",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "marker",
            "description": "<p>from where to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object list!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaBucketObjectList"
  },
  {
    "type": "get",
    "url": "/api/media/delete-file",
    "title": "delete file API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>File Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"fileName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted file!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaDeleteFile"
  },
  {
    "type": "get",
    "url": "/api/media/search-folder",
    "title": "search Folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>folderName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"FolderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/search-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaSearchFolder"
  },
  {
    "type": "post",
    "url": "/api/media/create-folder",
    "title": "Create Folder",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/create-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaCreateFolder"
  },
  {
    "type": "post",
    "url": "/api/media/delete-folder",
    "title": "delete folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaDeleteFolder"
  },
  {
    "type": "post",
    "url": "/api/media/upload-file",
    "title": "Upload File",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Directory Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"file\":\"\",\n  \"path\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully upload file\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/upload-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to upload file\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadFile"
  },
  {
    "type": "get",
    "url": "/api/vendor-quotation/quotation-request-list",
    "title": "Quotation Request List",
    "group": "vendor_Quotation",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"productName\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-quotation/quotation-request-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "quotation List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorQuotationController.ts",
    "groupTitle": "vendor_Quotation",
    "name": "GetApiVendorQuotationQuotationRequestList"
  },
  {
    "type": "delete",
    "url": "/api/vendor-coupon/delete-vendor-coupon/:vendorCouponId",
    "title": "Delete Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor coupon.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/delete-vendor-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Vendor Coupon API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "DeleteApiVendorCouponDeleteVendorCouponVendorcouponid"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/coupon-usage-list",
    "title": "Coupon Usage list API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponId",
            "description": "<p>couponId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"couponId\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"coupon usage List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/coupon-usage-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponCouponUsageList"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/vendor-coupon-detail",
    "title": "Vendor Coupon Detail API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorCouponId",
            "description": "<p>VendorCouponId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully got vendor coupon detail\",\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/vendor-coupon-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon Detail API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponVendorCouponDetail"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/vendor-coupon-list",
    "title": "Vendor Coupon List API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter Coupon Name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Vendor Coupon List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/vendor-coupon-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponVendorCouponList"
  },
  {
    "type": "post",
    "url": "/api/vendor-coupon/add-coupon",
    "title": "Add Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/add-coupon"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "PostApiVendorCouponAddCoupon"
  },
  {
    "type": "put",
    "url": "/api/vendor-coupon/update-vendor-coupon/:vendorCouponId",
    "title": "Edit Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/update-vendor-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "PutApiVendorCouponUpdateVendorCouponVendorcouponid"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/check-pincode-availability",
    "title": "check pincode availability API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully checked availability\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/check-pincode-availability"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "check pincode availability error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreCheckPincodeAvailability"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-details/:vendorPrefixId",
    "title": "Vendor Details API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor Details\",\n\"data\":{\n\"vendorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-details/:vendorPrefixId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorDetailsVendorprefixid"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-product-list/:id",
    "title": "Vendor Product list API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Count",
            "optional": false,
            "field": "count",
            "description": "<p>should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor product list\",\n\"data\":{\n\"productId\" : \"\",\n\"name\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-product-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorProductListId"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-product-review-list",
    "title": "vendor product review List",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Vendor Product Review list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-product-review-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product Review List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorProductReviewList"
  }
] });
