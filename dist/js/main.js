/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); /* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, Shopify, WP */
var _shopifyBuy = __webpack_require__(1);var _shopifyBuy2 = _interopRequireDefault(_shopifyBuy);
var _jsCookie = __webpack_require__(2);var _jsCookie2 = _interopRequireDefault(_jsCookie);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

GWS = function () {
  function GWS() {_classCallCheck(this, GWS);
    this.mobileThreshold = 601;

    this.fetchProductMeta = this.fetchProductMeta.bind(this);

    this.$cartCounter = $('.gws-cart-counter');
    this.$product = $('.gws-product');
    this.$addToCartButton = $('.gws-product-add');
    this.checkoutIdCookieKey = 'gwsCheckoutId';
    this.variantIdInputClass = '.gws-variant-id';
    this.priceWrapperClass = '.gws-product-price';
    this.quantitySelectClass = '.gws-quantity-select';
    this.variantSelectClass = '.gws-variant-select';
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

    $(window).
    resize(this.onResize.bind(this)) // Bind resize
    .on('ajaxySuccess', this.onReady.bind(this)); // Bind ajaxSuccess (custom event, comes from Ajaxy)

    $(document).ready(this.onReady.bind(this));
  }_createClass(GWS, [{ key: 'onResize', value: function onResize()

    {
    } }, { key: 'onReady', value: function onReady()

    {

      // Check shopify api data
      if (Shopify.domain !== null && Shopify.storefrontAccessToken !== null) {var _Shopify =
        Shopify,domain = _Shopify.domain,storefrontAccessToken = _Shopify.storefrontAccessToken;

        // Init Shopify client
        this.client = _shopifyBuy2.default.buildClient({
          domain: domain,
          storefrontAccessToken: storefrontAccessToken });


        this.initCheckout();

        if (this.$product.length) {// Archive products page
          this.initProducts();
        }

        if (this.$cart.length) {// Cart is present
          this.initCartSection();
        }

      } else {
        console.error('Shopify URL and/or token missing');
      }
    } }, { key: 'initProducts', value: function initProducts()

    {
      this.$product.each(this.fetchProductMeta);
    }

    /**
       * Init the Shopify checkout, current or new
       */ }, { key: 'initCheckout', value: function initCheckout()
    {var _this = this;
      // Get shopifyCheckoutId from cookies
      var checkoutId = _jsCookie2.default.get(this.checkoutIdCookieKey);

      // If shopifyCheckoutId already exists (means there was already a cart initiated before)
      if (checkoutId) {

        // Fetch existing checkout by its checkoutId
        this.client.checkout.fetch(checkoutId).
        then(function (checkout) {
          // Do something with the checkout
          // console.log('EXISTING CHECKOUT', checkout);

          // Save the checkout in object
          _this.checkout = checkout;

          // Update cart display
          _this.updateCart(checkout);

        }).catch(function (error) {
          console.log(error);
        });

      } else {// Non existing checkout

        // Create an empty checkout
        this.client.checkout.create().
        then(function (checkout) {
          // Do something with the checkout
          // console.log('EMPTY CHECKOUT CREATED', checkout);

          // Save checkout in object
          _this.checkout = checkout;

          // Save the shopifyCheckoutId in a cookie
          _jsCookie2.default.set(_this.checkoutIdCookieKey, checkout.id, { expires: 7 }); // Expires in 7 days
        });
      }
    } }, { key: 'fetchProductMeta', value: function fetchProductMeta(

    index, element) {var _this2 = this;
      var productHandle = $(element).attr(this.productHandleAttr);

      if (!productHandle) {
        this.setProductAvailability(element);
        return;
      }

      // Fetch data from shopify. Returns a promise
      this.client.product.fetchByHandle(productHandle).
      then(function (product) {
        var productAvailable = _this2.setProductAvailability(element, product.variants);

        if (productAvailable) {
          _this2.updateProductVariant(element, product.variants[0]);
        }

        var productInCart = localStorage.getItem(product.id) ? true : false;
        _this2.updateProductInCartStatus(element, productInCart);

        // Generate variation selector
        if (product.variants.length > 1) {
          _this2.generateOptions(element, product.variants);
        }

        _this2.$addToCartButton.on('click', _this2.handleAddToCart.bind(_this2, element, product));
      }).
      catch(function (error) {
        console.log(error);
      });

    } }, { key: 'updateProductInCartStatus', value: function updateProductInCartStatus(

    element, status) {
      var attrValue = status ? 'true' : 'false';
      $(element).attr(this.productInCartAttr, attrValue);
    } }, { key: 'getProductInCartStatus', value: function getProductInCartStatus(

    element) {
      var status = $(element).attr(this.productInCartAttr);
      if (status === 'true') {
        return true;
      }
      return false;
    }

    /**
       * Add item to Cart
       */ }, { key: 'handleAddToCart', value: function handleAddToCart(
    element, product) {var _this3 = this;
      var itemsToAdd = this.getQuantityAndVariant(element, product.variants);
      var productInCart = this.getProductInCartStatus(element);

      if (itemsToAdd && !productInCart) {
        // Add an item to the checkout in shopify
        this.client.checkout.addLineItems(this.checkout.id, [itemsToAdd]).
        then(function (checkout) {
          // Do something with the updated checkout
          _this3.dispatchCartUpdateEvent('added', checkout.lineItems[0].variant);

          // Update cart
          _this3.updateCart(checkout);

          // Add handle to localStorage
          var postId = $(element).attr(_this3.postIdAttr);
          if (postId) {
            localStorage.setItem(product.id, postId);
          }

          _this3.updateProductInCartStatus(element, true);
        }).
        catch(function (error) {
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
       */ }, { key: 'setProductAvailability', value: function setProductAvailability(
    element, variants) {
      var productAvailable = false; // assume falseyness to start

      if (variants) {
        $.each(variants, function (i, val) {
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
    } }, { key: 'updateProductVariant', value: function updateProductVariant(

    element, variant) {
      var $priceWrapper = $(element).find(this.priceWrapperClass);
      var $variantIdInput = $(element).find(this.variantIdInputClass);

      if (variant) {
        if ($priceWrapper.length) {
          this.setVariantPrice($priceWrapper, variant);
        }
        if ($variantIdInput.length) {
          this.setVariantId($variantIdInput, variant);
        }
      }
    } }, { key: 'setVariantPrice', value: function setVariantPrice(

    $priceWrapper, variant) {
      var price = variant.compareAtPrice ? variant.compareAtPrice : variant.price;

      $priceWrapper.html(price);
    } }, { key: 'setVariantId', value: function setVariantId(

    $variantIdInput, variant) {
      $variantIdInput.val(variant.id);
    } }, { key: 'getQuantityAndVariant', value: function getQuantityAndVariant(

    element, variants) {
      var variant = this.getSelectedVariant(element, variants);

      var $quantitySelect = $(element).find(this.quantitySelectClass);
      var quantity = $quantitySelect.length ? parseInt($quantitySelect.val()) : 1;

      if (!variant.available) {
        return false;
      }

      return {
        variantId: variant.id,
        quantity: quantity };

    } }, { key: 'generateOptions', value: function generateOptions(

    product) {
      product.options.map(function (option) {
        var hidden = '';

        if (option.name === 'Title') {
          hidden = 'u-hidden';
        }

        var optionHtml = '\n      <div class="grid-item item-s-12 no-gutter grid-row margin-bottom-basic align-items-center ' +
        hidden + '">\n        <div class="grid-item item-s-6 text-align-right">\n          <label for="option-' +

        option.name + '" class="font-uppercase font-size-small">' + option.name + '</label>\n        </div>\n        <div class="grid-item item-s-6">\n          <select id="option-' +


        option.name + '" class="gws-variant-select font-uppercase">';

        option.values.map(function (option) {
          optionHtml += '<option value="' + option.value + '">' + option.value + '</option>';
        });

        optionHtml += '\n          </select>\n        </div>\n      </div>';




        $('#product-options').append(optionHtml);
      });
    } }, { key: 'getSelectedVariant', value: function getSelectedVariant(

    element, variants) {
      if (variants.length === 1) {
        return variants[0];
      }

      // Map values of form select inputs to array
      var selectedOptions = $(element).find(this.variantSelectClass).map(function (index, elem) {
        return $(elem).val();
      });

      // Set defaults for variant search
      var matchFound = false;
      var variant = null;

      // Loop through product variants
      // example: Small/White, Medium/White, Small/Black, ...
      for (var i = 0; i < variants.length; i++) {
        var variantOptions = variants[i].selectedOptions;
        variant = variants[i];

        // initiate selectedOptions counter
        var v = 0;

        // Loop through options of each variant
        // example: Small, White
        for (var j = 0; j < variantOptions.length; j++) {

          // Loop through values retrieved from form select inputs.
          // See if they correspond to this variant's options
          for (var k = 0; k < selectedOptions.length; k++) {

            // TRUE if this variant option matches the selected option
            matchFound = variantOptions[j].value === selectedOptions[v];

            if (matchFound) {
              // If this is the last selected option
              // and match found is still true
              if (v === selectedOptions.length - 1) {
                return variant;
              }

              // Otherwise just iterate to next selected option
              v++;
            }
          }
        }
      }

      return variant;
    } }, { key: 'initCartSection', value: function initCartSection()

    {
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
       */ }, { key: 'updateCart', value: function updateCart(
    checkout) {var
      lineItems = checkout.lineItems,webUrl = checkout.webUrl,subtotalPrice = checkout.subtotalPrice;

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
          this.updateSubtotal(subtotalPrice);
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
       */ }, { key: 'generateCartItemsRows', value: function generateCartItemsRows(
    items) {var _this4 = this;
      if (items.length) {

        items.forEach(function (item) {
          if (!item.variant.available) {
            // Item sold out
            _this4.removeCartItems(item.id);
            return;
          }

          // Get item markup and append as new element
          var $cartItem = $(_this4.cartItemHtml);
          _this4.$cartItemsContainer.append($cartItem);

          // Handle product id and post id
          var productId = item.variant.product.id;
          var postId = localStorage.getItem(productId);
          $cartItem.attr(_this4.productIdAttr, item.variant.product.id);

          // Set item ID to data attr
          $cartItem.attr(_this4.cartItemIdAttr, item.id);

          // Declare item elements
          var $cartThumb = $cartItem.find(_this4.cartThumbClass);
          var $cartTitle = $cartItem.find(_this4.cartTitleClass);
          var $cartVariantTitle = $cartItem.find(_this4.cartVariantTitleClass);
          var $cartQuantity = $cartItem.find(_this4.cartQuantityClass);
          var $cartSubtotal = $cartItem.find(_this4.cartItemSubtotalClass);

          // Define item image and title
          var imageSrc = item.variant.image !== null ? item.variant.image.src : '';
          var variantTitle = item.variant.title === 'Default Title' ? '' : item.variant.title;

          // Fill item content if defined
          if ($cartThumb) {$cartThumb.css('background-image', 'url(\'' + imageSrc + '\')');}
          if ($cartTitle) {
            var path = Shopify.itemSlug ? Shopify.itemSlug + '/' : '?p=';
            var title = postId ? '<a href="' + WP.siteUrl + '/' + path + postId + '">' + item.title + '</a>' : item.title;
            $cartTitle.html(title);
          }
          if ($cartVariantTitle) {$cartVariantTitle.text(variantTitle);}
          if ($cartQuantity) {$cartQuantity.val(item.quantity);}
          if ($cartSubtotal) {$cartSubtotal.text(item.variant.price * item.quantity);}
        });

        this.$cartRemoveItem = $(this.cartRemoveClass);
      }
    } }, { key: 'updateSubtotal', value: function updateSubtotal(

    price) {
      console.log(price);
      $(this.cartSubtotalSelector).text(price);
    } }, { key: 'bindCartInputs', value: function bindCartInputs()

    {
      $(this.cartQuantityClass).on('change', this.handleCartQuantity);
      $(this.cartAttributeClass).on('change', this.handleCartAttributeUpdate);
    } }, { key: 'handleCartQuantity', value: function handleCartQuantity(

    e) {var _this5 = this;
      var $cartItem = $(e.target).closest(this.cartItemClass);
      var $cartItemSubtotal = $cartItem.find(this.cartItemSubtotalClass);
      var cartItemId = $cartItem.attr(this.cartItemIdAttr);
      var quantity = parseInt(e.target.value);

      // Update the line item on the checkout (change the quantity or variant)
      this.client.checkout.updateLineItems(this.checkout.id, [{ id: cartItemId, quantity: quantity }]).then(function (checkout) {
        // Do something with the updated checkout
        console.log(checkout); // Quantity of line item 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ=' updated to 2
        var item = checkout.lineItems.find(function (item) {
          return item.id === cartItemId;
        });
        $cartItemSubtotal.text(item.quantity * item.variant.price);
        _this5.updateSubtotal(checkout.subtotalPrice);
      });
    } }, { key: 'handleCartAttributeUpdate', value: function handleCartAttributeUpdate(

    e) {
      var key = $(e.target).attr(this.cartAttributeKey);
      var value = e.target.type === 'checkbox' ? e.target.checked.toString() : e.target.value;
      var input = { customAttributes: [{ key: key, value: value }] };

      this.client.checkout.updateAttributes(this.checkout.id, input).then(function (checkout) {
        console.log(checkout);
      });
    } }, { key: 'bindRemoveItems', value: function bindRemoveItems()

    {
      this.$cartRemoveItem.on('click', this.handleRemoveItems);
    } }, { key: 'handleRemoveItems', value: function handleRemoveItems(

    event) {
      var $cartItem = $(event.target).closest(this.cartItemClass);
      var cartItemId = $cartItem.attr(this.cartItemIdAttr);
      var productId = $cartItem.attr(this.productIdAttr);

      this.removeCartItems(cartItemId);
      localStorage.removeItem(productId);
    } }, { key: 'removeCartItems', value: function removeCartItems(

    cartItemId) {var _this6 = this;
      this.client.checkout.removeLineItems(this.checkout.id, [cartItemId]).then(function (checkout) {
        _this6.updateCart(checkout);
        _this6.dispatchCartUpdateEvent('removed');
      });
    } }, { key: 'dispatchCartUpdateEvent', value: function dispatchCartUpdateEvent(

    context, variant) {
      window.dispatchEvent(
      new CustomEvent(this.cartUpdateEventType, {
        detail: {
          context: context,
          variant: variant } }));



    } }]);return GWS;}();



new GWS();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
The MIT License (MIT)

Copyright (c) 2016 Shopify Inc.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};











var classCallCheck$1 = function classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits$1 = function inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true } });


  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn$1 = function possibleConstructorReturn$1(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
};

/*
   The MIT License (MIT)
   Copyright (c) 2016 Shopify Inc.
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
   
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
   IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
   DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
   OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
   OR OTHER DEALINGS IN THE SOFTWARE.
   
   
   */
function join() {
  for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
    fields[_key] = arguments[_key];
  }

  return fields.join(' ');
}

function isObject(value) {
  return Boolean(value) && Object.prototype.toString.call(value.valueOf()) === '[object Object]';
}

function deepFreezeCopyExcept(predicate, structure) {
  if (predicate(structure)) {
    return structure;
  } else if (isObject(structure)) {
    return Object.freeze(Object.keys(structure).reduce(function (copy, key) {
      copy[key] = deepFreezeCopyExcept(predicate, structure[key]);

      return copy;
    }, {}));
  } else if (Array.isArray(structure)) {
    return Object.freeze(structure.map(function (item) {
      return deepFreezeCopyExcept(predicate, item);
    }));
  } else {
    return structure;
  }
}

function schemaForType(typeBundle, typeName) {
  var type = typeBundle.types[typeName];

  if (type) {
    return type;
  }

  throw new Error("No type of " + typeName + " found in schema");
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true } });


  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
};

var VariableDefinition = function () {

  /**
                                       * This constructor should not be invoked directly.
                                       * Use the factory function {@link Client#variable} to create a VariableDefinition.
                                       *
                                       * @param {String} name The name of the variable.
                                       * @param {String} type The GraphQL type of the variable.
                                       * @param {*} [defaultValue] The default value of the variable.
                                       */
  function VariableDefinition(name, type, defaultValue) {
    classCallCheck(this, VariableDefinition);

    this.name = name;
    this.type = type;
    this.defaultValue = defaultValue;
    Object.freeze(this);
  }

  /**
     * Returns the GraphQL query string for the variable as an input value (e.g. `$variableName`).
     *
     * @return {String} The GraphQL query string for the variable as an input value.
     */

  createClass(VariableDefinition, [{
    key: 'toInputValueString',
    value: function toInputValueString() {
      return '$' + this.name;
    }

    /**
       * Returns the GraphQL query string for the variable (e.g. `$variableName:VariableType = defaultValue`).
       *
       * @return {String} The GraphQL query string for the variable.
       */ },

  {
    key: 'toString',
    value: function toString() {
      var defaultValueString = this.defaultValue ? ' = ' + formatInputValue(this.defaultValue) : '';

      return '$' + this.name + ':' + this.type + defaultValueString;
    } }]);

  return VariableDefinition;
}();

function isVariable(value) {
  return VariableDefinition.prototype.isPrototypeOf(value);
}

function variable(name, type, defaultValue) {
  return new VariableDefinition(name, type, defaultValue);
}

var Enum = function () {

  /**
                         * This constructor should not be invoked directly.
                         * Use the factory function {@link Client#enum} to create an Enum.
                         *
                         * @param {String} key The key of the enum.
                         */
  function Enum(key) {
    classCallCheck(this, Enum);

    this.key = key;
  }

  /**
     * Returns the GraphQL query string for the enum (e.g. `enumKey`).
     *
     * @return {String} The GraphQL query string for the enum.
     */

  createClass(Enum, [{
    key: "toString",
    value: function toString() {
      return this.key;
    } },
  {
    key: "valueOf",
    value: function valueOf() {
      return this.key.valueOf();
    } }]);

  return Enum;
}();

var enumFunction = function enumFunction(key) {
  return new Enum(key);
};

var Scalar = function () {
  function Scalar(value) {
    classCallCheck(this, Scalar);

    this.value = value;
  }

  createClass(Scalar, [{
    key: "toString",
    value: function toString() {
      return this.value.toString();
    } },
  {
    key: "valueOf",
    value: function valueOf() {
      return this.value.valueOf();
    } },
  {
    key: "unwrapped",
    get: function get$$1() {
      return this.value;
    } }]);

  return Scalar;
}();

function formatInputValue(value) {
  if (VariableDefinition.prototype.isPrototypeOf(value)) {
    return value.toInputValueString();
  } else if (Enum.prototype.isPrototypeOf(value)) {
    return String(value);
  } else if (Scalar.prototype.isPrototypeOf(value)) {
    return JSON.stringify(value.valueOf());
  } else if (Array.isArray(value)) {
    return '[' + join.apply(undefined, toConsumableArray(value.map(formatInputValue))) + ']';
  } else if (isObject(value)) {
    return formatObject(value, '{', '}');
  } else {
    return JSON.stringify(value);
  }
}

function formatObject(value) {
  var openChar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var closeChar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var argPairs = Object.keys(value).map(function (key) {
    return key + ': ' + formatInputValue(value[key]);
  });

  return '' + openChar + join.apply(undefined, toConsumableArray(argPairs)) + closeChar;
}

function formatArgs(args) {
  if (!Object.keys(args).length) {
    return '';
  }

  return ' (' + formatObject(args) + ')';
}

// eslint-disable-next-line no-empty-function
var noop = function noop() {};

var Profiler = {
  trackTypeDependency: noop,
  trackFieldDependency: noop };


var trackTypeDependency = Profiler.trackTypeDependency;
var trackFieldDependency = Profiler.trackFieldDependency;

function parseFieldCreationArgs(creationArgs) {
  var callback = noop;
  var options = {};
  var selectionSet = null;

  if (creationArgs.length === 2) {
    if (typeof creationArgs[1] === 'function') {
      var _creationArgs = slicedToArray(creationArgs, 2);

      options = _creationArgs[0];
      callback = _creationArgs[1];
    } else {
      var _creationArgs2 = slicedToArray(creationArgs, 2);

      options = _creationArgs2[0];
      selectionSet = _creationArgs2[1];
    }
  } else if (creationArgs.length === 1) {
    // SelectionSet is defined before this function is called since it's
    // called by SelectionSet
    // eslint-disable-next-line no-use-before-define
    if (SelectionSet.prototype.isPrototypeOf(creationArgs[0])) {
      selectionSet = creationArgs[0];
    } else if (typeof creationArgs[0] === 'function') {
      callback = creationArgs[0];
    } else {
      options = creationArgs[0];
    }
  }

  return { options: options, selectionSet: selectionSet, callback: callback };
}

var emptyArgs = Object.freeze({});

var Field = function () {

  /**
                          * This constructor should not be invoked directly.
                          * Fields are added to a selection by {@link SelectionSetBuilder#add}, {@link SelectionSetBuilder#addConnection}
                          * and {@link SelectionSetBuilder#addInlineFragmentOn}.
                          *
                          * @param {String} name The name of the field.
                          * @param {Object} [options] An options object containing:
                          *   @param {Object} [options.args] Arguments for the field.
                          *   @param {String} [options.alias] An alias for the field.
                          * @param {SelectionSet} selectionSet The selection set on the field.
                          */
  function Field(name, options, selectionSet) {
    classCallCheck(this, Field);

    this.name = name;
    this.alias = options.alias || null;
    this.responseKey = this.alias || this.name;
    this.args = options.args ? deepFreezeCopyExcept(isVariable, options.args) : emptyArgs;
    this.selectionSet = selectionSet;
    Object.freeze(this);
  }

  /**
     * Returns the GraphQL query string for the Field (e.g. `catAlias: cat(size: 'small') { name }` or `name`).
     *
     * @return {String} The GraphQL query string for the Field.
     */

  createClass(Field, [{
    key: 'toString',
    value: function toString() {
      var aliasPrefix = this.alias ? this.alias + ': ' : '';

      return '' + aliasPrefix + this.name + formatArgs(this.args) + this.selectionSet;
    } }]);

  return Field;
}();

// This is an interface that defines a usage, and simplifies type checking
var Spread = function Spread() {
  classCallCheck(this, Spread);
};

var InlineFragment = function (_Spread) {
  inherits(InlineFragment, _Spread);

  /**
                                      * This constructor should not be invoked directly.
                                      * Use the factory function {@link SelectionSetBuilder#addInlineFragmentOn} to create an InlineFragment.
                                      *
                                      * @param {String} typeName The type of the fragment.
                                      * @param {SelectionSet} selectionSet The selection set on the fragment.
                                      */
  function InlineFragment(typeName, selectionSet) {
    classCallCheck(this, InlineFragment);

    var _this = possibleConstructorReturn(this, (InlineFragment.__proto__ || Object.getPrototypeOf(InlineFragment)).call(this));

    _this.typeName = typeName;
    _this.selectionSet = selectionSet;
    Object.freeze(_this);
    return _this;
  }

  /**
     * Returns the GraphQL query string for the InlineFragment (e.g. `... on Cat { name }`).
     *
     * @return {String} The GraphQL query string for the InlineFragment.
     */

  createClass(InlineFragment, [{
    key: 'toString',
    value: function toString() {
      return '... on ' + this.typeName + this.selectionSet;
    } }]);

  return InlineFragment;
}(Spread);

var FragmentSpread = function (_Spread2) {
  inherits(FragmentSpread, _Spread2);

  /**
                                       * This constructor should not be invoked directly.
                                       * Use the factory function {@link Document#defineFragment} to create a FragmentSpread.
                                       *
                                       * @param {FragmentDefinition} fragmentDefinition The corresponding fragment definition.
                                       */
  function FragmentSpread(fragmentDefinition) {
    classCallCheck(this, FragmentSpread);

    var _this2 = possibleConstructorReturn(this, (FragmentSpread.__proto__ || Object.getPrototypeOf(FragmentSpread)).call(this));

    _this2.name = fragmentDefinition.name;
    _this2.selectionSet = fragmentDefinition.selectionSet;
    Object.freeze(_this2);
    return _this2;
  }

  /**
     * Returns the GraphQL query string for the FragmentSpread (e.g. `...catName`).
     *
     * @return {String} The GraphQL query string for the FragmentSpread.
     */

  createClass(FragmentSpread, [{
    key: 'toString',
    value: function toString() {
      return '...' + this.name;
    } },
  {
    key: 'toDefinition',
    value: function toDefinition() {
      // eslint-disable-next-line no-use-before-define
      return new FragmentDefinition(this.name, this.selectionSet.typeSchema.name, this.selectionSet);
    } }]);

  return FragmentSpread;
}(Spread);

var FragmentDefinition = function () {

  /**
                                       * This constructor should not be invoked directly.
                                       * Use the factory function {@link Document#defineFragment} to create a FragmentDefinition on a {@link Document}.
                                       *
                                       * @param {String} name The name of the fragment definition.
                                       * @param {String} typeName The type of the fragment.
                                       */
  function FragmentDefinition(name, typeName, selectionSet) {
    classCallCheck(this, FragmentDefinition);

    this.name = name;
    this.typeName = typeName;
    this.selectionSet = selectionSet;
    this.spread = new FragmentSpread(this);
    Object.freeze(this);
  }

  /**
     * Returns the GraphQL query string for the FragmentDefinition (e.g. `fragment catName on Cat { name }`).
     *
     * @return {String} The GraphQL query string for the FragmentDefinition.
     */

  createClass(FragmentDefinition, [{
    key: 'toString',
    value: function toString() {
      return 'fragment ' + this.name + ' on ' + this.typeName + ' ' + this.selectionSet;
    } }]);

  return FragmentDefinition;
}();

function selectionsHaveIdField(selections) {
  return selections.some(function (fieldOrFragment) {
    if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
      return fieldOrFragment.name === 'id';
    } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
      return selectionsHaveIdField(fieldOrFragment.selectionSet.selections);
    }

    return false;
  });
}

function selectionsHaveTypenameField(selections) {
  return selections.some(function (fieldOrFragment) {
    if (Field.prototype.isPrototypeOf(fieldOrFragment)) {
      return fieldOrFragment.name === '__typename';
    } else if (Spread.prototype.isPrototypeOf(fieldOrFragment) && fieldOrFragment.selectionSet.typeSchema.implementsNode) {
      return selectionsHaveTypenameField(fieldOrFragment.selectionSet.selections);
    }

    return false;
  });
}

function indexSelectionsByResponseKey(selections) {
  function assignOrPush(obj, key, value) {
    if (Array.isArray(obj[key])) {
      obj[key].push(value);
    } else {
      obj[key] = [value];
    }
  }
  var unfrozenObject = selections.reduce(function (acc, selection) {
    if (selection.responseKey) {
      assignOrPush(acc, selection.responseKey, selection);
    } else {
      var responseKeys = Object.keys(selection.selectionSet.selectionsByResponseKey);

      responseKeys.forEach(function (responseKey) {
        assignOrPush(acc, responseKey, selection);
      });
    }

    return acc;
  }, {});

  Object.keys(unfrozenObject).forEach(function (key) {
    Object.freeze(unfrozenObject[key]);
  });

  return Object.freeze(unfrozenObject);
}

/**
   * Class that specifies the full selection of data to query.
   */

var SelectionSet = function () {

  /**
                                 * This constructor should not be invoked directly. SelectionSets are created when building queries/mutations.
                                 *
                                 * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                                 * @param {(Object|String)} type The type of the current selection.
                                 * @param {Function} builderFunction Callback function used to build the SelectionSet.
                                 *   The callback takes a {@link SelectionSetBuilder} as its argument.
                                 */
  function SelectionSet(typeBundle, type, builderFunction) {
    classCallCheck(this, SelectionSet);

    if (typeof type === 'string') {
      this.typeSchema = schemaForType(typeBundle, type);
    } else {
      this.typeSchema = type;
    }

    trackTypeDependency(this.typeSchema.name);

    this.typeBundle = typeBundle;
    this.selections = [];
    if (builderFunction) {
      // eslint-disable-next-line no-use-before-define
      builderFunction(new SelectionSetBuilder(this.typeBundle, this.typeSchema, this.selections));
    }

    if (this.typeSchema.implementsNode || this.typeSchema.name === 'Node') {
      if (!selectionsHaveIdField(this.selections)) {
        this.selections.unshift(new Field('id', {}, new SelectionSet(typeBundle, 'ID')));
      }
    }

    if (this.typeSchema.kind === 'INTERFACE') {
      if (!selectionsHaveTypenameField(this.selections)) {
        this.selections.unshift(new Field('__typename', {}, new SelectionSet(typeBundle, 'String')));
      }
    }

    this.selectionsByResponseKey = indexSelectionsByResponseKey(this.selections);
    Object.freeze(this.selections);
    Object.freeze(this);
  }

  /**
     * Returns the GraphQL query string for the SelectionSet (e.g. `{ cat { name } }`).
     *
     * @return {String} The GraphQL query string for the SelectionSet.
     */

  createClass(SelectionSet, [{
    key: 'toString',
    value: function toString() {
      if (this.typeSchema.kind === 'SCALAR' || this.typeSchema.kind === 'ENUM') {
        return '';
      } else {
        return ' { ' + join(this.selections) + ' }';
      }
    } }]);

  return SelectionSet;
}();

var SelectionSetBuilder = function () {

  /**
                                        * This constructor should not be invoked directly. SelectionSetBuilders are created when building queries/mutations.
                                        *
                                        * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                                        * @param {Object} typeSchema The schema object for the type of the current selection.
                                        * @param {Field[]} selections The fields on the current selection.
                                        */
  function SelectionSetBuilder(typeBundle, typeSchema, selections) {
    classCallCheck(this, SelectionSetBuilder);

    this.typeBundle = typeBundle;
    this.typeSchema = typeSchema;
    this.selections = selections;
  }

  createClass(SelectionSetBuilder, [{
    key: 'hasSelectionWithResponseKey',
    value: function hasSelectionWithResponseKey(responseKey) {
      return this.selections.some(function (field) {
        return field.responseKey === responseKey;
      });
    }

    /**
       * Adds a field to be queried on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.add('cat', {args: {id: '123456'}, alias: 'meow'}, (cat) => {
       *     cat.add('name');
       *   });
       * });
       *
       * @param {SelectionSet|String} selectionOrFieldName The selection or name of the field to add.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function|SelectionSet} [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */ },

  {
    key: 'add',
    value: function add(selectionOrFieldName) {
      var selection = void 0;

      if (Object.prototype.toString.call(selectionOrFieldName) === '[object String]') {
        trackFieldDependency(this.typeSchema.name, selectionOrFieldName);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        selection = this.field.apply(this, [selectionOrFieldName].concat(rest));
      } else {
        if (Field.prototype.isPrototypeOf(selectionOrFieldName)) {
          trackFieldDependency(this.typeSchema.name, selectionOrFieldName.name);
        }

        selection = selectionOrFieldName;
      }

      if (selection.responseKey && this.hasSelectionWithResponseKey(selection.responseKey)) {
        throw new Error('The field name or alias \'' + selection.responseKey + '\' has already been added.');
      }
      this.selections.push(selection);
    } },
  {
    key: 'field',
    value: function field(name) {
      for (var _len2 = arguments.length, creationArgs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        creationArgs[_key2 - 1] = arguments[_key2];
      }

      var parsedArgs = parseFieldCreationArgs(creationArgs);
      var options = parsedArgs.options,
      callback = parsedArgs.callback;
      var selectionSet = parsedArgs.selectionSet;

      if (!selectionSet) {
        if (!this.typeSchema.fieldBaseTypes[name]) {
          throw new Error('No field of name "' + name + '" found on type "' + this.typeSchema.name + '" in schema');
        }

        var fieldBaseType = schemaForType(this.typeBundle, this.typeSchema.fieldBaseTypes[name]);

        selectionSet = new SelectionSet(this.typeBundle, fieldBaseType, callback);
      }

      return new Field(name, options, selectionSet);
    }

    /**
       * Creates an inline fragment.
       *
       * @access private
       * @param {String} typeName The type  the inline fragment.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       * @return {InlineFragment} An inline fragment.
       */ },

  {
    key: 'inlineFragmentOn',
    value: function inlineFragmentOn(typeName) {
      var builderFunctionOrSelectionSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var selectionSet = void 0;

      if (SelectionSet.prototype.isPrototypeOf(builderFunctionOrSelectionSet)) {
        selectionSet = builderFunctionOrSelectionSet;
      } else {
        selectionSet = new SelectionSet(this.typeBundle, schemaForType(this.typeBundle, typeName), builderFunctionOrSelectionSet);
      }

      return new InlineFragment(typeName, selectionSet);
    }

    /**
       * Adds a field to be queried on the current selection.
       *
       * @access private
       * @param {String}    name The name of the field to add to the query.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{id: '123456'}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function}  [callback] Callback which will be used to create a new {@link SelectionSet} for the field added.
       */ },

  {
    key: 'addField',
    value: function addField(name) {
      for (var _len3 = arguments.length, creationArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        creationArgs[_key3 - 1] = arguments[_key3];
      }

      this.add.apply(this, [name].concat(creationArgs));
    }

    /**
       * Adds a connection to be queried on the current selection.
       * This adds all the fields necessary for pagination.
       *
       * @example
       * client.query((root) => {
       *   root.add('cat', (cat) => {
       *     cat.addConnection('friends', {args: {first: 10}, alias: 'coolCats'}, (friends) => {
       *       friends.add('name');
       *     });
       *   });
       * });
       *
       * @param {String}    name The name of the connection to add to the query.
       * @param {Object} [options] Options on the query including:
       *   @param {Object} [options.args] Arguments on the query (e.g. `{first: 10}`).
       *   @param {String} [options.alias] Alias for the field being added.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */ },

  {
    key: 'addConnection',
    value: function addConnection(name) {
      for (var _len4 = arguments.length, creationArgs = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        creationArgs[_key4 - 1] = arguments[_key4];
      }

      var _parseFieldCreationAr = parseFieldCreationArgs(creationArgs),
      options = _parseFieldCreationAr.options,
      callback = _parseFieldCreationAr.callback,
      selectionSet = _parseFieldCreationAr.selectionSet;

      this.add(name, options, function (connection) {
        connection.add('pageInfo', {}, function (pageInfo) {
          pageInfo.add('hasNextPage');
          pageInfo.add('hasPreviousPage');
        });
        connection.add('edges', {}, function (edges) {
          edges.add('cursor');
          edges.addField('node', {}, selectionSet || callback); // This is bad. Don't do this
        });
      });
    }

    /**
       * Adds an inline fragment on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.add('animal', (animal) => {
       *     animal.addInlineFragmentOn('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {String} typeName The name of the type of the inline fragment.
       * @param {Function|SelectionSet}  [callbackOrSelectionSet] Either a callback which will be used to create a new {@link SelectionSet}, or an existing {@link SelectionSet}.
       */ },

  {
    key: 'addInlineFragmentOn',
    value: function addInlineFragmentOn(typeName) {
      var fieldTypeCb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      this.add(this.inlineFragmentOn(typeName, fieldTypeCb));
    }

    /**
       * Adds a fragment spread on the current selection.
       *
       * @example
       * client.query((root) => {
       *   root.addFragment(catFragmentSpread);
       * });
       *
       * @param {FragmentSpread} fragmentSpread The fragment spread to add.
       */ },

  {
    key: 'addFragment',
    value: function addFragment(fragmentSpread) {
      this.add(fragmentSpread);
    } }]);

  return SelectionSetBuilder;
}();

function parseArgs(args) {
  var name = void 0;
  var variables = void 0;
  var selectionSetCallback = void 0;

  if (args.length === 3) {
    var _args = slicedToArray(args, 3);

    name = _args[0];
    variables = _args[1];
    selectionSetCallback = _args[2];
  } else if (args.length === 2) {
    if (Object.prototype.toString.call(args[0]) === '[object String]') {
      name = args[0];
      variables = null;
    } else if (Array.isArray(args[0])) {
      variables = args[0];
      name = null;
    }

    selectionSetCallback = args[1];
  } else {
    selectionSetCallback = args[0];
    name = null;
  }

  return { name: name, variables: variables, selectionSetCallback: selectionSetCallback };
}

var VariableDefinitions = function () {
  function VariableDefinitions(variableDefinitions) {
    classCallCheck(this, VariableDefinitions);

    this.variableDefinitions = variableDefinitions ? [].concat(toConsumableArray(variableDefinitions)) : [];
    Object.freeze(this.variableDefinitions);
    Object.freeze(this);
  }

  createClass(VariableDefinitions, [{
    key: 'toString',
    value: function toString() {
      if (this.variableDefinitions.length === 0) {
        return '';
      }

      return ' (' + join(this.variableDefinitions) + ') ';
    } }]);

  return VariableDefinitions;
}();

/**
      * Base class for {@link Query} and {@link Mutation}.
      * @abstract
      */

var Operation = function () {

  /**
                              * This constructor should not be invoked. The subclasses {@link Query} and {@link Mutation} should be used instead.
                              */
  function Operation(typeBundle, operationType) {
    classCallCheck(this, Operation);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _parseArgs = parseArgs(args),
    name = _parseArgs.name,
    variables = _parseArgs.variables,
    selectionSetCallback = _parseArgs.selectionSetCallback;

    this.typeBundle = typeBundle;
    this.name = name;
    this.variableDefinitions = new VariableDefinitions(variables);
    this.operationType = operationType;
    if (operationType === 'query') {
      this.selectionSet = new SelectionSet(typeBundle, typeBundle.queryType, selectionSetCallback);
      this.typeSchema = schemaForType(typeBundle, typeBundle.queryType);
    } else {
      this.selectionSet = new SelectionSet(typeBundle, typeBundle.mutationType, selectionSetCallback);
      this.typeSchema = schemaForType(typeBundle, typeBundle.mutationType);
    }
    Object.freeze(this);
  }

  /**
     * Whether the operation is anonymous (i.e. has no name).
     */

  createClass(Operation, [{
    key: 'toString',

    /**
                      * Returns the GraphQL query or mutation string (e.g. `query myQuery { cat { name } }`).
                      *
                      * @return {String} The GraphQL query or mutation string.
                      */
    value: function toString() {
      var nameString = this.name ? ' ' + this.name : '';

      return '' + this.operationType + nameString + this.variableDefinitions + this.selectionSet;
    } },
  {
    key: 'isAnonymous',
    get: function get$$1() {
      return !this.name;
    } }]);

  return Operation;
}();

/**
      * GraphQL Query class.
      * @extends Operation
      */

var Query = function (_Operation) {
  inherits(Query, _Operation);

  /**
                                * This constructor should not be invoked directly.
                                * Use the factory functions {@link Client#query} or {@link Document#addQuery} to create a Query.
                                *
                                * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                                * @param {String} [name] A name for the query.
                                * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
                                * @param {Function} selectionSetCallback The query builder callback.
                                *   A {@link SelectionSet} is created using this callback.
                                */
  function Query(typeBundle) {
    var _ref;

    classCallCheck(this, Query);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn(this, (_ref = Query.__proto__ || Object.getPrototypeOf(Query)).call.apply(_ref, [this, typeBundle, 'query'].concat(args)));
  }

  return Query;
}(Operation);

/**
               * GraphQL Mutation class.
               * @extends Operation
               */

var Mutation = function (_Operation) {
  inherits(Mutation, _Operation);

  /**
                                   * This constructor should not be invoked directly.
                                   * Use the factory functions {@link Client#mutation} or {@link Document#addMutation} to create a Mutation.
                                   *
                                   * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                                   * @param {String} [name] A name for the mutation.
                                   * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
                                   * @param {Function} selectionSetCallback The mutation builder callback.
                                   *   A {@link SelectionSet} is created using this callback.
                                   */
  function Mutation(typeBundle) {
    var _ref;

    classCallCheck(this, Mutation);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return possibleConstructorReturn(this, (_ref = Mutation.__proto__ || Object.getPrototypeOf(Mutation)).call.apply(_ref, [this, typeBundle, 'mutation'].concat(args)));
  }

  return Mutation;
}(Operation);

function isAnonymous(operation) {
  return operation.isAnonymous;
}

function hasAnonymousOperations(operations) {
  return operations.some(isAnonymous);
}

function hasDuplicateOperationNames(operations) {
  var names = operations.map(function (operation) {
    return operation.name;
  });

  return names.reduce(function (hasDuplicates, name, index) {
    return hasDuplicates || names.indexOf(name) !== index;
  }, false);
}

function extractOperation(typeBundle, operationType) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (Operation.prototype.isPrototypeOf(args[0])) {
    return args[0];
  }

  if (operationType === 'query') {
    return new (Function.prototype.bind.apply(Query, [null].concat([typeBundle], args)))();
  } else {
    return new (Function.prototype.bind.apply(Mutation, [null].concat([typeBundle], args)))();
  }
}

function isInvalidOperationCombination(operations) {
  if (operations.length === 1) {
    return false;
  }

  return hasAnonymousOperations(operations) || hasDuplicateOperationNames(operations);
}

function fragmentNameIsNotUnique(existingDefinitions, name) {
  return existingDefinitions.some(function (definition) {
    return definition.name === name;
  });
}

var Document = function () {

  /**
                             * This constructor should not be invoked directly.
                             * Use the factory function {@link Client#document} to create a Document.
                             * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                             */
  function Document(typeBundle) {
    classCallCheck(this, Document);

    this.typeBundle = typeBundle;
    this.definitions = [];
  }

  /**
     * Returns the GraphQL query string for the Document (e.g. `query queryOne { ... } query queryTwo { ... }`).
     *
     * @return {String} The GraphQL query string for the Document.
     */

  createClass(Document, [{
    key: 'toString',
    value: function toString() {
      return join(this.definitions);
    }

    /**
       * Adds an operation to the Document.
       *
       * @private
       * @param {String} operationType The type of the operation. Either 'query' or 'mutation'.
       * @param {(Operation|String)} [query|queryName] Either an instance of an operation
       *   object, or the name of an operation. Both are optional.
       * @param {Object[]} [variables] A list of variables in the operation. See {@link Client#variable}.
       * @param {Function} [callback] The query builder callback. If an operation
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
        */ },

  {
    key: 'addOperation',
    value: function addOperation(operationType) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var operation = extractOperation.apply(undefined, [this.typeBundle, operationType].concat(args));

      if (isInvalidOperationCombination(this.operations.concat(operation))) {
        throw new Error('All operations must be uniquely named on a multi-operation document');
      }

      this.definitions.push(operation);
    }

    /**
       * Adds a query to the Document.
       *
       * @example
       * document.addQuery('myQuery', (root) => {
       *   root.add('cat', (cat) => {
       *    cat.add('name');
       *   });
       * });
       *
       * @param {(Query|String)} [query|queryName] Either an instance of a query
       *   object, or the name of a query. Both are optional.
       * @param {Object[]} [variables] A list of variables in the query. See {@link Client#variable}.
       * @param {Function} [callback] The query builder callback. If a query
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
       */ },

  {
    key: 'addQuery',
    value: function addQuery() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.addOperation.apply(this, ['query'].concat(args));
    }

    /**
       * Adds a mutation to the Document.
       *
       * @example
       * const input = client.variable('input', 'CatCreateInput!');
       *
       * document.addMutation('myMutation', [input], (root) => {
       *   root.add('catCreate', {args: {input}}, (catCreate) => {
       *     catCreate.add('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {(Mutation|String)} [mutation|mutationName] Either an instance of a mutation
       *   object, or the name of a mutation. Both are optional.
       * @param {Object[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
       * @param {Function} [callback] The mutation builder callback. If a mutation
       *   instance is passed, this callback will be ignored.
       *   A {@link SelectionSet} is created using this callback.
       */ },

  {
    key: 'addMutation',
    value: function addMutation() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.addOperation.apply(this, ['mutation'].concat(args));
    }

    /**
       * Defines a fragment on the Document.
       *
       * @param {String} name The name of the fragment.
       * @param {String} onType The type the fragment is on.
       * @param {Function} [builderFunction] The query builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {FragmentSpread} A {@link FragmentSpread} to be used with {@link SelectionSetBuilder#addFragment}.
       */ },

  {
    key: 'defineFragment',
    value: function defineFragment(name, onType, builderFunction) {
      if (fragmentNameIsNotUnique(this.fragmentDefinitions, name)) {
        throw new Error('All fragments must be uniquely named on a multi-fragment document');
      }

      var selectionSet = new SelectionSet(this.typeBundle, onType, builderFunction);
      var fragment = new FragmentDefinition(name, onType, selectionSet);

      this.definitions.push(fragment);

      return fragment.spread;
    }

    /**
       * All operations ({@link Query} and {@link Mutation}) on the Document.
       */ },

  {
    key: 'operations',
    get: function get$$1() {
      return this.definitions.filter(function (definition) {
        return Operation.prototype.isPrototypeOf(definition);
      });
    }

    /**
       * All {@link FragmentDefinition}s on the Document.
       */ },

  {
    key: 'fragmentDefinitions',
    get: function get$$1() {
      return this.definitions.filter(function (definition) {
        return FragmentDefinition.prototype.isPrototypeOf(definition);
      });
    } }]);

  return Document;
}();

/**
      * The base class used when deserializing response data.
      * Provides rich features, like functions to generate queries to refetch a node or fetch the next page.
      *
      * @class
      */
var GraphModel =

/**
                  * @param {Object} attrs Attributes on the GraphModel.
                  */
function GraphModel(attrs) {
  var _this = this;

  classCallCheck(this, GraphModel);

  Object.defineProperty(this, 'attrs', { value: attrs, enumerable: false });

  Object.keys(this.attrs).filter(function (key) {
    return !(key in _this);
  }).forEach(function (key) {
    var descriptor = void 0;

    if (attrs[key] === null) {
      descriptor = {
        enumerable: true,
        get: function get$$1() {
          return null;
        } };

    } else {
      descriptor = {
        enumerable: true,
        get: function get$$1() {
          return this.attrs[key].valueOf();
        } };

    }
    Object.defineProperty(_this, key, descriptor);
  });
};

/**
    * A registry of classes used to deserialize the response data. Uses {@link GraphModel} by default.
    */

var ClassRegistry = function () {
  function ClassRegistry() {
    classCallCheck(this, ClassRegistry);

    this.classStore = {};
  }

  /**
     * Registers a class for a GraphQL type in the registry.
     *
     * @param {Class} constructor The constructor of the class.
     * @param {String} type The GraphQL type of the object to deserialize into the class.
     */

  createClass(ClassRegistry, [{
    key: 'registerClassForType',
    value: function registerClassForType(constructor, type) {
      this.classStore[type] = constructor;
    }

    /**
       * Unregisters a class for a GraphQL type in the registry.
       *
       * @param {String} type The GraphQL type to unregister.
       */ },

  {
    key: 'unregisterClassForType',
    value: function unregisterClassForType(type) {
      delete this.classStore[type];
    }

    /**
       * Returns the class for the given GraphQL type.
       *
       * @param {String} type The GraphQL type to look up.
       * @return {Class|GraphModel} The class for the given GraphQL type. Defaults to {@link GraphModel} if no class is registered for the GraphQL type.
       */ },

  {
    key: 'classForType',
    value: function classForType(type) {
      return this.classStore[type] || GraphModel;
    } }]);

  return ClassRegistry;
}();

function isValue(arg) {
  return Object.prototype.toString.call(arg) !== '[object Null]' && Object.prototype.toString.call(arg) !== '[object Undefined]';
}

function isNodeContext(context) {
  return context.selection.selectionSet.typeSchema.implementsNode;
}

function isConnection(context) {
  return context.selection.selectionSet.typeSchema.name.endsWith('Connection');
}

function nearestNode(context) {
  if (context == null) {
    return null;
  } else if (isNodeContext(context)) {
    return context;
  } else {
    return nearestNode(context.parent);
  }
}

function contextsFromRoot(context) {
  if (context.parent) {
    return contextsFromRoot(context.parent).concat(context);
  } else {
    return [context];
  }
}

function contextsFromNearestNode(context) {
  if (context.selection.selectionSet.typeSchema.implementsNode) {
    return [context];
  } else {
    return contextsFromNearestNode(context.parent).concat(context);
  }
}

function initializeDocumentAndVars(currentContext, contextChain) {
  var lastInChain = contextChain[contextChain.length - 1];
  var first = lastInChain.selection.args.first;
  var variableDefinitions = Object.keys(lastInChain.selection.args).filter(function (key) {
    return isVariable(lastInChain.selection.args[key]);
  }).map(function (key) {
    return lastInChain.selection.args[key];
  });

  var firstVar = variableDefinitions.find(function (definition) {
    return definition.name === 'first';
  });

  if (!firstVar) {
    firstVar = variable('first', 'Int', first);
    variableDefinitions.push(firstVar);
  }

  var document = new Document(currentContext.selection.selectionSet.typeBundle);

  return [document, variableDefinitions, firstVar];
}

function addNextFieldTo(currentSelection, contextChain, path, cursor) {
  // There are always at least two. When we start, it's the root context, and the first set
  var nextContext = contextChain.shift();

  path.push(nextContext.selection.responseKey);

  if (contextChain.length) {
    currentSelection.add(nextContext.selection.name, { alias: nextContext.selection.alias, args: nextContext.selection.args }, function (newSelection) {
      addNextFieldTo(newSelection, contextChain, path, cursor);
    });
  } else {
    var edgesField = nextContext.selection.selectionSet.selections.find(function (field) {
      return field.name === 'edges';
    });
    var nodeField = edgesField.selectionSet.selections.find(function (field) {
      return field.name === 'node';
    });
    var first = void 0;

    if (isVariable(nextContext.selection.args.first)) {
      first = nextContext.selection.args.first;
    } else {
      first = variable('first', 'Int', nextContext.selection.args.first);
    }

    var options = {
      alias: nextContext.selection.alias,
      args: Object.assign({}, nextContext.selection.args, { after: cursor, first: first }) };


    currentSelection.addConnection(nextContext.selection.name, options, nodeField.selectionSet);
  }
}

function collectFragments(selections) {
  return selections.reduce(function (fragmentDefinitions, field) {
    if (FragmentSpread.prototype.isPrototypeOf(field)) {
      fragmentDefinitions.push(field.toDefinition());
    }

    fragmentDefinitions.push.apply(fragmentDefinitions, toConsumableArray(collectFragments(field.selectionSet.selections)));

    return fragmentDefinitions;
  }, []);
}

function nextPageQueryAndPath(context, cursor) {
  var nearestNodeContext = nearestNode(context);

  if (nearestNodeContext) {
    return function () {
      var _document$definitions;

      var path = [];
      var nodeType = nearestNodeContext.selection.selectionSet.typeSchema;
      var nodeId = nearestNodeContext.responseData.id;
      var contextChain = contextsFromNearestNode(context);

      var _initializeDocumentAn = initializeDocumentAndVars(context, contextChain),
      _initializeDocumentAn2 = slicedToArray(_initializeDocumentAn, 2),
      document = _initializeDocumentAn2[0],
      variableDefinitions = _initializeDocumentAn2[1];

      document.addQuery(variableDefinitions, function (root) {
        path.push('node');
        root.add('node', { args: { id: nodeId } }, function (node) {
          node.addInlineFragmentOn(nodeType.name, function (fragment) {
            addNextFieldTo(fragment, contextChain.slice(1), path, cursor);
          });
        });
      });

      var fragments = collectFragments(document.operations[0].selectionSet.selections);

      (_document$definitions = document.definitions).unshift.apply(_document$definitions, toConsumableArray(fragments));

      return [document, path];
    };
  } else {
    return function () {
      var _document$definitions2;

      var path = [];
      var contextChain = contextsFromRoot(context);

      var _initializeDocumentAn3 = initializeDocumentAndVars(context, contextChain),
      _initializeDocumentAn4 = slicedToArray(_initializeDocumentAn3, 2),
      document = _initializeDocumentAn4[0],
      variableDefinitions = _initializeDocumentAn4[1];

      document.addQuery(variableDefinitions, function (root) {
        addNextFieldTo(root, contextChain.slice(1), path, cursor);
      });

      var fragments = collectFragments(document.operations[0].selectionSet.selections);

      (_document$definitions2 = document.definitions).unshift.apply(_document$definitions2, toConsumableArray(fragments));

      return [document, path];
    };
  }
}

function hasNextPage$1(connection, edge) {
  if (edge !== connection.edges[connection.edges.length - 1]) {
    return new Scalar(true);
  }

  return connection.pageInfo.hasNextPage;
}

function hasPreviousPage(connection, edge) {
  if (edge !== connection.edges[0]) {
    return new Scalar(true);
  }

  return connection.pageInfo.hasPreviousPage;
}

function transformConnections(variableValues) {
  return function (context, value) {
    if (isConnection(context)) {
      if (!(value.pageInfo && value.pageInfo.hasOwnProperty('hasNextPage') && value.pageInfo.hasOwnProperty('hasPreviousPage'))) {
        throw new Error('Connections must include the selections "pageInfo { hasNextPage, hasPreviousPage }".');
      }

      return value.edges.map(function (edge) {
        return Object.assign(edge.node, {
          nextPageQueryAndPath: nextPageQueryAndPath(context, edge.cursor),
          hasNextPage: hasNextPage$1(value, edge),
          hasPreviousPage: hasPreviousPage(value, edge),
          variableValues: variableValues });

      });
    } else {
      return value;
    }
  };
}

/* eslint-disable no-warning-comments */
var DecodingContext = function () {
  function DecodingContext(selection, responseData) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    classCallCheck(this, DecodingContext);

    this.selection = selection;
    this.responseData = responseData;
    this.parent = parent;
    Object.freeze(this);
  }

  createClass(DecodingContext, [{
    key: 'contextForObjectProperty',
    value: function contextForObjectProperty(responseKey) {
      var nestedSelections = this.selection.selectionSet.selectionsByResponseKey[responseKey];
      var nextSelection = nestedSelections && nestedSelections[0];
      var nextContext = void 0;

      // fragment spreads operate inside the current context, so we recurse to get the proper
      // selection set, but retain the current response context
      if (Spread.prototype.isPrototypeOf(nextSelection)) {
        nextContext = new DecodingContext(nextSelection, this.responseData, this.parent);
      } else {
        nextContext = new DecodingContext(nextSelection, this.responseData[responseKey], this);
      }

      if (!nextSelection) {
        throw new Error('Unexpected response key "' + responseKey + '", not found in selection set: ' + this.selection.selectionSet);
      }

      if (Field.prototype.isPrototypeOf(nextSelection)) {
        return nextContext;
      } else {
        return nextContext.contextForObjectProperty(responseKey);
      }
    } },
  {
    key: 'contextForArrayItem',
    value: function contextForArrayItem(item) {
      return new DecodingContext(this.selection, item, this.parent);
    } }]);

  return DecodingContext;
}();

function decodeArrayItems(context, transformers) {
  return context.responseData.map(function (item) {
    return decodeContext(context.contextForArrayItem(item), transformers);
  });
}

function decodeObjectValues(context, transformers) {
  return Object.keys(context.responseData).reduce(function (acc, responseKey) {
    acc[responseKey] = decodeContext(context.contextForObjectProperty(responseKey), transformers);

    return acc;
  }, {});
}

function runTransformers(transformers, context, value) {
  return transformers.reduce(function (acc, transformer) {
    return transformer(context, acc);
  }, value);
}

function decodeContext(context, transformers) {
  var value = context.responseData;

  if (Array.isArray(value)) {
    value = decodeArrayItems(context, transformers);
  } else if (isObject(value)) {
    value = decodeObjectValues(context, transformers);
  }

  return runTransformers(transformers, context, value);
}

function generateRefetchQueries(context, value) {
  if (isValue(value) && isNodeContext(context)) {
    value.refetchQuery = function () {
      return new Query(context.selection.selectionSet.typeBundle, function (root) {
        root.add('node', { args: { id: context.responseData.id } }, function (node) {
          node.addInlineFragmentOn(context.selection.selectionSet.typeSchema.name, context.selection.selectionSet);
        });
      });
    };
  }

  return value;
}

function transformPojosToClassesWithRegistry(classRegistry) {
  return function transformPojosToClasses(context, value) {
    if (isObject(value)) {
      var Klass = classRegistry.classForType(context.selection.selectionSet.typeSchema.name);

      return new Klass(value);
    } else {
      return value;
    }
  };
}

function transformScalars(context, value) {
  if (isValue(value)) {
    if (context.selection.selectionSet.typeSchema.kind === 'SCALAR') {
      return new Scalar(value);
    } else if (context.selection.selectionSet.typeSchema.kind === 'ENUM') {
      return new Enum(value);
    }
  }

  return value;
}

function recordTypeInformation(context, value) {
  if (isValue(value)) {
    if (value.__typename) {
      value.type = schemaForType(context.selection.selectionSet.typeBundle, value.__typename);
    } else {
      value.type = context.selection.selectionSet.typeSchema;
    }
  }

  return value;
}

function defaultTransformers(_ref) {
  var _ref$classRegistry = _ref.classRegistry,
  classRegistry = _ref$classRegistry === undefined ? new ClassRegistry() : _ref$classRegistry,
  variableValues = _ref.variableValues;

  return [transformScalars, generateRefetchQueries, transformConnections(variableValues), recordTypeInformation, transformPojosToClassesWithRegistry(classRegistry)];
}

/**
   * A function used to decode the response data.
   *
   * @function decode
   * @param {SelectionSet} selection The selection set used to query the response data.
   * @param {Object} responseData The response data returned.
   * @param {Object} [options] Options to use when decoding including:
   *   @param {ClassRegistry} [options.classRegistry] A class registry to use when deserializing the data into classes.
   * @return {GraphModel} The decoded response data.
   */
function decode(selection, responseData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var transformers = options.transformers || defaultTransformers(options);
  var context = new DecodingContext(selection, responseData);

  return decodeContext(context, transformers);
}

function httpFetcher(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function fetcher(graphQLParams) {
    return fetch(url, _extends({
      body: JSON.stringify(graphQLParams),
      method: 'POST',
      mode: 'cors' },
    options, {
      headers: _extends({
        'Content-Type': 'application/json',
        Accept: 'application/json' },
      options.headers) })).
    then(function (response) {
      return response.json();
    });
  };
}

function hasNextPage(paginatedModels) {
  return paginatedModels && paginatedModels.length && paginatedModels[paginatedModels.length - 1].hasNextPage;
}

/**
   * The Client class used to create and send GraphQL documents, fragments, queries and mutations.
   */

var Client$2 = function () {

  /**
                             * @param {Object} typeBundle A set of ES6 modules generated by {@link https://github.com/Shopify/graphql-js-schema|graphql-js-schema}.
                             * @param {Object} options An options object. Must include either `url` and optional `fetcherOptions` OR a `fetcher` function.
                             *   @param {(String|Function)} options.url|fetcher Either the URL of the GraphQL API endpoint, or a custom fetcher function for further customization.
                             *   @param {Object} [options.fetcherOptions] Additional options to use with `fetch`, like headers. Do not specify this argument if `fetcher` is specified.
                             *   @param {ClassRegistry} [options.registry=new ClassRegistry()] A {@link ClassRegistry} used to decode the response data.
                             */
  function Client(typeBundle, _ref) {
    var url = _ref.url,
    fetcherOptions = _ref.fetcherOptions,
    fetcher = _ref.fetcher,
    _ref$registry = _ref.registry,
    registry = _ref$registry === undefined ? new ClassRegistry() : _ref$registry;
    classCallCheck(this, Client);

    this.typeBundle = typeBundle;
    this.classRegistry = registry;

    if (url && fetcher) {
      throw new Error('Arguments not supported: supply either `url` and optional `fetcherOptions` OR use a `fetcher` function for further customization.');
    }

    if (url) {
      this.fetcher = httpFetcher(url, fetcherOptions);
    } else if (fetcher) {
      if (fetcherOptions) {
        throw new Error('Arguments not supported: when specifying your own `fetcher`, set options through it and not with `fetcherOptions`');
      }

      this.fetcher = fetcher;
    } else {
      throw new Error('Invalid arguments: one of `url` or `fetcher` is needed.');
    }
  }

  /**
     * Creates a GraphQL document.
     *
     * @example
     * const document = client.document();
     *
     * @return {Document} A GraphQL document.
     */

  createClass(Client, [{
    key: 'document',
    value: function document() {
      return new Document(this.typeBundle);
    }

    /**
       * Creates a GraphQL query.
       *
       * @example
       * const query = client.query('myQuery', (root) => {
       *   root.add('cat', (cat) => {
       *    cat.add('name');
       *   });
       * });
       *
       * @param {String} [name] A name for the query.
       * @param {VariableDefinition[]} [variables] A list of variables in the query. See {@link Client#variable}.
       * @param {Function} selectionSetCallback The query builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {Query} A GraphQL query.
       */ },

  {
    key: 'query',
    value: function query() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return new (Function.prototype.bind.apply(Query, [null].concat([this.typeBundle], args)))();
    }

    /**
       * Creates a GraphQL mutation.
       *
       * @example
       * const input = client.variable('input', 'CatCreateInput!');
       *
       * const mutation = client.mutation('myMutation', [input], (root) => {
       *   root.add('catCreate', {args: {input}}, (catCreate) => {
       *     catCreate.add('cat', (cat) => {
       *       cat.add('name');
       *     });
       *   });
       * });
       *
       * @param {String} [name] A name for the mutation.
       * @param {VariableDefinition[]} [variables] A list of variables in the mutation. See {@link Client#variable}.
       * @param {Function} selectionSetCallback The mutation builder callback.
       *   A {@link SelectionSet} is created using this callback.
       * @return {Mutation} A GraphQL mutation.
       */ },

  {
    key: 'mutation',
    value: function mutation() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new (Function.prototype.bind.apply(Mutation, [null].concat([this.typeBundle], args)))();
    }

    /**
       * Sends a GraphQL operation (query or mutation) or a document.
       *
       * @example
       * client.send(query, {id: '12345'}).then((result) => {
       *   // Do something with the returned result
       *   console.log(result);
       * });
       *
       * @param {(Query|Mutation|Document|Function)} request The operation or document to send. If represented
       * as a function, it must return `Query`, `Mutation`, or `Document` and recieve the client as the only param.
       * @param {Object} [variableValues] The values for variables in the operation or document.
       * @param {Object} [otherProperties] Other properties to send with the query. For example, a custom operation name.
       * @return {Promise.<Object>} A promise resolving to an object containing the response data.
       */ },

  {
    key: 'send',
    value: function send(request) {
      var _this = this;

      var variableValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var otherProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var operationOrDocument = void 0;

      if (Function.prototype.isPrototypeOf(request)) {
        operationOrDocument = request(this);
      } else {
        operationOrDocument = request;
      }

      var graphQLParams = { query: operationOrDocument.toString() };

      if (variableValues) {
        graphQLParams.variables = variableValues;
      }

      Object.assign(graphQLParams, otherProperties);

      var operation = void 0;

      if (Operation.prototype.isPrototypeOf(operationOrDocument)) {
        operation = operationOrDocument;
      } else {
        var document = operationOrDocument;

        if (document.operations.length === 1) {
          operation = document.operations[0];
        } else if (otherProperties.operationName) {
          operation = document.operations.find(function (documentOperation) {
            return documentOperation.name === otherProperties.operationName;
          });
        } else {
          throw new Error('\n          A document must contain exactly one operation, or an operationName\n          must be specified. Example:\n\n            client.send(document, null, {operationName: \'myFancyQuery\'});\n        ');
        }
      }

      return this.fetcher(graphQLParams).then(function (response) {
        if (response.data) {
          response.model = decode(operation, response.data, {
            classRegistry: _this.classRegistry,
            variableValues: variableValues });

        }

        return response;
      });
    }

    /**
       * Fetches the next page of a paginated node or array of nodes.
       *
       * @example
       * client.fetchNextPage(node, {first: 10}).then((result) => {
       *   // Do something with the next page
       *   console.log(result);
       * });
       *
       * @param {(GraphModel|GraphModel[])} nodeOrNodes The node or list of nodes on which to fetch the next page.
       * @param {Object} [options] Options object containing:
       *   @param {Integer} [options.first] The number of nodes to query on the next page. Defaults to the page size of the previous query.
       * @return {Promise.<GraphModel[]>} A promise resolving with the next page of {@link GraphModel}s.
       */ },

  {
    key: 'fetchNextPage',
    value: function fetchNextPage(nodeOrNodes, options) {
      var node = void 0;

      if (Array.isArray(nodeOrNodes)) {
        node = nodeOrNodes[nodeOrNodes.length - 1];
      } else {
        node = nodeOrNodes;
      }

      var _node$nextPageQueryAn = node.nextPageQueryAndPath(),
      _node$nextPageQueryAn2 = slicedToArray(_node$nextPageQueryAn, 2),
      query = _node$nextPageQueryAn2[0],
      path = _node$nextPageQueryAn2[1];

      var variableValues = void 0;

      if (node.variableValues || options) {
        variableValues = Object.assign({}, node.variableValues, options);
      }

      return this.send(query, variableValues).then(function (response) {
        response.model = path.reduce(function (object, key) {
          return object[key];
        }, response.model);

        return response;
      });
    }

    /**
       * Fetches all subsequent pages of a paginated array of nodes.
       *
       * @example
       * client.fetchAllPages(nodes, {pageSize: 20}).then((result) => {
       *   // Do something with all the models
       *   console.log(result);
       * });
       *
       * @param {GraphModel[]} paginatedModels The list of nodes on which to fetch all pages.
       * @param {Object} options Options object containing:
       *   @param {Integer} options.pageSize The number of nodes to query on each page.
       * @return {Promise.<GraphModel[]>} A promise resolving with all pages of {@link GraphModel}s, including the original list.
       */ },

  {
    key: 'fetchAllPages',
    value: function fetchAllPages(paginatedModels, _ref2) {
      var _this2 = this;

      var pageSize = _ref2.pageSize;

      if (hasNextPage(paginatedModels)) {
        return this.fetchNextPage(paginatedModels, { first: pageSize }).then(function (_ref3) {
          var model = _ref3.model;

          var pages = paginatedModels.concat(model);

          return _this2.fetchAllPages(pages, { pageSize: pageSize });
        });
      }

      return Promise.resolve(paginatedModels);
    }

    /**
       * Refetches a {@link GraphModel} whose type implements `Node`.
       *
       * @example
       * client.refetch(node).then((result) => {
       *   // Do something with the refetched node
       *   console.log(result);
       * });
       *
       * @param {GraphModel} nodeType A {@link GraphModel} whose type implements `Node`.
       * @return {Promise.<GraphModel>} The refetched {@link GraphModel}.
       */ },

  {
    key: 'refetch',
    value: function refetch(nodeType) {
      if (!nodeType) {
        throw new Error('\'client#refetch\' must be called with a non-null instance of a Node.');
      } else if (!nodeType.type.implementsNode) {
        throw new Error('\'client#refetch\' must be called with a type that implements Node. Received ' + nodeType.type.name + '.');
      }

      return this.send(nodeType.refetchQuery()).then(function (_ref4) {
        var model = _ref4.model;
        return model.node;
      });
    }

    /**
       * Creates a variable to be used in a {@link Query} or {@link Mutation}.
       *
       * @example
       * const idVariable = client.variable('id', 'ID!', '12345');
       *
       * @param {String} name The name of the variable.
       * @param {String} type The GraphQL type of the variable.
       * @param {*} [defaultValue] The default value of the variable.
       * @return {VariableDefinition} A variable object that can be used in a {@link Query} or {@link Mutation}.
       */ },

  {
    key: 'variable',
    value: function variable$$1(name, type, defaultValue) {
      return variable(name, type, defaultValue);
    }

    /**
       * Creates an enum to be used in a {@link Query} or {@link Mutation}.
       *
       * @example
       * const titleEnum = client.enum('TITLE');
       *
       * @param {String} key The key of the enum.
       * @return {Enum} An enum object that can be used in a {@link Query} or {@link Mutation}.
       */ },

  {
    key: 'enum',
    value: function _enum(key) {
      return enumFunction(key);
    } }]);

  return Client;
}();

/**
      * The class used to configure the JS Buy SDK Client.
      * @class
      */
var Config = function () {
  createClass$1(Config, [{
    key: 'requiredProperties',


    /**
                                * Properties that must be set on initializations
                                * @attribute requiredProperties
                                * @default ['storefrontAccessToken', 'domain']
                                * @type Array
                                * @private
                                */
    get: function get$$1() {
      return ['storefrontAccessToken', 'domain'];
    }

    /**
       * Deprecated properties that map directly to required properties
       * @attribute deprecatedProperties
       * @default {'accessToken': 'storefrontAccessToken', 'apiKey': 'storefrontAccessToken'}
       * @type Object
       * @private
       */ },

  {
    key: 'deprecatedProperties',
    get: function get$$1() {
      return {
        accessToken: 'storefrontAccessToken',
        apiKey: 'storefrontAccessToken' };

    }

    /**
       * @constructs Config
       * @param {Object} attrs An object specifying the configuration. Requires the following properties:
       *   @param {String} attrs.storefrontAccessToken The {@link https://help.shopify.com/api/reference/storefront_access_token|Storefront access token} for the shop.
       *   @param {String} attrs.domain The `myshopify` domain for the shop (e.g. `graphql.myshopify.com`).
       */ }]);



  function Config(attrs) {
    var _this = this;

    classCallCheck$1(this, Config);

    Object.keys(this.deprecatedProperties).forEach(function (key) {
      if (!attrs.hasOwnProperty(key)) {
        return;
      }
      // eslint-disable-next-line no-console
      console.warn('[ShopifyBuy] Config property ' + key + ' is deprecated as of v1.0, please use ' + _this.deprecatedProperties[key] + ' instead.');
      attrs[_this.deprecatedProperties[key]] = attrs[key];
    });

    this.requiredProperties.forEach(function (key) {
      if (attrs.hasOwnProperty(key)) {
        _this[key] = attrs[key];
      } else {
        throw new Error('new Config() requires the option \'' + key + '\'');
      }
    });
  }

  return Config;
}();

var Resource = function Resource(client) {
  classCallCheck$1(this, Resource);

  this.graphQLClient = client;
};

var defaultErrors = [{ message: 'an unknown error has occured.' }];

function defaultResolver(path) {
  var keys = path.split('.');

  return function (_ref) {
    var model = _ref.model,
    errors = _ref.errors;

    return new Promise(function (resolve, reject) {
      try {
        var result = keys.reduce(function (ref, key) {
          return ref[key];
        }, model);

        resolve(result);
      } catch (_) {
        if (errors) {
          reject(errors);
        } else {
          reject(defaultErrors);
        }
      }
    });
  };
}

function fetchResourcesForProducts(productOrProduct, client) {
  var products = [].concat(productOrProduct);

  return Promise.all(products.reduce(function (promiseAcc, product) {
    // Fetch the rest of the images and variants for this product
    promiseAcc.push(client.fetchAllPages(product.images, { pageSize: 250 }).then(function (images) {
      product.attrs.images = images;
    }));

    promiseAcc.push(client.fetchAllPages(product.variants, { pageSize: 250 }).then(function (variants) {
      product.attrs.variants = variants;
    }));

    return promiseAcc;
  }, []));
}

function paginateProductConnectionsAndResolve(client) {
  return function (products) {
    return fetchResourcesForProducts(products, client).then(function () {
      return products;
    });
  };
}

function paginateCollectionsProductConnectionsAndResolve(client) {
  return function (collectionOrCollections) {
    var collections = [].concat(collectionOrCollections);

    return Promise.all(collections.reduce(function (promiseAcc, collection) {
      return promiseAcc.concat(fetchResourcesForProducts(collection.products, client));
    }, [])).then(function () {
      return collectionOrCollections;
    });
  };
}

/**
   * @namespace ProductHelpers
   */
var productHelpers = {

  /**
                        * Returns the variant of a product corresponding to the options given.
                        *
                        * @example
                        * const selectedVariant = client.product.variantForOptions(product, {
                        *   size: "Small",
                        *   color: "Red"
                        * });
                        *
                        * @memberof ProductHelpers
                        * @method variantForOptions
                        * @param {GraphModel} product The product to find the variant on. Must include `variants`.
                        * @param {Object} options An object containing the options for the variant.
                        * @return {GraphModel} The variant corresponding to the options given.
                        */
  variantForOptions: function variantForOptions(product, options) {
    return product.variants.find(function (variant) {
      return variant.selectedOptions.every(function (selectedOption) {
        return options[selectedOption.name] === selectedOption.value.valueOf();
      });
    });
  } };


function query(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.id = client.variable("id", "ID!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.id], function (root) {
    root.add("node", {
      args: {
        id: variables.__defaultOperation__.id } },

    function (node) {
      node.addFragment(spreads.ProductFragment);
    });
  });
  return document;
}

function query$1(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.ids = client.variable("ids", "[ID!]!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.ids], function (root) {
    root.add("nodes", {
      args: {
        ids: variables.__defaultOperation__.ids } },

    function (nodes) {
      nodes.addFragment(spreads.ProductFragment);
    });
  });
  return document;
}

function query$2(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.first = client.variable("first", "Int!");
  variables.__defaultOperation__.query = client.variable("query", "String");
  variables.__defaultOperation__.sortKey = client.variable("sortKey", "ProductSortKeys");
  variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function (root) {
    root.add("shop", function (shop) {
      shop.add("products", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse } },

      function (products) {
        products.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        products.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.ProductFragment);
          });
        });
      });
    });
  });
  return document;
}

function query$3(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.handle = client.variable("handle", "String!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.handle], function (root) {
    root.add("shop", function (shop) {
      shop.add("productByHandle", {
        args: {
          handle: variables.__defaultOperation__.handle } },

      function (productByHandle) {
        productByHandle.addFragment(spreads.ProductFragment);
      });
    });
  });
  return document;
}

// GraphQL
/**
 * The JS Buy SDK product resource
 * @class
 */

var ProductResource = function (_Resource) {
  inherits$1(ProductResource, _Resource);

  function ProductResource() {
    classCallCheck$1(this, ProductResource);
    return possibleConstructorReturn$1(this, (ProductResource.__proto__ || Object.getPrototypeOf(ProductResource)).apply(this, arguments));
  }

  createClass$1(ProductResource, [{
    key: 'fetchAll',


    /**
                      * Fetches all products on the shop.
                      *
                      * @example
                      * client.product.fetchAll().then((products) => {
                      *   // Do something with the products
                      * });
                      *
                      * @param {Int} [pageSize] The number of products to fetch per page
                      * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
                      */
    value: function fetchAll() {
      var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

      return this.graphQLClient.send(query$2, { first: first }).then(defaultResolver('shop.products')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches a single product by ID on the shop.
       *
       * @example
       * client.product.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==').then((product) => {
       *   // Do something with the product
       * });
       *
       * @param {String} id The id of the product to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the product.
       */ },

  {
    key: 'fetch',
    value: function fetch(id) {
      return this.graphQLClient.send(query, { id: id }).then(defaultResolver('node')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches multiple products by ID on the shop.
       *
       * @example
       * const ids = ['Xk9lM2JkNzFmNzIQ4NTIY4ZDFi9DaGVja291dC9lM2JkN==', 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzc4NTc5ODkzODQ='];
       * client.product.fetchMultiple(ids).then((products) => {
       *   // Do something with the products
       * });
       *
       * @param {String[]} ids The ids of the products to fetch
       * @return {Promise|GraphModel[]} A promise resolving with a `GraphModel` of the product.
       */ },

  {
    key: 'fetchMultiple',
    value: function fetchMultiple(ids) {
      return this.graphQLClient.send(query$1, { ids: ids }).then(defaultResolver('nodes')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches a single product by handle on the shop.
       *
       * @example
       * client.product.fetchByHandle('my-product').then((product) => {
       *   // Do something with the product
       * });
       *
       * @param {String} handle The handle of the product to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the product.
       */ },

  {
    key: 'fetchByHandle',
    value: function fetchByHandle(handle) {
      return this.graphQLClient.send(query$3, { handle: handle }).then(defaultResolver('shop.productByHandle')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches all products on the shop that match the query.
       *
       * @example
       * client.product.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((products) => {
       *   // Do something with the first 10 products sorted by title in ascending order
       * });
       *
       * @param {Object} [args] An object specifying the query data containing zero or more of:
       *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
       *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
       *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/productsortkeys|Product Sort Keys}.
       *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#products|here}
       *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the products.
       */ },

  {
    key: 'fetchQuery',
    value: function fetchQuery() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$first = _ref.first,
      first = _ref$first === undefined ? 20 : _ref$first,
      _ref$sortKey = _ref.sortKey,
      sortKey = _ref$sortKey === undefined ? 'ID' : _ref$sortKey,
      query$$1 = _ref.query,
      reverse = _ref.reverse;

      return this.graphQLClient.send(query$2, {
        first: first,
        sortKey: sortKey,
        query: query$$1,
        reverse: reverse }).
      then(defaultResolver('shop.products')).then(paginateProductConnectionsAndResolve(this.graphQLClient));
    } },
  {
    key: 'helpers',
    get: function get$$1() {
      return productHelpers;
    } }]);

  return ProductResource;
}(Resource);

function query$4(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.id = client.variable("id", "ID!");
  spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
    root.add("id");
    root.add("handle");
    root.add("description");
    root.add("descriptionHtml");
    root.add("updatedAt");
    root.add("title");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
  });
  document.addQuery([variables.__defaultOperation__.id], function (root) {
    root.add("node", {
      args: {
        id: variables.__defaultOperation__.id } },

    function (node) {
      node.addFragment(spreads.CollectionFragment);
    });
  });
  return document;
}

function query$5(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.id = client.variable("id", "ID!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
    root.add("id");
    root.add("handle");
    root.add("description");
    root.add("descriptionHtml");
    root.add("updatedAt");
    root.add("title");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
  });
  spreads.CollectionsProductsFragment = document.defineFragment("CollectionsProductsFragment", "Collection", function (root) {
    root.add("products", {
      args: {
        first: 20 } },

    function (products) {
      products.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      products.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.ProductFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.id], function (root) {
    root.add("node", {
      args: {
        id: variables.__defaultOperation__.id } },

    function (node) {
      node.addFragment(spreads.CollectionFragment);
      node.addFragment(spreads.CollectionsProductsFragment);
    });
  });
  return document;
}

function query$6(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.first = client.variable("first", "Int!");
  variables.__defaultOperation__.query = client.variable("query", "String");
  variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
  variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
  spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
    root.add("id");
    root.add("handle");
    root.add("description");
    root.add("descriptionHtml");
    root.add("updatedAt");
    root.add("title");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
  });
  document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse], function (root) {
    root.add("shop", function (shop) {
      shop.add("collections", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse } },

      function (collections) {
        collections.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        collections.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.CollectionFragment);
          });
        });
      });
    });
  });
  return document;
}

function query$7(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.first = client.variable("first", "Int!");
  variables.__defaultOperation__.query = client.variable("query", "String");
  variables.__defaultOperation__.sortKey = client.variable("sortKey", "CollectionSortKeys");
  variables.__defaultOperation__.reverse = client.variable("reverse", "Boolean");
  variables.__defaultOperation__.productsFirst = client.variable("productsFirst", "Int!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
    root.add("id");
    root.add("handle");
    root.add("description");
    root.add("descriptionHtml");
    root.add("updatedAt");
    root.add("title");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.first, variables.__defaultOperation__.query, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse, variables.__defaultOperation__.productsFirst], function (root) {
    root.add("shop", function (shop) {
      shop.add("collections", {
        args: {
          first: variables.__defaultOperation__.first,
          query: variables.__defaultOperation__.query,
          sortKey: variables.__defaultOperation__.sortKey,
          reverse: variables.__defaultOperation__.reverse } },

      function (collections) {
        collections.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        collections.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.addFragment(spreads.CollectionFragment);
            node.add("products", {
              args: {
                first: variables.__defaultOperation__.productsFirst } },

            function (products) {
              products.add("pageInfo", function (pageInfo) {
                pageInfo.add("hasNextPage");
                pageInfo.add("hasPreviousPage");
              });
              products.add("edges", function (edges) {
                edges.add("cursor");
                edges.add("node", function (node) {
                  node.addFragment(spreads.ProductFragment);
                });
              });
            });
          });
        });
      });
    });
  });
  return document;
}

function query$8(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.handle = client.variable("handle", "String!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.ProductFragment = document.defineFragment("ProductFragment", "Product", function (root) {
    root.add("id");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("descriptionHtml");
    root.add("description");
    root.add("handle");
    root.add("productType");
    root.add("title");
    root.add("vendor");
    root.add("tags");
    root.add("publishedAt");
    root.add("onlineStoreUrl");
    root.add("options", function (options) {
      options.add("name");
      options.add("values");
    });
    root.add("images", {
      args: {
        first: 250 } },

    function (images) {
      images.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      images.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("src");
          node.add("altText");
        });
      });
    });
    root.add("variants", {
      args: {
        first: 250 } },

    function (variants) {
      variants.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      variants.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  spreads.CollectionFragment = document.defineFragment("CollectionFragment", "Collection", function (root) {
    root.add("id");
    root.add("handle");
    root.add("description");
    root.add("descriptionHtml");
    root.add("updatedAt");
    root.add("title");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
  });
  spreads.CollectionsProductsFragment = document.defineFragment("CollectionsProductsFragment", "Collection", function (root) {
    root.add("products", {
      args: {
        first: 20 } },

    function (products) {
      products.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      products.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.addFragment(spreads.ProductFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.handle], function (root) {
    root.add("shop", function (shop) {
      shop.add("collectionByHandle", {
        args: {
          handle: variables.__defaultOperation__.handle } },

      function (collectionByHandle) {
        collectionByHandle.addFragment(spreads.CollectionFragment);
        collectionByHandle.addFragment(spreads.CollectionsProductsFragment);
      });
    });
  });
  return document;
}

// GraphQL
/**
 * The JS Buy SDK collection resource
 * @class
 */

var CollectionResource = function (_Resource) {
  inherits$1(CollectionResource, _Resource);

  function CollectionResource() {
    classCallCheck$1(this, CollectionResource);
    return possibleConstructorReturn$1(this, (CollectionResource.__proto__ || Object.getPrototypeOf(CollectionResource)).apply(this, arguments));
  }

  createClass$1(CollectionResource, [{
    key: 'fetchAll',


    /**
                      * Fetches all collections on the shop, not including products.
                      * To fetch collections with products use [fetchAllsWithProducts]{@link Client#fetchAllsWithProducts}.
                      *
                      * @example
                      * client.collection.fetchAll().then((collections) => {
                      *   // Do something with the collections
                      * });
                      *
                      * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
                      */
    value: function fetchAll() {
      var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;

      return this.graphQLClient.send(query$6, { first: first }).then(defaultResolver('shop.collections'));
    }

    /**
       * Fetches all collections on the shop, including products.
       *
       * @example
       * client.collection.fetchAllWithProducts().then((collections) => {
       *   // Do something with the collections
       * });
       *
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
       */ },

  {
    key: 'fetchAllWithProducts',
    value: function fetchAllWithProducts() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$first = _ref.first,
      first = _ref$first === undefined ? 20 : _ref$first,
      _ref$productsFirst = _ref.productsFirst,
      productsFirst = _ref$productsFirst === undefined ? 20 : _ref$productsFirst;

      return this.graphQLClient.send(query$7, { first: first, productsFirst: productsFirst }).then(defaultResolver('shop.collections')).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches a single collection by ID on the shop, not including products.
       * To fetch the collection with products use [fetchWithProducts]{@link Client#fetchWithProducts}.
       *
       * @example
       * client.collection.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} id The id of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */ },

  {
    key: 'fetch',
    value: function fetch(id) {
      return this.graphQLClient.send(query$4, { id: id }).then(defaultResolver('node'));
    }

    /**
       * Fetches a single collection by ID on the shop, including products.
       *
       * @example
       * client.collection.fetchWithProducts('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} id The id of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */ },

  {
    key: 'fetchWithProducts',
    value: function fetchWithProducts(id) {
      return this.graphQLClient.send(query$5, { id: id }).then(defaultResolver('node')).then(paginateCollectionsProductConnectionsAndResolve(this.graphQLClient));
    }

    /**
       * Fetches a collection by handle on the shop.
       *
       * @example
       * client.collection.fetchByHandle('my-collection').then((collection) => {
       *   // Do something with the collection
       * });
       *
       * @param {String} handle The handle of the collection to fetch.
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the collection.
       */ },

  {
    key: 'fetchByHandle',
    value: function fetchByHandle(handle) {
      return this.graphQLClient.send(query$8, { handle: handle }).then(defaultResolver('shop.collectionByHandle'));
    }

    /**
       * Fetches all collections on the shop that match the query.
       *
       * @example
       * client.collection.fetchQuery({first: 20, sortKey: 'CREATED_AT', reverse: true}).then((collections) => {
       *   // Do something with the first 10 collections sorted by title in ascending order
       * });
       *
       * @param {Object} [args] An object specifying the query data containing zero or more of:
       *   @param {Int} [args.first=20] The relay `first` param. This specifies page size.
       *   @param {String} [args.sortKey=ID] The key to sort results by. Available values are
       *   documented as {@link https://help.shopify.com/api/storefront-api/reference/enum/collectionsortkeys|Collection Sort Keys}.
       *   @param {String} [args.query] A query string. See full documentation {@link https://help.shopify.com/api/storefront-api/reference/object/shop#collections|here}
       *   @param {Boolean} [args.reverse] Whether or not to reverse the sort order of the results
       * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the collections.
       */ },

  {
    key: 'fetchQuery',
    value: function fetchQuery() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$first = _ref2.first,
      first = _ref2$first === undefined ? 20 : _ref2$first,
      _ref2$sortKey = _ref2.sortKey,
      sortKey = _ref2$sortKey === undefined ? 'ID' : _ref2$sortKey,
      query = _ref2.query,
      reverse = _ref2.reverse;

      return this.graphQLClient.send(query$6, {
        first: first,
        sortKey: sortKey,
        query: query,
        reverse: reverse }).
      then(defaultResolver('shop.collections'));
    } }]);

  return CollectionResource;
}(Resource);

function query$9(client) {
  var document = client.document();
  document.addQuery(function (root) {
    root.add("shop", function (shop) {
      shop.add("currencyCode");
      shop.add("description");
      shop.add("moneyFormat");
      shop.add("name");
      shop.add("primaryDomain", function (primaryDomain) {
        primaryDomain.add("host");
        primaryDomain.add("sslEnabled");
        primaryDomain.add("url");
      });
    });
  });
  return document;
}

function query$10(client) {
  var document = client.document();
  var spreads = {};
  spreads.PolicyFragment = document.defineFragment("PolicyFragment", "ShopPolicy", function (root) {
    root.add("id");
    root.add("title");
    root.add("url");
    root.add("body");
  });
  document.addQuery(function (root) {
    root.add("shop", function (shop) {
      shop.add("privacyPolicy", function (privacyPolicy) {
        privacyPolicy.addFragment(spreads.PolicyFragment);
      });
      shop.add("termsOfService", function (termsOfService) {
        termsOfService.addFragment(spreads.PolicyFragment);
      });
      shop.add("refundPolicy", function (refundPolicy) {
        refundPolicy.addFragment(spreads.PolicyFragment);
      });
    });
  });
  return document;
}

// GraphQL
/**
 * The JS Buy SDK shop resource
 * @class
 */

var ShopResource = function (_Resource) {
  inherits$1(ShopResource, _Resource);

  function ShopResource() {
    classCallCheck$1(this, ShopResource);
    return possibleConstructorReturn$1(this, (ShopResource.__proto__ || Object.getPrototypeOf(ShopResource)).apply(this, arguments));
  }

  createClass$1(ShopResource, [{
    key: 'fetchInfo',


    /**
                       * Fetches shop information (`currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`).
                       * See the {@link https://help.shopify.com/api/storefront-api/reference/object/shop|Storefront API reference} for more information.
                       *
                       * @example
                       * client.shop.fetchInfo().then((shop) => {
                       *   // Do something with the shop
                       * });
                       *
                       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
                       */
    value: function fetchInfo() {
      return this.graphQLClient.send(query$9).then(defaultResolver('shop'));
    }

    /**
       * Fetches shop policies (privacy policy, terms of service and refund policy).
       *
       * @example
       * client.shop.fetchPolicies().then((shop) => {
       *   // Do something with the shop
       * });
       *
       * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the shop.
       */ },

  {
    key: 'fetchPolicies',
    value: function fetchPolicies() {
      return this.graphQLClient.send(query$10).then(defaultResolver('shop'));
    } }]);

  return ShopResource;
}(Resource);

function handleCheckoutMutation(mutationRootKey, client) {
  return function (_ref) {
    var data = _ref.data,
    errors = _ref.errors,
    model = _ref.model;

    var rootData = data[mutationRootKey];
    var rootModel = model[mutationRootKey];

    if (rootData && rootData.checkout) {
      return client.fetchAllPages(rootModel.checkout.lineItems, { pageSize: 250 }).then(function (lineItems) {
        rootModel.checkout.attrs.lineItems = lineItems;
        rootModel.checkout.errors = errors;
        rootModel.checkout.userErrors = rootModel.userErrors;

        return rootModel.checkout;
      });
    }

    if (errors && errors.length) {
      return Promise.reject(new Error(JSON.stringify(errors)));
    }

    if (rootData && rootData.userErrors && rootData.userErrors.length) {
      return Promise.reject(new Error(JSON.stringify(rootData.userErrors)));
    }

    return Promise.reject(new Error("The " + mutationRootKey + " mutation failed due to an unknown error."));
  };
}

function query$11(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.id = client.variable("id", "ID!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.id], function (root) {
    root.add("node", {
      args: {
        id: variables.__defaultOperation__.id } },

    function (node) {
      node.addFragment(spreads.CheckoutFragment);
    });
  });
  return document;
}

function query$12(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.input = client.variable("input", "CheckoutCreateInput!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation([variables.__defaultOperation__.input], function (root) {
    root.add("checkoutCreate", {
      args: {
        input: variables.__defaultOperation__.input } },

    function (checkoutCreate) {
      checkoutCreate.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutCreate.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$13(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
  variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemInput!]!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function (root) {
    root.add("checkoutLineItemsAdd", {
      args: {
        checkoutId: variables.__defaultOperation__.checkoutId,
        lineItems: variables.__defaultOperation__.lineItems } },

    function (checkoutLineItemsAdd) {
      checkoutLineItemsAdd.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutLineItemsAdd.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$14(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
  variables.__defaultOperation__.lineItemIds = client.variable("lineItemIds", "[ID!]!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItemIds], function (root) {
    root.add("checkoutLineItemsRemove", {
      args: {
        checkoutId: variables.__defaultOperation__.checkoutId,
        lineItemIds: variables.__defaultOperation__.lineItemIds } },

    function (checkoutLineItemsRemove) {
      checkoutLineItemsRemove.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutLineItemsRemove.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$15(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.checkoutId = client.variable("checkoutId", "ID!");
  variables.__defaultOperation__.lineItems = client.variable("lineItems", "[CheckoutLineItemUpdateInput!]!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation([variables.__defaultOperation__.checkoutId, variables.__defaultOperation__.lineItems], function (root) {
    root.add("checkoutLineItemsUpdate", {
      args: {
        checkoutId: variables.__defaultOperation__.checkoutId,
        lineItems: variables.__defaultOperation__.lineItems } },

    function (checkoutLineItemsUpdate) {
      checkoutLineItemsUpdate.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutLineItemsUpdate.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$16(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.checkoutAttributesUpdate = {};
  variables.checkoutAttributesUpdate.checkoutId = client.variable("checkoutId", "ID!");
  variables.checkoutAttributesUpdate.input = client.variable("input", "CheckoutAttributesUpdateInput!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation("checkoutAttributesUpdate", [variables.checkoutAttributesUpdate.checkoutId, variables.checkoutAttributesUpdate.input], function (root) {
    root.add("checkoutAttributesUpdate", {
      args: {
        checkoutId: variables.checkoutAttributesUpdate.checkoutId,
        input: variables.checkoutAttributesUpdate.input } },

    function (checkoutAttributesUpdate) {
      checkoutAttributesUpdate.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutAttributesUpdate.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$17(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.checkoutDiscountCodeApply = {};
  variables.checkoutDiscountCodeApply.discountCode = client.variable("discountCode", "String!");
  variables.checkoutDiscountCodeApply.checkoutId = client.variable("checkoutId", "ID!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation("checkoutDiscountCodeApply", [variables.checkoutDiscountCodeApply.discountCode, variables.checkoutDiscountCodeApply.checkoutId], function (root) {
    root.add("checkoutDiscountCodeApply", {
      args: {
        discountCode: variables.checkoutDiscountCodeApply.discountCode,
        checkoutId: variables.checkoutDiscountCodeApply.checkoutId } },

    function (checkoutDiscountCodeApply) {
      checkoutDiscountCodeApply.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutDiscountCodeApply.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

function query$18(client) {
  var document = client.document();
  var spreads = {};
  var variables = {};
  variables.checkoutEmailUpdate = {};
  variables.checkoutEmailUpdate.checkoutId = client.variable("checkoutId", "ID!");
  variables.checkoutEmailUpdate.email = client.variable("email", "String!");
  spreads.VariantFragment = document.defineFragment("VariantFragment", "ProductVariant", function (root) {
    root.add("id");
    root.add("title");
    root.add("price");
    root.add("weight");
    root.add("available");
    root.add("sku");
    root.add("compareAtPrice");
    root.add("image", function (image) {
      image.add("id");
      image.add("src");
      image.add("altText");
    });
    root.add("selectedOptions", function (selectedOptions) {
      selectedOptions.add("name");
      selectedOptions.add("value");
    });
  });
  spreads.VariantWithProductFragment = document.defineFragment("VariantWithProductFragment", "ProductVariant", function (root) {
    root.addFragment(spreads.VariantFragment);
    root.add("product", function (product) {
      product.add("id");
    });
  });
  spreads.UserErrorFragment = document.defineFragment("UserErrorFragment", "UserError", function (root) {
    root.add("field");
    root.add("message");
  });
  spreads.MailingAddressFragment = document.defineFragment("MailingAddressFragment", "MailingAddress", function (root) {
    root.add("id");
    root.add("address1");
    root.add("address2");
    root.add("city");
    root.add("company");
    root.add("country");
    root.add("firstName");
    root.add("formatted");
    root.add("lastName");
    root.add("latitude");
    root.add("longitude");
    root.add("phone");
    root.add("province");
    root.add("zip");
    root.add("name");
    root.add("countryCode");
    root.add("provinceCode");
  });
  spreads.CheckoutFragment = document.defineFragment("CheckoutFragment", "Checkout", function (root) {
    root.add("id");
    root.add("ready");
    root.add("requiresShipping");
    root.add("note");
    root.add("paymentDue");
    root.add("webUrl");
    root.add("orderStatusUrl");
    root.add("taxExempt");
    root.add("taxesIncluded");
    root.add("currencyCode");
    root.add("totalTax");
    root.add("subtotalPrice");
    root.add("totalPrice");
    root.add("completedAt");
    root.add("createdAt");
    root.add("updatedAt");
    root.add("email");
    root.add("shippingAddress", function (shippingAddress) {
      shippingAddress.addFragment(spreads.MailingAddressFragment);
    });
    root.add("shippingLine", function (shippingLine) {
      shippingLine.add("handle");
      shippingLine.add("price");
      shippingLine.add("title");
    });
    root.add("customAttributes", function (customAttributes) {
      customAttributes.add("key");
      customAttributes.add("value");
    });
    root.add("order", function (order) {
      order.add("id");
      order.add("processedAt");
      order.add("orderNumber");
      order.add("subtotalPrice");
      order.add("totalShippingPrice");
      order.add("totalTax");
      order.add("totalPrice");
      order.add("currencyCode");
      order.add("totalRefunded");
      order.add("customerUrl");
      order.add("shippingAddress", function (shippingAddress) {
        shippingAddress.addFragment(spreads.MailingAddressFragment);
      });
      order.add("lineItems", {
        args: {
          first: 250 } },

      function (lineItems) {
        lineItems.add("pageInfo", function (pageInfo) {
          pageInfo.add("hasNextPage");
          pageInfo.add("hasPreviousPage");
        });
        lineItems.add("edges", function (edges) {
          edges.add("cursor");
          edges.add("node", function (node) {
            node.add("title");
            node.add("variant", function (variant) {
              variant.addFragment(spreads.VariantWithProductFragment);
            });
            node.add("quantity");
            node.add("customAttributes", function (customAttributes) {
              customAttributes.add("key");
              customAttributes.add("value");
            });
          });
        });
      });
    });
    root.add("lineItems", {
      args: {
        first: 250 } },

    function (lineItems) {
      lineItems.add("pageInfo", function (pageInfo) {
        pageInfo.add("hasNextPage");
        pageInfo.add("hasPreviousPage");
      });
      lineItems.add("edges", function (edges) {
        edges.add("cursor");
        edges.add("node", function (node) {
          node.add("id");
          node.add("title");
          node.add("variant", function (variant) {
            variant.addFragment(spreads.VariantWithProductFragment);
          });
          node.add("quantity");
          node.add("customAttributes", function (customAttributes) {
            customAttributes.add("key");
            customAttributes.add("value");
          });
        });
      });
    });
  });
  document.addMutation("checkoutEmailUpdate", [variables.checkoutEmailUpdate.checkoutId, variables.checkoutEmailUpdate.email], function (root) {
    root.add("checkoutEmailUpdate", {
      args: {
        checkoutId: variables.checkoutEmailUpdate.checkoutId,
        email: variables.checkoutEmailUpdate.email } },

    function (checkoutEmailUpdate) {
      checkoutEmailUpdate.add("userErrors", function (userErrors) {
        userErrors.addFragment(spreads.UserErrorFragment);
      });
      checkoutEmailUpdate.add("checkout", function (checkout) {
        checkout.addFragment(spreads.CheckoutFragment);
      });
    });
  });
  return document;
}

// GraphQL
/**
 * The JS Buy SDK checkout resource
 * @class
 */

var CheckoutResource = function (_Resource) {
  inherits$1(CheckoutResource, _Resource);

  function CheckoutResource() {
    classCallCheck$1(this, CheckoutResource);
    return possibleConstructorReturn$1(this, (CheckoutResource.__proto__ || Object.getPrototypeOf(CheckoutResource)).apply(this, arguments));
  }

  createClass$1(CheckoutResource, [{
    key: 'fetch',


    /**
                   * Fetches a checkout by ID.
                   *
                   * @example
                   * client.checkout.fetch('FlZj9rZXlN5MDY4ZDFiZTUyZTUwNTE2MDNhZjg=').then((checkout) => {
                   *   // Do something with the checkout
                   * });
                   *
                   * @param {String} id The id of the checkout to fetch.
                   * @return {Promise|GraphModel} A promise resolving with a `GraphModel` of the checkout.
                   */
    value: function fetch(id) {
      var _this2 = this;

      return this.graphQLClient.send(query$11, { id: id }).then(defaultResolver('node')).then(function (checkout) {
        return _this2.graphQLClient.fetchAllPages(checkout.lineItems, { pageSize: 250 }).then(function (lineItems) {
          checkout.attrs.lineItems = lineItems;

          return checkout;
        });
      });
    }

    /**
       * Creates a checkout.
       *
       * @example
       * const input = {
       *   lineItems: [
       *     {variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}
       *   ]
       * };
       *
       * client.checkout.create(input).then((checkout) => {
       *   // Do something with the newly created checkout
       * });
       *
       * @param {Object} [input] An input object containing zero or more of:
       *   @param {String} [input.email] An email connected to the checkout.
       *   @param {Object[]} [input.lineItems] A list of line items in the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
       *   @param {Object} [input.shippingAddress] A shipping address. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/mailingaddressinput|Storefront API reference} for valid input fields.
       *   @param {String} [input.note] A note for the checkout.
       *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/attributeinput|Storefront API reference} for valid input fields.
       * @return {Promise|GraphModel} A promise resolving with the created checkout.
       */ },

  {
    key: 'create',
    value: function create() {
      var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.graphQLClient.send(query$12, { input: input }).then(handleCheckoutMutation('checkoutCreate', this.graphQLClient));
    }

    /**
       * Replaces the value of checkout's custom attributes and/or note with values defined in the input
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const input = {customAttributes: [{key: "MyKey", value: "MyValue"}]};
       *
       * client.checkout.updateAttributes(checkoutId, input).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to update.
       * @param {Object} [input] An input object containing zero or more of:
       *   @param {Boolean} [input.allowPartialAddresses] An email connected to the checkout.
       *   @param {Object[]} [input.customAttributes] A list of custom attributes for the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/attributeinput|Storefront API reference} for valid input fields.
       *   @param {String} [input.note] A note for the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'updateAttributes',
    value: function updateAttributes(checkoutId) {
      var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.graphQLClient.send(query$16, { checkoutId: checkoutId, input: input }).then(handleCheckoutMutation('checkoutAttributesUpdate', this.graphQLClient));
    }

    /**
       * Replaces the value of checkout's email address
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const email = 'user@example.com';
       *
       * client.checkout.updateEmail(checkoutId, email).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add discount to.
       * @param {String} email The email address to apply to the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'updateEmail',
    value: function updateEmail(checkoutId, email) {
      return this.graphQLClient.send(query$18, { checkoutId: checkoutId, email: email }).then(handleCheckoutMutation('checkoutEmailUpdate', this.graphQLClient));
    }

    /**
       * Adds line items to an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItems = [{variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5}];
       *
       * client.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add line items to.
       * @param {Object[]} lineItems A list of line items to add to the checkout. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/checkoutlineiteminput|Storefront API reference} for valid input fields for each line item.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'addLineItems',
    value: function addLineItems(checkoutId, lineItems) {
      return this.graphQLClient.send(query$13, { checkoutId: checkoutId, lineItems: lineItems }).then(handleCheckoutMutation('checkoutLineItemsAdd', this.graphQLClient));
    }

    /**
       * Applies a discount to an existing checkout using a discount code.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const discountCode = 'best-discount-ever';
       *
       * client.checkout.addDiscount(checkoutId, discountCode).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to add discount to.
       * @param {String} discountCode The discount code to apply to the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'addDiscount',
    value: function addDiscount(checkoutId, discountCode) {
      return this.graphQLClient.send(query$17, { checkoutId: checkoutId, discountCode: discountCode }).then(handleCheckoutMutation('checkoutDiscountCodeApply', this.graphQLClient));
    }

    /**
       * Removes line items from an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItemIds = ['TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU='];
       *
       * client.checkout.removeLineItems(checkoutId, lineItemIds).then((checkout) => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to remove line items from.
       * @param {String[]} lineItemIds A list of the ids of line items to remove from the checkout.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'removeLineItems',
    value: function removeLineItems(checkoutId, lineItemIds) {
      return this.graphQLClient.send(query$14, { checkoutId: checkoutId, lineItemIds: lineItemIds }).then(handleCheckoutMutation('checkoutLineItemsRemove', this.graphQLClient));
    }

    /**
       * Updates line items on an existing checkout.
       *
       * @example
       * const checkoutId = 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC9kMTZmM2EzMDM4Yjc4N=';
       * const lineItems = [
       *   {
       *     id: 'TViZGE5Y2U1ZDFhY2FiMmM2YT9rZXk9NTc2YjBhODcwNWIxYzg0YjE5ZjRmZGQ5NjczNGVkZGU=',
       *     quantity: 5,
       *     variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg=='
       *   }
       * ];
       *
       * client.checkout.updateLineItems(checkoutId, lineItems).then(checkout => {
       *   // Do something with the updated checkout
       * });
       *
       * @param {String} checkoutId The ID of the checkout to update a line item on.
       * @param {Object[]} lineItems A list of line item information to update. See the {@link https://help.shopify.com/api/storefront-api/reference/input_object/checkoutlineitemupdateinput|Storefront API reference} for valid input fields for each line item.
       * @return {Promise|GraphModel} A promise resolving with the updated checkout.
       */ },

  {
    key: 'updateLineItems',
    value: function updateLineItems(checkoutId, lineItems) {
      return this.graphQLClient.send(query$15, { checkoutId: checkoutId, lineItems: lineItems }).then(handleCheckoutMutation('checkoutLineItemsUpdate', this.graphQLClient));
    } }]);

  return CheckoutResource;
}(Resource);

/**
              * @namespace ImageHelpers
              */
var imageHelpers = {

  /**
                      * Generates the image src for a resized image with maximum dimensions `maxWidth` and `maxHeight`.
                      * Images do not scale up.
                      *
                      * @example
                      * const url = client.image.helpers.imageForSize(product.variants[0].image, {maxWidth: 50, maxHeight: 50});
                      *
                      * @memberof ImageHelpers
                      * @method imageForSize
                      * @param {Object} image The original image model to generate the image src for.
                      * @param {Object} options An options object containing:
                      *  @param {Integer} options.maxWidth The maximum width for the image.
                      *  @param {Integer} options.maxHeight The maximum height for the image.
                      * @return {String} The image src for the resized image.
                      */
  imageForSize: function imageForSize(image, _ref) {
    var maxWidth = _ref.maxWidth,
    maxHeight = _ref.maxHeight;

    var splitUrl = image.src.split('?');
    var notQuery = splitUrl[0];
    var query = splitUrl[1] ? '?' + splitUrl[1] : '';

    // Use the section before the query
    var imageTokens = notQuery.split('.');

    // Take the token before the file extension and append the dimensions
    var imagePathIndex = imageTokens.length - 2;

    imageTokens[imagePathIndex] = imageTokens[imagePathIndex] + '_' + maxWidth + 'x' + maxHeight;

    return '' + imageTokens.join('.') + query;
  } };


/**
        * The JS Buy SDK image resource
        * @class
        */

var ImageResource = function (_Resource) {
  inherits$1(ImageResource, _Resource);

  function ImageResource() {
    classCallCheck$1(this, ImageResource);
    return possibleConstructorReturn$1(this, (ImageResource.__proto__ || Object.getPrototypeOf(ImageResource)).apply(this, arguments));
  }

  createClass$1(ImageResource, [{
    key: 'helpers',
    get: function get$$1() {
      return imageHelpers;
    } }]);

  return ImageResource;
}(Resource);

var version = "1.8.0";

var QueryRoot = {
  "name": "QueryRoot",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "node": "Node",
    "nodes": "Node",
    "shop": "Shop" },

  "implementsNode": false };


var Node = {
  "name": "Node",
  "kind": "INTERFACE",
  "fieldBaseTypes": {},
  "possibleTypes": ["AppliedGiftCard", "Article", "Blog", "Checkout", "CheckoutLineItem", "Collection", "Comment", "MailingAddress", "Order", "Payment", "Product", "ProductOption", "ProductVariant", "ShopPolicy"] };


var ID = {
  "name": "ID",
  "kind": "SCALAR" };


var String$1 = {
  "name": "String",
  "kind": "SCALAR" };


var Boolean$1 = {
  "name": "Boolean",
  "kind": "SCALAR" };


var DateTime = {
  "name": "DateTime",
  "kind": "SCALAR" };


var MailingAddress = {
  "name": "MailingAddress",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "address1": "String",
    "address2": "String",
    "city": "String",
    "company": "String",
    "country": "String",
    "countryCode": "String",
    "firstName": "String",
    "formatted": "String",
    "id": "ID",
    "lastName": "String",
    "latitude": "Float",
    "longitude": "Float",
    "name": "String",
    "phone": "String",
    "province": "String",
    "provinceCode": "String",
    "zip": "String" },

  "implementsNode": true };


var Float = {
  "name": "Float",
  "kind": "SCALAR" };


var PageInfo = {
  "name": "PageInfo",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "hasNextPage": "Boolean",
    "hasPreviousPage": "Boolean" },

  "implementsNode": false };


var Int = {
  "name": "Int",
  "kind": "SCALAR" };


var Order = {
  "name": "Order",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "currencyCode": "CurrencyCode",
    "customerUrl": "URL",
    "id": "ID",
    "lineItems": "OrderLineItemConnection",
    "orderNumber": "Int",
    "processedAt": "DateTime",
    "shippingAddress": "MailingAddress",
    "subtotalPrice": "Money",
    "totalPrice": "Money",
    "totalRefunded": "Money",
    "totalShippingPrice": "Money",
    "totalTax": "Money" },

  "implementsNode": true };


var Money = {
  "name": "Money",
  "kind": "SCALAR" };


var CurrencyCode = {
  "name": "CurrencyCode",
  "kind": "ENUM" };


var URL = {
  "name": "URL",
  "kind": "SCALAR" };


var OrderLineItemConnection = {
  "name": "OrderLineItemConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "OrderLineItemEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var OrderLineItemEdge = {
  "name": "OrderLineItemEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "OrderLineItem" },

  "implementsNode": false };


var OrderLineItem = {
  "name": "OrderLineItem",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customAttributes": "Attribute",
    "quantity": "Int",
    "title": "String",
    "variant": "ProductVariant" },

  "implementsNode": false };


var ProductVariant = {
  "name": "ProductVariant",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "available": "Boolean",
    "compareAtPrice": "Money",
    "id": "ID",
    "image": "Image",
    "price": "Money",
    "product": "Product",
    "selectedOptions": "SelectedOption",
    "sku": "String",
    "title": "String",
    "weight": "Float" },

  "implementsNode": true };


var Image = {
  "name": "Image",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "altText": "String",
    "id": "ID",
    "src": "URL" },

  "implementsNode": false };


var SelectedOption = {
  "name": "SelectedOption",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "name": "String",
    "value": "String" },

  "implementsNode": false };


var Product = {
  "name": "Product",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "createdAt": "DateTime",
    "description": "String",
    "descriptionHtml": "HTML",
    "handle": "String",
    "id": "ID",
    "images": "ImageConnection",
    "onlineStoreUrl": "URL",
    "options": "ProductOption",
    "productType": "String",
    "publishedAt": "DateTime",
    "tags": "String",
    "title": "String",
    "updatedAt": "DateTime",
    "variants": "ProductVariantConnection",
    "vendor": "String" },

  "implementsNode": true };


var CollectionConnection = {
  "name": "CollectionConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "CollectionEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var CollectionEdge = {
  "name": "CollectionEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Collection" },

  "implementsNode": false };


var Collection = {
  "name": "Collection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "description": "String",
    "descriptionHtml": "HTML",
    "handle": "String",
    "id": "ID",
    "image": "Image",
    "products": "ProductConnection",
    "title": "String",
    "updatedAt": "DateTime" },

  "implementsNode": true };


var HTML = {
  "name": "HTML",
  "kind": "SCALAR" };


var ProductConnection = {
  "name": "ProductConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var ProductEdge = {
  "name": "ProductEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Product" },

  "implementsNode": false };


var ImageConnection = {
  "name": "ImageConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ImageEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var ImageEdge = {
  "name": "ImageEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "Image" },

  "implementsNode": false };


var ProductOption = {
  "name": "ProductOption",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "name": "String",
    "values": "String" },

  "implementsNode": true };


var ProductVariantConnection = {
  "name": "ProductVariantConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "ProductVariantEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var ProductVariantEdge = {
  "name": "ProductVariantEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "ProductVariant" },

  "implementsNode": false };


var Attribute = {
  "name": "Attribute",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "key": "String",
    "value": "String" },

  "implementsNode": false };


var Shop = {
  "name": "Shop",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "collectionByHandle": "Collection",
    "collections": "CollectionConnection",
    "currencyCode": "CurrencyCode",
    "description": "String",
    "moneyFormat": "String",
    "name": "String",
    "primaryDomain": "Domain",
    "privacyPolicy": "ShopPolicy",
    "productByHandle": "Product",
    "products": "ProductConnection",
    "refundPolicy": "ShopPolicy",
    "termsOfService": "ShopPolicy" },

  "implementsNode": false };


var Domain = {
  "name": "Domain",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "host": "String",
    "sslEnabled": "Boolean",
    "url": "URL" },

  "implementsNode": false };


var ShopPolicy = {
  "name": "ShopPolicy",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "body": "String",
    "id": "ID",
    "title": "String",
    "url": "URL" },

  "implementsNode": true };


var Mutation$1 = {
  "name": "Mutation",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkoutAttributesUpdate": "CheckoutAttributesUpdatePayload",
    "checkoutCreate": "CheckoutCreatePayload",
    "checkoutEmailUpdate": "CheckoutEmailUpdatePayload",
    "checkoutLineItemsAdd": "CheckoutLineItemsAddPayload",
    "checkoutDiscountCodeApply": "CheckoutLineItemsAddPayload",
    "checkoutLineItemsRemove": "CheckoutLineItemsRemovePayload",
    "checkoutLineItemsUpdate": "CheckoutLineItemsUpdatePayload" },

  "implementsNode": false,
  "relayInputObjectBaseTypes": {
    "checkoutAttributesUpdate": "CheckoutAttributesUpdateInput",
    "checkoutCreate": "CheckoutCreateInput",
    "customerAccessTokenCreate": "CustomerAccessTokenCreateInput",
    "customerActivate": "CustomerActivateInput",
    "customerCreate": "CustomerCreateInput",
    "customerReset": "CustomerResetInput" } };



var CheckoutAttributesUpdatePayload = {
  "name": "CheckoutAttributesUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var UserError = {
  "name": "UserError",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "field": "String",
    "message": "String" },

  "implementsNode": false };


var Checkout = {
  "name": "Checkout",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "completedAt": "DateTime",
    "createdAt": "DateTime",
    "currencyCode": "CurrencyCode",
    "customAttributes": "Attribute",
    "email": "String",
    "id": "ID",
    "lineItems": "CheckoutLineItemConnection",
    "note": "String",
    "order": "Order",
    "orderStatusUrl": "URL",
    "paymentDue": "Money",
    "ready": "Boolean",
    "requiresShipping": "Boolean",
    "shippingAddress": "MailingAddress",
    "shippingLine": "ShippingRate",
    "subtotalPrice": "Money",
    "taxExempt": "Boolean",
    "taxesIncluded": "Boolean",
    "totalPrice": "Money",
    "totalTax": "Money",
    "updatedAt": "DateTime",
    "webUrl": "URL" },

  "implementsNode": true };


var CheckoutLineItemConnection = {
  "name": "CheckoutLineItemConnection",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "edges": "CheckoutLineItemEdge",
    "pageInfo": "PageInfo" },

  "implementsNode": false };


var CheckoutLineItemEdge = {
  "name": "CheckoutLineItemEdge",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "cursor": "String",
    "node": "CheckoutLineItem" },

  "implementsNode": false };


var CheckoutLineItem = {
  "name": "CheckoutLineItem",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "customAttributes": "Attribute",
    "id": "ID",
    "quantity": "Int",
    "title": "String",
    "variant": "ProductVariant" },

  "implementsNode": true };


var ShippingRate = {
  "name": "ShippingRate",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "handle": "String",
    "price": "Money",
    "title": "String" },

  "implementsNode": false };


var CheckoutCreatePayload = {
  "name": "CheckoutCreatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var CheckoutEmailUpdatePayload = {
  "name": "CheckoutEmailUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var CheckoutLineItemsAddPayload = {
  "name": "CheckoutLineItemsAddPayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var CheckoutLineItemsRemovePayload = {
  "name": "CheckoutLineItemsRemovePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var CheckoutLineItemsUpdatePayload = {
  "name": "CheckoutLineItemsUpdatePayload",
  "kind": "OBJECT",
  "fieldBaseTypes": {
    "checkout": "Checkout",
    "userErrors": "UserError" },

  "implementsNode": false };


var Types = {
  types: {} };

Types.types["QueryRoot"] = QueryRoot;
Types.types["Node"] = Node;
Types.types["ID"] = ID;
Types.types["String"] = String$1;
Types.types["Boolean"] = Boolean$1;
Types.types["DateTime"] = DateTime;
Types.types["MailingAddress"] = MailingAddress;
Types.types["Float"] = Float;
Types.types["PageInfo"] = PageInfo;
Types.types["Int"] = Int;
Types.types["Order"] = Order;
Types.types["Money"] = Money;
Types.types["CurrencyCode"] = CurrencyCode;
Types.types["URL"] = URL;
Types.types["OrderLineItemConnection"] = OrderLineItemConnection;
Types.types["OrderLineItemEdge"] = OrderLineItemEdge;
Types.types["OrderLineItem"] = OrderLineItem;
Types.types["ProductVariant"] = ProductVariant;
Types.types["Image"] = Image;
Types.types["SelectedOption"] = SelectedOption;
Types.types["Product"] = Product;
Types.types["CollectionConnection"] = CollectionConnection;
Types.types["CollectionEdge"] = CollectionEdge;
Types.types["Collection"] = Collection;
Types.types["HTML"] = HTML;
Types.types["ProductConnection"] = ProductConnection;
Types.types["ProductEdge"] = ProductEdge;
Types.types["ImageConnection"] = ImageConnection;
Types.types["ImageEdge"] = ImageEdge;
Types.types["ProductOption"] = ProductOption;
Types.types["ProductVariantConnection"] = ProductVariantConnection;
Types.types["ProductVariantEdge"] = ProductVariantEdge;
Types.types["Attribute"] = Attribute;
Types.types["Shop"] = Shop;
Types.types["Domain"] = Domain;
Types.types["ShopPolicy"] = ShopPolicy;
Types.types["Mutation"] = Mutation$1;
Types.types["CheckoutAttributesUpdatePayload"] = CheckoutAttributesUpdatePayload;
Types.types["UserError"] = UserError;
Types.types["Checkout"] = Checkout;
Types.types["CheckoutLineItemConnection"] = CheckoutLineItemConnection;
Types.types["CheckoutLineItemEdge"] = CheckoutLineItemEdge;
Types.types["CheckoutLineItem"] = CheckoutLineItem;
Types.types["ShippingRate"] = ShippingRate;
Types.types["CheckoutCreatePayload"] = CheckoutCreatePayload;
Types.types["CheckoutEmailUpdatePayload"] = CheckoutEmailUpdatePayload;
Types.types["CheckoutLineItemsAddPayload"] = CheckoutLineItemsAddPayload;
Types.types["CheckoutLineItemsRemovePayload"] = CheckoutLineItemsRemovePayload;
Types.types["CheckoutLineItemsUpdatePayload"] = CheckoutLineItemsUpdatePayload;
Types.queryType = "QueryRoot";
Types.mutationType = "Mutation";
Types.subscriptionType = null;

function recursivelyFreezeObject(structure) {
  Object.getOwnPropertyNames(structure).forEach(function (key) {
    var value = structure[key];
    if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
      recursivelyFreezeObject(value);
    }
  });
  Object.freeze(structure);
  return structure;
}

var types = recursivelyFreezeObject(Types);

// GraphQL
/**
 * The JS Buy SDK Client.
 * @class
 *
 * @property {ProductResource} product The property under which product fetching methods live.
 * @property {CollectionResource} collection The property under which collection fetching methods live.
 * @property {ShopResource} shop The property under which shop fetching methods live.
 * @property {CheckoutResource} checkout The property under which shop fetching and mutating methods live.
 * @property {ImageResource} image The property under which image helper methods live.
 */

var Client = function () {
  createClass$1(Client, null, [{
    key: 'buildClient',


    /**
                         * Primary entry point for building a new Client.
                         */
    value: function buildClient(config, fetchFunction) {
      var newConfig = new Config(config);
      var client = new Client(newConfig, Client$2, fetchFunction);

      client.config = newConfig;

      return client;
    }

    /**
       * @constructs Client
       * @param {Config} config An instance of {@link Config} used to configure the Client.
       */ }]);



  function Client(config) {
    var GraphQLClientClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Client$2;
    var fetchFunction = arguments[2];
    classCallCheck$1(this, Client);

    var url = 'https://' + config.domain + '/api/graphql';

    var headers = {
      'X-SDK-Variant': 'javascript',
      'X-SDK-Version': version,
      'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken };


    if (fetchFunction) {
      headers['Content-Type'] = 'application/json';
      headers.Accept = 'application/json';

      this.graphQLClient = new GraphQLClientClass(types, {
        fetcher: function fetcher(graphQLParams) {
          return fetchFunction(url, {
            body: JSON.stringify(graphQLParams),
            method: 'POST',
            mode: 'cors',
            headers: headers }).
          then(function (response) {
            return response.json();
          });
        } });

    } else {
      this.graphQLClient = new GraphQLClientClass(types, {
        url: url,
        fetcherOptions: { headers: headers } });

    }

    this.product = new ProductResource(this.graphQLClient);
    this.collection = new CollectionResource(this.graphQLClient);
    this.shop = new ShopResource(this.graphQLClient);
    this.checkout = new CheckoutResource(this.graphQLClient);
    this.image = new ImageResource(this.graphQLClient);
  }

  /**
     * Fetches the next page of models
     *
     * @example
     * client.fetchNextPage(products).then((nextProducts) => {
     *   // Do something with the products
     * });
     *
     * @param {models} [Array] The paginated set to fetch the next page of
     * @return {Promise|GraphModel[]} A promise resolving with an array of `GraphModel`s of the type provided.
     */


  createClass$1(Client, [{
    key: 'fetchNextPage',
    value: function fetchNextPage(models) {
      return this.graphQLClient.fetchNextPage(models);
    } }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}; /*!
                                                                                                                                                                                                                                                                                        * JavaScript Cookie v2.2.0
                                                                                                                                                                                                                                                                                        * https://github.com/js-cookie/js-cookie
                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                        * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
                                                                                                                                                                                                                                                                                        * Released under the MIT license
                                                                                                                                                                                                                                                                                        */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (( false ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/' },
				api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).
					replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
					converter.read(cookie, name) : converter(cookie, name) ||
					cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true },
			[].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1 }));

		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map