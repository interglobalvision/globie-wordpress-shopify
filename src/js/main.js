/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, Shopify */
import Client from 'shopify-buy';
import Cookies from 'js-cookie';

class Shop {
  constructor() {
    this.mobileThreshold = 601;

    this.fetchProductMeta = this.fetchProductMeta.bind(this);

    $(window)
      .resize(this.onResize.bind(this)) // Bind resize
      .on('ajaxySuccess', this.onReady.bind(this)); // Bind ajaxSuccess (custom event, comes from Ajaxy)

    $(document).ready(this.onReady.bind(this));
  }

  onResize() {
  }

  onReady() {

    // Check shopify api data
    if(Shopify.domain !== null && Shopify.storefrontAccessToken !== null) {
      const { domain, storefrontAccessToken } = Shopify;

      // Init Shopify client
      this.client = Client.buildClient({
        domain,
        storefrontAccessToken,
      });

      this.initCheckout();

      if ($('.post-type-archive-product').length) { // Archive products page
        this.initShopProducts();
      }

      if ($('.single-product').length) { // Single product page
        //this.initSingleProduct();
      }

      /*
      if ($('#cart').length) { // Cart is present
        this.bindCartToggle();
        this.initCartSection();
      }
      */

    } else {
      console.error('Shopify URL and/or token missing');
    }
  }

  initShopProducts() {
    $('.shop-product').each(this.fetchProductMeta);
  }

  fetchProductMeta(index, element) {
    const productHandle = $(element).attr('data-shopify-handle');

    if (!productHandle) {
      this.setProductAvailability(element);
      return;
    }

    // Fetch data from shopify. Returns a promise
    this.client.product.fetchByHandle(productHandle)
      .then(data => {
        console.log(data);

        this.setProductAvailability(element, data.variants);
      })
      .catch( error => {
        console.log(error);
      });

  }

  setProductAvailability(element, variants) {
    let productAvailable = false;

    if (variants) {
      $.each(variants, function(i, val) {
        if (val.available) {
          // found an available variant
          productAvailable = true;
          
          return false; // break $.each loop
        }
      });
    }

    $(element).attr('data-available', productAvailable);
  }

  /**
   * Init the Shopify checkout, current or new
   */
  initCheckout() {

    // Get cart link DOM elements
    this.$cartCounter = $('#cart-counter');

    // Get shopifyCheckoutId from cookies
    const checkoutId = Cookies.get('shopifyCheckoutId');

    // If shopifyCheckoutId already exists (means there was already a cart initiated before)
    if (checkoutId) {

      // Fetch existing checkout by its checkoutId
      this.client.checkout.fetch(checkoutId)
        .then(checkout => {
          // Do something with the checkout
          // console.log('EXISTING CHECKOUT', checkout);

          // Save the checkout in object
          this.checkout = checkout;

          // Update cart display
          this.updateCart(checkout);

        }).catch( error => {
          console.log(error);
        });

    } else { // Non existing checkout

      // Create an empty checkout
      this.client.checkout.create()
        .then((checkout) => {
          // Do something with the checkout
          // console.log('EMPTY CHECKOUT CREATED', checkout);

          // Save checkout in object
          this.checkout = checkout;

          // Save the shopifyCheckoutId in a cookie
          Cookies.set('shopifyCheckoutId', checkout.id, { expires: 7 }); // Expires in 7 days
        });
    }
  }

  initSingleProduct() {
    this.productHandle = $('#shopify-handle').attr('data-shopify-handle');

    if (this.productHandle) {
      this.fetchProductMeta(this.productHandle);
    }
  }

  initCartSection() {
    // Get DOM elements
    this.$itemsContainer = $('#items-container');
    this.$checkoutContainer = $('#checkout-container');
    this.$subtotalContainer = $('#subtotal-container');

    // Bind functions
    this.handleCartQuantity = this.handleCartQuantity.bind(this); // Bind the quantity selector
    this.handleRemoveItems = this.handleRemoveItems.bind(this); // Bind remove item button
  }

  /**
   * Fetch a product data from shopiy
   * @param {string} productHandle - The product handle
   */
  /*
  fetchProductMeta(productHandle) {
    // Fetch data from shopify. Returns a promise
    this.client.product.fetchByHandle(productHandle)
      .then(product => {

        // Get DOM elements
        this.$price = $('.single-product-price');
        this.$quantitySelect = $('#quantity');
        this.$quantityLabel = $('#quantity-select-label');
        this.$variationSelect = $('#variation-select');
        this.$variationLabel = $('#variation-select-label');

        // Display price
        this.showPrice(product, this.$price);

        // Generate variation selector
        this.generateOptions(product);

        // Bind functions
        this.handleAddToCart = this.handleAddToCart.bind(this, product);

        // Bind AddToCart button
        $('.add-to-cart').on('click', this.handleAddToCart);

      })
      .catch( error => {
        console.log(error);
      });
  }
  */

  /**
   * Update cart
   * @param {object} checkout - The updated shopify checkout object
   */
  updateCart(checkout) {
    const { lineItems, webUrl, subtotalPrice } = checkout;

    // Update cart items in header
    this.$cartCounter.html(lineItems.length);

    // Update page Cart content
    if ($('#cart').length) {
      this.clearCartMarkup();

      if (lineItems.length > 0) {
        this.generateCartItemsRow(lineItems);
        this.bindCartInputs(lineItems);
        this.generateCheckout(webUrl);
        this.generateSubtotal();
        this.updateSubtotal(subtotalPrice);

        this.$removeItem = $('.remove-item');
        this.bindRemoveItems();
      }
    }
  }

  /**
   * Clear HTML from Cart to prepare for update
   */
  clearCartMarkup() {
    this.$itemsContainer.html('');
    this.$subtotalContainer.html('');
    this.$checkoutContainer.html('');
  }

  /**
   * Show price in an DOM element
   * @param {object} product - Shopify product object
   * @param {object} $element - jQuery DOM object to update
   */
  showPrice(product, $element) {
    // Update the element with the price of the first variant
    $element.html('$ ' + product.attrs.variants[0].price);
  }

  /**
   * Add item to Cart
   */
  handleAddToCart(product) {
    const itemsToAdd = this.getQuantityAndVariant(product);

    if (itemsToAdd.variantId) {

      // Add an item to the checkout in shopify
      this.client.checkout.addLineItems(this.checkout.id, [itemsToAdd])
        .then((checkout) => {
          // Do something with the updated checkout

          // Update the cart with the updated checkout
          this.updateCart(checkout);
        })
        .catch( error => {
          console.log(error);
        });

    } else {
      $('#out-of-stock').addClass('show');
    }
  }

  /*
   * Generate cart items rows markup
   * @param {object} items - Shopify items object
   */
  generateCartItemsRow(items) {
    if (items.length) {
      items.map( item => {

        const image =  item.variant.image.src ?  `<img alt="${item.title}" src="${item.variant.image.src}" />` : ``;

        const variant = item.variant.title === `Default Title` ? `` : item.variant.title;

        this.$itemsContainer.append(`
          <div class="grid-row margin-bottom-basic">
            <div class="grid-item item-s-3">
              ${image}
            </div>
            <div class="grid-item item-s-9 grid-row no-gutter">
              <div class="grid-item item-s-12">
                <h3>${item.title}</h3>
                <span>${variant}</span>
              </div>
              <div class="grid-item item-s-12 grid-row no-gutter padding-top-tiny">
                <div class="grid-item item-s-4 font-size-small">
                  Qty: <input class="cart-item-quantity font-size-basic" type="number" max="9" min="1" value="${item.attrs.quantity.value}" data-product-id="${item.id}" />
                </div>
                <div class="grid-item item-s-4">
                  <span>$${item.variant.price}</span>
                </div>
                <div class="grid-item item-s-4 text-align-right">
                  <button class="remove-item font-size-small font-uppercase button-no-padding" data-product-id="${item.id}" >Remove</button>
                </div>
              </div>
            </div>
          </div>
        `);
      });
    } else {
      this.$itemsContainer.append(`
        <div class="grid-row">
          <div class="grid-item item-s-12">
            <h3 class="font-uppercase">Bag is empty</h3>
          </div>
        </div>
      `);
    }
  }

  generateCheckout(checkoutUrl) {
    this.$checkoutContainer.append(`<a href="${checkoutUrl}" class="font-uppercase font-medium">Checkout</a>`);
  }

  generateSubtotal() {
    this.$subtotalContainer.append(`
      <div class="grid-item item-s-8 text-align-right font-uppercase">
        Subtotal:
      </div>
      <div class="grid-item item-s-4">
        $<span id="subtotal"></span>
      </div>
    `);
  }

  updateSubtotal(price) {
    $('#subtotal').text(price);
  }

  bindCartInputs() {
    $('.cart-item-quantity').on('change', this.handleCartQuantity);
  }

  handleCartQuantity(event) {
    const productId =  event.target.dataset.productId;
    const quantity = parseInt(event.target.value);

    const productToUpdate = {
      id: productId,
      quantity,
    };

    // Update the line item on the checkout (change the quantity or variant)
    this.client.checkout.updateLineItems(this.checkout.id, [productToUpdate])
      .then((checkout) => {
        // Do something with the updated checkout
        console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        this.updateSubtotal(checkout.subtotalPrice);
    });
  }

  generateOptions(product) {
    product.options.map( option => {
      let hidden = '';

      if (option.name === 'Title') {
        hidden = 'u-hidden';
      }

      let optionHtml = `
      <div class="grid-item item-s-12 no-gutter grid-row margin-bottom-basic align-items-center ${hidden}">
        <div class="grid-item item-s-6 text-align-right">
          <label for="option-${option.name}" class="font-uppercase font-size-small">${option.name}</label>
        </div>
        <div class="grid-item item-s-6">
          <select id="option-${option.name}" class="product-variant-select font-uppercase">`;

      option.values.map( option => {
        optionHtml += `<option value=\"${option.value}\">${option.value}</option>`;
      });

      optionHtml += `
          </select>
        </div>
      </div>`;

      $('#product-options').append(optionHtml);
    });
  }

  bindRemoveItems() {
    this.$removeItem.on('click', this.handleRemoveItems);
  }

  handleRemoveItems(event) {
    const productId =  event.target.dataset.productId;

    this.client.checkout.removeLineItems(this.checkout.id, [productId]).then( checkout => {
      this.updateCart(checkout);
    });
  }

  getVariantId(product) {
    // Map values of form select inputs to array
    const selectedOptions = $('.product-variant-select').map((index, elem) => {
      return $(elem).val();
    });

    const variants = product.variants;

    // Set defaults for variant search
    let matchFound = false;
    let variantId = false;

    // Loop through product variants
    // example: Small/White, Medium/White, Small/Black, ...
    for (let i = 0; i < variants.length; i++) {
      let variantOptions = variants[i].selectedOptions;
      variantId = variants[i].id;

      // initiate selectedOptions counter
      let v = 0;

      // Loop through options of each variant
      // example: Small, White
      for (let j = 0; j < variantOptions.length; j++) {

        // Loop through values retrieved from form select inputs.
        // See if they correspond to this variant's options
        for (let k = 0; k < selectedOptions.length; k++) {

          // TRUE if this variant option matches the selected option
          matchFound = variantOptions[j].value === selectedOptions[v];

          if (matchFound) {
            // If this is the last selected option
            // and match found is still true
            if (v === (selectedOptions.length - 1)) {
              return variantId;
            }

            // Otherwise just iterate to next selected option
            v++;
          }
        }
      }
    }
  }

  getQuantityAndVariant(product) {
    const variantId = this.getVariantId(product);
    const quantity = parseInt(this.$quantitySelect.val());

    // Has to be an array
    return({
      variantId,
      quantity,
    });
  }

}

new Shop();
