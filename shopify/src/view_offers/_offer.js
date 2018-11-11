import React from "react";

class Offer extends React.Component {
  render() {
    return (
      <article className="product-list-item" id="product-list-item-288335897">
        <figure className="product-list-item-thumbnail">
          <a href="/products/beer-print">
            <img
              src="//cdn.shopify.com/s/files/1/0434/2781/products/doublenaut_bottled_600x600.png?v=1397249726"
              alt="Beer Print"
              className="product-list-item-image"
            />
          </a>
        </figure>

        <div className="product-list-item-details">
          <h1 className="product-list-item-title">
            <a href="/products/beer-print">Beer Print</a>
          </h1>

          <p className="product-list-item-price">
            <span className="price">
              <span
                className="money"
                data-currency-usd="$50.00 USD"
                data-currency="USD"
              >
                $50.00 USD
              </span>
            </span>
          </p>
        </div>
      </article>
    );
  }
}

export default Offer;
