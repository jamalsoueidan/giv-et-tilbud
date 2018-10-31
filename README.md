# Sales Promotion Application

Customer get 3 offers, by creating a new order on the Shopify store.

## How it works

1.  Customer request 3 price offers, like the cheapest "iphone screen repairs".
2.  Shop owners can now send an offer back to customer, max 1.

## Who, where

This application will be used by different shop owners to send a offer to customers.

The customers will use the **Shopify store** to request a offer by creating a order.

## Installation

You need shopify developer store, and mongodb up and running locally, and opencagedata api to get this project running.

Create .env file

```javascript
SECRET_KEY=(random key for token)
SHOPIFY_USERNAME=(shopify user)
SHOPIFY_PASSWORD=(shopify pass)
SHOPIFY_URL=(shopify url)
SHOPIFY_PRODUCT_ID=(product_id)
SHOPIFY_VARIANT_ID=(variant_id)
MONGODB_URI=user:password@url:port/database
OPENCAGEDATA_URL=api.opencagedata.com/geocode/v1/
OPENCAGEDATA_KEY=(key from opencagedata.com)
```

## Tech

I'm using Heroku in Cloud, Node in Backend and React on the Frontend.

### Backend

**Node**
_Javascript running as standalone application_

**Hapi**
_Framework for building services (api)_

**MongoDB**
_Document database_

**Mongoose**
_ORM_

**Joi**
_Validator for payload, and parameters, works with Hapi._

**Ava**
_Testing Hapi requests_

### Frontend

**React**
_User interface_

**Redux**
_State_

**Reselect**
_Computing state_

**Router5**
_Universal router_

**Material-UI**
_Google's Material Design Components_

**Formik**
_Forms in React, work with material ui components._

**Yup**
_Validator for forms, work with formik_

**Moment**
_Dates and times_

**Jest**
_Testing_
