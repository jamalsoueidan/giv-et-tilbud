const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    email: String,
    created_at: Date,
    updated_at: Date,
    fulfillment_status: String,
    phone: String,
    customer: {
      first_name: String,
      last_name: String,
      country_code: String
    },
    shipping_address: {
      city: String,
      zip: Number
    },
    line_items: [
      {
        properties: [
          {
            name: String,
            value: String
          }
        ]
      }
    ],
    offers: [
      {
        user: Number,
        properties: [
          {
            name: String,
            value: String
          }
        ]
      }
    ]
  },
  {
    collection: "orders"
  }
);

module.exports = schema;

/* {
        "id": 683789418607,
        "email": "asd@gmail.com",
        "closed_at": null,
        "created_at": "2018-10-26T07:44:23-04:00",
        "updated_at": "2018-10-26T07:44:23-04:00",
        "number": 37,
        "note": null,
        "token": "b603d1b29e49c2f294c194677a1e245f",
        "gateway": "",
        "test": false,
        "total_price": "0.00",
        "subtotal_price": "0.00",
        "total_weight": 0,
        "total_tax": "0.00",
        "taxes_included": false,
        "currency": "DKK",
        "financial_status": "paid",
        "confirmed": true,
        "total_discounts": "0.00",
        "total_line_items_price": "0.00",
        "cart_token": null,
        "buyer_accepts_marketing": false,
        "name": "#1037",
        "referring_site": null,
        "landing_site": null,
        "cancelled_at": null,
        "cancel_reason": null,
        "total_price_usd": "0.00",
        "checkout_token": null,
        "reference": null,
        "user_id": null,
        "location_id": null,
        "source_identifier": null,
        "source_url": null,
        "processed_at": "2018-10-26T07:44:23-04:00",
        "device_id": null,
        "phone": "+4520517595",
        "customer_locale": null,
        "app_id": 2604537,
        "browser_ip": null,
        "landing_site_ref": null,
        "order_number": 1037,
        "discount_applications": [],
        "discount_codes": [],
        "note_attributes": [],
        "payment_gateway_names": [],
        "processing_method": "",
        "checkout_id": null,
        "source_name": "2604537",
        "fulfillment_status": null,
        "tax_lines": [],
        "tags": "",
        "contact_email": "asd@gmail.com",
        "order_status_url": "https://checkout.shopify.com/6993903727/orders/b603d1b29e49c2f294c194677a1e245f/authenticate?key=29de4bf2a137725d92a65d6459f83e97",
        "presentment_currency": "DKK",
        "total_line_items_price_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "total_discounts_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "total_shipping_price_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "subtotal_price_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "total_price_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "total_tax_set": {
            "shop_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            },
            "presentment_money": {
                "amount": "0.00",
                "currency_code": "DKK"
            }
        },
        "total_tip_received": "0.0",
        "admin_graphql_api_id": "gid://shopify/Order/683789418607",
        "line_items": [
            {
                "id": 1599691685999,
                "variant_id": 16460815564911,
                "title": "Tilbud",
                "quantity": 1,
                "price": "0.00",
                "sku": "",
                "variant_title": "test",
                "vendor": "givettilbud",
                "fulfillment_service": "manual",
                "product_id": 1755803779183,
                "requires_shipping": true,
                "taxable": true,
                "gift_card": false,
                "name": "Tilbud - test",
                "variant_inventory_management": "shopify",
                "properties": [
                    {
                        "name": "custom engraving",
                        "value": "Happy Birthday Mom!"
                    }
                ],
                "product_exists": true,
                "fulfillable_quantity": 1,
                "grams": 0,
                "total_discount": "0.00",
                "fulfillment_status": null,
                "price_set": {
                    "shop_money": {
                        "amount": "0.00",
                        "currency_code": "DKK"
                    },
                    "presentment_money": {
                        "amount": "0.00",
                        "currency_code": "DKK"
                    }
                },
                "total_discount_set": {
                    "shop_money": {
                        "amount": "0.00",
                        "currency_code": "DKK"
                    },
                    "presentment_money": {
                        "amount": "0.00",
                        "currency_code": "DKK"
                    }
                },
                "discount_allocations": [],
                "admin_graphql_api_id": "gid://shopify/LineItem/1599691685999",
                "tax_lines": []
            }
        ],
        "shipping_lines": [],
        "shipping_address": {
            "first_name": "jamal",
            "address1": "---",
            "phone": null,
            "city": "Aarhus",
            "zip": "8000",
            "province": null,
            "country": "Denmark",
            "last_name": "soueidan",
            "address2": null,
            "company": null,
            "latitude": 56.1460465,
            "longitude": 10.2027261,
            "name": "jamal soueidan",
            "country_code": "DK",
            "province_code": null
        },
        "fulfillments": [],
        "refunds": [],
        "customer": {
            "id": 863695208559,
            "email": "asd@gmail.com",
            "accepts_marketing": false,
            "created_at": "2018-10-25T17:38:52-04:00",
            "updated_at": "2018-10-26T07:44:23-04:00",
            "first_name": "jamal",
            "last_name": "soueidan",
            "orders_count": 16,
            "state": "disabled",
            "total_spent": "0.00",
            "last_order_id": 683789418607,
            "note": null,
            "verified_email": true,
            "multipass_identifier": null,
            "tax_exempt": false,
            "phone": null,
            "tags": "",
            "last_order_name": "#1037",
            "currency": "DKK",
            "admin_graphql_api_id": "gid://shopify/Customer/863695208559",
            "default_address": {
                "id": 961640005743,
                "customer_id": 863695208559,
                "first_name": "jamal",
                "last_name": "soueidan",
                "company": null,
                "address1": "---",
                "address2": null,
                "city": "Aarhus",
                "province": null,
                "country": "Denmark",
                "zip": "8000",
                "phone": null,
                "name": "jamal soueidan",
                "province_code": null,
                "country_code": "DK",
                "country_name": "Denmark",
                "default": true
            }
        }
    }
*/
