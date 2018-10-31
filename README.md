## Sales Promotion Application

Customer gets 3 offers, by creating a new order on the Shopify store.

### How it works

1.  Customer request 3 price offers, like where can I find the cheapest "iphone screen repairs" in my ciy.
2.  Shop owners near the customer can now send an offer back, max 1 for each owner.

### Who, where

This application will be used by different shop owners to send a offer to customers.

The customers will use the **Shopify store** to request a offer by creating a order.

## Demo?

Platform for owners: https://givetttilbud.herokuapp.com/login
Shop for customers: (coming soon)

## Installation

You need shopify development store, and mongodb up and running locally, and opencagedata api to run this project.

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

I'm using Heroku for Cloud, Node in Backend and React on the Frontend!

### Backend

**[Node](https://nodejs.org/en/)**
_Javascript running as standalone application_

**[Hapi](https://hapijs.com/)**
_Framework for building services (api)_

**[MongoDB](https://www.mongodb.com/)**
_Document database_

**[Mongoose](https://mongoosejs.com/)**
_ORM_

**[Joi](https://github.com/joijs)**
_Validator for payload, and parameters, works with Hapi._

**[Ava](https://github.com/avajs)**
_Testing Hapi requests_

### Frontend

**[React](https://reactjs.org/)**
_User interface_

**[Redux](https://redux.js.org/)**
_State_

**[Reselect](https://github.com/reduxjs/reselect)**
_Computing state_

**[Router5](https://router5.js.org/)**
_Universal router_

**[Material-UI](https://material-ui.com/)**
_Google's Material Design Components_

**[Formik](https://github.com/jaredpalmer/formik)**
_Forms in React, work with material ui components._

**[Yup](https://github.com/jquense/yup)**
_Validator for forms, work with formik_

**[Moment](https://momentjs.com/)**
_Dates and times_

**[Jest](https://jestjs.io/)**
_Testing_
