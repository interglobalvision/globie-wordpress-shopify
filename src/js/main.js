/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, Shopify, WP */
import Client from 'shopify-buy';
import Cookies from 'js-cookie';

class GWS {
  constructor() {
    this.mobileThreshold = 601;

    this.fetchProductMeta = this.fetchProductMeta.bind(this);
    this.updateActiveCurrency = this.updateActiveCurrency.bind(this);

    this.$cartCounter = $('.gws-cart-counter');
    this.$product = $('.gws-product');
    this.$addToCartButton = $('.gws-product-add');
    this.$currencySelectHolder = $('.gws-currency-select-holder');
    this.checkoutIdCookieKey = 'gwsCheckoutId';
    this.currencyCookieKey = 'gwsCurrency';
    this.variantIdInputClass = '.gws-variant-id';
    this.priceWrapperClass = '.gws-product-price';
    this.quantitySelectClass = '.gws-quantity-select';
    this.variantSelectClass = '.gws-variant-select';
    this.producePriceAttr = 'data-gws-price';
    this.productHandleAttr = 'data-gws-product-handle';
    this.productAvailableAttr = 'data-gws-available';
    this.postIdAttr = 'data-gws-post-id';
    this.productInCartAttr = 'data-gws-in-cart';

    this.$cart = $('.gws-cart');
    this.$cartItemsContainer = $('.gws-cart-items');
    this.cartItemClass = '.gws-cart-item';
    this.$cartItem = $(this.cartItemClass);
    this.$checkoutContainer = $('.gws-cart-checkout');
    this.cartRemoveClass = '.gws-cart-remove';
    this.cartItemIdAttr = 'data-gws-cart-item-id';
    this.cartThumbClass = '.gws-cart-thumb';
    this.cartTitleClass = '.gws-cart-title';
    this.cartVariantTitleClass = '.gws-cart-variant-title';
    this.cartPriceClass = '.gws-cart-price';
    this.cartQuantityClass = '.gws-cart-quantity';
    this.cartAttributeClass = '.gws-cart-attribute';
    this.cartAttributeKey = 'data-gws-cart-attr-key';
    this.cartItemSubtotalClass = '.gws-cart-item-subtotal';
    this.cartSubtotalSelector = '#gws-cart-subtotal';
    this.cartUpdateEventType = 'gwsCartUpdate';
    this.cartEmptyAttr = 'data-gws-cart-empty';
    this.productIdAttr = 'data-gws-product-id';
    this.cartCheckoutSelector = '.gws-checkout-link';

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

      this.setInitialCurrency();

      if (this.$product.length) { // Archive products page
        this.initProducts();
      }

      if (this.$cart.length) { // Cart is present
        this.initCartSection();
      }

    } else {
      console.error('Shopify URL and/or token missing');
    }
  }

  initProducts() {
    this.$product.each(this.fetchProductMeta);
  }

  /**
   * Add currency select options
   */
  buildCurrencySelect() {
    if (this.$currencySelectHolder.length && Shopify.currencies !== null) {
      // add select element
      this.$currencySelectHolder.html('<select class="gws-currency-select"></select>');
      this.$currencySelect = $('.gws-currency-select');

      // add options to select element
      Shopify.currencies.forEach(currency => {
        this.$currencySelect.append('<option value="' + currency.code + '">' + currency.code + '</option>');
      });

      // set select value
      this.$currencySelect.val(this.activeCurrency);

      // bind currency select change handler
      this.$currencySelect.on('change', this.updateActiveCurrency);
    }
  }

  /**
   * Set initial currency
   */
  setInitialCurrency() {
    // Get active currency from cookies
    let cookieCurrency = Cookies.get(this.currencyCookieKey);

    if (cookieCurrency) {
      this.activeCurrency = cookieCurrency;
      this.initCheckout();
      this.buildCurrencySelect();
    } else {
      this.client.shop.fetchInfo().then((shop) => {
        this.activeCurrency = shop.currencyCode;
        Cookies.set(this.currencyCookieKey, this.activeCurrency);
        this.initCheckout();
        this.buildCurrencySelect();
      });
    }
  }

  /**
   * Update active currency
   */
  updateActiveCurrency() {
    this.activeCurrency = this.$currencySelect.val();

    // set active currency in cookies
    Cookies.set(this.currencyCookieKey, this.activeCurrency);

    if (this.checkout) {
      let lineItems = [];

      if (this.checkout.lineItems) {
        this.checkout.lineItems.forEach((item) => {
          lineItems.push({
            quantity: item.quantity,
            variantId: item.variant.id
          });
        });
      }

      // Create an empty checkout
      this.client.checkout.create({
        presentmentCurrencyCode: this.activeCurrency,
        lineItems
      })
        .then((checkout) => {
          // Do something with the checkout
          // console.log('EMPTY CHECKOUT CREATED', checkout);

          // Save checkout in object
          this.checkout = checkout;

          this.updateCart(checkout);

          // Save the shopifyCheckoutId in a cookie
          Cookies.set(this.checkoutIdCookieKey, checkout.id, { expires: 7 }); // Expires in 7 days
        });
    }
    //console.log(this.checkout.lineItems[0].variant.id);
  }

  /**
   * Init the Shopify checkout, current or new
   */
  initCheckout() {
    // Get shopifyCheckoutId from cookies
    this.checkoutId = Cookies.get(this.checkoutIdCookieKey);

    // If shopifyCheckoutId already exists (means there was already a cart initiated before)
    if (this.checkoutId) {

      // Fetch existing checkout by its checkoutId
      this.client.checkout.fetch(this.checkoutId)
        .then(checkout => {
          // Do something with the checkout
          // console.log('EXISTING CHECKOUT', checkout);

          if (checkout.completedAt) {
            // Create an empty checkout
            console.log('checkout completed');
            Cookies.remove(this.checkoutIdCookieKey);
            this.clearLocalStorageItems();
            this.createEmptyCheckout();

          } else {
            // Save the checkout in object
            this.checkout = checkout;

            // Update cart display
            this.updateCart(checkout);
          }

        }).catch( error => {
          console.log(error);
        });

    } else { // Non existing checkout

      // Create an empty checkout
      this.createEmptyCheckout();
      
    }
  }

  clearLocalStorageItems() {
    Object.keys(localStorage).forEach(key => {
      if (key !== 'WP_DATA_USER_1' && key !== 'cookies-accepted') {
        localStorage.removeItem(key)
      }
    });
  }

  createEmptyCheckout() {
    this.client.checkout.create({
      presentmentCurrencyCode: this.activeCurrency
    })
      .then((checkout) => {
        // Do something with the checkout
        console.log('EMPTY CHECKOUT CREATED', checkout);

        // Save checkout in object
        this.checkout = checkout;

        // Save the shopifyCheckoutId in a cookie
        Cookies.set(this.checkoutIdCookieKey, checkout.id, { expires: 7 }); // Expires in 7 days
      });
  }

  fetchProductMeta(index, element) {
    const productHandle = $(element).attr(this.productHandleAttr);

    if (!productHandle) {
      this.setProductAvailability(element);
      return;
    }

    // Fetch data from shopify. Returns a promise
    this.client.product.fetchByHandle(productHandle)
      .then(product => {
        const productAvailable = this.setProductAvailability(element, product.variants);

        if (productAvailable) {
          this.updateProductVariant(element, product.variants[0]);
        }

        const productInCart = localStorage.getItem(product.id) ? true : false;
        this.updateProductInCartStatus(element, productInCart);

        // Generate variation selector
        if (product.variants.length > 1) {
          this.generateOptions(element, product.variants);
        }

        this.$addToCartButton.on('click', this.handleAddToCart.bind(this, element, product));
      })
      .catch( error => {
        console.log(error);
      });

  }

  updateProductInCartStatus(element, status) {
    const attrValue = status ? 'true' : 'false';
    $(element).attr(this.productInCartAttr, attrValue);
  }

  getProductInCartStatus(element) {
    const status = $(element).attr(this.productInCartAttr);
    if (status === 'true') {
      return true;
    }
    return false;
  }

  /**
   * Add item to Cart
   */
  handleAddToCart(element, product) {
    const itemsToAdd = this.getQuantityAndVariant(element, product.variants);
    const productInCart = this.getProductInCartStatus(element);

    if (itemsToAdd && !productInCart) {
      // Add an item to the checkout in shopify
      this.client.checkout.addLineItems(this.checkout.id, [itemsToAdd])
        .then((checkout) => {
          // Do something with the updated checkout
          this.dispatchCartUpdateEvent('added', checkout.lineItems[0].variant);

          // Update cart
          this.updateCart(checkout);

          // Add handle to localStorage
          const postId = $(element).attr(this.postIdAttr);
          if (postId) {
            localStorage.setItem(product.id, postId);
          }

          this.updateProductInCartStatus(element, true);
        })
        .catch( error => {
          console.log(error);
        });

    } else if (productInCart) {
      this.dispatchCartUpdateEvent('incart', false);
    } else {
      $('#out-of-stock').addClass('show');
    }

    // Prevent default form submit
    return false;
  }

  /**
   * Assign boolean value to data-available attribute.
   * True if at least one product variant is available.
   * @param {string} element - The product element in DOM
   * @param {array} variants - Product variants returned from Shopify API
   */
  setProductAvailability(element, variants) {
    let productAvailable = false; // assume falseyness to start

    if (variants) {
      $.each(variants, function(i, val) {
        if (val.available) {
          // found an available variant
          productAvailable = true;

          return false; // break $.each loop
        }
      });
    }
    // if no variants, we assume product is unavailable

    // assign attribute value
    $(element).attr(this.productAvailableAttr, productAvailable);

    return productAvailable;
  }

  updateProductVariant(element, variant) {
    const $priceWrapper = $(element).find(this.priceWrapperClass);
    const $variantIdInput = $(element).find(this.variantIdInputClass);

    if (variant) {
      if ($priceWrapper.length) {
        const price = variant.compareAtPrice ? variant.compareAtPrice : variant.price;
        $priceWrapper.html(price);
        $(element).attr(this.producePriceAttr, price);
      }
      if ($variantIdInput.length) {
        this.setVariantId($variantIdInput, variant);
      }
    }
  }

  setVariantId($variantIdInput, variant) {
    $variantIdInput.val(variant.id);
  }

  getQuantityAndVariant(element, variants) {
    const variant = this.getSelectedVariant(element, variants);

    const $quantitySelect = $(element).find(this.quantitySelectClass);
    const quantity = $quantitySelect.length ? parseInt($quantitySelect.val()) : 1;

    if (!variant.available) {
      return false;
    }

    return({
      variantId: variant.id,
      quantity,
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
          <select id="option-${option.name}" class="gws-variant-select font-uppercase">`;

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

  getSelectedVariant(element, variants) {
    if (variants.length === 1) {
      return variants[0];
    }

    // Map values of form select inputs to array
    const selectedOptions = $(element).find(this.variantSelectClass).map((index, elem) => {
      return $(elem).val();
    });

    // Set defaults for variant search
    let matchFound = false;
    let variant = null;

    // Loop through product variants
    // example: Small/White, Medium/White, Small/Black, ...
    for (let i = 0; i < variants.length; i++) {
      let variantOptions = variants[i].selectedOptions;
      variant = variants[i];

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
              return variant;
            }

            // Otherwise just iterate to next selected option
            v++;
          }
        }
      }
    }

    return variant;
  }

  initCartSection() {
    // Get DOM elements
    this.cartItemHtml = this.$cartItem[0].outerHTML;

    // Bind functions
    this.handleCartQuantity = this.handleCartQuantity.bind(this); // Bind the quantity selector
    this.handleRemoveItems = this.handleRemoveItems.bind(this); // Bind remove item button
    this.handleCartAttributeUpdate = this.handleCartAttributeUpdate.bind(this); // Bind attribute update
  }

  /**
   * Update cart
   * @param {object} checkout - The updated shopify checkout object
   */
  updateCart(checkout) {
    const { lineItems, webUrl, paymentDue } = checkout;
    console.log(checkout);

    // Update cart items in header
    this.$cartCounter.html(lineItems.length);

    // Update page Cart content
    if (this.$cart.length) {
      // Clear cart items
      this.$cartItemsContainer.html('');

      if (lineItems.length > 0) {
        this.$cart.attr(this.cartEmptyAttr, false);

        this.generateCartItemsRows(lineItems);
        this.bindCartInputs(lineItems);
        this.updateSubtotal(paymentDue);
        this.bindRemoveItems();

        $(this.cartCheckoutSelector).attr('href', webUrl);
      } else {
        this.$cart.attr(this.cartEmptyAttr, true);
      }
    }
  }

  /*
   * Generate cart items rows markup
   * @param {object} items - Shopify items object
   */
  generateCartItemsRows(items) {
    if (items.length) {

      items.forEach( item => {
        if (!item.variant.available) {
          // Item sold out
          this.removeCartItems(item.id);
          return;
        }

        // Get item markup and append as new element
        const $cartItem = $(this.cartItemHtml);
        this.$cartItemsContainer.append($cartItem);

        // Handle product id and post id
        const productId = item.variant.product.id;
        const postId = localStorage.getItem(productId);
        $cartItem.attr(this.productIdAttr, item.variant.product.id);

        // Set item ID to data attr
        $cartItem.attr(this.cartItemIdAttr, item.id);

        // Declare item elements
        const $cartThumb = $cartItem.find(this.cartThumbClass);
        const $cartTitle = $cartItem.find(this.cartTitleClass);
        const $cartVariantTitle = $cartItem.find(this.cartVariantTitleClass);
        const $cartQuantity = $cartItem.find(this.cartQuantityClass);
        const $cartSubtotal = $cartItem.find(this.cartItemSubtotalClass);

        // Define item image and title
        const imageSrc = item.variant.image !== null ? item.variant.image.src : '';
        const variantTitle = item.variant.title === 'Default Title' ? '' : item.variant.title;

        // Fill item content if defined
        if ($cartThumb) {$cartThumb.css('background-image', 'url(\'' + imageSrc + '\')');}
        if ($cartTitle) {
          const path = Shopify.itemSlug ? Shopify.itemSlug + '/' : '?p=';
          const title = postId ? `<a href="${WP.siteUrl}/${path}${postId}">${item.title}</a>` : item.title;
          $cartTitle.html(title);
        }
        if ($cartVariantTitle) {$cartVariantTitle.text(variantTitle);}
        if ($cartQuantity) {$cartQuantity.val(item.quantity);}
        if ($cartSubtotal) {$cartSubtotal.text(item.variant.price * item.quantity);}
      });

      this.$cartRemoveItem = $(this.cartRemoveClass);
    }
  }

  updateSubtotal(price) {
    $(this.cartSubtotalSelector).text(price);
  }

  bindCartInputs() {
    $(this.cartQuantityClass).on('change', this.handleCartQuantity);
    $(this.cartAttributeClass).on('change', this.handleCartAttributeUpdate);
  }

  handleCartQuantity(e) {
    var $cartItem = $(e.target).closest(this.cartItemClass);
    var $cartItemSubtotal = $cartItem.find(this.cartItemSubtotalClass);
    var cartItemId = $cartItem.attr(this.cartItemIdAttr);
    var quantity = parseInt(e.target.value);

    // Update the line item on the checkout (change the quantity or variant)
    this.client.checkout.updateLineItems(this.checkout.id, [{id: cartItemId, quantity}]).then((checkout) => {
      // Do something with the updated checkout
      console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
      var item = checkout.lineItems.find(function(item) {
        return item.id === cartItemId;
      });
      $cartItemSubtotal.text(item.quantity * item.variant.price);
      this.updateSubtotal(checkout.paymentDue);
    });
  }

  handleCartAttributeUpdate(e) {
    const key = $(e.target).attr(this.cartAttributeKey);
    const value = e.target.type === 'checkbox' ? e.target.checked.toString() : e.target.value;
    const input = {customAttributes: [{key, value}]};

    this.client.checkout.updateAttributes(this.checkout.id, input).then((checkout) => {
      console.log(checkout);
    });
  }

  bindRemoveItems() {
    this.$cartRemoveItem.on('click', this.handleRemoveItems);
  }

  handleRemoveItems(event) {
    const $cartItem = $(event.target).closest(this.cartItemClass);
    const cartItemId = $cartItem.attr(this.cartItemIdAttr);
    const productId = $cartItem.attr(this.productIdAttr);

    this.removeCartItems(cartItemId);
    localStorage.removeItem(productId);
  }

  removeCartItems(cartItemId) {
    this.client.checkout.removeLineItems(this.checkout.id, [cartItemId]).then( checkout => {
      this.updateCart(checkout);
      this.dispatchCartUpdateEvent('removed');
    });
  }

  dispatchCartUpdateEvent(context, variant) {
    window.dispatchEvent(
      new CustomEvent(this.cartUpdateEventType, {
        detail: {
          context,
          variant
        }
      })
    );
  }

}

new GWS();
