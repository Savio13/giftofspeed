(function() {
                          window.FacebookPixel = undefined;
                          var loadScript = function(url, callback) {
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            if (script.readyState) {
                              script.onreadystatechange = function() {
                                  callback();
                            };
                         } else {
                           script.onload = function() {
                             callback();
                          };
                       }
                       script.src = url;
                       document.getElementsByTagName('head')[0].appendChild(script);
                    };
                    if (typeof fbq === 'undefined') {
                      var myAppJavaScript = function($) {
                        ! function(f, b, e, v, n, t, s) {
                          if (f.fbq) return;
                          n = f.fbq = function() {
                            n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                         };
                         if (!f._fbq) f._fbq = n;
                         n.push = n;
                         n.loaded = !0;
                         n.version = '2.0';
                         n.queue = [];
                         t = b.createElement(e);
                         t.async = !0;
                         t.src = v;
                         s = b.getElementsByTagName(e)[0];
                         s.parentNode.insertBefore(t, s)
                      }(window,
                      document, 'script', '//connect.facebook.net/en_US/fbevents.js');
                      window.FacebookPixel = fbq;
                      $(document).ready(function() {
                       var str = JSON.stringify();
                       var newArr = JSON.parse(str);
                       for (var i = 0; i < newArr.length; i++) {
                         FacebookPixel('init', newArr[i]);
                      }
                      FacebookPixel('track', 'PageView');

//----------Start Buy It Now Button Update------------
var nativeFetch = window.fetch;
window.fetch = function(...args) {
args.forEach(function(item,index){
if(typeof item === 'string'){
if(item.indexOf('checkouts.json') !== -1){
console.log('buy it now clicked');
FacebookPixel('track', 'InitiateCheckout', {
content_ids: __st.rid,
    });
   }
  }
 });
return nativeFetch.apply(window, args);
}
//----------End Buy It Now Button Update--------------
                    
                     var addedToCart = false;
                      var addToCart = function(addedVariantId) {
                      	sessionStorage.removeItem('variant_name');
                      	var name;
                      	var my_variants = location.search;
                      	if(my_variants != '' || my_variants != undefined || my_variants != null) {
                      		var my_id = my_variants.split('=');
                      		my_id = my_id[1];
                      		for(var i = 0; i < meta.product.variants.length; i++) {
                      			if(meta.product.variants[i].id == my_id) {
                      				name = meta.product.variants[i].name;
                      				sessionStorage.setItem('variant_name',name);
                      			} 
                      		}
                      	} 
                      	if(sessionStorage.getItem('variant_name') != null) {
                      		name = sessionStorage.getItem('variant_name');
                      	} else {
                      		name = meta.product.variants[0].name;
                      	}
                         if (!addedToCart) {
                          var addedVariant = meta.product.variants.find(function(variant) {
                            return variant.id == addedVariantId;
                          });
                          if(addedVariant == undefined){
                            addedVariant = meta.product.variants[0];
                          }
                           FacebookPixel('track', 'AddToCart', {
                             content_ids: __st.rid,
							               content_type: 'product_group',
                             content_category: meta.product.type,
                             content_name: name,
							               currency: Shopify.currency.active, 
        				             value: (addedVariant.price /100),
                          });
                        //addedToCart = true;
                       }
                       
                    };
                     
                    if (location.pathname.match(/\/products\/.+/)) {
                      FacebookPixel('track', 'ViewContent', {
						content_ids: __st.rid,
						content_type: 'product_group',
						content_category: meta.product.type,
						content_name: meta.product.variants[0].name,
                     });
                 $('form[action="/cart/add"]').submit(function() {
                  var addedVariantId = $(this).children('[name="id"]').val();
                        addToCart(addedVariantId)
                     });
                 }
                 if (location.pathname.match(/^\/cart/)) {
                   if(localStorage.getItem('product_types') === null){
                     localStorage.setItem('product_types', '[]');
                   }
                   var productsInCartTypes = JSON.parse(localStorage.getItem('product_types'));
                   $.getJSON('/cart.js', function(products){
                      products.items.forEach(function(item,index){
                        if(productsInCartTypes.indexOf(item.product_type) === -1){
                          productsInCartTypes.push(item.product_type);
                        }
                      });
                      localStorage.setItem('product_types', JSON.stringify(productsInCartTypes));
                   });
                   $('form[action="/cart"]').submit(function(e) {
                     FacebookPixel('track', 'InitiateCheckout', {
                       content_ids: __st.rid,

                    });
                 });
              }
			  
			  			  
			  if (Shopify.Checkout && Shopify.Checkout.page == 'thank_you') {

			  var productIds = [];
			  var productNames = [];
        var totalItems = 0;
			  Shopify.checkout.line_items.forEach(function(item, index) {
				  productNames.push(item.title);
				  productIds.push(item.product_id);
          totalItems += parseInt(item.quantity);
			  });
			  var getOrderID = localStorage.getItem('order_id');
			  var orderID = Shopify.checkout.line_items[0].product_id;
			  var productTypes = JSON.parse(localStorage.getItem('product_types'));
			  console.log('orderID', orderID);
			  var checkout = Shopify.checkout
			  FacebookPixel('track', 'Purchase', {
				  content_ids: productIds,
				  content_name: productNames,
				  content_type: 'product_group',
				  content_category: productTypes,
				  value: checkout.total_price,
				  currency: checkout.currency,
				  num_items: totalItems,

			  });
			  localStorage.setItem('order_id', orderID);
			  localStorage.setItem('product_types', '[]');
		  } //end of if shopify.checkout
	  });
  };


     if (typeof jQuery === 'undefined') {
      loadScript('//ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', function() {
        jQuery220 = jQuery.noConflict(true);
        myAppJavaScript(jQuery220);
     });
  } else {
   myAppJavaScript(jQuery);
}
}
})()