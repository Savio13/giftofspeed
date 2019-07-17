var xxx, yyy, foo;
NProgress.start(), jQuery(window).resize(function() {
  768 > roar.getWidthBrowser() &&
    $("#popup-mailchimp.hidden-xs").find(".mfp-close").trigger("click");
}), jQuery(document).ready(function() {
  try {
    roar.initLazyLoading(), roar.init(), roarLookbook.init(), theme.LanguagePicker.init();
  } finally {
    NProgress.done();
  }
}), jQuery(window).load(function() {
  roar.initLazyLoading();
});
var roar = {
  init: function() {
    this.handleAccount(), this.handleAddress(), this.initProductQuickShopItem(), this.initFilterSidebar(), this.initFooterCollapse(), this.initVerticalMenuSidebar(), this.initChangeInputNameCartPage(), this.handleOrder(), this.currenciesCallback(), this.initCountdown(), this.addToCart(), this.removeCart(), this.addToWishlist(), this.handleCompare(), this.removeToWishlist(), this.handlePopups(), this.handleSearch(), this.handleGMap(), this.handleScrollToTop(), this.handleSmoothScroll(), this.mapFilters(), this.handleQuickshop(), this.handleBlog(), this.handleCookie(), this.fixedHeaderMenu(), this.searchAutoComplete(), this.handleDropdown(), this.toggleFilter(), this.handleHeaderNotice(), this.handleInstagramFloatBar();
  },
  handleAddress: function() {
    var y = $("#AddressNewForm");
    y.length &&
      (Shopify &&
        new Shopify.CountryProvinceSelector(
          "AddressCountryNew",
          "AddressProvinceNew",
          { hideElement: "AddressProvinceContainerNew" }
        ), $(".address-country-option").each(function() {
        var C = $(this).data("form-id");
        new Shopify.CountryProvinceSelector(
          "AddressCountry_" + C,
          "AddressProvince_" + C,
          { hideElement: "AddressProvinceContainer_" + C }
        );
      }), $(".address-new-toggle").on("click", function() {
        y.toggleClass("hide");
      }), $(".address-edit-toggle").on("click", function() {
        var C = $(this).data("form-id");
        $("#EditAddress_" + C).toggleClass("hide");
      }), $(".address-delete").on("click", function() {
        var C = $(this), S = C.data("form-id"), T = C.data("confirm-message");
        confirm(T || "Are you sure you wish to delete this address?") &&
          Shopify.postLink("/account/addresses/" + S, {
            parameters: { _method: "delete" }
          });
      }));
  },
  handleAccount: function() {
    function y() {
      return $("#recover-password").fadeIn(), $(
        "#customer-login"
      ).hide(), (window.location.hash = "#recover"), !1;
    }
    function C() {
      return $("#recover-password").hide(), $(
        "#customer-login"
      ).fadeIn(), (window.location.hash = ""), !1;
    }
    $("#forgot_password a").click(function() {
      y();
    }), "#recover" == window.location.hash ? y() : C(), $(
      "#recover-password .cancel"
    ).click(function() {
      C();
    });
  },
  handleHeaderNotice: function() {
    if (window.hn_use) {
      let y = !0;
      window.hn_once &&
        "yes" == localStorage.getItem("displayNotice") &&
        (y = !1), !0 == y &&
        ($("#header-notice .header-notice").show(), $(
          "#header-notice .close-notice"
        ).on("click", function() {
          return window.hn_once &&
            localStorage.setItem(
              "displayNotice",
              "yes"
            ), $("#header-notice .header-notice").hide(), !1;
        }));
    }
  },
  handleInstagramFloatBar: function() {
    if (window.social_instagram) {
      var y = new Instafeed({
        get: "user",
        target: "instagram_list",
        accessToken: $("#instagram_list").data("token"),
        userId: $("#instagram_list").data("uid"),
        limit: $("#instagram_list").data("limit"),
        resolution: "thumbnail",
        resolution2: "standard_resolution",
        template: '<a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /></a>'
      });
      y.run();
    }
  },
  initLazyLoading: function(y, C) {
    var y = y || "body",
      C = C || !1,
      S = new Blazy({
        selector: y + " .b-lazy",
        success: function(T) {
          setTimeout(function() {
            var I = T.parentNode;
            I.className = I.className.replace(/\bb-loading\b/, "");
          }, 200);
        }
      });
    !0 == C && S.load($(y + " .b-lazy"), !0);
  },
  initProductQuickShopItem: function(y) {
    function C(E) {
      return (E + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
    function S(E) {
      return E.toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }
    function T(E) {
      let B = E.replace("https:", "")
        .replace("http:", "")
        .split("?v=")[0]
        .split("/"),
        F = B[B.length - 1].split("."),
        D = F.pop(),
        U = F.join(".") + "_100x." + D;
      return E.replace(B[B.length - 1], U);
    }
    function I(E, B) {
      let F = E.replace("https:", "")
        .replace("http:", "")
        .split("?v=")[0]
        .split("/"),
        D = F[F.length - 1].split("."),
        U = D.pop(),
        W = D.join(".") + B + "@2x." + U,
        H = D.join(".") + B + "." + U;
      var V = {
        srcset: E.replace(F[F.length - 1], W) +
          " 500w," +
          E.replace(F[F.length - 1], H) +
          " 166w",
        src: E.replace(F[F.length - 1], H)
      };
      return V;
    }
    function P(E, B) {
      var F = B.replace("https:", "").replace("http:", "").split("?v=")[0],
        D = "";
      0 < E.find(".item-images-wrapper a").length &&
        E.find(".item-images-wrapper a").each(function() {
          var U = $(this)
            .data("_image")
            .replace("https:", "")
            .replace("http:", "")
            .split("?v=")[0];
          if (U == F) return void (D = $(this));
        }), E.find(".item-images-wrapper a").removeClass("active"), "" != D &&
        D.addClass("active");
    }
    function z(E, B, F, D) {
      if (1 < B.options.length)
        for (i = 0; i < B.options.length; i++)
          i != F &&
            $(
              "#single-option-selector-" + B.id + "-" + i + "-" + E + " option"
            ).each(function() {
              var U = $(this).closest(".product-item-advanced-wrapper"),
                W = "unavailable",
                H = $(this).attr("value");
              for (j = 0; j < B.variants.length; j++) {
                var V = B.variants[j];
                if (V.options[F] != D) continue;
                else if (V.options[i] == H) {
                  W = !0 == V.available ? "available" : "sold_out";
                  break;
                }
              }
              var R = U.find(
                ".variations-content-" +
                  B.id +
                  " #swatch-" +
                  i +
                  "-" +
                  H.toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-") +
                  "-" +
                  E
              );
              $(R)
                .closest(".swatch-element")
                .removeClass("available")
                .removeClass("sold_out")
                .removeClass("unavailable")
                .addClass(W);
            });
      else
        for (i = 0; i < B.options.length; i++)
          $(
            "#single-option-selector-" + B.id + "-" + i + "-" + E + " option"
          ).each(function() {
            var U = $(this).closest(".product-item-advanced-wrapper"),
              W = "unavailable",
              H = $(this).attr("value");
            for (j = 0; j < B.variants.length; j++) if (
                B.variants[j].options[i] == H
              ) {
                W = B.variants[j].available ? "available" : "sold_out";
                break;
              }
            var V = U.find(
              ".variations-content-" +
                B.id +
                " #swatch-" +
                i +
                "-" +
                H.toLowerCase()
                  .replace(/[^a-z0-9 -]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-") +
                "-" +
                E
            );
            $(V)
              .closest(".swatch-element")
              .removeClass("available")
              .removeClass("sold_out")
              .removeClass("unavailable")
              .addClass(W);
          });
    }
    function A(E) {
      var B, F = E, U = [], W = F.get(0).attributes, H = W.length;
      for (B = 0; B < H; B++)
        "data-" === W[B].name.substring(0, 5) && U.push(W[B].name);
      $.each(U, function(V, R) {
        F.removeAttr(R);
      });
    }
    function N(E, B) {
      if (
        (B.available
          ? (E.find(".btn-action.addtocart-item-js span").text(
              theme.strings.addToCart
            ), E.find(".btn-action.addtocart-item-js").prop("disabled", !1))
          : (E.find(".btn-action.addtocart-item-js span").text(
              theme.strings.soldOut
            ), E.find(".btn-action.addtocart-item-js").prop(
              "disabled",
              !0
            )), E.find("select.variation-select.no-js").val(B.id), E.find(
          "span.price-new.money"
        ).html(
          Shopify.formatMoney(B.price, window.money_format)
        ), !(B.compare_at_price > B.price))
      )
        E.find("span.price-old.money").addClass("hide"), E.find(
          ".sale"
        ).addClass("hide");
      else if (
        (E.find("span.price-old.money")
          .html(Shopify.formatMoney(B.compare_at_price, window.money_format))
          .removeClass("hide"), E.find(".sale")
          .text(theme.strings.sale)
          .removeClass("hide"), E.find(".sale").hasClass("percentage"))
      ) {
        var F = Math.round(
          100 * (B.compare_at_price - B.price) / B.compare_at_price
        );
        E.find(".sale").text("-" + F + "%");
      }
      if (
        (window.show_multiple_currencies &&
          (A(E.find("span.money")), roar.currenciesCallbackSpecial(
            ".product-item-advanced-wrapper span.money"
          )), null !== B.featured_image)
      ) {
        P(E, B.featured_image.src);
        var D = I(B.featured_image.src, E.data("_dim"));
        E.find("img.mpt-image").attr("srcset", D.srcset).attr("src", D.src);
      }
    }
    var y = y || "body", L = $(y).find(".single-option-selector-item");
    0 < L.length &&
      L.unbind("change") &&
      L.on("change", function() {
        var E = $(this).closest(".product-item-advanced-wrapper");
        if (0 < $(E.find(".product-item-option").data("id")).length) {
          var B = JSON.parse(
            $(E.find(".product-item-option").data("id")).html()
          ),
            F = {},
            D = "not_found";
          for (
            $(this)
              .closest(".variations-content")
              .find(".single-option-selector-item")
              .each(function() {
                F[$(this).data("index")] = $(this).val();
              }), (k = 0);
            k < B.variants.length;
            k++
          ) {
            var U = !1;
            for (ol = 1; ol <= B.options.length; ol++)
              if (F["option" + ol] == B.variants[k]["option" + ol]) U = !0;
              else {
                U = !1;
                break;
              }
            if (!0 == U) {
              (D = "found"), N(E, B.variants[k]);
              break;
            }
          }
          "not_found" == D &&
            (E.find(".btn-action.addtocart-item-js span").text(
              theme.strings.unavailable
            ), E.closest(".product-item-advanced-wrapper")
              .find(".btn-action.addtocart-item-js")
              .prop("disabled", !0));
        }
      });
    var M = $(y).find(".product-item-option");
    if (0 < M.length) {
      var O = 0, q = {};
      M.each(function() {
        if (!$(this).hasClass("has-swatch-finished")) {
          ++O;
          var E = $(this)
            .closest(".product-item-advanced-wrapper")
            .addClass("product-item-advanced-wrapper-" + O);
          if (
            ($(this).find(".single-option-selector-item").each(function() {
              var pe = $(this).data("id") + "-" + O;
              $(this).attr("id", pe), $(this).data("_index", O);
            }), 0 < $($(this).data("id")).length)
          ) {
            var B = JSON.parse($($(this).data("id")).html());
            0 < $($(this).data("swatch_id")).length &&
              (q = JSON.parse($($(this).data("swatch_id")).html()));
            var F = [];
            if (
              ("1" == window.swatch_size && F.push("Size"), F.push(
                "size"
              ), "1" == window.swatch_color &&
                (F.push("Color"), F.push("Colour"), F.push("color"), F.push(
                  "colour"
                )), 0 < F.length)
            ) {
              var D = !1,
                U = !1,
                W = 0,
                H = theme.asset_url.substring(
                  0,
                  theme.asset_url.lastIndexOf("?")
                ),
                V = theme.asset_url.substring(
                  theme.asset_url.lastIndexOf("?"),
                  theme.asset_url.length
                );
              for (i = 0; i < B.options.length; i++) {
                var R = "",
                  G = "",
                  Q = "",
                  Y = "",
                  J = "",
                  K = "",
                  Z = "",
                  X = "img btooltip";
                if (
                  ((R = "object" == typeof B.options[i]
                    ? B.options[i].name
                    : B.options[i]), (D = !1), (U = !1), -1 < F.indexOf(R))
                ) {
                  (D = !0), (W = i);
                  var ee = R.toLowerCase();
                  if ((/color|colour/i.test(ee) && (U = !0), D)) {
                    var ae = [];
                    for (j = 0; j < B.variants.length; j++) {
                      var ie = B.variants[j], oe = C(ie.options[W]), se = S(oe);
                      0 > ae.indexOf(oe) &&
                        ("color" != ee && "colour" != ee
                          ? ((Z = oe), (X = "btooltip"))
                          : "1" == window.swatch_color_advanced
                              ? null !== q[se] &&
                                  void 0 !== q[se] &&
                                  "" != q[se]
                                  ? ((X =
                                      "img btooltip swatch_color_advanced"), (Z =
                                      '<i style="background-image: url(' +
                                      H +
                                      q[se] +
                                      ".png" +
                                      V +
                                      ')"></i>'))
                                  : null === ie.featured_image
                                      ? (Z =
                                          '<i style="background-color:' +
                                          oe +
                                          "; background-image: url(" +
                                          H +
                                          se +
                                          ".png" +
                                          V +
                                          ')"></i>')
                                      : ((X =
                                          "img btooltip swatch_color_advanced"), (Z =
                                          '<i style="background-image: url(' +
                                          T(ie.featured_image.src) +
                                          ')"></i>'))
                              : (Z =
                                  '<i style="background-color:' +
                                  oe +
                                  "; background-image: url(" +
                                  H +
                                  se +
                                  ".png" +
                                  V +
                                  ')"></i>'), (K = $(
                          "#single-option-selector-" + B.id + "-" + W + "-" + O
                        ).val() == oe
                          ? "selected "
                          : ""), (Q =
                          Q +
                          '<div class="swatch-element ' +
                          ee +
                          se +
                          " " +
                          "available" +
                          '"><input data-id="#single-option-selector-' +
                          B.id +
                          "-" +
                          W +
                          "-" +
                          O +
                          '" data-value="' +
                          oe +
                          '"  class="swatch-radio ' +
                          K +
                          '" id="swatch-' +
                          W +
                          "-" +
                          se +
                          "-" +
                          O +
                          '" type="radio" data-swatch="' +
                          ee +
                          '" data-poption="' +
                          W +
                          '" name="option-' +
                          W +
                          '" value="' +
                          oe +
                          '"><label for="swatch-' +
                          W +
                          "-" +
                          se +
                          "-" +
                          O +
                          '" class="' +
                          X +
                          '" title="' +
                          oe +
                          '"><span class="soldout-image"></span>' +
                          Z +
                          "</label></div>"), ae.push(oe));
                    }
                    (G =
                      '<div class="wrapper-swatches-product-item wrapper-swatches swatch ' +
                      ee +
                      '" data-attribute_name="attribute_pa_' +
                      ee +
                      '"><div>' +
                      Q +
                      "</div></div>"), (Y = E.find(
                      "#single-option-selector-" + B.id + "-" + W + "-" + O
                    )), (J = E.find(
                      "#single-option-selector-" + B.id + "-" + W + "-" + O
                    )), "" != G &&
                      (Y.after(G), Y.hide(), J.addClass("hide-choose-option"));
                  }
                }
              }
            }
            var de = "";
            0 < E.find(".wrapper-swatches-product-item").length &&
              ((de = E.find(
                ".wrapper-swatches-product-item .swatch-radio"
              )), de.unbind("click"), de.on("click", function() {
                var pe = $(this).closest(".product-item-advanced-wrapper"),
                  ue = pe.find($(this).data("id")),
                  me = $(this).data("poption"),
                  he = $(this).data("value");
                $(this).data("value") != ue.val() &&
                  (ue.val($(this).data("value")).trigger("change"), ue
                    .closest(".selector-wrapper")
                    .find(".swatch-radio")
                    .removeClass("selected"), $(this).addClass(
                    "selected"
                  )), z(ue.data("_index"), B, me, he);
              })), $(".swatch-radio.selected").trigger("click");
          }
          $(this).addClass("has-swatch-finished");
        }
      });
    }
    $(
      document
    ).on(
      "mouseenter mouseleave click",
      ".product-item-advanced-wrapper:not(.ag-column-content.col-sm-3 .product-item-advanced-wrapper):not(.ag-column-content.col-sm-4 .product-item-advanced-wrapper)",
      function(E) {
        var B = $(this),
          F = window.innerWidth,
          D = B.find(".product-item-content"),
          U = B.find(".product-item-inside-hover"),
          W = parseInt(U.height()) + parseInt(U.css("marginTop")) + 3,
          H = B.find(".count_holder_item .is-countdown"),
          V = B.find(".count_holder_item .is-countdown").innerHeight(),
          R = B.find(".item-images-wrapper"),
          G = B.find(".item-images-wrapper").innerHeight();
        (V += G), E.target, "mouseenter" === E.type && 1024 < F
          ? (B.css({}).addClass("hovered"), D.css(
              "transform",
              "translateY(-" + W + "px)"
            ), U.css("opacity", "1"), H.css(
              "transform",
              "translateY(-" + parseInt(W + 10) + "px)"
            ), R.css("transform", "translateY(-" + parseInt(W) + "px)"))
          : "mouseleave" === E.type &&
              E.relatedTarget &&
              1024 < F &&
              (B.removeClass("hovered").removeAttr("style"), D.removeAttr(
                "style"
              ), U.removeAttr("style"), H.removeAttr("style"), R.removeAttr(
                "style"
              ));
      }
    ), 0 < $(".item-images-wrapper").length &&
      $(".item-images-wrapper a").on("click", function() {
        if (!$(this).hasClass("active")) {
          var E = $(this).data("_image"), B = $(this).data("_dim"), F = I(E, B);
          $(this)
            .closest(".item-images-wrapper")
            .find("a")
            .removeClass("active"), $(this).addClass("active"), $(this)
            .closest(".product-content-wrapper")
            .find("img.mpt-image")
            .attr("srcset", F.srcset)
            .attr("src", F.src);
        }
      }), $(".items-image-buttons a").on("click", function(E) {
      E.preventDefault(), $(this).hasClass("next") ? $(this).closest(".product").find(".item-images-wrapper a.active").next().trigger("click") : $(this).closest(".product").find(".item-images-wrapper a.active").prev().trigger("click");
    });
  },
  initFilterSidebar: function() {
    $(".filter_title .arrow").click(function() {
      $(this).toggleClass("rotArr"), $(this).parent().next().slideToggle(300);
    });
  },
  initFooterCollapse: function() {
    $(".footer-accordion-heading").on("click", function(y) {
      y.preventDefault();
      var C = $(this)
        .closest(".footer-accordion")
        .find(".footer-accordion-content"),
        S = $(this).find("i.fa");
      S.hasClass("aDown")
        ? S.removeClass("aDown") && C.slideUp()
        : S.addClass("aDown") && C.slideDown();
    });
  },
  initVerticalMenuSidebar: function() {
    $(".ver-dropdown-parent-submenu a.dropdown-link").on("click", function(y) {
      y.preventDefault();
      var C = $(this)
        .closest(".ver-dropdown-parent-submenu")
        .find("ul.ver-dropdown-menu"),
        S = $(this).find("i.fa");
      S.hasClass("aDown")
        ? S.removeClass("aDown") && C.slideUp()
        : S.addClass("aDown") && C.slideDown();
    });
  },
  changeInputNameCartPage: function() {
    var y = "updates[]";
    767 < $(window).width()
      ? ($(".input-mobile").attr("name", ""), $(".input-desktop").attr(
          "name",
          y
        ))
      : ($(".input-mobile").attr("name", y), $(".input-desktop").attr(
          "name",
          ""
        ));
  },
  initChangeInputNameCartPage: function() {
    $(".input-mobile").length &&
      $(".input-desktop").length &&
      (roar.changeInputNameCartPage(), $(window).resize(function() {
        roar.changeInputNameCartPage();
      }));
  },
  fixedHeaderMenu: function() {
    if (!(991 >= $(window).width())) {
      if (
        (0 < $("#header-phantom").length && $("#header-phantom").remove(), 0 <
          $(".section-megamenu-content").length &&
          $(".section-megamenu-content").each(function() {
            var C = $(this).data("menu_width_class");
            0 < $(this).closest(".shopify-section").length &&
              ($(this).closest(".shopify-section").hasClass(C) ||
                $(this).closest(".shopify-section").addClass(C));
          }), "menu" == window.fixed_header)
      ) {
        var y = $(
          '<div id="header-phantom" class="fixed-header-1 sticky-header"></div>'
        );
        y.insertAfter(".megamenu-background"), $(".megamenu-background")
          .clone()
          .appendTo("#header-phantom"), roar.fixedMenu(), $(
          window
        ).resize(function() {
          roar.fixedMenu();
        }), $(window).scroll(function() {
          roar.fixedMenu();
        });
      } else if ("header" == window.fixed_header) {
        var y = $(
          '<div id="header-phantom" class="fixed-header-1 sticky-header"></div>'
        );
        y.insertAfter("#top"), $("#top")
          .clone()
          .appendTo("#header-phantom"), roar.fixedHeader(), $(
          window
        ).resize(function() {
          roar.fixedHeader();
        }), $(window).scroll(function() {
          roar.fixedHeader();
        });
      }
      0 < $("#header-phantom .shopify-section").length &&
        $("#header-phantom .shopify-section").each(function() {
          $(this).removeClass("shopify-section");
        });
    }
  },
  fixedHeader: function() {
    var y = $("header #top").first().width();
    $("header #top .background").first().width() !=
      $("header").first().width() &&
      $(".sticky-header").css("background", "none"), $(".sticky-header")
      .css("width", y)
      .css("left", "50%")
      .css("right", "auto")
      .css("margin-left", "-" + Math.ceil(y / 2) + "px")
      .css("margin-right", "-" + Math.ceil(y / 2) + "px"), 1160 <=
      roar.getWidthBrowser() && 280 < $(window).scrollTop()
      ? $(".sticky-header").addClass("fixed-header")
      : $(".sticky-header").removeClass("fixed-header");
  },
  fixedMenu: function() {
    var y = $("header .megamenu-background").first().width();
    $("header #top .background").first().width() !=
      $("header").first().width() &&
      $(".sticky-header").css("background", "none"), $(".sticky-header")
      .css("width", y)
      .css("left", "50%")
      .css("right", "auto")
      .css("margin-left", "-" + Math.ceil(y / 2) + "px")
      .css("margin-right", "-" + Math.ceil(y / 2) + "px"), 1160 <=
      roar.getWidthBrowser() && 280 < $(window).scrollTop()
      ? $(".sticky-header").addClass("fixed-header")
      : $(".sticky-header").removeClass("fixed-header");
  },
  toggleFilter: function() {
    $("#filter-sidebar").on("click", function() {
      $("body").toggleClass("open_filter");
    }), $(document).on("click", ".open_filter .spinner", function() {
      $("body").removeClass("open_filter");
    }), $("#filter-addtocart").on("click", function() {
      $("#product .add-to-cart").trigger("click");
    });
  },
  searchAutoComplete: function() {
    var y = null;
    $('form[action="/search"]').each(function() {
      var C = "product",
        S = $(this).find('select[name="category_id"]'),
        T = $(this).find('input[name="type"]');
      0 < S.length &&
        0 < T.length &&
        $(S).bind("change", function() {
          $(T).val($(this).val()), (C = $(this).val());
        });
      var I = $(this).find('input[name="q"]');
      $('<ul class="ui-autocomplete ui-front"></ul>')
        .appendTo($(this).find(".autocomplete-results"))
        .hide(), I.attr("autocomplete", "off").bind("keyup change", function() {
        var P = $(this).val(),
          z = $(this).closest("form"),
          A = "/search?type=" + C + "&q=*" + P + "*",
          N = z.find(".ui-autocomplete");
        3 <= P.length &&
          P != $(this).attr("data-old-term") &&
          (I.addClass("ui-autocomplete-loading"), $(this).attr(
            "data-old-term",
            P
          ), null != y && y.abort(), (y = $.getJSON(A + "&view=json", function(
            L
          ) {
            I.removeClass("ui-autocomplete-loading"), N.empty(), 0 ==
              L.results_count
              ? N.hide()
              : ($.each(L.results, function(M, O) {
                  var q = $("<a></a>").attr("href", O.url);
                  q.append(
                    '<span class="thumbnail"><img src="' +
                      O.thumbnail +
                      '" /></span>'
                  ), q.append('<span class="title">' + O.title + "</span>"), q.wrap("<li></li>"), N.append(q.parent());
                }), 1 < L.results_count &&
                  N.append(
                    '<li><span class="title"><a href="' +
                      A +
                      '">' +
                      window.all_results_text +
                      " (" +
                      L.results_count +
                      ")</a></span></li>"
                  ), N.fadeIn(200));
          })));
      });
    }), $("body").bind("click", function() {
      $(".ui-autocomplete").hide();
    });
  },
  currenciesCallback: function() {
    try {
      0 < $(".dropdown.language-switcher").length &&
        $(".dropdown.language-switcher").hover(function() {
          0 < $(".dropdown.language-switcher select").length &&
            $(".dropdown.language-switcher select").attr("size", "4");
        }), window.show_multiple_currencies &&
        ((Currency.format =
          window.formatCurrency), (Currency.money_with_currency_format[
          window.shopCurrency
        ] =
          window.jsonCurrency), (Currency.money_format[window.shopCurrency] =
          window.jsonMoney), (window.defaultCurrency =
          window.defaultCurrency ||
          window.shopCurrency), (window.cookieCurrency = Currency.cookie.read()), $(
          "span.money span.money"
        ).each(function() {
          $(this).parents("span.money").removeClass("money");
        }), $("span.money").each(function() {
          $(this).attr("data-currency-" + window.shopCurrency, $(this).html());
        }), null == window.cookieCurrency
          ? (window.shopCurrency === window.defaultCurrency
              ? (Currency.currentCurrency = window.defaultCurrency)
              : Currency.convertAll(
                  window.shopCurrency,
                  window.defaultCurrency
                ), Currency.cookie.write(window.defaultCurrency))
          : $(".currencies_src").size() &&
              0 ===
                $(".currencies_src a[data-value=" + cookieCurrency + "]").size()
              ? ((Currency.currentCurrency =
                  window.shopCurrency), Currency.cookie.write(
                  window.shopCurrency
                ))
              : window.cookieCurrency === window.shopCurrency
                  ? (Currency.currentCurrency = window.shopCurrency)
                  : (Currency.convertAll(
                      window.shopCurrency,
                      window.cookieCurrency
                    ), $(".currency_code").html(window.cookieCurrency)), $(
          ".currencies_src a"
        ).click(function() {
          var y = $(this).attr("data-value");
          Currency.convertAll(
            Currency.currentCurrency,
            y
          ), $(".currency_code").html(Currency.currentCurrency);
        }));
    } catch (y) {
      console.log(y.message);
    }
  },
  currenciesCallbackSpecial: function(y) {
    try {
      window.show_multiple_currencies &&
        ((Currency.format = window.formatCurrency), $(y).each(function() {
          $(this).attr("data-currency-" + window.shopCurrency, $(this).html());
        }), Currency.convertAll(
          window.shopCurrency,
          Currency.cookie.read(),
          y,
          Currency.format
        ));
    } catch (C) {
      console.log(C.message);
    }
  },
  destroyCountdown: function() {
    $.fn.countdown && $(".is-countdown").countdown("destroy");
  },
  initCountdown: function() {
    $.fn.countdown &&
      $(".countdown:not(.is-countdown)").each(function() {
        var y = $(this),
          C = new Date(),
          S = new Date(
            parseInt(y.data("year")),
            parseInt(y.data("month")) - 1,
            y.data("day")
          );
        S > C ? y.countdown({ until: S }) : y.parent().hide();
      });
  },
  handleCookie: function() {
    function C() {
      try {
        var T = "domain=." + document.domain, z = new Date();
        z.setTime(z.getTime() + 31536e6);
        var A = "; expires=" + z.toGMTString();
        document.cookie =
          "popup-module-cookie" + "=" + "true" + A + "; path=/; " + T;
      } catch (N) {
        console.log(N.message);
      }
    }
    !(function() {
      try {
        var T = "popup-module-cookie";
        if (0 < document.cookie.length) {
          var I = document.cookie.indexOf(T + "=");
          if (-1 != I) {
            I = I + T.length + 1;
            var P = document.cookie.indexOf(";", I);
            return -1 == P && (P = document.cookie.length), unescape(
              document.cookie.substring(I, P)
            );
          }
        }
      } catch (z) {
        console.log(z.message);
      }
    })() &&
      $("#cookie").length &&
      ((function() {
        $("#cookie.cookie").length
          ? $("#cookie").fadeIn("slow")
          : $("#cookie.popup").length &&
              $.magnificPopup.open({
                items: { src: "#cookie", type: "inline" },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-2",
                removalDelay: 200,
                modal: !0
              });
      })(), $("#cookie .accept").click(function() {
        C(), $("#cookie.cookie").length
          ? $("#cookie").fadeOut("slow")
          : $("#cookie.popup").length && $.magnificPopup.close();
      }));
  },
  handleBlog: function() {
    function y(T) {
      $.ajax({
        url: location.href,
        type: "get",
        dataType: "html",
        data: { page: T },
        success: function(I) {
          "" != $(I).find(".blog-page .empty").html() &&
            $(".pagination-ajax").hide();
        },
        error: function() {
          $(".pagination-ajax").hide();
        }
      });
    }
    function C() {
      (S = $(".posts").masonry({
        itemSelector: ".post"
      })), S.imagesLoaded().progress(function() {
        S.masonry("layout");
      });
    }
    if ($("body").hasClass("templateBlog")) {
      var S = {};
      $(".posts").hasClass("posts-grid") && C(), $(
        "#load-more"
      ).click(function() {
        var T = $(this).attr("data-page");
        $.ajax({
          url: location.href,
          type: "get",
          dataType: "html",
          data: { page: T },
          beforeSend: function() {
            $("#load-more").button("loading");
          },
          complete: function() {
            $("#load-more").button("reset");
          },
          success: function(I) {
            return "" == I
              ? void $(".pagination-ajax").fadeOut()
              : ($(".posts").hasClass("posts-grid")
                  ? ($(".posts").append($(I).find(".posts").html()), $(".posts")
                      .masonry("reloadItems")
                      .masonry({
                        sortBy: "original-order"
                      }), setTimeout(function() {
                      $(".posts")
                        .masonry("reloadItems")
                        .masonry({ sortBy: "original-order" });
                    }, 500))
                  : $(".posts").append($(I).find(".posts").html()), $(
                  "#load-more"
                ).attr("data-page", parseInt(++T)), void y(T));
          }
        });
      });
    }
  },
  handleCompare: function() {
    "1" == window.compare &&
      (roar.handleCompareEvent(), roar.autoloadCompare(), roar.handleCompareScroll());
  },
  handleCompareEvent: function() {
    var y = $("body"), C = $("a.add_to_compare");
    y.on("click", "a.add_to_compare", function() {
      var T = $(this),
        I = T.data("pid"),
        P = "",
        z = RoarCookie.cookie.rtread("rt-compare");
      if (
        ((z = null != z && "" != z ? z.split(",") : []), 0 > z.indexOf(I) &&
          !1 === $(this).hasClass("added"))
      ) {
        z.push(I);
        var A = z.join(",");
        "," == A.substring(0, 1) &&
          (A = A.substring(1)), RoarCookie.cookie.rtwrite("rt-compare", A);
      }
      !1 === $(this).hasClass("added") || "" == P
        ? ((P = ""), $.ajax({
            url: "/search?view=compare&q=" + z,
            dataType: "html",
            type: "GET",
            success: function(N) {
              P = N;
            },
            error: function() {
              console.log("ajax error");
            },
            complete: function() {
              $.magnificPopup.open({
                items: { src: P, type: "inline" },
                preloader: !0,
                tLoading: "",
                mainClass: "quickview compareview",
                removalDelay: 200,
                gallery: { enabled: !0 },
                callbacks: {
                  open: function() {
                    $('[data-pid="' + I + '"]')
                      .addClass("added")
                      .attr(
                        "title",
                        $('[data-pid="' + I + '"]').attr("data-added")
                      ), $('[data-pid="' + I + '"]')
                      .find("span")
                      .html(
                        $('[data-pid="' + I + '"]').attr("data-add")
                      ), window.show_multiple_currencies &&
                      roar.currenciesCallbackSpecial(
                        ".compare-content span.money"
                      ), roar.handleReviews(), roar.handleCompareScroll();
                  }
                }
              });
            }
          }))
        : $.ajax({
            url: "/search?view=compare&q=" + z,
            dataType: "html",
            type: "GET",
            success: function(N) {
              P = N;
            },
            error: function() {
              console.log("ajax error");
            },
            complete: function() {
              $.magnificPopup.open({
                items: { src: P, type: "inline" },
                preloader: !0,
                tLoading: "",
                mainClass: "quickview compareview",
                removalDelay: 200,
                gallery: { enabled: !0 },
                callbacks: {
                  open: function() {
                    window.show_multiple_currencies &&
                      roar.currenciesCallbackSpecial(
                        ".compare-content span.money"
                      ), roar.handleReviews(), roar.handleCompareScroll();
                  }
                }
              });
            }
          });
    }), y.on("click", ".remove_from_compare", function(T) {
      T.preventDefault();
      var I = $(this), P = I.attr("data-rev"), z = $(".compare-content");
      $('[data-pid="' + P + '"]')
        .removeClass("added")
        .attr(
          "title",
          $('[data-pid="' + P + '"]').attr("data-add")
        ), $('[data-pid="' + P + '"]').find("span").html($('[data-pid="' + P + '"]').attr("data-add"));
      var A = decodeURI(RoarCookie.cookie.rtread("rt-compare"));
      null != A && (A = A.split(",")), (A = jQuery.grep(A, function(N) {
        return N != P;
      })), (A = $.trim(
        A
      )), RoarCookie.cookie.rtwrite("rt-compare", A), $(".fastor_" + P).remove(), 0 >= A.length && $(".mfp-close").trigger("click");
    });
  },
  autoloadCompare: function() {
    if (0 != parseInt(theme.compare)) {
      var y = RoarCookie.cookie.rtread("rt-compare");
      null == y
        ? (y = [])
        : ((y = y.split(",")), y.map(function(C) {
            $('[data-pid="' + C + '"]')
              .addClass("added")
              .attr(
                "title",
                $('[data-pid="' + C + '"]').attr("data-added")
              ), $('[data-pid="' + C + '"]').find("span").html($('[data-pid="' + C + '"]').attr("data-added"));
          }));
    }
  },
  handleCompareScroll: function() {
    jQuery("#be_compare_features_table").on("scroll", function() {
      var y = jQuery(this).parent();
      jQuery(this).scrollLeft() + jQuery(this).innerWidth() >=
        jQuery(this)[0].scrollWidth
        ? y.hasClass("scroll-right") && y.removeClass("scroll-right")
        : 0 === jQuery(this).scrollLeft()
            ? y.hasClass("scroll-left") && y.removeClass("scroll-left")
            : (!y.hasClass("scroll-right") &&
                y.addClass("scroll-right"), !y.hasClass("scroll-left") &&
                y.addClass("scroll-left"));
    }), (be_compare_container = document.getElementById(
      "be_compare_features_table"
    )), null !== be_compare_container &&
      be_compare_container.offsetWidth < be_compare_container.scrollWidth &&
      !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") &&
      jQuery("#be_compare_features_table_inner").addClass(
        "scroll-right"
      ), jQuery(window).on("resize", function() {
      roar.be_compare_products_table_shadows();
    }), jQuery("#be_compare_features_table_inner").hasClass("scroll-left") ||
      jQuery("#be_compare_features_table_inner").hasClass("scroll-right")
      ? $(".compareview").addClass("no-flex")
      : $(".compareview").removeClass("no-flex");
  },
  be_compare_products_table_shadows: function() {
    be_compare_container = document.getElementById("be_compare_features_table");
    null === be_compare_container ||
      (be_compare_container.offsetWidth < be_compare_container.scrollWidth
        ? !jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-right"
          ) &&
            jQuery("#be_compare_features_table_inner").addClass("scroll-right")
        : (jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-right"
          ) &&
            jQuery("#be_compare_features_table_inner").removeClass(
              "scroll-right"
            ), jQuery("#be_compare_features_table_inner").hasClass(
            "scroll-left"
          ) &&
            jQuery("#be_compare_features_table_inner").removeClass(
              "scroll-left"
            )), jQuery("#be_compare_features_table_inner").hasClass(
        "scroll-left"
      ) || jQuery("#be_compare_features_table_inner").hasClass("scroll-right")
        ? $(".compareview").addClass("no-flex")
        : $(".compareview").removeClass("no-flex"));
  },
  removeToWishlist: function() {
    $(document).on("click", ".remove-wishlist", function(y) {
      y.preventDefault();
      var C = $(this), S = C.closest("form"), T = { action: "remove_wishlist" };
      return (T = S.serialize() + "&" + $.param(T)), $.ajax({
        type: "POST",
        url: "/a/wishlist",
        async: !0,
        cache: !1,
        data: T,
        dataType: "json",
        beforeSend: function() {
          $(".page-wishlist").addClass("is_loading");
        },
        error: function(I) {
          console.log(I), $(".page-wishlist").removeClass("is_loading");
        },
        success: function(I) {
          1 == I.code
            ? C.closest(".item").slideUp("fast", function() {
                C.closest(
                  ".item"
                ).remove(), $(".page-wishlist .infos").removeClass("hide"), $(".wishlist_items_number").text(I.json), 0 == I.json && $(".wishlist-empty").removeClass("hide");
              })
            : (alert(I.json), console.log(I.json)), $(
            ".page-wishlist"
          ).removeClass("is_loading");
        }
      }), !1;
    });
  },
  addToWishlist: function() {
    $(document).on("click", ".add-to-wishlist:not(.added)", function() {
      if ($(this).hasClass("need-login")) {
        var C = $("#wishlist_error").html();
        return $.notify(
          { message: C, target: "_blank" },
          {
            type: "info",
            showProgressbar: !0,
            z_index: 2031,
            mouse_over: "pause",
            placement: { from: "top", align: window.rtl ? "left" : "right" }
          }
        ), !1;
      }
      var S = $(this), T = S.closest("form"), I = { action: "add_wishlist" };
      return (I = T.serialize() + "&" + $.param(I)), $.ajax({
        type: "POST",
        url: "/a/wishlist",
        async: !0,
        cache: !1,
        data: I,
        dataType: "json",
        beforeSend: function() {
          S.hasClass("btooltip")
            ? S.addClass("loading")
            : S.attr("title", S.attr("data-loading-text"))
                .find("span")
                .text(S.attr("data-loading-text"));
        },
        complete: function() {
          S.hasClass("btooltip") && S.removeClass("loading"), $(
            ".wishlist" + S.prev().val()
          )
            .attr("title", S.attr("data-added"))
            .addClass("added")
            .find("span")
            .text(S.attr("data-added"));
        },
        error: function(P) {
          var z = (i = $.parseJSON(P.responseText)),
            A = z.message + ": " + z.description;
          $.notify(
            { message: A, target: "_blank" },
            {
              type: "info",
              showProgressbar: !0,
              z_index: 2031,
              mouse_over: "pause",
              placement: { from: "top", align: window.rtl ? "left" : "right" }
            }
          );
        },
        success: function() {
          var P = S.closest(".product"),
            z = [
              {
                product_url: P.find(".name a").attr("href"),
                product_name: P.find(".name a").text()
              }
            ];
          $.notify(
            {
              message: $("<div>")
                .append($("#wishlist_success").tmpl(z).clone())
                .html(),
              target: "_blank"
            },
            {
              type: "success",
              showProgressbar: !0,
              z_index: 2031,
              mouse_over: "pause",
              placement: { from: "top", align: window.rtl ? "left" : "right" }
            }
          );
        }
      }), !1;
    });
  },
  addToCart: function() {
    "direct" != window.shopping_cart_type &&
      $(document).on("click", ".add-to-cart:not(.disabled)", function() {
        var y = $(this), S = y.closest("form");
        return $.ajax({
          type: "POST",
          url: "/cart/add.js",
          async: !0,
          cache: !1,
          data: S.serialize(),
          dataType: "json",
          beforeSend: function() {
            y.hasClass("btooltip")
              ? y.addClass("loading")
              : y.button("loading") &&
                  $("#filter-addtocart span").text(
                    y.attr("data-loading-text")
                  ) &&
                  $("#filter-addtocart").addClass("active");
          },
          complete: function() {
            y.hasClass("btooltip")
              ? y.removeClass("loading")
              : y.button("reset") &&
                  $("#filter-addtocart").removeClass("active");
          },
          error: function(T) {
            roar.updateCart(T, !1);
          },
          success: function(T) {
            roar.updateCart(T, !0);
          }
        }).done(function() {}), !1;
      });
  },
  updateCart: function(y, C) {
    if (!0 == C)
      $.ajax({
        url: "/search?view=cart&q=" +
          y.handle +
          "_" +
          y.variant_id +
          "_" +
          y.quantity +
          "_" +
          y.price,
        beforeSend: function() {},
        
        success: function(result) {
          var cart_block = "div#cart_block",
              cart_popup = "div#cart_popup",
              cart_mobile = ".mobile-nav-cart",
              cart_footer = "#filter-cart";
			foo = result;
          $(cart_block).html($(result).filter(cart_block).html());
          $(cart_popup).html($(result).filter(cart_popup).html());
          $(cart_mobile).html($(result).filter(cart_mobile).html());
          $(cart_footer).html($(result).filter(cart_footer).html());
          window.show_multiple_currencies &&
            (roar.currenciesCallbackSpecial(
            "#cart_popup span.money"
          ), roar.currenciesCallbackSpecial("#cart_block span.money"));
          roar.handleReviews();

        },
        error: function(T) {
          console.log(T);
        }
      }).done(function() {
        if ("ajax_notify" == window.shopping_cart_type) {
          var T = [{ product_url: y.url, product_name: y.title }];
          $.notify(
            {
              message: $("<div>")
                .append($("#cart_success").tmpl(T).clone())
                .html(),
              target: "_blank"
            },
            {
              type: "success",
              showProgressbar: !0,
              z_index: 2031,
              mouse_over: "pause",
              placement: { from: "top", align: window.rtl ? "left" : "right" }
            }
          );
        } else roar.popupCart(C);
      });
    else {
      var S = $.parseJSON(y.responseText);
      $.ajax({
        url: "/search?view=cart_error&q=" + S.description,
        beforeSend: function() {},
        success: function(T) {
          var I = "div#cart_error_popup";
          $(I).html($(T).filter(I).html());
        },
        error: function(T) {
          console.log(T);
        }
      }).done(function() {
        if ("ajax_notify" == window.shopping_cart_type) {
          var T = (i = $.parseJSON(y.responseText)),
            I = T.message + ": " + T.description;
          $.notify(
            { message: I, target: "_blank" },
            {
              type: "info",
              showProgressbar: !0,
              z_index: 2031,
              mouse_over: "pause",
              placement: { from: "top", align: window.rtl ? "left" : "right" }
            }
          );
        } else roar.popupCart(C);
      });
    }
  },
  removeCart: function() {
    $(document).on("click", ".mini-cart-info .remove a", function(y) {
      y.preventDefault();
      var C = $(this), S = C.attr("data-id");
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&id=" + S,
        dataType: "json",
        beforeSend: function() {
          $("#cart_content").addClass("loading");
        },
        success: function() {
          $.ajax({
            url: "/search?view=cart",
            beforeSend: function() {},
            success: function(I) {
              var P = "div#cart_block";
              $(P).html(
                $(I).filter(P).html()
              ), window.show_multiple_currencies &&
                roar.currenciesCallbackSpecial("#cart_block span.money");
            },
            error: function(I) {
              console.log(I);
            }
          }).done(function() {
            $("#cart_content").removeClass("loading");
          });
        },
        error: function(I, P) {
          Shopify.onError(I, P), $("#cart_content").removeClass("loading");
        }
      });
    });
  },
  popupCart: function(y) {
    !0 == y
      ? $.magnificPopup.open({
          items: { src: "#cart_popup", type: "inline" },
          tLoading: "",
          mainClass: "popup-module mfp-with-zoom popup-type-1",
          removalDelay: 200,
          callbacks: {
            open: function() {
              $("#cart_popup .continue-shopping").unbind("click"), $(
                "#cart_popup .continue-shopping"
              ).click(function(C) {
                C.preventDefault(), $.magnificPopup.close();
              });
            }
          }
        })
      : $.magnificPopup.open({
          items: { src: "#cart_error_popup", type: "inline" },
          tLoading: "",
          mainClass: "popup-module mfp-with-zoom popup-type-1",
          removalDelay: 200
        });
  },
  handlePopups: function() {
    function y() {
      if (
        (0 == window.popup_mailchimp_expire
          ? $("#popup-mailchimp .dont-show-me").change(function() {
              $(this).is(":checked") ? C() : S();
            })
          : 1 == window.popup_mailchimp_expire && S(), !T())
      ) {
        var I = parseInt(window.popup_mailchimp_delay, 20),
          P = parseInt(window.popup_mailchimp_close, 20);
        setTimeout(function() {
          $.magnificPopup.open({
            items: { src: "#popup-mailchimp", type: "inline" },
            tLoading: "",
            mainClass: "popup-module mfp-with-zoom popup-type-1",
            removalDelay: 200
          }), 0 < P &&
            setTimeout(function() {
              $.magnificPopup.close();
            }, P);
        }, I), 2 == window.popup_mailchimp_expire && C();
      }
      var z = $("#mc-form"), A = z.attr("action");
      z.ajaxChimp({ url: A, callback: function() {} });
    }
    function C() {
      try {
        var I = parseInt(window.popup_mailchimp_period);
        0 >= I && (I = 1);
        var P = "domain=." + document.domain, N = new Date();
        N.setTime(N.getTime() + 1e3 * (60 * (60 * (24 * I))));
        var L = "; expires=" + N.toGMTString();
        document.cookie =
          "popup-module-mailchimp" + "=" + "true" + L + "; path=/; " + P;
      } catch (M) {
        console.log(M.message);
      }
    }
    function S() {
      try {
        var I = "domain=." + document.domain;
        document.cookie =
          "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " +
          I;
      } catch (P) {
        console.log(P.message);
      }
    }
    function T() {
      try {
        var I = "popup-module-mailchimp";
        if (0 < document.cookie.length) {
          var P = document.cookie.indexOf(I + "=");
          if (-1 != P) {
            P = P + I.length + 1;
            var z = document.cookie.indexOf(";", P);
            return -1 == z && (z = document.cookie.length), unescape(
              document.cookie.substring(P, z)
            );
          }
        }
      } catch (A) {
        console.log(A.message);
      }
    }
    $("#popup-mailchimp").length &&
      ($("#popup-mailchimp").hasClass("hidden-xs")
        ? 768 <= roar.getWidthBrowser() && y()
        : y());
  },
  handleVerticalMenu: function() {
    $(".category_trigger").click(function() {
      (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) &&
        ($(".shop_category").hasClass("is_open")
          ? ($(".shop_category").removeClass("is_open"), $(
              ".shop_category .submenu-group"
            ).slideUp())
          : ($(".shop_category").addClass("is_open"), $(
              ".shop_category .submenu-group"
            ).slideDown()));
    }), $(".shop_category .has-children>span>.fa").click(function() {
      var y = $(this).closest(".menu-item"), C = y.find(".submenu");
      (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) &&
        (y.hasClass("is_open")
          ? (y.removeClass("is_open"), C.slideUp())
          : (y.addClass("is_open"), C.slideDown()));
    });
  },
  handleQuickshop: function(y) {
    var y = y || "body", C = "";
    return $(y).find(".quickview .quick_view").magnificPopup({
      type: "ajax",
      preloader: !0,
      tLoading: "",
      mainClass: "quickview",
      removalDelay: 200,
      gallery: { enabled: !1 },
      callbacks: {
        open: function() {
          0 < $("#main").next(".product-360-view-wrapper").length &&
            $("#main").next(".product-360-view-wrapper").remove();
        },
        ajaxContentAdded: function() {
          roar.handleReviews();
          var S = new theme.Sections();
          S.register(
            "product-quickview-template",
            theme.Product
          ), roar.initCountdown(), window.show_multiple_currencies &&
            roar.currenciesCallback(
              "#ProductSection-product-quickview-template .money"
            ), Shopify.PaymentButton.init();
          var T = $(".quickview").find(".add-to-wishlist");
          T.attr("title", T.attr("data-added"))
            .addClass("added")
            .find("span")
            .text(T.attr("data-added"));
        },
        beforeClose: function() {
          0 < $(".quickview._reopen").length &&
            "" != $(".quickview._reopen").data("_qid") &&
            (C = $(".quickview._reopen").data("_qid"));
        },
        afterClose: function() {
          "" != C && ($(C).trigger("click"), (C = ""));
        }
      }
    }), !1;
  },
  mapClearFilter: function() {
    $(".mfilter-box .column").each(function() {
      var y = $(this);
      0 < y.find("input:checked").length &&
        y.find(".clear").on("click", function(C) {
          var S = [];
          Shopify.queryParams.constraint &&
            (S = Shopify.queryParams.constraint.split(
              "+"
            )), y.find("input:checked").each(function() {
            var T = $(this), I = T.val();
            if (I) {
              var P = S.indexOf(I);
              0 <= P && S.splice(P, 1);
            }
          }), S.length
            ? (Shopify.queryParams.constraint = S.join("+"))
            : delete Shopify.queryParams
                .constraint, roar.filterAjaxClick(), C.preventDefault();
        });
    });
  },
  mapSingleFilter: function() {
    $(
      "body"
    ).on("change", ".advanced-filter .field:not(.disable) input", function() {
      var y = $(this).parent(), C = $(this).val(), S = [];
      if (
        (Shopify.queryParams.constraint &&
          (S = Shopify.queryParams.constraint.split(
            "+"
          )), !window.enable_filter_multiple_choice && !y.hasClass("active"))
      ) {
        var T = y.parents(".advanced-filter").find(".active");
        0 < T.length &&
          T.each(function() {
            var P = $(this).data("handle");
            if (($(this).removeClass("active"), P)) {
              var z = S.indexOf(P);
              0 <= z && S.splice(z, 1);
            }
          });
      }
      if (C) {
        var I = S.indexOf(C);
        0 > I
          ? (S.push(C), y.addClass("active"))
          : (S.splice(I, 1), y.removeClass("active"));
      }
      S.length
        ? (Shopify.queryParams.constraint = S.join("+"))
        : delete Shopify.queryParams.constraint, roar.filterAjaxClick();
    });
  },
  mapSingleCollection: function() {
    $("body").on("click", ".advanced-collection .field", function(y) {
      var C = $(this), S = C.attr("href");
      C.hasClass("active") ||
        (roar.filterAjaxClick(S), $(".advanced-collection .field").removeClass(
          "active"
        ), C.addClass("active"), y.preventDefault());
    });
  },
  mapSingleSort: function() {
    $("body").on("change", ".advanced-sortby .field", function(y) {
      var C = $(this), S = C.val();
      (Shopify.queryParams.sort_by = S), roar.filterAjaxClick(), y.preventDefault();
    });
  },
  mapSingleLimit: function() {
    $("body").on("change", ".advanced-limit .field", function(y) {
      var C = $(this), S = C.val();
      (Shopify.queryParams.view = S), roar.filterAjaxClick(), y.preventDefault();
    });
  },
  mapSinglePagination: function() {
    $(
      "body"
    ).on("click", "#mfilter-content-container .advanced-pagination a", function(
      y
    ) {
      var C = $(this);
      delete Shopify.queryParams.page, delete Shopify.queryParams
        .constraint, delete Shopify.queryParams.q, delete Shopify.queryParams
        .sort_by, roar.filterAjaxClickPaging(
        C.attr("href")
      ), y.preventDefault();
    });
  },
  mapFilters: function() {
    roar.handleGridList(), roar.handleShopView(), roar.mapPagination();
  },
  mapPaginationCallback: function() {
    roar.handleGridList(), roar.handleShopView(), roar.handleQuickshop(), roar.handleReviews(), roar.initCountdown(), roar.initProductQuickShopItem(
      "#mfilter-content-container"
    ), roar.initLazyLoading("#sandbox", !0), window.show_multiple_currencies &&
      roar.currenciesCallback("#sandbox span.money");
  },
  mapPagination: function() {
    if (
      ($(document.body).on("click", ".fastor_ajax_load_button a", function(C) {
        if ((C.preventDefault(), $(".pagination a.next").length)) {
          $(".fastor_ajax_load_button a").attr("data-processing", 1);
          var S = $(".pagination a.next").attr("href"),
            T = $(".fastor_ajax_load_button a").attr("data-loading-items"),
            I = $(".fastor_ajax_load_button a").attr("data-no-more");
          $(".fastor_ajax_load_button").hide(), $(".pagination").before(
            '<div class="fastor_ajax_load_more_loader animated fadeIn"><a href="#"><i class="icon-px-outline-load"></i>&nbsp;&nbsp;<span>' +
              T +
              "</span></a></div>"
          ), $.get(S, function(P) {
            $(".advanced-pagination").html(
              $(P).find(".advanced-pagination").html()
            ), $(P).find(".product-list .product").each(function() {
              $(".product-list .product:last").after($(this));
            }), $(P).find(".product-grid .product-item").each(function() {
              $(".product-grid .product-item:last").after($(this));
            }), roar.mapPaginationCallback(), $(".fastor_ajax_load_more_loader").fadeOut("slow"), $(".fastor_ajax_load_button").fadeIn("slow"), $(".fastor_ajax_load_button a").attr("data-processing", 0), 0 == $(".pagination a.next").length && ($(".fastor_ajax_load_button").addClass("finished").removeClass("fastor_ajax_load_more_hidden"), $(".fastor_ajax_load_button a").show().html(I).addClass("disabled"));
          });
        } else {
          var I = $(".fastor_ajax_load_button a").attr("data-no-more");
          $(".fastor_ajax_load_button")
            .addClass("finished")
            .removeClass("fastor_ajax_load_more_hidden"), $(
            ".fastor_ajax_load_button a"
          )
            .show()
            .html(I)
            .addClass("disabled");
        }
      }), $(".fastor_ajax_load_button").hasClass(
        "fastor_ajax_load_more_hidden"
      ))
    ) {
      var y = Math.abs(0);
      $(window).scroll(function() {
        if ($(".products").length) {
          var C = $(".products").offset().top + $(".products").outerHeight(),
            S = C - $(window).scrollTop();
          S - y < $(window).height() &&
            0 == $(".fastor_ajax_load_button a").attr("data-processing") &&
            $(".fastor_ajax_load_button a").trigger("click");
        }
      });
    }
  },
  filterCreateUrl: function(y) {
    var C = $.param(Shopify.queryParams).replace(/%2B/g, "+");
    return y ? "" == C ? y : y + "?" + C : location.pathname + "?" + C;
  },
  updateQueryStringParameter: function(y, C, S) {
    var T = new RegExp("([?&])" + C + "=.*?(&|$)", "i"),
      I = -1 === y.indexOf("?") ? "?" : "&";
    return y.match(T)
      ? y.replace(T, "$1" + C + "=" + S + "$2")
      : y + I + C + "=" + S;
  },
  filterCreateUrlPaging: function(y) {
    var C = 1, S = y.split("page=");
    return 1 < S.length &&
      (C = parseInt(S[1])), roar.updateQueryStringParameter(
      window.location.href,
      "page",
      C
    );
  },
  filterAjaxClick: function(y) {
    delete Shopify.queryParams.page;
    var C = roar.filterCreateUrl(y);
    roar.filterGetContent(C);
  },
  filterAjaxClickPaging: function(y) {
    delete Shopify.queryParams.page;
    var C = roar.filterCreateUrlPaging(y);
    roar.filterGetContent(C);
  },
  filterGetContent: function(y) {
    $.ajax({
      type: "get",
      url: y,
      beforeSend: function() {
        roar.destroyCountdown(), $("body")
          .addClass("is_loading")
          .removeClass("open_filter");
      },
      success: function(C) {
        var S = C.match("<title>(.*?)</title>")[1];
        $(C).find(".breadcrumb-content").length &&
          $(".breadcrumb-content").html(
            $(C).find(".breadcrumb-content").html()
          ), $(".category-info").remove(), $(C).find(".category-info").length &&
          $("#mfilter-content-container").prepend(
            $(C).find(".category-info")
          ), $("#sandbox").empty().html($(C).find("#sandbox").html()), $(
          ".mfilter-box .mfilter-content"
        )
          .empty()
          .html($(C).find(".mfilter-box .mfilter-content").html()), $(
          "#mfilter-content-container .advanced-pagination"
        )
          .empty()
          .html(
            $(C).find("#mfilter-content-container .advanced-pagination").html()
          ), $(".page-top")
          .empty()
          .html($(C).find(".page-top").html()), History.pushState(
          { param: Shopify.queryParams },
          S,
          y
        ), setTimeout(function() {
          $("html,body").animate(
            { scrollTop: $("body #sandbox").offset().top },
            500,
            "swing"
          );
        }, 100), $("body").removeClass(
          "is_loading"
        ), roar.mapClearFilter(), roar.handleQuickshop(), roar.handleReviews(), roar.initCountdown(), roar.initProductQuickShopItem(
          "#mfilter-content-container"
        ), roar.initFilterSidebar(), roar.initLazyLoading(
          "#sandbox",
          !0
        ), window.show_multiple_currencies &&
          roar.currenciesCallback("#sandbox span.money");
      },
      error: function() {
        $("body").removeClass("is_loading");
      }
    });
  },
  handleReviews: function() {
    "undefined" != typeof SPR &&
      (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
  },
  convertToSlug: function(y) {
    return y
      .toLowerCase()
      .replace(/[^\w\u00C0-\u024f]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },
  getWidthBrowser: function() {
    var y;
    return "number" == typeof window.innerWidth
      ? (y = window.innerWidth)
      : document.documentElement &&
          (document.documentElement.clientWidth ||
            document.documentElement.clientHeight)
          ? (y = document.documentElement.clientWidth)
          : document.body &&
              (document.body.clientWidth || document.body.clientHeight) &&
              (y = document.body.clientWidth), y;
  },
  handleScrollToTop: function() {
    $(window).scroll(function() {
      if (767 < $(window).width()) {
        let y = $(this).scrollTop(), C = $(this).height(), S = 1;
        0 < y && (S = y + C / 2);
        let T = $("#scroll-top");
        1e3 > S ? T.removeClass("on") : T.addClass("on");
      } else {
        let y = $(this).scrollTop(),
          C =
            $("#shopify-section-mobile-nav").offset().top +
            $("#shopify-section-mobile-nav").height(),
          S = $("#widgets");
        C > y ? S.removeClass("on") : S.addClass("on");
      }
    }), $("#scroll-top").click(function(y) {
      y.preventDefault(), $("html,body").animate({ scrollTop: 0 }, 800, "swing");
    });
  },
  handleGMap: function() {
    $("#contact_map").length &&
      $().gMap &&
      $("#contact_map").gMap({
        zoom: 17,
        scrollwheel: !1,
        maptype: "ROADMAP",
        markers: [
          {
            address: window.contact_map_address,
            html: "_address",
            icon: { iconsize: [188, 68], iconanchor: [0, 68] }
          }
        ]
      });
  },
  handleGridList: function() {
    $(document).on("click", "#grid", function() {
      $("#mfilter-content-container").removeClass("list").addClass("grid");
    }), $(document).on("click", "#list", function() {
      $("#mfilter-content-container")
        .removeClass("grid")
        .addClass(
          "list"
        ), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1");
    });
  },
  handleShopView: function() {
    var y, C;
    0 < $("#mfilter-content-container .shop__view").length &&
      ($("#mfilter-content-container .shop__view").unbind("click"), $(
        "#mfilter-content-container .shop__view"
      ).on("click", function() {
        (y =
          "flex-view-1 flex-view-" +
          $("#mfilter-content-container .shop__view.active").data(
            "per_row"
          )), !$(this).hasClass("active") && ("grid" == $(this).data("view") ? ((C = "flex-view-" + $(this).data("per_row")), $(document.body).removeClass("flex-view-1 flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass(C), $("#mfilter-content-container").removeClass("list").addClass("grid")) : ($("#mfilter-content-container").removeClass("grid").addClass("list"), $("body").removeClass("flex-view-2 flex-view-3 flex-view-4 flex-view-6").addClass("flex-view-1")), $("#mfilter-content-container .shop__view").removeClass("active"), $(this).addClass("active")), roar.initLazyLoading();
      }));
  },
  handleSearch: function() {
    $(
      ".button-search, .header-type-3 #top .search_form, .header-type-8 .search_form"
    ).bind("click", function() {
      $(this).closest("form").submit();
    });
  },
  handleSmoothScroll: function() {
    $(document).on("click", ".smoothscroll", function(y) {
      y.preventDefault();
      var C = $(this).attr("href");
      $(C).trigger("click"), setTimeout(function() {
        $("html,body").animate(
          { scrollTop: $(C).offset().top - 100 },
          800,
          "swing"
        );
      }, 300);
    });
  },
  handleOrder: function() {
    $(".orderable").each(function(y, C) {
      var S = $(C).children("div[data-order]");
      S.sort(function(T, I) {
        return +$(T).data("order") - +$(I).data("order");
      }), S.appendTo(C);
    });
  },
  handleDropdown: function() {
    $("[data-toggle='dropdown']").on("click", function() {
      $(this).parent().toggleClass("open");
    });
  }
},
  roarLookbook = {
    getSizedImageUrl: function(y, C) {
      var S = document.createElement("a");
      if (((S.href = y), "cdn.shopify.com" != S.hostname)) return y;
      if (null == C) return y;
      if ("master" == C) return roarLookbook.removeProtocol(y);
      var T = y.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
      if (null != T) {
        var S = y.split(T[0]), I = T[0];
        return roarLookbook.removeProtocol(S[0] + "_" + C + I);
      }
      return null;
    },
    removeProtocol: function(y) {
      return y.replace(/http(s)?:/, "");
    },
    isProductUrl: function(y) {
      var C = window.location.hostname, S = document.createElement("a");
      return (S.href = y), console.log(C), console.log(
        S.hostname
      ), S.hostname == C;
    },
    buildLookbook: function() {
      $(".roarlookbook").each(function(y) {
        var C = $(this);
        if (!C.hasClass("roarlookbook_init")) {
          var S = C.attr("data-lookbook"),
            T = { lookbook: S, action: "lookbook_get" };
          (T = $.param(T)), $.ajax({
            type: "POST",
            url: "/apps/roarlookbook",
            async: !0,
            cache: !1,
            data: T,
            dataType: "json",
            beforeSend: function() {},
            error: function() {},
            success: function(I) {
              C.append(I);
              var P = C.find(".media__blank-preview");
              P.imagesLoaded(function() {
                C.addClass("roarlookbook_init").attr(
                  "data-lookbook",
                  S + y
                ), P.addClass("sfx-fadeIn");
              });
            }
          });
        }
      });
    },
    resetHotspots: function(y) {
      var C = $(".hotspot", y), S = y.attr("data-lookbook");
      C.each(function() {
        var T = $(this), I = T.attr("data-id"), P = $("#" + S + "-" + I, y);
        P.fadeOut("fast", function() {
          P.remove(), T.removeClass("hotspot_init");
        });
      });
    },
    hotspotPopup: function() {
      $(".roarlookbook").on("click", ".hotspot", function() {
        var C = $(this);
        if (!C.hasClass("hotspot_init")) {
          var S = C.closest(".roarlookbook"),
            T = C.attr("data-id"),
            I = C.closest(".roarlookbook").attr("data-lookbook") + "-" + T,
            P =
              "#" + C.closest(".roarlookbook").attr("data-lookbook") + "-" + T,
            z = C.attr("data-title"),
            A = C.attr("data-image"),
            N = C.attr("data-price"),
            L = C.attr("data-url"),
            M = "";
          if ("" == z && "" == L) return !1;
          if (
            (roarLookbook.resetHotspots(S), (M +=
              '<div id="' +
              I +
              '" class="hotspot-widget hotspot-loading">'), (M +=
              '<div class="hotspot-content">'), (M +=
              '<span class="hotspot-close">\xD7</span>'), (M +=
              '<div class="hotspot-inner">'), "" != A)
          ) {
            var O =
              '<img src="' +
              roarLookbook.getSizedImageUrl(A, "80x") +
              '" src="' +
              roarLookbook.getSizedImageUrl(A, "300x") +
              '" data-srcset="' +
              roarLookbook.getSizedImageUrl(A, "300x") +
              " 1x, " +
              roarLookbook.getSizedImageUrl(A, "600x") +
              ' 2x" alt="" />';
            M += "" == L ? O : '<a href="' + L + '">' + O + "</a>";
          }
          if (
            ("" != z &&
              ((M += "<h3>"), (M += "" == L
                ? z
                : '<a href="' + L + '">' + z + "</a>"), (M += "</h3>")), "" !=
              N &&
              ((M +=
                '<div class="price"><span class="money">' +
                N +
                "</span></div>"), roarLookbook.isProductUrl(L) &&
                ((M += '<div class="hotspot-btns">'), (M +=
                  '<div class="hotspot-btn"><a href="' +
                  L +
                  '">' +
                  theme.apps.details +
                  "</a></div>"), (M +=
                  '<div class="hotspot-btn"><a class="roar_add_to_cart" href="' +
                  L +
                  '?add-to-cart=true">' +
                  theme.apps.buyNow +
                  "</a></div>"), (M += "</div>"))), (M += "</div>"), (M +=
              "</div>"), (M += "</div>"), $(P).length || S.append(M), $(
              P
            ).imagesLoaded(function() {
              var E = $(P),
                B = C.offset().left,
                F = C.offset().top,
                D = E.outerWidth(),
                U = E.outerHeight(),
                W = S.offset().left,
                H = S.offset().top,
                V = S.outerWidth() - (B + D),
                R = "hotspot-right";
              50 > V
                ? ((B = B - D - 5), (R = "hotspot-left"))
                : (B =
                    B +
                    C.outerWidth() +
                    5), (F = F + C.outerHeight() / 2 - U / 2), E.css({ left: B - W, top: F - H }).removeClass("hotspot-left").removeClass("hotspot-right").addClass(R), C.addClass("hotspot_init"), E.removeClass("hotspot-loading").fadeIn("fast");
            }), $(P).find("img").length)
          ) {
            var q = $(P).find("img");
            q
              .attr("src", q.attr("data-src"))
              .removeAttr("data-src")
              .attr("srcset", q.attr("data-srcset"))
              .removeAttr("data-srcset");
          }
        } else {
          var S = C.closest(".roarlookbook");
          roarLookbook.resetHotspots(S);
        }
      }), $(document).on("click", ".hotspot-close", function() {
        var C = $(this),
          S = C.closest(".hotspot-widget"),
          T = S.attr("id"),
          I = T.split("-"),
          P = I[1];
        $('.roarlookbook .hotspot[data-id="' + P + '"]').removeClass(
          "hotspot_init"
        ), S.fadeOut("fast", function() {
          S.remove();
        });
      }), $(".roarlookbook").on("click", ".image-preview", function() {
        var C = $(this).closest(".roarlookbook");
        roarLookbook.resetHotspots(C);
      }), $(window).resize(function() {
        $(".roarlookbook .hotspot_init").length &&
          $(".roarlookbook .hotspot_init").each(function() {
            var C = $(this);
            C.removeClass("hotspot_init").trigger("click");
          });
      });
    },
    addToCart: function() {
      $(document).on("click", ".roar_add_to_cart", function(y) {
        y.preventDefault();
        var C = $(this), S = C.closest(".roarlookbook"), T = C.attr("href");
        $.ajax({
          type: "GET",
          url: T,
          beforeSend: function() {},
          success: function(I) {
            var P = $(I).find('form[action="/cart/add"]');
            P.appendTo(S).submit().remove();
          },
          dataType: "html"
        });
      });
    },
    init: function() {
      $(".roarlookbook").length &&
        (roarLookbook.buildLookbook(), roarLookbook.hotspotPopup(), roarLookbook.addToCart());
    }
  };
(theme.LanguagePicker = (function() {
  function y(T) {
    $(S.selector + " .goog-te-combo").val(T);
    let I = document.getElementsByClassName("goog-te-combo")[0],
      P = "change",
      z;
    document.createEvent
      ? ((z = document.createEvent("HTMLEvents")), z.initEvent(
          P,
          !0,
          !0
        ), I.dispatchEvent(z))
      : ((z = document.createEventObject()), (z.eventType = P), I.fireEvent(
          "on" + z.eventType,
          z
        ));
  }
  let S = {
    language: ".language__picker .language__switcher",
    languagePicker: ".language__picker .language",
    languageCurrent: ".language__picker .language__current",
    selector: "#weketing_google_translate_element"
  };
  return {
    init: function() {
      $(S.language).length &&
        $(S.selector).length &&
        ($(S.selector).bind("google_translate", function() {
          let T = weketingJS.settingsJS[8];
          if ("yes" == T.enable) {
            let I = T.default_language,
              P = T.custom_languages,
              z = weketingSGT.languages(),
              A = localStorage.getItem("roarStorage_language");
            for (let N = 0; N < P.length - 1; N++)
              if (P[N] == I) {
                P.pop();
                break;
              }
            for (let N = 0; N < P.length; N++)
              if (P[N] == A) {
                I = A;
                break;
              }
            for (let L, N = 0; N < P.length; N++)
              (L =
                '<li class="language active notranslate" data-code="' +
                I +
                '">' +
                z[I] +
                "</li>"), P[N] != I &&
                (L =
                  '<li class="language notranslate" data-code="' +
                  P[N] +
                  '">' +
                  z[P[N]] +
                  "</li>"), $(S.language).append(L);
            $(S.languageCurrent).text(z[I]), y(I);
          }
        }), $("body").on(
          "click",
          S.languagePicker + ":not(.active)",
          function() {
            let T = $(this).data("code");
            if ("" != T) {
              let I = $(this).text();
              $(S.languagePicker).removeClass("active"), $(
                S.languagePicker + '[data-code="' + T + '"]'
              ).addClass("active"), $(S.languageCurrent).text(
                I
              ), localStorage.setItem("roarStorage_language", T), y(T);
            }
          }
        ));
    }
  };
})()), (window.theme = window.theme || {}), (theme.Sections = function() {
  (this.constructors = {}), (this.instances = []), $(document)
    .on("shopify:section:load", this._onSectionLoad.bind(this))
    .on("shopify:section:unload", this._onSectionUnload.bind(this))
    .on("shopify:section:select", this._onSelect.bind(this))
    .on("shopify:section:deselect", this._onDeselect.bind(this))
    .on("shopify:block:select", this._onBlockSelect.bind(this))
    .on("shopify:block:deselect", this._onBlockDeselect.bind(this));
}), (theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(y, C) {
    var S = $(y),
      T = S.attr("data-section-id"),
      I = S.attr("data-section-type");
    if (((C = C || this.constructors[I]), !_.isUndefined(C))) {
      var P = _.assignIn(new C(y), { id: T, type: I, container: y });
      this.instances.push(P);
    }
  },
  _onSectionLoad: function(y) {
    var C = $("[data-section-id]", y.target)[0];
    C && this._createInstance(C), roar.initLazyLoading();
  },
  _onSectionUnload: function(y) {
    this.instances = _.filter(this.instances, function(C) {
      var S = C.id === y.originalEvent.detail.sectionId;
      return S && _.isFunction(C.onUnload) && C.onUnload(y), !S;
    });
  },
  _onSelect: function(y) {
    var C = _.find(this.instances, function(S) {
      return S.id === y.originalEvent.detail.sectionId;
    });
    !_.isUndefined(C) && _.isFunction(C.onSelect) && C.onSelect(y);
  },
  _onDeselect: function(y) {
    var C = _.find(this.instances, function(S) {
      return S.id === y.originalEvent.detail.sectionId;
    });
    !_.isUndefined(C) && _.isFunction(C.onDeselect) && C.onDeselect(y);
  },
  _onBlockSelect: function(y) {
    var C = _.find(this.instances, function(S) {
      return S.id === y.originalEvent.detail.sectionId;
    });
    !_.isUndefined(C) && _.isFunction(C.onBlockSelect) && C.onBlockSelect(y);
  },
  _onBlockDeselect: function(y) {
    var C = _.find(this.instances, function(S) {
      return S.id === y.originalEvent.detail.sectionId;
    });
    !_.isUndefined(C) &&
      _.isFunction(C.onBlockDeselect) &&
      C.onBlockDeselect(y);
  },
  register: function(y, C) {
    (this.constructors[y] = C), $("[data-section-type=" + y + "]").each(
      function(S, T) {
        this._createInstance(T, C);
      }.bind(this)
    );
  }
})), (window.slate = window.slate || {}), (theme.Images = (function() {
  return {
    preload: function(z, A) {
      "string" == typeof z && (z = [z]);
      for (var L, N = 0; N < z.length; N++)
        (L = z[N]), this.loadImage(this.getSizedImageUrl(L, A));
    },
    loadImage: function(z) {
      new Image().src = z;
    },
    switchImage: function(z, A, N) {
      var L = this.imageSize(A.src), M = this.getSizedImageUrl(z.src, L);
      N ? N(M, z, A) : (A.src = M);
    },
    imageSize: function(z) {
      var A = z.match(
        /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/
      );
      return null === A ? null : A[1];
    },
    getSizedImageUrl: function(z, A) {
      if (null == A) return z;
      if ("master" === A) return this.removeProtocol(z);
      var N = z.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
      if (null != N) {
        var L = z.split(N[0]), M = N[0];
        return this.removeProtocol(L[0] + "_" + A + M);
      }
      return null;
    },
    removeProtocol: function(z) {
      return z.replace(/http(s)?:/, "");
    }
  };
})()), (slate.Variants = (function() {
  function y(C) {
    (this.$container = C.$container), (this.product =
      C.product), (this.singleOptionSelector =
      C.singleOptionSelector), (this.originalSelectorId =
      C.originalSelectorId), (this.enableHistoryState =
      C.enableHistoryState), (this.currentVariant = this._getVariantFromOptions()), $(
      this.singleOptionSelector,
      this.$container
    ).on("change", this._onSelectChange.bind(this));
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _getCurrentOptions: function() {
      var C = _.map($(this.singleOptionSelector, this.$container), function(S) {
        var T = $(S), I = T.attr("type"), P = {};
        return "radio" === I || "checkbox" === I
          ? !!T[0].checked &&
              ((P.value = T.val()), (P.index = T.data("index")), P)
          : ((P.value = T.val()), (P.index = T.data("index")), P);
      });
      return (C = _.compact(C)), C;
    },
    _getVariantFromOptions: function() {
      var C = this._getCurrentOptions(),
        S = this.product.variants,
        T = _.find(S, function(I) {
          return C.every(function(P) {
            return _.isEqual(I[P.index], P.value);
          });
        });
      return T;
    },
    _onSelectChange: function() {
      var C = this._getVariantFromOptions();
      this.$container.trigger({ type: "variantChange", variant: C }), C &&
        (this._updateMasterSelect(C), this._updateImages(C), this._updatePrice(
          C
        ), this._updateSKU(C), (this.currentVariant = C), this
          .enableHistoryState && this._updateHistoryState(C));
    },
    _updateImages: function(C) {
      var S = C.featured_image || {},
        T = this.currentVariant.featured_image || {};
      C.featured_image &&
        S.src !== T.src &&
        this.$container.trigger({ type: "variantImageChange", variant: C });
    },
    _updatePrice: function(C) {
      (C.price === this.currentVariant.price &&
        C.compare_at_price === this.currentVariant.compare_at_price) ||
        this.$container.trigger({ type: "variantPriceChange", variant: C });
    },
    _updateSKU: function(C) {
      C.sku === this.currentVariant.sku ||
        this.$container.trigger({ type: "variantSKUChange", variant: C });
    },
    _updateHistoryState: function(C) {
      if (history.replaceState && C) {
        var S =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "?variant=" +
          C.id;
        window.history.replaceState({ path: S }, "", S);
      }
    },
    _updateMasterSelect: function(C) {
      $(this.originalSelectorId, this.$container).val(C.id);
    }
  })), y;
})()), (window.theme = window.theme || {}), (theme.Product = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.settings = {
      imageSize: null,
      namespace: ".product-page-section",
      sectionId: T,
      sliderActive: !1,
      swatch_color: S.attr("data-product_swatch_color"),
      swatch_size: S.attr("data-product_swatch_size"),
      variant_image_grouped: S.attr("data-variant_image_grouped"),
      swatch_color_advanced: S.attr("data-product_swatch_color_advanced"),
      product_design: S.attr("data-product_design"),
      product_image_count: S.data("product_image_count")
    }), (this.selectors = {
      product: "#ProductSection-" + T,
      addToCart: "#AddToCart-" + T,
      addToCartText: "#AddToCartText-" + T,
      stockText: ".stock-" + T,
      comparePrice: "#ComparePrice-" + T,
      originalPrice: "#ProductPrice-" + T,
      SKU: ".variant-sku",
      originalPriceWrapper: ".product-price__price-" + T,
      originalSelectorId: "#ProductSelect-" + T,
      productFeaturedImage: ".FeaturedImage-" + T,
      productImageWrap: "#FeaturedImageZoom-" + T,
      productPrices: ".product-single__price-" + T,
      productThumbImages: "#product-thumbnails-" + T,
      productMainImages: "#product-images-" + T,
      productPreviewMainImages: ".product-preview-images-" + T,
      saleLabel: ".product-price__sale-label-" + T,
      singleOptionSelector: ".single-option-selector-" + T,
      singleOptionSelectorId: "#single-option-selector-" + T,
      singleOptionSwatches: "wrapper-swatches-" + T,
      instagramProduct: "#product-instagram-" + T,
      instagramProductNameSpace: "product-instagram-" + T,
      variationsSelector: "#variations-" + T,
      variationSelector: ".variation-select-" + T,
      qtyVariant: ".qty-variant-" + T,
      threedId: ".threed-id-" + T,
      countDownId: ".countdown-" + T,
      couponCode: "#coupon-code-" + T,
      couponBtn: "#coupon-btn-" + T,
      sidebarSlide: ".sidebar-slick-vertical-" + T,
      optionsSelect: "#single-option-selector-" + T
    }), $("#ProductJson-" + T).html() &&
      ((this.productSingleObject = JSON.parse(
        document.getElementById("ProductJson-" + T).innerHTML
      )), (this.productSwatchSingleObject = JSON.parse(
        document.getElementById("ProductSwatchJson-" + T).innerHTML
      )), this._stringOverrides(), this._initVariants(), this._initSwatches(), this._initFeature(), this._initCompact(), this._initStickyImages(), this._initThumbnailsGallery(), this._initImages(), this._initSidebar(), this._initZoom(), this._initGallery(), this._instagramProducts(), this._initQuantity(), this._initTabs(), this._initHandleProduct(), this._initRelatedProducts(), this._initViewedProducts());
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _stringOverrides: function() {
      (theme.productStrings = theme.productStrings || {}), $.extend(
        theme.strings,
        theme.productStrings
      );
    },
    _initTabs: function() {
      $("#tabs a").tabs();
    },
    _initHandleProduct: function() {
      0 == $("#main").next("#popup-product-sizechart").length &&
        $("#main").after($("#popup-product-sizechart")), 0 ==
        $("#main").next("#popup-product-question").length &&
        $("#main").after($("#popup-product-question")), $(
        ".button-product-question"
      ).click(function() {
        var S = $(this).data("question"), T = $(this).data("_qid");
        return $.magnificPopup.open({
          items: { src: "#popup-product-question", type: "inline" },
          tLoading: "",
          mainClass: "popup-module mfp-with-zoom",
          removalDelay: 200
        }), !1, void ((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", T)));
      }), $(".button-product-sizechart").click(function() {
        var S = $(this).data("sizechart"), T = $(this).data("_qid");
        return $.magnificPopup.open({
          items: { src: S, type: "inline" },
          tLoading: "",
          mainClass: "popup-module mfp-with-zoom",
          removalDelay: 200
        }), !1, void ((0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", T)));
      }), $(document).on("click", "#tabProduct a", function(C) {
        C.preventDefault(), $(this).tab("show");
      });
    },
    _initRelatedProducts: function() {
      var C = "#myCarouselRelated .carousel-inner";
      0 < $("#myCarouselRelated.carousel").length &&
        $(C).slick({
          arrows: !1,
          slidesToShow: 4,
          responsive: [
            {
              breakpoint: 1200,
              settings: { slidesToShow: 4, slidesToScroll: 4 }
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 4, slidesToScroll: 4 }
            },
            {
              breakpoint: 550,
              settings: { slidesToShow: 2, slidesToScroll: 2 }
            }
          ],
          rtl: window.rtl
        }), $("#myCarouselRelated_next").click(function() {
        return $(C).slick("slickNext"), !1;
      }), $("#myCarouselRelated_prev").click(function() {
        return $(C).slick("slickPrev"), !1;
      }), roar.initLazyLoading(C, !0);
    },
    _initViewedProducts: function() {
      var C = RoarCookie.cookie.rtread("rt-recent"),
        S = $(".templateProduct #recently-viewed-products").data("handle"),
        T = $(".templateProduct #recently-viewed-products").data("id"),
        I = $(".templateProduct #recently-viewed-products").data("limit");
      if (null != C) {
        C = C.split(",");
        var C = C.reverse();
        if (
          (1 < C.length
            ? $("#recently-viewed-products").show()
            : C != S && $("#recently-viewed-products").show(), $.ajax({
            url: "/search?view=viewed&q=" + C + "_sp_" + T,
            dataType: "html",
            type: "GET",
            success: function(P) {
              $("#recently-viewed-products").html(P), roar.initLazyLoading(
                "#recently-viewed-products",
                !0
              ), roar.initProductQuickShopItem("#recently-viewed-products");
            },
            error: function() {
              console.log("ajax error");
            },
            complete: function() {
              var P = $("#myCarouselViewed .carousel-inner");
              P.slick({
                arrows: !1,
                slidesToShow: 4,
                responsive: [
                  {
                    breakpoint: 1200,
                    settings: { slidesToShow: 4, slidesToScroll: 4 }
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 4, slidesToScroll: 4 }
                  },
                  {
                    breakpoint: 550,
                    settings: { slidesToShow: 2, slidesToScroll: 2 }
                  }
                ],
                rtl: window.rtl
              }), $("#myCarouselViewed_next").click(function() {
                return P.slick("slickNext"), !1;
              }), $("#myCarouselViewed_prev").click(function() {
                return P.slick("slickPrev"), !1;
              }), roar.handleQuickshop("#recently-viewed-products");
            }
          }), 0 > C.indexOf(S))
        ) {
          C.length >= I && C.pop(), C.push(S);
          try {
            C = C.join(",");
          } catch (P) {}
        }
      } else C = S;
      RoarCookie.cookie.rtwrite("rt-recent", C);
    },
    _initImages: function() {
      var C = this, S = $(C.selectors.productMainImages), T = !1;
      if (
        (1 == parseInt(window.rtl) && (T = !0), "left" ==
          this.settings.product_design ||
          "bottom" == this.settings.product_design ||
          "compact2" == this.settings.product_design ||
          "split" == this.settings.product_design ||
          "sidebar" == this.settings.product_design ||
          "full-screen" == this.settings.product_design)
      ) {
        if (0 < $(C.selectors.productThumbImages).length) {
          var I = $(C.selectors.productThumbImages).find(".thumbnails");
          S.not(".slick-initialized").slick({
            rtl: T,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !1,
            asNavFor: I,
            prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
            nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>'
          });
          var P = "0" != $(C.selectors.productThumbImages).data("vertical"),
            z = 6;
          (z = 6 < this.settings.product_image_count
            ? 6
            : this.settings.product_image_count - 1), $(
            ".product-page-section"
          ).hasClass("product-has-sidebar") &&
            (3 < this.settings.product_image_count
              ? (z = 3)
              : (z = this.settings.product_image_count - 1)), I.not(
            ".slick-initialized"
          ).slick({
            slidesToShow: z,
            slidesToScroll: 1,
            asNavFor: S,
            focusOnSelect: !0,
            vertical: P,
            infinite: !1,
            prevArrow: '<span class="fa fa-angle-up slick-prev-arrow"></span>',
            nextArrow: '<span class="fa fa-angle-down slick-next-arrow"></span>',
            responsive: [
              { breakpoint: 1024, settings: { slidesToShow: 3 } },
              { breakpoint: 992, settings: { slidesToShow: 3 } },
              { breakpoint: 768, settings: { slidesToShow: 3 } }
            ]
          });
        }
      } else if ("carousel" == this.settings.product_design) {
        var A = S.width() / 4;
        S.not(".slick-initialized").slick({
          rtl: T,
          centerMode: !0,
          centerPadding: A + "px",
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
          nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>',
          responsive: [
            {
              breakpoint: 1680,
              settings: {
                centerMode: !0,
                centerPadding: "400px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 1440,
              settings: {
                centerMode: !0,
                centerPadding: "350px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 1200,
              settings: {
                centerMode: !0,
                centerPadding: "300px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 1024,
              settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "250px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 992,
              settings: {
                centerMode: !0,
                centerPadding: "200px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "125px",
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: !1,
                centerMode: !0,
                centerPadding: "50px",
                slidesToShow: 1
              }
            }
          ]
        });
      } else
        S.not(".slick-initialized").slick({
          rtl: T,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: !1,
          asNavFor: I,
          prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
          nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>'
        });
      S.imagesLoaded(function() {
        S.addClass("loaded");
      });
    },
    _initThumbnailsGallery: function() {
      var C = $(this.selectors.productMainImages);
      "gallery" == this.settings.product_design &&
        $(".thumbnail-gallery-item").on("click", function() {
          var S = $(this);
          S.hasClass("active") ||
            ($(".thumbnail-gallery-item").removeClass("active"), S.addClass(
              "active"
            ), $(".thumbnail-gallery-item").each(function(T) {
              if ($(this).attr("id") == S.attr("id"))
                return void C.slick("slickGoTo", T, !0);
            }));
        });
    },
    _initQuantity: function() {
      $(".q_up").unbind("click"), $(".q_up").on("click", function() {
        var C = $(this).data("product_id"),
          S = parseInt($(".quantity-cart-" + C).val()) + 1;
        $(".quantity-cart-" + C).val(S);
      }), $(".q_down").unbind("click"), $(".q_down").on("click", function() {
        var C = $(this).data("product_id"),
          S = parseInt($(".quantity-cart-" + C).val());
        1 < S && $(".quantity-cart-" + C).val(S - 1);
      });
    },
    _initPopup: function() {
      $(".sizechart-btn").magnificPopup({ type: "image", midClick: !0 }), $(
        ".return-btn"
      ).click(function() {
        return $.magnificPopup.open({
          items: { src: "#delivery-return", type: "inline" },
          tLoading: "",
          mainClass: "popup-wrapper mfp-with-zoom",
          removalDelay: 200
        }), !1;
      });
    },
    _initFeature: function() {
      if (
        (0 < $(this.selectors.product + " .product-video-button a").length &&
          $(this.selectors.product + " .product-video-button a").unbind(
            "click"
          ) &&
          $(this.selectors.product + " .product-video-button a").click(function(
            M
          ) {
            M.stopPropagation();
            var O = $(this).data("video"), q = $(this).data("_qid");
            $.magnificPopup.open({
              items: { src: O, type: "iframe" },
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: !1,
              disableOn: !1,
              fixedContentPos: !1,
              callbacks: {
                beforeClose: function() {
                  console.log("Popup close has been initiated");
                }
              }
            }), (0 <
              $(".quickview .mfp-content").find(".product-360-view-wrapper")
                .length ||
              0 <
                $(".quickview .mfp-content").find(".mfp-iframe-scaler")
                  .length) &&
              ($(".quickview.mfp-wrap").addClass("_reopen"), $(
                ".quickview.mfp-wrap"
              ).data("_qid", q));
          }), 0 < $(this.selectors.product + " .product-360-button a").length)
      ) {
        for (
          var N,
            S = $(this.selectors.product + " .product-360-button a").data("id"),
            T = $(this.selectors.product + " .product-360-button a").data(
              "_qid"
            ),
            I = $(this.selectors.product + " .product-360-button a"),
            P = [],
            z = JSON.parse(
              document.getElementById("threed-id-" + this.sectionId).innerHTML
            ),
            A = 1;
          72 >= A;
          A++
        )
          (N = "f" + A), z[N] && P.push(z[N]);
        if (0 < P.length) {
          var L = P.length;
          $(this.selectors.threedId).ThreeSixty({
            totalFrames: L,
            endFrame: L,
            currentFrame: 1,
            imgList: ".threed-view-images",
            progress: ".spinner",
            imgArray: P,
            height: null,
            width: null,
            responsive: !0,
            navigation: !0,
            onReady: function() {
              0 == $("#main").next(".product-360-view-wrapper").length &&
                $("#main").after($(S)), I.unbind("click") &&
                I.click(function() {
                  $.magnificPopup.open({
                    items: { src: S, type: "inline" },
                    type: "inline",
                    mainClass: "mfp-fade",
                    removalDelay: 160,
                    disableOn: !1,
                    preloader: !1,
                    fixedContentPos: !1,
                    callbacks: {
                      open: function() {
                        console.log("xx11"), $(window).resize();
                      }
                    }
                  }), $(window).resize(), (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"), $(".quickview.mfp-wrap").data("_qid", T));
                });
            }
          });
        }
      }
    },
    _initCompact: function() {
      0 < $(".product-accordions").length &&
        $(".product-accordions .tab-heading").unbind("click") &&
        $(".product-accordions .tab-heading").click(function(C) {
          C.preventDefault();
          var S = $(this),
            T = S.closest(".product-accordion"),
            I = S.closest(".product-accordions");
          T.hasClass("active")
            ? (T.removeClass("active"), T.find(".product-accordion-content")
                .stop(!0, !0)
                .slideUp())
            : (I.find(".product-accordion").removeClass("active"), T.addClass(
                "active"
              ), I.find(".product-accordion-content")
                .stop(!0, !0)
                .slideUp(), T.find(".product-accordion-content")
                .stop(!0, !0)
                .slideDown());
        });
    },
    _initStickyImages: function() {
      $("body").hasClass("fastor-product-design-sticky") &&
        $(".product-design-sticky .product-summary").stick_in_parent();
    },
    _instagramProducts: function() {
      if (0 < $("#instagram_product").length) {
        var S = $("#instagram_product").data("instagram_token"),
          T = $("#instagram_product").data("user_id"),
          I = $("#instagram_product").data("instagram_limit"),
          P = new Instafeed({
            get: "user",
            target: "instagram_product",
            accessToken: S,
            userId: T,
            limit: I,
            resolution: "thumbnail",
            resolution2: "standard_resolution",
            template: '<div class="wrap animated"><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /><span class="hover_border"></span></a></div>'
          });
        P.run();
      }
    },
    _initGallery: function() {
      (function(S) {
        function T(E, B) {
          return -1 < (" " + E.className + " ").indexOf(" " + B + " ");
        }
        for (
          var I = function(E) {
            for (
              var U,
                W,
                H,
                V,
                B = $(E).find(".photoswipe-item").get(),
                F = B.length,
                D = [],
                R = 0;
              R < F;
              R++
            )
              if (((U = B[R]), 1 === U.nodeType))
                if (
                  ((W = U.children[0]), (H = W.getAttribute("data-size").split(
                    "x"
                  )), "video" == $(W).data("type"))
                ) {
                  var G = $($(W).data("id")).html();
                  D.push({ html: G });
                } else
                  (V = {
                    src: W.getAttribute("href"),
                    w: parseInt(H[0], 10),
                    h: parseInt(H[1], 10)
                  }), 1 < U.children.length &&
                    (V.title = $(U).find(".caption").html()), 0 <
                    W.children.length &&
                    (V.msrc = W.children[0].getAttribute(
                      "src"
                    )), (V.el = U), D.push(V);
            return D;
          },
            P = function E(B, F) {
              return B && (F(B) ? B : E(B.parentNode, F));
            },
            z = function(E) {
              (E = E || window.event), E.preventDefault
                ? E.preventDefault()
                : (E.returnValue = !1);
              var B = E.target || E.srcElement,
                F = P(B, function(G) {
                  return T(G, "photoswipe-item");
                });
              if (F) {
                for (
                  var V,
                    D = F.closest(".photoswipe-wrapper"),
                    U = $(F.closest(".photoswipe-wrapper"))
                      .find(".photoswipe-item")
                      .get(),
                    W = U.length,
                    H = 0,
                    R = 0;
                  R < W;
                  R++
                )
                  if (1 === U[R].nodeType) {
                    if (U[R] === F) {
                      V = H;
                      break;
                    }
                    H++;
                  }
                return 0 <= V && N(V, D), !1;
              }
            },
            A = function() {
              var E = window.location.hash.substring(1), B = {};
              if (5 > E.length) return B;
              for (var F = E.split("&"), D = 0; D < F.length; D++)
                if (F[D]) {
                  var U = F[D].split("=");
                  2 > U.length || (B[U[0]] = U[1]);
                }
              return B.gid && (B.gid = parseInt(B.gid, 10)), B;
            },
            N = function(E, B, F, D) {
              var W, H, V, U = document.querySelectorAll(".pswp")[0];
              if (
                ((V = I(B)), (H = {
                  closeOnScroll: !1,
                  galleryUID: B.getAttribute("data-pswp-uid")
                }), !D)
              )
                H.index = parseInt(E, 10);
              else if (H.galleryPIDs) {
                for (var R = 0; R < V.length; R++)
                  if (V[R].pid == E) {
                    H.index = R;
                    break;
                  }
              } else H.index = parseInt(E, 10) - 1;
              isNaN(H.index) ||
                (F && (H.showAnimationDuration = 0), (W = new PhotoSwipe(
                  U,
                  PhotoSwipeUI_Default,
                  V,
                  H
                )), W.init(), W.listen("beforeChange", function() {
                  var G = $(W.currItem.container);
                  $(".pswp__video").removeClass("active");
                  G.find(".pswp__video").addClass("active");
                  $(".pswp__video").each(function() {
                    $(this).hasClass("active") ||
                      $(this).attr("src", $(this).attr("src"));
                  });
                }), W.listen("close", function() {
                  $(".pswp__video").each(function() {
                    $(this).attr("src", $(this).attr("src"));
                  }), $(".pswp__container .video-wrapper").empty();
                }));
            },
            L = document.querySelectorAll(S),
            M = 0,
            O = L.length;
          M < O;
          M++
        )
          L[M].setAttribute("data-pswp-uid", M + 1), (L[M].onclick = z);
        var q = A();
        q.pid && q.gid && N(q.pid, L[q.gid - 1], !0, !0);
      })(this.selectors.product + " .photoswipe-wrapper");
    },
    _initZoom: function() {
      if ($(".easyzoom").length)
        if (1024 < $(window).width())
          var C = $(".easyzoom:not(.feature-video)").easyZoom({
            loadingNotice: "",
            errorNotice: "",
            preventClicks: !1
          }),
            S = C.data("easyZoom");
        else
          $(".easyzoom a").click(function(T) {
            T.preventDefault();
          });
    },
    _initSidebar: function() {
      var C = this;
      ($sidebarSlide = $(C.selectors.sidebarSlide)), 0 < $sidebarSlide.length &&
        $sidebarSlide.each(function() {
          var S = $(this), T = $(this).data("per_view");
          $(this)
            .not(".slick-initialized")
            .slick({
              slidesToShow: T,
              slidesToScroll: 1,
              vertical: !0,
              focusOnSelect: !0,
              infinite: !1,
              prevArrow: '<span class="fa fa-angle-up slick-prev-arrow"></span>',
              nextArrow: '<span class="fa fa-angle-down slick-next-arrow"></span>'
            }), S.imagesLoaded(function() {
            S.addClass("loaded");
          });
        });
    },
    _initForceHeight: function() {
      0 < $(this.selectors.productPreviewMainImages).length &&
        $(this.selectors.productPreviewMainImages)
          .not(".slick-initialized")
          .slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: !1,
            prevArrow: '<span class="fa fa-angle-left slick-prev-arrow"></span>',
            nextArrow: '<span class="fa fa-angle-right slick-next-arrow"></span>'
          });
    },
    _initSwatches: function() {
      function C(ae) {
        let ie = ae
          .replace("https:", "")
          .replace("http:", "")
          .split("?v=")[0]
          .split("/"),
          oe = ie[ie.length - 1].split("."),
          se = oe.pop(),
          ne = oe.join(".") + "_100x." + se;
        return ae.replace(ie[ie.length - 1], ne);
      }
      function S(ae, ie, oe, se, ne) {
        if (1 < ae.options.length)
          for (i = 0; i < ae.options.length; i++)
            i != ie &&
              $(T + "-" + i + " option").each(function() {
                var ve = "unavailable", be = $(this).attr("value");
                for (j = 0; j < ae.variants.length; j++) {
                  var ye = ae.variants[j];
                  if (ye.options[ie] != oe) continue;
                  else if (ye.options[i] == be) {
                    ve = !0 == ye.available ? "available" : "sold_out";
                    break;
                  }
                }
                var we =
                  "#swatch-" +
                  i +
                  "-" +
                  be
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                $(we)
                  .closest(".swatch-element")
                  .removeClass("available")
                  .removeClass("sold_out")
                  .removeClass("unavailable")
                  .addClass(ve);
              });
        else
          for (i = 0; i < ae.options.length; i++)
            $(
              "#single-option-selector-product-template-" + i + " option"
            ).each(function() {
              var ve = "unavailable", be = $(this).attr("value");
              for (j = 0; j < ae.variants.length; j++) if (
                  ae.variants[j].options[i] == be
                ) {
                  ve = ae.variants[j].available ? "available" : "sold_out";
                  break;
                }
              var ye =
                "#swatch-" +
                i +
                "-" +
                be
                  .toLowerCase()
                  .replace(/[^a-z0-9 -]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/-+/g, "-");
              $(ye)
                .closest(".swatch-element")
                .removeClass("available")
                .removeClass("sold_out")
                .removeClass("unavailable")
                .addClass(ve);
            });
        let le = ne.settings.variant_image_grouped,
          de = ne.selectors.productMainImages + ".slick-slider",
          ce = ne.selectors.productThumbImages + " .slick-slider",
          pe = oe,
          ue = ne.productSingleObject,
          me = ne.selectors.originalSelectorId;
        if ("1" == le && ("color" == se || "colour" == se)) {
          $(ce)
            .slick("slickUnfilter")
            .slick("slickFilter", "[data-color='" + pe + "']");
          var he = $(ce).find(".slick-slide"), ge = 0, fe = !1;
          he.each(function(ve, be) {
            $(be).attr(
              "data-slick-index",
              ve
            ), jQuery.each(ue.variants, function(ye, we) {
              if (we.id == $(me).val() && !1 == fe) {
                var ke = we.featured_image.src
                  .replace(/^https?\:/i, "")
                  .split("?")[0]
                  .replace(".png", "")
                  .replace(".jpg", ""),
                  Ce = $(be).find("img").first().attr("src");
                0 <= Ce.indexOf(ke) && ((ge = ve), (fe = !0));
              }
            });
          }), $(ce).slick("slickGoTo", ge, !0), $(de)
            .slick("slickUnfilter")
            .slick("slickFilter", "[data-color='" + pe + "']");
          var he = $(de).find(".slick-slide"), ge = 0, fe = !1;
          he.each(function(ve, be) {
            $(be).attr(
              "data-slick-index",
              ve
            ), jQuery.each(ue.variants, function(ye, we) {
              if (we.id == $(me).val() && !1 == fe) {
                var ke = we.featured_image.src
                  .replace(/^https?\:/i, "")
                  .split("?")[0]
                  .replace(".png", "")
                  .replace(".jpg", ""),
                  Ce = $(be).find("img").first().attr("src");
                0 <= Ce.indexOf(ke) && ((ge = ve), (fe = !0));
              }
            });
          }), $(de).slick("slickGoTo", ge, !0), $(
            ".templateProduct .thumbnails .slick-list"
          ).width() >= $(".templateProduct .thumbnails .slick-track").width()
            ? $("body").append(
                '<style id="product-images-filtering-style" type="text/css">.templateProduct .thumbnails .slick-track{transform:none!important;}</style>'
              )
            : 0 < $("style#product-images-filtering-style").length &&
                $("style#product-images-filtering-style").remove();
        }
      }
      var T = this.selectors.optionsSelect,
        I = this.productSingleObject,
        P = this.productSwatchSingleObject,
        z = [];
      if (
        ("1" == this.settings.swatch_size && z.push("Size"), z.push(
          "size"
        ), "1" == this.settings.swatch_color &&
          (z.push("Color"), z.push("Colour"), z.push("color"), z.push(
            "colour"
          )), 0 < z.length)
      ) {
        var A = !1,
          N = !1,
          L = 0,
          M = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?")),
          O = theme.asset_url.substring(
            theme.asset_url.lastIndexOf("?"),
            theme.asset_url.length
          );
        for (i = 0; i < I.options.length; i++) {
          var q = "",
            E = "",
            B = "",
            F = "",
            D = "",
            U = "",
            W = "",
            H = "img btooltip";
          if (
            ((q = "object" == typeof I.options[i]
              ? I.options[i].name
              : I.options[i]), (A = !1), (N = !1), -1 < z.indexOf(q))
          ) {
            (A = !0), (L = i);
            var V = q.toLowerCase();
            if ((/color|colour/i.test(V) && (N = !0), A)) {
              var G = [];
              for (j = 0; j < I.variants.length; j++) {
                var Q = I.variants[j],
                  Y = this.htmlEntities(Q.options[L]),
                  J = this.convertToSlug(Y);
                0 > G.indexOf(Y) &&
                  ("color" != V && "colour" != V
                    ? ((W = Y), (H = "btooltip"))
                    : "1" == this.settings.swatch_color_advanced
                        ? null !== P[J] && void 0 !== P[J] && "" != P[J]
                            ? ((H = "img btooltip swatch_color_advanced"), (W =
                                '<i style="background-image: url(' +
                                M +
                                P[J] +
                                ".png" +
                                O +
                                ')"></i>'))
                            : null === Q.featured_image
                                ? (W =
                                    '<i style="background-color:' +
                                    Y +
                                    "; background-image: url(" +
                                    M +
                                    J +
                                    ".png" +
                                    O +
                                    ')"></i>')
                                : ((H =
                                    "img btooltip swatch_color_advanced"), (W =
                                    '<i style="background-image: url(' +
                                    C(Q.featured_image.src) +
                                    ')"></i>'))
                        : (W =
                            '<i style="background-color:' +
                            Y +
                            "; background-image: url(" +
                            M +
                            J +
                            ".png" +
                            O +
                            ')"></i>'), (U = $(
                    this.selectors.singleOptionSelectorId + "-" + L
                  ).val() == Y
                    ? "selected "
                    : ""), (B =
                    B +
                    '<div class="swatch-element ' +
                    V +
                    J +
                    " " +
                    "available" +
                    '"><input data-id="' +
                    this.selectors.singleOptionSelectorId +
                    "-" +
                    L +
                    '" data-value="' +
                    Y +
                    '"  class="swatch-radio ' +
                    U +
                    '" id="swatch-' +
                    L +
                    "-" +
                    J +
                    '" type="radio" data-swatch="' +
                    V +
                    '" data-poption="' +
                    L +
                    '" name="option-' +
                    L +
                    '" value="' +
                    Y +
                    '"><label for="swatch-' +
                    L +
                    "-" +
                    J +
                    '" class="' +
                    H +
                    '" title="' +
                    Y +
                    '"><span class="soldout-image"></span>' +
                    W +
                    "</label></div>"), G.push(Y));
              }
              (E =
                '<div class="' +
                this.selectors.singleOptionSwatches +
                " wrapper-swatches swatch " +
                V +
                '" data-attribute_name="attribute_pa_' +
                V +
                '"><div>' +
                B +
                "</div></div>"), (F = $(
                this.selectors.singleOptionSelectorId + "-" + L
              )), (D = $(this.selectors.variationSelector + "-" + L)), "" !=
                E && (F.after(E), F.hide(), D.addClass("hide-choose-option"));
            }
          }
        }
      }
      var X = "",
        ee = "." + this.selectors.singleOptionSwatches + " .swatch-radio",
        te = this;
      0 < $("." + this.selectors.singleOptionSwatches).length &&
        ((X = $(ee)), X.unbind("click"), X.on("click", function() {
          var ae = $(this).data("id"),
            ie = $(this).data("poption"),
            oe = $(this).data("value"),
            se = $(this).data("swatch");
          $(this).data("value") != $(ae).val() &&
            ($(ae).val($(this).data("value")).trigger("change"), $(ae)
              .closest(".selector-wrapper")
              .find(".swatch-radio")
              .removeClass("selected"), $(this).addClass("selected"), $(
              ae
            ).closest(".selector-wrapper"), $(ae)
              .closest(".selector-wrapper")
              .find(".option-select-value")
              .html($(this).data("value"))), S(I, ie, oe, se, te);
        })), $(".swatch-radio.selected").trigger("click");
    },
    htmlEntities: function(C) {
      return (C + "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },
    convertToSlug: function(C) {
      return C.toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    },
    _initVariants: function() {
      var C = {
        $container: this.$container,
        enableHistoryState: this.$container.data("enable-history-state") || !1,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };
      (this.variants = new slate.Variants(C)), this.$container.on(
        "variantChange" + this.settings.namespace,
        this._updateAddToCart.bind(this)
      ), this.$container.on(
        "variantImageChange" + this.settings.namespace,
        this._updateImages.bind(this)
      ), this.$container.on(
        "variantPriceChange" + this.settings.namespace,
        this._updatePrice.bind(this)
      ), this.$container.on(
        "variantSKUChange" + this.settings.namespace,
        this._updateSKU.bind(this)
      );
    },
    _updateAddToCart: function(C) {
      var S = C.variant;
      S
        ? ($(this.selectors.productPrices)
            .removeClass("invisible")
            .attr("aria-hidden", "true"), $(".variations_button").removeClass(
            "hide"
          ), S.available
            ? ($(this.selectors.addToCart)
                .prop("disabled", !1)
                .toggleClass("hide", !1), $(this.selectors.addToCart).val(
                theme.strings.addToCart
              ), $(this.selectors.stockText)
                .html(theme.strings.inStock)
                .removeClass("out-of-stock unavailable")
                .addClass("in-stock"), "shopify" == S.inventory_management &&
                "continue" != S.inventory_policy &&
                (0 < S.inventory_quantity && 1 == parseInt(theme.inventory)
                  ? $(this.selectors.stockText).html(
                      S.inventory_quantity + " " + theme.strings.inStock
                    )
                  : $(this.selectors.stockText).html(theme.strings.inStock)))
            : ($(this.selectors.addToCart)
                .prop("disabled", !0)
                .toggleClass("hide", !1), $(this.selectors.addToCart).val(
                theme.strings.soldOut
              ), $(this.selectors.stockText)
                .html(theme.strings.outStock)
                .removeClass("in-stock unavailable")
                .addClass("out-of-stock")))
        : ($(".variations_button").addClass("hide"), $(this.selectors.addToCart)
            .prop("disabled", !0)
            .toggleClass("hide", !0), $(this.selectors.addToCart).val(
            theme.strings.unavailable
          ), $(this.selectors.stockText)
            .html(theme.strings.unavailable)
            .removeClass("in-stock")
            .addClass("out-of-stock unavailable"), $(
            this.selectors.productPrices
          )
            .addClass("invisible")
            .attr("aria-hidden", "false"));
    },
    _updateImages: function(C) {
      var S = C.variant,
        T = this,
        I = this.settings.product_design,
        P = S.featured_image.src
          .replace("https:", "")
          .replace("http:", "")
          .split("?v=")[0];
      $(this.selectors.productFeaturedImage).each(function() {
        var A = $(this), N = A.attr("href");
        if (
          0 <= N.indexOf(P) &&
          !A.closest(".slick-slide").hasClass("slick-cloned")
        ) {
          var L = $(T.selectors.productMainImages),
            M = A.closest(".slick-slide").attr("data-slick-index");
          if (
            ("carousel" == I
              ? L.slick("slickGoTo", M)
              : L.slick("slickGoTo", M, !0), "scroll" == I)
          ) {
            var O =
              parseInt(
                A.closest(".shopify-product-gallery__image").offset().top
              ) - 50;
            $("html,body").animate({ scrollTop: O }, "slow");
          }
          return void ("gallery" == I &&
            0 < $(".thumbnails .thumbnail-gallery-item").length &&
            $(".thumbnails .thumbnail-gallery-item").each(function() {
              var q = $(this).data("href");
              0 <= q.indexOf(P) && $(this).trigger("click");
            }));
        }
      });
    },
    _updatePrice: function(C) {
      var S = C.variant;
      if (
        ($(this.selectors.originalPrice).html(
          '<span class="money">' +
            Shopify.formatMoney(S.price, window.money_format) +
            "</span>"
        ), S.compare_at_price > S.price)
      ) {
        if (
          ($(this.selectors.productPrices).addClass("has-sale"), $(
            this.selectors.productPrices
          ).removeClass("not-sale"), $(this.selectors.comparePrice)
            .html(
              '<span class="money">' +
                Shopify.formatMoney(S.compare_at_price, window.money_format) +
                "</span>"
            )
            .removeClass("hide"), $(this.selectors.saleLabel)
            .find("span")
            .text(theme.strings.sale), "" != theme.sale_percentages)
        ) {
          var T = Math.round(
            100 * (S.compare_at_price - S.price) / S.compare_at_price
          );
          $(this.selectors.saleLabel).find("span").text("-" + T + "%");
        }
        $(this.selectors.saleLabel).addClass("hide");
      } else
        $(this.selectors.productPrices).removeClass("has-sale"), $(
          this.selectors.productPrices
        ).addClass("not-sale"), $(this.selectors.comparePrice).addClass(
          "hide"
        ), $(this.selectors.saleLabel).addClass("hide");
      roar.currenciesCallbackSpecial(this.selectors.product + " .money");
    },
    _updateSKU: function(C) {
      var S = C.variant;
      "" == S.sku
        ? $(this.selectors.SKU).addClass("hide")
        : $(this.selectors.SKU).removeClass("hide").find(".sku").text(S.sku);
    },
    onUnload: function() {
      this.$container.off(this.settings.namespace);
    }
  })), y;
})()), (window.theme = window.theme || {}), (theme.Filters = (function() {
  function y() {
    $(T.filter).length &&
      ($(T.fiterTarget).html(""), $(T.filter)
        .clone()
        .appendTo(T.fiterTarget), $(".offcanvas_shop_sidebar").fitVids());
  }
  function C(I) {
    var P = (this.$container = $(I));
    (this.$filterSelect = $(T.filter, P)), (this.$sortSelect = $(
      T.sortSelection,
      P
    )), (this.$viewSelect = $(T.defaultView, P)), (this.$filterClear = $(
      T.filterClear,
      P
    )), y(), $(document).on(
      "change",
      T.viewSelection,
      this._onViewChange.bind(this)
    ), $(document).on(
      "change",
      T.sortSelection,
      this._onSortChange.bind(this)
    ), $(document).on(
      "change",
      T.filterSelection,
      this._onFilterChange.bind(this)
    ), $(document).on("click", T.filterClear, this._onFilterClear.bind(this));
  }
  var T = {
    sortSelection: ".filters-toolbar__input--sort",
    defaultSort: ".collection-header__default-sort",
    viewSelection: ".filters-toolbar__input--view",
    defaultView: ".collection-header__default-view",
    filter: ".shop-page #secondary",
    fiterTarget: ".offcanvas_aside_left .offcanvas_shop_sidebar .widget-area",
    filterSelection: ".mfilter-content .filter",
    filterClear: ".mfilter-content .clear"
  };
  return (C.prototype = _.assignIn({}, C.prototype, {
    _filterAjaxClick: function(I) {
      delete Shopify.queryParams.page;
      var P = this._filterCreateUrl(I);
      this._filterGetContent(P);
    },
    _filterCreateUrl: function(I) {
      var P = $.param(Shopify.queryParams).replace(/%2B/g, "+");
      return I ? "" == P ? I : I + "?" + P : location.pathname + "?" + P;
    },
    _filterGetContent: function(I) {
      var P = "#mfilter-content-container",
        z = ".mfilter-box .mfilter-content",
        A = this;
      $.ajax({
        type: "get",
        url: I,
        beforeSend: function() {
          roar.destroyCountdown(), $("body")
            .addClass("is_loading")
            .removeClass("open_filter");
        },
        success: function(N) {
          var L = $(N).filter("title").text();
          $(P).empty().html($(N).find(P).html()), $(z)
            .empty()
            .html(
              $(N).find(z).html()
            ), roar.mapPaginationCallback(), History.pushState(
            { param: Shopify.queryParams },
            L,
            I
          ), setTimeout(function() {
            $("html,body").animate(
              { scrollTop: $("body #sandbox").offset().top },
              500,
              "swing"
            );
          }, 100), $("body").removeClass("is_loading"), A._mapReviews();
        },
        error: function() {
          $("body").removeClass("is_loading");
        }
      });
    },
    _mapReviews: function() {
      "undefined" != typeof SPR &&
        (SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges());
    },
    _onFilterClear: function(I) {
      var P = [];
      Shopify.queryParams.constraint &&
        (P = Shopify.queryParams.constraint.split("+"));
      var z = $(I.currentTarget),
        A = z.closest(".column").find("input:checked");
      0 < A.length &&
        A.each(function() {
          var N = $(this).val();
          if (N) {
            var L = P.indexOf(N);
            0 <= L && P.splice(L, 1);
          }
        }), P.length
        ? (Shopify.queryParams.constraint = P.join("+"))
        : delete Shopify.queryParams.constraint, this._filterAjaxClick();
    },
    _onViewChange: function(I) {
      var P = $(I.currentTarget),
        z = $(T.defaultView, this.$container).val(),
        A = P.val() ? P.val() : z;
      (Shopify.queryParams.view = A), this._filterAjaxClick();
    },
    _onSortChange: function(I) {
      var P = $(I.currentTarget),
        z = $(T.defaultSort, this.$container).val(),
        A = P.val() ? P.val() : z;
      (Shopify.queryParams.sort_by = A), this._filterAjaxClick();
    },
    _onFilterChange: function(I) {
      var P = $(I.currentTarget),
        z = P.closest(".column").attr("data-multi_choice"),
        A = [];
      if (
        (Shopify.queryParams.constraint &&
          (A = Shopify.queryParams.constraint.split("+")), "false" == z &&
          !P.closest(".field").hasClass("active"))
      ) {
        var N = P.closest(".column").find("input:checked");
        0 < N.length &&
          N.each(function() {
            var O = $(this).val();
            if (O) {
              var q = A.indexOf(O);
              0 <= q && A.splice(q, 1);
            }
          });
      }
      var L = P.val();
      if (L) {
        console.log(A);
        var M = A.indexOf(L);
        0 <= M ? (console.log(L), A.splice(M, 1)) : A.push(L);
      }
      A.length
        ? (Shopify.queryParams.constraint = A.join("+"))
        : delete Shopify.queryParams.constraint, this._filterAjaxClick();
    },
    onUnload: function() {
      this.$sortSelect.off(
        "change",
        this._onSortChange
      ), this.$filterSelect.off(
        "change",
        this._onFilterChange
      ), this.$filterClear.off("click", this._onFilterClear);
    }
  })), C;
})()), (theme.MegaMenuSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = S.attr("data-section-id"),
      I = S.attr("data-section-type");
    (this.MegaMenu = $("#megamenu-" + T)), (this.megaMenuNamspace =
      "#megamenu-" + T), (this.megaMenuId = $("#shopify-section-" + T)), 0 <
      $(".section-megamenu-content").length &&
      $(".section-megamenu-content").each(function() {
        var P = $(this).data("menu_width_class");
        0 < $(this).closest(".shopify-section").length &&
          (!$(this).closest(".shopify-section").hasClass(P) &&
            $(this).closest(".shopify-section").addClass(P), $(this)
            .closest(".shopify-section")
            .removeClass("hidden"));
      }), 0 < $("#header-phantom .shopify-section").length &&
      $("#header-phantom .shopify-section").each(function() {
        $(this).removeClass("shopify-section");
      }), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      roar.fixedHeaderMenu(), this._products(), this._handleMegaMenu(), this._handleVermenuCategory();
    },
    _products: function() {
      0 < $(".products-carousel-megamenu").length &&
        $(".products-carousel-megamenu").each(function() {
          var C = $(this).data("_id"),
            S = $(this).data("_one"),
            T = $(this).data("_two"),
            I = $(this).data("_three"),
            P = $(this).data("_four"),
            z = $("#productsCarousel" + C);
          z
            .not(".slick-initialized")
            .slick({
              arrows: !1,
              slidesToShow: P,
              slidesToScroll: P,
              responsive: [
                {
                  breakpoint: 1920,
                  settings: { slidesToShow: P, slidesToScroll: P }
                },
                {
                  breakpoint: 768,
                  settings: { slidesToShow: I, slidesToScroll: I }
                },
                {
                  breakpoint: 480,
                  settings: { slidesToShow: T, slidesToScroll: T }
                }
              ],
              rtl: window.rtl
            }), $(".productsCarousel" + C + "_next").click(function() {
            return z.slick("slickNext"), !1;
          }), $(".productsCarousel" + C + "_prev").click(function() {
            return z.slick("slickPrev"), !1;
          }), $(window).resize(function() {
            z.slick("setPosition");
          });
        });
    },
    _handleVermenuCategory: function() {
      if (
        $("#vermenu_cat_gap").length &&
        992 <= roar.getWidthBrowser() &&
        0 < $(".container-megamenu.vertical .megamenu-wrapper").length
      ) {
        var C = $(
          ".container-megamenu.vertical .megamenu-wrapper"
        ).outerHeight(),
          S = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
          T = $("#sidebar").offset().top;
        $("#vermenu_cat_gap").css("height", C - (T - S));
      }
    },
    _handleMegaMenu: function() {
      var C = this._handleVermenuCategory();
      "yes" == window.megamenu_responsive_design &&
        992 > $(window).width() &&
        (window.megamenu_responsive = !0), $(
        "ul.megamenu > li"
      ).each(function() {
        var S = 0;
        $(this).find(".mobile-enabled").each(function() {
          S++;
        }), 0 == S && $(this).find(".open-menu").addClass("mobile-disabled");
      }), $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(
        function() {
          $(this).children("ul").addClass("active");
        },
        function() {
          $(this).children("ul").removeClass("active");
        }
      ), $(".close-categories").unbind("click"), $(
        ".close-categories"
      ).on("click", function() {
        return $(this)
          .parent()
          .removeClass(
            "active"
          ), $(this).next().animate({ height: "hide" }, 400), !1;
      }), $(".open-categories").unbind("click"), $(
        ".open-categories"
      ).on("click", function() {
        return $(".open-categories")
          .parent()
          .removeClass(
            "active"
          ), $(".open-categories").next().next().animate({ height: "hide" }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({ height: "show" }, 400), !1;
      }), $(".close-menu").unbind("click"), $(
        ".close-menu"
      ).on("click", function() {
        return $(this)
          .parent()
          .removeClass(
            "active"
          ), $(this).next().next().next().animate({ height: "hide" }, 400), !1;
      }), $(".open-menu").unbind("click"), $(
        ".open-menu"
      ).on("click", function() {
        return $("ul.megamenu > li").removeClass(
          "active"
        ), $("ul.megamenu > li").find(".sub-menu").animate({ height: "hide" }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({ height: "show" }, 400), $(window).trigger("resize"), (window.megamenu_responsive = !0), !1;
      }), $("ul.megamenu > li.click .content a").unbind("click"), $(
        "ul.megamenu > li.click .content a"
      ).click(function() {
        window.location = $(this).attr("href");
      }), jQuery(window)
        .resize(function() {
          $("ul.megamenu > li.hover").hover(
            function() {
              if (0 == window.megamenu_responsive) {
                if (
                  ((window.megamenu_active = $(
                    this
                  )), (window.megamenu_hover = !0), $(
                    "ul.megamenu > li"
                  ).removeClass("active"), $(this).addClass(
                    "active"
                  ), window.rtl)
                ) {
                  $(this).children(".sub-menu").css("right", "auto"), $(this)
                    .children(".sub-menu")
                    .css("left", "auto");
                  var S = $(this).children(".sub-menu"),
                    T = S.offset().left,
                    I = $(".horizontal ul.megamenu"),
                    P = I.offset().left - 45;
                  P > T && $(this).children(".sub-menu").css("left", "0");
                } else {
                  $(this).children(".sub-menu").css("right", "auto");
                  var S = $(this).children(".sub-menu"),
                    T = $(window).width() - (S.offset().left + S.outerWidth());
                  if ($(".header-type-3").length || $(".header-type-30").length)
                    var I = $("#top .container"),
                      P =
                        $(window).width() - (I.offset().left + I.outerWidth());
                  else
                    var I = $(".overflow-megamenu"),
                      P =
                        $(window).width() - (I.offset().left + I.outerWidth());
                  P > T && $(this).children(".sub-menu").css("right", "0");
                }
                var z = $(this).children("a").outerWidth() / 2,
                  A =
                    $(this).children("a").offset().left -
                    $(this).find(".content").offset().left;
                $(this).find(".content > .arrow").css("left", A + z);
              }
            },
            function() {
              if (0 == window.megamenu_responsive) {
                var S = $(this).attr("title");
                if (((window.megamenu_hover = !1), "hover-intent" == S)) {
                  var T = $(this);
                  setTimeout(function() {
                    0 == window.megamenu_hover && $(T).removeClass("active");
                  }, 500);
                } else $(this).removeClass("active");
              }
            }
          );
        })
        .resize(), $("ul.megamenu > li.click").unbind("click"), $(
        "ul.megamenu > li.click"
      ).click(function() {
        if (1 == $(this).removeClass("active")) return !1;
        if (
          ((window.megamenu_active = $(this)), (window.megamenu_hover = !0), $(
            "ul.megamenu > li"
          ).removeClass("active"), $(this).addClass("active"), 1 ==
            window.megamenu_responsive &&
            $(this)
              .children(".sub-menu")
              .animate({ height: "show" }, 400), window.rtl)
        ) {
          $(this).children(".sub-menu").css("right", "auto"), $(this)
            .children(".sub-menu")
            .css("left", "auto");
          var S = $(this).children(".sub-menu"),
            T = S.offset().left,
            I = $(".horizontal ul.megamenu"),
            P = I.offset().left - 45;
          P > T && $(this).children(".sub-menu").css("left", "0");
        } else {
          $(this).children(".sub-menu").css("right", "auto");
          var S = $(this).children(".sub-menu"),
            T = $(window).width() - (S.offset().left + S.outerWidth());
          if ($(".header-type-3").length)
            var I = $("#top .container"),
              P = $(window).width() - (I.offset().left + I.outerWidth());
          else
            var I = $(".overflow-megamenu"),
              P = $(window).width() - (I.offset().left + I.outerWidth());
          P > T && $(this).children(".sub-menu").css("right", "0");
        }
        var z = $(this).children("a").outerWidth() / 2,
          A =
            $(this).children("a").offset().left -
            $(this).find(".content").offset().left;
        return $(this).find(".content > .arrow").css("left", A + z), !1;
      }), $(".categories-image-right ul > li > a").hover(
        function() {
          $(this)
            .closest(".categories-image-right")
            .find("img")
            .attr("src", $(this).attr("data-image"));
        },
        function() {
          var S = $(this).closest(".categories-image-right").attr("data-image");
          $(this).closest(".categories-image-right").find("img").attr("src", S);
        }
      ), $(".megaMenuToggle").unbind("click"), $(
        ".megaMenuToggle"
      ).click(function() {
        return 1 == $(this).removeClass("active")
          ? $(this)
              .parent()
              .find(".megamenu-wrapper")
              .stop(!0, !0)
              .animate({ height: "hide" }, 400)
          : ($(this)
              .parent()
              .find(".megamenu-wrapper")
              .stop(!0, !0)
              .animate({ height: "toggle" }, 400), $(this).addClass(
              "active"
            )), !1;
      }), $("html").unbind("click"), $("html").on("click", function() {
        ("yes" == window.megamenu_responsive_design &&
          992 > $(window).width()) ||
          $("ul.megamenu > li.click").removeClass("active");
      }), C, $(window).resize(function() {
        (window.megamenu_responsive = !1), "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), C;
      }), roar.initLazyLoading(".section-megamenu-content", !0);
    },
    onUnload: function() {
      this.$container.off(this.megaMenuNamspace);
    },
    onSelect: function() {
      0 < $(this.megaMenuNamspace + " .product-grid.rich-banner").length &&
        roar.initCountdown(), roar.initProductQuickShopItem(
        this.megaMenuNamspace + " .product-grid.rich-banner"
      ), roar.handleQuickshop(
        this.megaMenuNamspace + " .product-grid.rich-banner"
      );
    },
    onBlockSelect: function() {},
    onBlockDeselect: function() {}
  })), y;
})()), (theme.TopBlockSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.topBlockId = $("#shopify-section-" + T)), (this.topBlock = $(
      "#top-block-" + T
    )), (this.topBlockNamspace = "#top-block-wrapper-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {},
    onUnload: function() {
      this.$container.off(this.topBlockNamspace);
    }
  })), y;
})()), (theme.CustomWidgetSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.customWidgetId = $(
      "#shopify-section-" + T
    )), (this.customWidgetNamspace =
      "#custom-widget-" + T), (this.placement_fullwidth = $(
      this.customWidgetNamspace
    ).data("placement_fullwidth")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if ("1" == this.placement_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
    },
    onUnload: function() {
      this.$container.off(this.customWidgetNamspace);
    }
  })), y;
})()), (theme.BannerSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.bannerId = $("#shopify-section-" + T)), (this.bannerNamspace =
      "#rich-banners-" + T), (this.placement_fullwidth = $(
      this.bannerNamspace
    ).data("placement_fullwidth")), (this.placement_background = $(
      this.bannerNamspace
    ).data("placement_background")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if ("1" == this.placement_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
      this._initFx(), this._handleFontSize(), this._initSlider(), this._initTilt(), "1" ==
        this.placement_background && this._initBackground();
    },
    _initBackground: function() {
      var C = $("#shopify-section-" + this.sectionId),
        S = this.$container.data("placement_background_c"),
        T = this.$container.data("placement_background_i");
      $(window)
        .resize(function() {
          if ((C.removeAttr("style"), !(768 > $(window).width()))) {
            var I = C.offset();
            C.width($("body").width()), C.css("left", "-" + I.left + "px")
              .css("padding-left", I.left)
              .css("padding-right", I.left), C.css("background-color", S)
              .css("background-image", "url(" + T + ")")
              .css("background-size", "cover");
          }
        })
        .resize();
    },
    _initTilt: function() {
      var C = this.$container.find(".rt-tilt-container");
      0 >= C.length ||
        (C.on("mousemove", function(S) {
          const { left: T, top: I } = $(this).offset(),
            P = S.pageX - T,
            z = S.pageY - I,
            A = $(this).width() / 2 - P,
            N = $(this).height() / 2 - z;
          $(this).css(
            "transform",
            "perspective(500px) rotateX(" +
              N / 40 +
              "deg) rotateY(" +
              -(A / 40) +
              "deg) translateZ(10px)"
          );
          0 < Math.sign(A) ? -Math.abs(A) : Math.abs(A);
          $(this).removeClass("rt-leave");
        }), C.on("mouseleave", function() {
          $(this).addClass("rt-leave");
        }));
    },
    _initSlider: function() {
      this.$container
        .find(".rich-banner--group.is-slider")
        .each(function(C, S) {
          let T = {
            interval: $(S).data("interval"),
            autoplay: $(S).data("autoplay"),
            itemsperslide: $(S).data("itemsperslide"),
            blockid: $(S).data("blockid"),
            variablewidth: $(S).data("variablewidth")
          };
          var I = $(S).not(".slick-initialized");
          I.slick({
            dots: !1,
            arrows: !1,
            slidesToShow: T.itemsperslide,
            slidesToScroll: 1,
            autoplay: T.autoplay,
            autoplaySpeed: T.interval,
            slide: "div, a.rich-banner-wrapper",
            variableWidth: T.variablewidth,
            centerMode: T.variablewidth
          }), $(S).find(".next-button").first().click(function() {
            return I.slick("slickNext"), !1;
          }), $(S).find(".prev-button").first().click(function() {
            return I.slick("slickPrev"), !1;
          }), roar.initLazyLoading("#rich-banner--group" + T.blockid, !0);
        });
    },
    _initFx: function() {
      this.$container.find(".rich-banner.has-text-fx").each(function(C, S) {
        let T = { used: $(S).data("fx"), type: $(S).data("fx-type") };
        !0 == T.used &&
          ("0" == T.type
            ? anime
                .timeline({ loop: !0 })
                .add({
                  targets: $(S).find(".rt-fx-dominos .letter").toArray(),
                  rotateY: [-90, 0],
                  duration: 1300,
                  delay: function(I, P) {
                    return 45 * P;
                  }
                })
                .add({
                  targets: $(S).find(".rt-fx-dominos").toArray(),
                  opacity: 0,
                  duration: 1e3,
                  easing: "easeOutExpo",
                  delay: 1e3
                })
            : "1" == T.type
                ? anime
                    .timeline({ loop: !0 })
                    .add({
                      targets: $(S)
                        .find(".rt-fx-vertical-lines .letter")
                        .toArray(),
                      scale: [0.3, 1],
                      opacity: [0, 1],
                      translateZ: 0,
                      easing: "easeOutExpo",
                      duration: 600,
                      delay: function(I, P) {
                        return 70 * (P + 1);
                      }
                    })
                    .add({
                      targets: $(S)
                        .find(".rt-fx-vertical-lines .line")
                        .toArray(),
                      scaleX: [0, 1],
                      opacity: [0.5, 1],
                      easing: "easeOutExpo",
                      duration: 700,
                      offset: "-=875",
                      delay: function(I, P, z) {
                        return 80 * (z - P);
                      }
                    })
                    .add({
                      targets: $(S).find(".rt-fx-vertical-lines").toArray(),
                      opacity: 0,
                      duration: 1e3,
                      easing: "easeOutExpo",
                      delay: 1e3
                    })
                : "2" == T.type
                    ? anime
                        .timeline({ loop: !0 })
                        .add({
                          targets: $(S).find(".rt-fx-fading .letter").toArray(),
                          opacity: [0, 1],
                          easing: "easeInOutQuad",
                          duration: 2250,
                          delay: function(I, P) {
                            return 150 * (P + 1);
                          }
                        })
                        .add({
                          targets: $(S).find(".rt-fx-fading").toArray(),
                          opacity: 0,
                          duration: 1e3,
                          easing: "easeOutExpo",
                          delay: 1e3
                        })
                    : "3" == T.type
                        ? anime
                            .timeline({ loop: !0 })
                            .add({
                              targets: $(S)
                                .find(".rt-fx-intro .letter")
                                .toArray(),
                              translateX: [40, 0],
                              translateZ: 0,
                              opacity: [0, 1],
                              easing: "easeOutExpo",
                              duration: 1200,
                              delay: function(I, P) {
                                return 500 + 30 * P;
                              }
                            })
                            .add({
                              targets: $(S)
                                .find(".rt-fx-intro .letter")
                                .toArray(),
                              translateX: [0, -30],
                              opacity: [1, 0],
                              easing: "easeInExpo",
                              duration: 1100,
                              delay: function(I, P) {
                                return 100 + 30 * P;
                              }
                            })
                        : "4" == T.type
                            ? anime
                                .timeline({ loop: !0 })
                                .add({
                                  targets: $(S)
                                    .find(".rt-fx-surprising .word")
                                    .toArray(),
                                  scale: [14, 1],
                                  opacity: [0, 1],
                                  easing: "easeOutCirc",
                                  duration: 800,
                                  delay: function(I, P) {
                                    return 800 * P;
                                  }
                                })
                                .add({
                                  targets: $(S)
                                    .find(".rt-fx-surprising")
                                    .toArray(),
                                  opacity: 0,
                                  duration: 1e3,
                                  easing: "easeOutExpo",
                                  delay: 1e3
                                })
                            : anime
                                .timeline({ loop: !0 })
                                .add({
                                  targets: $(S)
                                    .find(".rt-fx-typing .line")
                                    .toArray(),
                                  scaleY: [0, 1],
                                  opacity: [0.5, 1],
                                  easing: "easeOutExpo",
                                  duration: 700
                                })
                                .add({
                                  targets: $(S)
                                    .find(".rt-fx-typing .line")
                                    .toArray(),
                                  translateX: [
                                    0,
                                    $(S)
                                      .find(".rt-fx-typing .letters")
                                      .first()
                                      .width()
                                  ],
                                  easing: "easeOutExpo",
                                  duration: 700,
                                  delay: 100
                                })
                                .add({
                                  targets: $(S)
                                    .find(".rt-fx-typing .letter")
                                    .toArray(),
                                  opacity: [0, 1],
                                  easing: "easeOutExpo",
                                  duration: 600,
                                  offset: "-=775",
                                  delay: function(I, P) {
                                    return 34 * (P + 1);
                                  }
                                })
                                .add({
                                  targets: $(S).find(".rt-fx-typing").toArray(),
                                  opacity: 0,
                                  duration: 1e3,
                                  easing: "easeOutExpo",
                                  delay: 1e3
                                }));
      });
    },
    _handleFontSize: function() {
      let C = this.$container;
      $(window)
        .resize(function() {
          let S = parseInt($(window).width());
          C.find(".self-fontsize-adj").each(function() {
            if (
              ($(this).css("fontSize", $(this).data("oriFontsize")), 767 >= S)
            ) {
              let T = parseInt($(this).data("oriFontsize")) / 2;
              (T = 10 > T ? 10 : T), $(this).css("fontSize", T + "px");
            }
          }), C.find("a.self-fontsize-adj").each(function() {
            $(this).css("fontSize", $(this).data("oriFontsize"));
          }), 767 >= S
            ? (C.find("a.self-fontsize-adj").css("fontSize", ""), C.find(
                "a.self-fontsize-adj"
              ).css("padding", "7px 19px 5px"))
            : C.find("a.self-fontsize-adj").css("padding", "");
        })
        .resize();
    },
    onUnload: function() {
      this.$container.off(this.bannerNamspace);
    },
    onBlockSelect: function(C) {
      console.log(C);
    },
    onSelect: function() {
      0 < $(this.bannerNamspace + " .product-grid.rich-banner").length &&
        roar.initCountdown(), roar.initLazyLoading(
        this.bannerNamspace + " .product-grid.rich-banner",
        !0
      ), roar.initProductQuickShopItem(
        this.bannerNamspace + " .product-grid.rich-banner"
      ), roar.handleQuickshop(
        this.bannerNamspace + " .product-grid.rich-banner"
      );
    }
  })), y;
})()), (theme.DeliveryBarSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.deliveryBarId = $("#shopify-section-" + T)), (this.deliveryBar = $(
      "#delivery-bar-" + T
    )), (this.deliveryBarNamspace =
      "#delivery-bar-" + T), (this.placement_fullwidth = $(
      this.deliveryBarNamspace
    ).data("placement_fullwidth")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if ("1" == this.placement_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
    },
    onUnload: function() {
      this.$container.off(this.deliveryBarNamspace);
    }
  })), y;
})()), (theme.SlideShowSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.slideShowId = $("#shopify-section-" + T)), (this.slideShow = $(
      "#home-slider-" + T
    )), (this.slideShowNamspace = "#home-slider-" + T), (this.option = {
      slider_auto: this.slideShow.data("slider_auto"),
      slider_interval: this.slideShow.data("slider_interval"),
      slider_scale: this.slideShow.data("slider_scale"),
      slider_auto_height: this.slideShow.data("slider_auto_height"),
      slider_height: this.slideShow.data("slider_height"),
      slider_align_top: this.slideShow.data("slider_align_top"),
      is_header_slider: this.slideShow.data("is_header_slider"),
      full_width: this.slideShow.data("full_width"),
      is_megamenu: this.slideShow.data("is_megamenu")
    }), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if (
        ("1" == this.option.is_header_slider &&
          ("1" == this.option.slider_align_top
            ? $(".templateIndex").addClass("slider-align-top")
            : $(".templateIndex").removeClass(
                "slider-align-top"
              )), this._handleSlideshow(), this._initResize(), "1" ==
          this.option.full_width && !window.sidebar)
      ) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
      "1" == this.option.is_megamenu && this._handleMegaMenu();
    },
    _handleVermenuCategory: function() {
      if (
        $("#vermenu_cat_gap").length &&
        992 <= roar.getWidthBrowser() &&
        0 < $(".container-megamenu.vertical .megamenu-wrapper").length
      ) {
        var C = $(
          ".container-megamenu.vertical .megamenu-wrapper"
        ).outerHeight(),
          S = $(".container-megamenu.vertical .megamenu-wrapper").offset().top,
          T = $("#sidebar").offset().top;
        $("#vermenu_cat_gap").css("height", C - (T - S));
      }
    },
    _handleMegaMenu: function() {
      var C = this._handleVermenuCategory();
      "yes" == window.megamenu_responsive_design &&
        992 > $(window).width() &&
        (window.megamenu_responsive = !0), $(
        "ul.megamenu > li"
      ).each(function() {
        var S = 0;
        $(this).find(".mobile-enabled").each(function() {
          S++;
        }), 0 == S && $(this).find(".open-menu").addClass("mobile-disabled");
      }), $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(
        function() {
          $(this).children("ul").addClass("active");
        },
        function() {
          $(this).children("ul").removeClass("active");
        }
      ), $(".close-categories").unbind("click"), $(
        ".close-categories"
      ).on("click", function() {
        return $(this)
          .parent()
          .removeClass(
            "active"
          ), $(this).next().animate({ height: "hide" }, 400), !1;
      }), $(".open-categories").unbind("click"), $(
        ".open-categories"
      ).on("click", function() {
        return $(".open-categories")
          .parent()
          .removeClass(
            "active"
          ), $(".open-categories").next().next().animate({ height: "hide" }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({ height: "show" }, 400), !1;
      }), $(".close-menu").unbind("click"), $(
        ".close-menu"
      ).on("click", function() {
        return $(this)
          .parent()
          .removeClass(
            "active"
          ), $(this).next().next().next().animate({ height: "hide" }, 400), !1;
      }), $(".open-menu").unbind("click"), $(
        ".open-menu"
      ).on("click", function() {
        return $("ul.megamenu > li").removeClass(
          "active"
        ), $("ul.megamenu > li").find(".sub-menu").animate({ height: "hide" }, 400), $(this).parent().addClass("active"), $(this).next().next().animate({ height: "show" }, 400), $(window).trigger("resize"), (window.megamenu_responsive = !0), !1;
      }), $("ul.megamenu > li.click .content a").unbind("click"), $(
        "ul.megamenu > li.click .content a"
      ).click(function() {
        window.location = $(this).attr("href");
      }), $("ul.megamenu > li.hover").hover(
        function() {
          if (0 == window.megamenu_responsive) {
            if (
              ((window.megamenu_active = $(
                this
              )), (window.megamenu_hover = !0), $(
                "ul.megamenu > li"
              ).removeClass("active"), $(this).addClass("active"), window.rtl)
            ) {
              $(this).children(".sub-menu").css("right", "auto"), $(this)
                .children(".sub-menu")
                .css("left", "auto");
              var S = $(this).children(".sub-menu"),
                T = S.offset().left,
                I = $(".horizontal ul.megamenu"),
                P = I.offset().left - 45;
              P > T && $(this).children(".sub-menu").css("left", "0");
            } else {
              $(this).children(".sub-menu").css("right", "auto");
              var S = $(this).children(".sub-menu"),
                T = $(window).width() - (S.offset().left + S.outerWidth());
              if ($(".header-type-3").length)
                var I = $("#top .container"),
                  P = $(window).width() - (I.offset().left + I.outerWidth());
              else
                var I = $(".overflow-megamenu"),
                  P = $(window).width() - (I.offset().left + I.outerWidth());
              P > T && $(this).children(".sub-menu").css("right", "0");
            }
            var z = $(this).children("a").outerWidth() / 2,
              A =
                $(this).children("a").offset().left -
                $(this).find(".content").offset().left;
            $(this).find(".content > .arrow").css("left", A + z);
          }
        },
        function() {
          if (0 == window.megamenu_responsive) {
            var S = $(this).attr("title");
            if (((window.megamenu_hover = !1), "hover-intent" == S)) {
              var T = $(this);
              setTimeout(function() {
                0 == window.megamenu_hover && $(T).removeClass("active");
              }, 500);
            } else $(this).removeClass("active");
          }
        }
      ), $("ul.megamenu > li.click").unbind("click"), $(
        "ul.megamenu > li.click"
      ).click(function() {
        if (1 == $(this).removeClass("active")) return !1;
        if (
          ((window.megamenu_active = $(this)), (window.megamenu_hover = !0), $(
            "ul.megamenu > li"
          ).removeClass("active"), $(this).addClass("active"), 1 ==
            window.megamenu_responsive &&
            $(this)
              .children(".sub-menu")
              .animate({ height: "show" }, 400), window.rtl)
        ) {
          $(this).children(".sub-menu").css("right", "auto"), $(this)
            .children(".sub-menu")
            .css("left", "auto");
          var S = $(this).children(".sub-menu"),
            T = S.offset().left,
            I = $(".horizontal ul.megamenu"),
            P = I.offset().left - 45;
          P > T && $(this).children(".sub-menu").css("left", "0");
        } else {
          $(this).children(".sub-menu").css("right", "auto");
          var S = $(this).children(".sub-menu"),
            T = $(window).width() - (S.offset().left + S.outerWidth());
          if ($(".header-type-3").length)
            var I = $("#top .container"),
              P = $(window).width() - (I.offset().left + I.outerWidth());
          else
            var I = $(".overflow-megamenu"),
              P = $(window).width() - (I.offset().left + I.outerWidth());
          P > T && $(this).children(".sub-menu").css("right", "0");
        }
        var z = $(this).children("a").outerWidth() / 2,
          A =
            $(this).children("a").offset().left -
            $(this).find(".content").offset().left;
        return $(this).find(".content > .arrow").css("left", A + z), !1;
      }), $(".categories-image-right ul > li > a").hover(
        function() {
          $(this)
            .closest(".categories-image-right")
            .find("img")
            .attr("src", $(this).attr("data-image"));
        },
        function() {
          var S = $(this).closest(".categories-image-right").attr("data-image");
          $(this).closest(".categories-image-right").find("img").attr("src", S);
        }
      ), $(".megaMenuToggle").unbind("click"), $(
        ".megaMenuToggle"
      ).click(function() {
        return 1 == $(this).removeClass("active")
          ? $(this)
              .parent()
              .find(".megamenu-wrapper")
              .stop(!0, !0)
              .animate({ height: "hide" }, 400)
          : ($(this)
              .parent()
              .find(".megamenu-wrapper")
              .stop(!0, !0)
              .animate({ height: "toggle" }, 400), $(this).addClass(
              "active"
            )), !1;
      }), $("html").unbind("click"), $("html").on("click", function() {
        ("yes" == window.megamenu_responsive_design &&
          992 > $(window).width()) ||
          $("ul.megamenu > li.click").removeClass("active");
      }), C, $(window).resize(function() {
        (window.megamenu_responsive = !1), "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0), C;
      });
    },
    _handleSlideshow: function() {
      var C, S, T, I, P, z, A, N;
      if (this.slideShow.length) {
        var L = this.slideShow;
        (C = L.data("afx-head")), (S = L.data("afx-cap")), (T = L.data(
          "afx-cta"
        )), (I = L.data("afx-sticker")), (P = L.data("dfx-head")), (z = L.data(
          "dfx-cap"
        )), (A = L.data("dfx-cta")), (N = L.data("dfx-sticker"));
      }
      var F,
        M = this.slideShowNamspace,
        O = this.option.slider_auto,
        q = this.option.slider_interval,
        E = this.option.slider_scale,
        B = this;
      this.slideShow.length &&
        ((F = this.slideShow.flexslider({
          animation: "fade",
          prevText: "",
          nextText: "",
          controlNav: !1,
          directionNav: !1,
          slideshowSpeed: q,
          slideshow: O,
          controlNav: !1,
          start: function() {
            jQuery("body").removeClass("loading"), jQuery(
              M + " ul.slides h2.caption-content"
            ).css("opacity", "0"), jQuery(M + " ul.slides .real-caption").css(
              "opacity",
              "0"
            ), jQuery(M + " ul.slides .caption-link").css(
              "opacity",
              "0"
            ), jQuery(M + " ul.slides .slide-sticker-wrapper img").css(
              "opacity",
              "0"
            ), jQuery(M + " ul.slides li:nth-child(1) h2.caption-content")
              .css("opacity", "1.0")
              .addClass("rt-animated " + C)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + C);
                }
              ), jQuery(M + " ul.slides li:nth-child(1) .real-caption")
              .css("opacity", "1.0")
              .addClass("rt-animated " + S)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + S);
                }
              ), jQuery(M + " ul.slides li:nth-child(1) .caption-link")
              .css("opacity", "1.0")
              .addClass("rt-animated " + T)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + T);
                }
              ), jQuery(
              M + " ul.slides li:nth-child(1) .slide-sticker-wrapper img"
            )
              .css("opacity", "1.0")
              .addClass("rt-animated " + I)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + I);
                }
              );
          },
          after: function(D) {
            var U = parseInt(D.currentSlide, 10) + 1;
            jQuery(M + " ul.slides li:nth-child(" + U + ") h2.caption-content")
              .css("opacity", "1.0")
              .addClass("rt-animated " + C)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + C);
                }
              ), jQuery(M + " ul.slides li:nth-child(" + U + ") .real-caption")
              .css("opacity", "1.0")
              .addClass("rt-animated " + S)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + S);
                }
              ), jQuery(M + " ul.slides li:nth-child(" + U + ") .caption-link")
              .css("opacity", "1.0")
              .addClass("rt-animated " + T)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + T);
                }
              ), jQuery(
              M +
                " ul.slides li:nth-child(" +
                U +
                ") .slide-sticker-wrapper img"
            )
              .css("opacity", "1.0")
              .addClass("rt-animated " + I)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + I);
                }
              );
          },
          before: function(D) {
            var U = parseInt(D.currentSlide, 10) + 1;
            jQuery(M + " ul.slides li:nth-child(" + U + ") h2.caption-content")
              .addClass("rt-animated " + P)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + P).css("opacity", "0");
                }
              ), jQuery(M + " ul.slides li:nth-child(" + U + ") .real-caption")
              .addClass("rt-animated " + z)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + z).css("opacity", "0");
                }
              ), jQuery(M + " ul.slides li:nth-child(" + U + ") .caption-link")
              .addClass("rt-animated " + A)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + A).css("opacity", "0");
                }
              ), jQuery(
              M +
                " ul.slides li:nth-child(" +
                U +
                ") .slide-sticker-wrapper img"
            )
              .addClass("rt-animated " + N)
              .one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function() {
                  $(this).removeClass("rt-animated " + N).css("opacity", "0");
                }
              );
          }
        })), imagesLoaded(M, function() {
          E ? B._mockupCaptionSlider2() : B._mockupCaptionSlider();
        })), this.slideShow
        .find(".flex-direction-nav .flex-next")
        .click(function(D) {
          return D.preventDefault(), D.stopPropagation(), F.flexslider("next"), !1;
        }), this.slideShow
        .find(".flex-direction-nav .flex-prev")
        .click(function(D) {
          return D.preventDefault(), D.stopPropagation(), F.flexslider("prev"), !1;
        });
    },
    _mockupCaptionSlider2: function() {
      if (this.slideShow.length) {
        var C = this.slideShowNamspace, S = roar.getWidthBrowser();
        $(C + " .slide-body").each(
          1200 > S
            ? function() {
                var T = $(this).data("height");
                $(this).css({ height: T * S / 1200 });
              }
            : function() {
                var T = $(this).data("height");
                $(this).css({ height: T });
              }
        ), $(C + " .caption-content").each(
          1200 > S
            ? function() {
                var T = $(this).data("min"),
                  I = $(this).data("max"),
                  P = I * S / 1200;
                T > P && (P = T), $(this).css({ "font-size": P });
              }
            : function() {
                var T = $(this).data("max");
                $(this).css({ "font-size": T });
              }
        );
      }
    },
    _mockupCaptionSlider: function() {
      if (this.slideShow.length) {
        var C = this.slideShowNamspace,
          S = this.option.slider_auto_height,
          T = this.option.slider_height,
          I = roar.getWidthBrowser();
        if (767 > I && 0 == S && 0 < T) {
          $(C + " .slide-body").css("height", T * I / 1200);
        }
        767 <= I &&
          0 == S &&
          0 < T &&
          $(C + " .slide-body").css("height", T), $(
          C + " .caption-content"
        ).each(
          767 > I
            ? function() {
                var z = $(this).data("min"), A = $(this).data("max"), N = A;
                50 < A && (N = 50), z > N && (N = z), $(this).css({
                  "font-size": N
                });
              }
            : function() {
                var z = $(this).data("max");
                $(this).css({ "font-size": z });
              }
        );
      }
    },
    _initResize: function() {
      var C = this.option.slider_scale, S = this;
      jQuery(window).resize(function() {
        C ? S._mockupCaptionSlider2() : S._mockupCaptionSlider();
      });
    },
    onUnload: function() {
      this.$container.off(this.slideShowNamspace);
    }
  })), y;
})()), (theme.SidebarSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.sideBarId = $("#shopify-section-" + T)), (this.sideBar = $(
      "#sidebar-" + T
    )), (this.sideBarNamspace = "#sidebar-" + T), (this.tabSideBar = $(
      ".tab-filter-tabs" + T + " a"
    )), (this.tabItem = $(".procduct_tab_item-" + T)), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this;
      0 < this.tabItem.length &&
        this.tabItem.each(function() {
          var S = {
            _tabcount: $(this).data("_tabcount"),
            _ptab_carousel: $(this).data("_ptab_carousel"),
            _id: $(this).data("_id")
          };
          0 < parseInt(S._tabcount)
            ? (C._initTab(), S._ptab_carousel &&
                C._initMultiSlide(S), C._initMultiSlides(S))
            : (S._ptab_carousel && C._initSlide(S), C._initSlides(S));
        });
    },
    _initTab: function() {
      this.tabSideBar.each(function() {
        $(this).click(function(C) {
          C.preventDefault(), $(this).tab("show");
        });
      });
    },
    _initSlide: function(C) {
      var S = $(".box #myCarousel" + C._id + " .carousel-inner");
      $("#myCarousel" + C._id + "_next").click(function() {
        return S.trigger("next.owl.carousel"), !1;
      }), $("#myCarousel" + C._id + "_prev").click(function() {
        return S.trigger("prev.owl.carousel"), !1;
      }), S.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl });
    },
    _initSlides: function(C) {
      var S = $(".box #myCarousel" + C._id + "s .carousel-inner");
      S.owlCarousel({
        slideSpeed: 500,
        rtl: window.rtl,
        responsive: {
          0: { items: 1 },
          320: { items: 1 },
          479: { items: 1 },
          767: { items: 1 },
          979: { items: 1 },
          1199: { items: 1 }
        }
      }), $("#myCarousel" + C._id + "s_next").click(function() {
        return S.trigger("next.owl.carousel"), !1;
      }), $("#myCarousel" + C._id + "s_prev").click(function() {
        return S.trigger("prev.owl.carousel"), !1;
      });
    },
    _initMultiSlide: function(C) {
      var S = $(".filter-product #myCarousel" + C._id + " .carousel-inner");
      $("#myCarousel" + C._id + "_next").click(function() {
        return S.trigger("next.owl.carousel"), !1;
      }), $("#myCarousel" + C._id + "_prev").click(function() {
        return S.trigger("prev.owl.carousel"), !1;
      }), S.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl });
    },
    _initMultiSlides: function(C) {
      var S = $(".filter-product #myCarousel" + C._id + "s .carousel-inner");
      $("#myCarousel" + C._id + "s_next").click(function() {
        return S.trigger("next.owl.carousel"), !1;
      }), $("#myCarousel" + C._id + "s_prev").click(function() {
        return S.trigger("prev.owl.carousel"), !1;
      }), S.owlCarousel({
        slideSpeed: 500,
        rtl: window.rtl,
        responsive: {
          0: { items: 1 },
          320: { items: 1 },
          479: { items: 1 },
          767: { items: 1 },
          979: { items: 1 },
          1199: { items: 1 }
        }
      });
    },
    onUnload: function() {
      this.$container.off(this.sideBarNamspace);
    }
  })), y;
})()), (theme.ProductTabSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.productTabId = $("#shopify-section-" + T)), (this.productTab = $(
      "#product-tab-" + T
    )), (this.productTabNamspace =
      "#product-tab-" + T), (this.tabProductTabVertical = $(
      ".tab-filter-tabs-vertical-" + T + " a"
    )), (this.tabProductTab = $(
      ".tab-filter-tabs-" + T + " a"
    )), (this.tabItem = $(
      ".product-tab-item-" + T
    )), (this._tabcount = this.productTab.data(
      "_tabcount"
    )), (this.placement_fullwidth = this.productTab.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this, S = this._tabcount;
      if (
        (0 < this.tabItem.length &&
          this.tabItem.each(function() {
            var I = {
              _tabcount: S,
              _ptab_carousel: $(this).data("_ptab_carousel"),
              _id: $(this).data("_id"),
              _nextpage: $(this).data("_nextpage"),
              _itemsperpage: $(this).data("_itemsperpage"),
              _limit: parseInt($(this).data("_limit"), 10),
              _colclass: $(this).data("_colclass"),
              _catid: $(this).data("_catid"),
              _all_loaded: !1,
              _loaded_count: parseInt($(this).data("_itemsperpage"), 10)
            };
            C._initTab(), C._initMultiSlide(I);
          }), "1" == this.placement_fullwidth && !window.sidebar)
      ) {
        var T = this.sectionId;
        onFullWidthOption(T);
      }
    },
    _initTab: function() {
      0 < this.tabProductTab.length &&
        this.tabProductTab.each(function() {
          $(this).click(function(C) {
            C.preventDefault(), $(this).tab("show");
          });
        }), 0 < this.tabProductTabVertical.length &&
        this.tabProductTabVertical.each(function() {
          $(this).click(function(C) {
            C.preventDefault(), $(this).tab("show");
          });
        });
    },
    _initMultiSlide: function(C) {
      var S = 1, T = 0;
      if (C._ptab_carousel) {
        var I = $(".filter-product #myCarousel" + C._id),
          P = $(".filter-product #myCarousel" + C._id + " .carousel-inner");
        P.slick({
          autoplaySpeed: 500,
          rtl: window.rtl,
          slidesToShow: 1,
          arrows: !1,
          infinite: !1
        }), P.on("reInit ", function(z, A) {
          S = A.slideCount;
        }), P.on("afterChange", function(z, A) {
          T = A.currentSlide;
        }), $("#myCarousel" + C._id + "_next").click(function() {
          return S == T + 1 &&
            "" != C._catid &&
            !1 == C._all_loaded &&
            C._loaded_count < C._limit
            ? (console.log("There we go..."), I.addClass("b-loading"), $.ajax({
                url: "/collections/" + C._catid,
                type: "get",
                dataType: "html",
                data: {
                  view: "customlim",
                  limit: C._itemsperpage + "a" + C._colclass,
                  page: C._nextpage
                },
                success: function(z) {
                  var A = z.trim();
                  if ("" == A) C._all_loaded = !0;
                  else {
                    let L = $(A),
                      M = "row-" + C._id + "-" + C._nextpage,
                      O = L.find(".row").first().attr("id", M).children();
                    if (C._loaded_count + O.length <= C._limit)
                      ++C._nextpage, (C._loaded_count += O.length);
                    else {
                      let q = C._loaded_count + O.length - C._limit;
                      for (var N = 0; N < q; N++)
                        O.last().remove(), (O = L.find(".row")
                          .first()
                          .children());
                      C._loaded_count = C._limit;
                    }
                    P.slick("slickAdd", L[0].outerHTML), P.slick(
                      "slickNext"
                    ), roar.initCountdown(), roar.initLazyLoading(
                      "#" + M,
                      !0
                    ), roar.initProductQuickShopItem(
                      "#" + M
                    ), roar.handleQuickshop(
                      "#" + M
                    ), window.show_multiple_currencies &&
                      roar.currenciesCallback("#sandbox span.money");
                  }
                  I.removeClass("b-loading");
                },
                error: function() {
                  console.log("Something went wrong");
                }
              }), !1)
            : (P.slick("slickNext"), !1);
        }), $("#myCarousel" + C._id + "_prev").click(function() {
          return P.slick("slickPrev"), !1;
        });
      }
    },
    onUnload: function() {
      this.$container.off(this.productTabNamspace);
    }
  })), y;
})()), (theme.AdvancedGridSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.advancedGridId = $("#shopify-section-" + T)), (this.advancedGrid = $(
      "#advanced-grid-" + T
    )), (this.advancedGridNamspace =
      "#advanced-grid-" + T), (this._ag_bgtype = this.advancedGrid.data(
      "_ag_bgtype"
    )), (this._ag_fullwidth = this.advancedGrid.data(
      "_ag_fullwidth"
    )), (this._agProductsCarousel = $(
      ".myProductsCarousel-" + T
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if (this._ag_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
      "2" == this._ag_bgtype &&
        this._initParalax(), this._initProductTab(), this._initProductsSlide(), this._initCountdown();
    },
    _initCountdown: function() {
      0 < $(".ag_product_countdown").length &&
        $(".ag_product_countdown").each(function() {
          var C = parseInt($(this).data("offer_date_year")),
            S = parseInt($(this).data("offer_date_month")),
            T = parseInt($(this).data("offer_date_day")),
            I = new Date(),
            P = new Date(C, S - 1, T);
          I < P ? $(this).countdown({ until: P }) : $(this).hide();
        });
    },
    _initParalax: function() {
      var C = this.sectionId;
      $(".advanced-grid-" + C + " .parallax-window").scrolly({
        bgParallax: !0
      });
    },
    _initProductsSlide: function() {
      0 < this._agProductsCarousel.length &&
        this._agProductsCarousel.each(function() {
          var C = $(this), S = C.data("_skin_type"), T = C.data("_id");
          "sportwinter" == S
            ? C.owlCarousel({ slideSpeed: 500, items: 1, rtl: window.rtl })
            : C.owlCarousel({
                responsive: {
                  0: { items: window.pitem_row },
                  320: { items: window.pitem_row },
                  479: { items: 2 },
                  767: { items: 3 },
                  979: { items: 4 },
                  1199: { items: 5 }
                },
                rtl: window.rtl
              }), $("#myCarousel" + T + "_next").click(function() {
            return C.trigger("next.owl.carousel"), !1;
          }), $("#myCarousel" + T + "_prev").click(function() {
            return C.trigger("prev.owl.carousel"), !1;
          });
        });
    },
    _initProductTab: function() {
      var C = this.sectionId, S = this;
      $(".ag-products-tabs-" + C).each(function() {
        var T = $(this).data("_tabcount"), I = $(this).data("_block_id");
        S._initTab(I), S._initMultiSlide(I);
      });
    },
    _initTab: function(C) {
      0 < $(".tab-filter-tabs-" + C).length &&
        $(".tab-filter-tabs-" + C + " a").each(function() {
          $(this).click(function(S) {
            S.preventDefault(), $(this).tab("show");
          });
        });
    },
    _initMultiSlide: function(C) {
      0 < $(".ag-product-tab-item-" + C).length &&
        $(".ag-product-tab-item-" + C).each(function() {
          var S = $(this).data("_pid"),
            T = $(this).data("_acm_carousel"),
            I = $(this).data("_catid"),
            P = $(this).data("_nextpage"),
            z = $(this).data("_itemsperpage"),
            A = parseInt($(this).data("_limit"), 10),
            N = $(this).data("_colclass"),
            L = !1,
            M = parseInt($(this).data("_itemsperpage"), 10),
            O = 1,
            q = 0;
          if (T) {
            var E = $(".filter-product #myCarousel" + S),
              B = $(".filter-product #myCarousel" + S + " .carousel-inner");
            B.slick({
              autoplaySpeed: 500,
              rtl: window.rtl,
              slidesToShow: 1,
              arrows: !1,
              infinite: !1
            }), B.on("reInit ", function(F, D) {
              O = D.slideCount;
            }), B.on("afterChange", function(F, D) {
              q = D.currentSlide;
            }), $("#myCarousel" + S + "_next").click(function() {
              return O == q + 1 && "" != I && !1 == L && M < A
                ? (E.addClass("b-loading"), $.ajax({
                    url: "/collections/" + I,
                    type: "get",
                    dataType: "html",
                    data: { view: "customlim", limit: z + "a" + N, page: P },
                    success: function(F) {
                      var D = F.trim();
                      if ("" == D) L = !0;
                      else {
                        let W = $(D),
                          H = "row-" + S + "-" + P,
                          V = W.find(".row").first().attr("id", H).children();
                        if (M + V.length <= A) ++P, (M += V.length);
                        else {
                          let R = M + V.length - A;
                          for (var U = 0; U < R; U++)
                            V.last().remove(), (V = W.find(".row")
                              .first()
                              .children());
                          M = A;
                        }
                        B.slick("slickAdd", W[0].outerHTML), B.slick(
                          "slickNext"
                        ), roar.initCountdown(), roar.initLazyLoading(
                          "#" + H,
                          !0
                        ), roar.initProductQuickShopItem(
                          "#" + H
                        ), roar.handleQuickshop(
                          "#" + H
                        ), window.show_multiple_currencies &&
                          roar.currenciesCallback("#sandbox span.money");
                      }
                      E.removeClass("b-loading");
                    },
                    error: function() {
                      console.log("Something went wrong");
                    }
                  }), !1)
                : (B.slick("slickNext"), !1);
            }), $("#myCarousel" + S + "_prev").click(function() {
              return B.slick("slickPrev"), !1;
            });
          }
        });
    },
    onUnload: function() {
      this.$container.off(this.advancedGridNamspace);
    }
  })), y;
})()), (theme.PrefaceFooterSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.prefaceFooterId = $(
      "#shopify-section-" + T
    )), (this.prefaceFooter = $(
      "#preface-footer-" + T
    )), (this.prefaceFooterNamspace = "#preface-footer-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {},
    onUnload: function() {
      this.$container.off(this.prefaceFooterNamspace);
    }
  })), y;
})()), (theme.FooterTopSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.footerTopId = $("#shopify-section-" + T)), (this.footerTop = $(
      "#footer-top-" + T
    )), (this.footerTopNamspace = "#footer-top-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {},
    onUnload: function() {
      this.$container.off(this.footerTopNamspace);
    }
  })), y;
})()), (theme.FooterBottomSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.footerTopId = $("#shopify-section-" + T)), (this.footerTop = $(
      "#footer-top-" + T
    )), (this.footerTopNamspace = "#footer-top-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {},
    onUnload: function() {
      this.$container.off(this.footerTopNamspace);
    }
  })), y;
})()), (theme.FooterCopyRightSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.footerCopyRightId = $(
      "#shopify-section-" + T
    )), (this.footerCopyRight = $(
      "#footer-copyright-" + T
    )), (this.footerCopyRightNamspace = "#footer-copyright-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {},
    onUnload: function() {
      this.$container.off(this.footerCopyRightNamspace);
    }
  })), y;
})()), (theme.FooterColumn = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.footerColumnId = $("#shopify-section-" + T)), (this.footerColumn = $(
      "#footer-column-" + T
    )), (this.footerColumnNamspace =
      "#footer-column-" + T), (this._class = this.footerColumn.data(
      "_class"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      "" != this._class && this.footerColumnId.addClass(this._class);
    },
    onUnload: function() {
      this.$container.off(this.footerColumnNamspace);
    }
  })), y;
})()), (theme.TestimonialSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.testimonialId = $("#shopify-section-" + T)), (this.testimonial = $(
      "#testimonial-" + T
    )), (this.testimonialNamspace =
      "#testimonial-" + T), (this.placement_fullwidth = this.testimonial.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this.sectionId,
        S = $(".box #myCarousel_testi_" + C + " .testimonial-slide"),
        T = !1;
      if (
        (1 == parseInt(window.rtl) && (T = !0), S.not(
          ".slick-initialized"
        ).slick({ arrows: !1, slidesToShow: 1, slidesToScroll: 1, rtl: T }), $(
          "#myCarousel_testi_next_" + C
        ).click(function() {
          return S.slick("slickNext"), !1;
        }), $("#myCarousel_testi_prev_" + C).click(function() {
          return S.slick("slickPrev"), !1;
        }), $(window).resize(function() {
          S.slick("setPosition");
        }), "1" == this.placement_fullwidth && !window.sidebar)
      ) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
    },
    onUnload: function() {
      this.$container.off(this.testimonialNamspace);
    }
  })), y;
})()), (theme.LatestBlogSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.latestBlogId = $("#shopify-section-" + T)), (this.latestBlog = $(
      "#latest_blog-" + T
    )), (this.latestBlogSlider = $(
      "#latest_blog-" + T + " .blog-slick-slider"
    )), (this.latestBlogNamspace =
      "#latest_blog-" + T), (this.placement_fullwidth = this.latestBlog.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if ("1" == this.placement_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
      this._initSlide();
    },
    _initSlide: function() {
      var C = !1;
      1 == parseInt(window.rtl) && (C = !0), 0 < this.latestBlogSlider.length &&
        this.latestBlogSlider
          .not(".slick-initialized")
          .slick({
            rtl: C,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
            nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
            responsive: [
              {
                breakpoint: 767,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
              }
            ]
          });
    },
    onUnload: function() {
      this.$container.off(this.latestBlogNamspace);
    }
  })), y;
})()), (theme.InstafeedSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.instafeedId = $("#shopify-section-" + T)), (this.instafeed = $(
      "#home-instagram-widget-" + T
    )), (this.instafeedNamspace =
      "#home-instagram-widget-" + T), (this.instagram_list = $(
      "#instagram_home_" + T
    )), (this.instagram_target =
      "instagram_home_" + T), (this.placement_fullwidth = this.instafeed.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      if ("1" == this.placement_fullwidth && !window.sidebar) {
        var C = this.sectionId;
        onFullWidthOption(C);
      }
      0 < this.instagram_list.length && this._instafeedRun();
    },
    _instafeedRun: function() {
      var C = this.instagram_target,
        S = this.instagram_list.data("social_instagram_token"),
        T = this.instagram_list.data("user_id"),
        I = this.instagram_list.data("home_instafeed_limit"),
        P = new Instafeed({
          get: "user",
          target: C,
          accessToken: S,
          userId: T,
          limit: I,
          resolution: "thumbnail",
          resolution2: "standard_resolution",
          template: '<div class="wrap animated"><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" width="150" height="150" /><span class="hover_border"></span></a></div>'
        });
      P.run();
    },
    onUnload: function() {
      this.$container.off(this.instafeedNamspace);
    }
  })), y;
})()), (theme.mobileNavSection = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.mobileNavId = $("#shopify-section-" + T)), (this.mobileNav = $(
      "#primary-" + T
    )), (this.mobilenavNamespace = "#primary-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      this._initMobile();
    },
    _initMobile: function() {
      $("#off-canvas-layer").on("click", function() {
        $(document.body).removeClass(
          "open-canvas-panel"
        ), $(document.body).removeClass("open_filter");
      }), $(".mobile-nav-icon").on("click", function() {
        $(document.body).toggleClass("open-canvas-panel");
      }), $(".mobile-child-menu").on("click", function() {
        let C = $(this).closest(".menu-item-has-children");
        C.toggleClass("mobile-active");
      }), $(
        ".mobile-nav-search, .mobile-nav-search-close"
      ).on("click", function() {
        $(document.body).toggleClass(
          "open-search-form"
        ), $(".mobile-nav-search-form input").focus();
      }), $(window).on("resize", function() {
        991 < $(window).width() &&
          $(document.body).removeClass("open-canvas-panel");
      });
    },
    onUnload: function() {
      this.$container.off(this.mobilenavNamespace);
    }
  })), y;
})()), (theme.ProductVariantMobile = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.wrapperId = $("#" + T)), (this.wrapper = $(
      "#" + T
    )), (this.wrapperNamspace = "#" + T), (this.addCartId = $(
      "#btn-" + T + ".m-allow-cart"
    )), (this.addCartClass = $(
      ".variant-item-" + T + ".m-allow-cart"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this;
      C._initScroll(), C._initCompact(), C._initEvents(), $(
        window
      ).resize(function() {
        991 >= $(window).width() && C._initCompact();
      });
    },
    _initScroll: function() {
      $(window).on("scroll", function() {
        var C = $("#shopify-section-product-variants-mobile").height();
        $(window).scrollTop() > C
          ? $(document.body).addClass("sticky-product-variants-mobile")
          : ($(document.body).removeClass("sticky-product-variants-mobile"), $(
              ".product-variants-mobile"
            ).hasClass("active") &&
              $(".product-variants-mobile").height(
                $(".variants-header").data("height")
              ));
      });
    },
    _initCompact: function() {
      if (0 < $(".product-variant-mobile-section").length) {
        var C = $(".product-variant-mobile-section"),
          S = $(".product-variants-mobile");
        S.each(function() {
          var T = $(this),
            I = T.find(".variants-header"),
            P = I.innerHeight(),
            z = T.find(".variants-content").outerHeight(),
            A = I.closest(".product-variants-mobile");
          I.data("height", P), T.data("height", P + z);
        }), S.each(function() {
          var T = $(this),
            I = T.find(".variants-header"),
            P = I.innerHeight(),
            z = T.find(".variants-content").outerHeight(),
            A = I.closest(".product-variants-mobile");
          I.data(
            "height",
            P
          ), T.data("height", P + z), A.hasClass("active") && A.height(A.data("height"));
        }), C.unbind("click") &&
          C.on("click", ".variants-header .title", function() {
            var T = $(this),
              I = T.closest(".variants-header"),
              P = T.closest(".product-variants-mobile");
            P.hasClass("active") ||
              S.closest(".active")
                .removeClass("active")
                .height(
                  T.data("height")
                ), P.toggleClass("active"), P.hasClass("active") ? P.height(P.data("height")) : P.height(I.data("height"));
          });
      }
    },
    _initEvents: function() {
      var C = $("#ProductSelect-product-template.variation-select").val();
      0 < this.addCartId.length &&
        (this.addCartId.unbind("click"), this.addCartId.on("click", function() {
          $("#ProductSelect-product-template.variation-select").val(
            C
          ), $("#AddToCart-product-template").trigger("click");
        })), 0 < this.addCartClass.length &&
        (this.addCartClass.unbind(
          "click"
        ), this.addCartClass.on("click", function() {
          var S = $(this).data("id");
          $("#ProductSelect-product-template.variation-select").val(
            S
          ), $("#AddToCart-product-template").trigger("click");
        }));
    },
    onUnload: function() {
      this.$container.off(this.wrapperNamspace);
    }
  })), y;
})()), (theme.CartVariantMobile = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.wrapperId = $("#" + T)), (this.wrapper = $(
      "#" + T
    )), (this.wrapperNamspace = "#" + T), (this.addCartId = $(
      "#btn-" + T + ".m-allow-cart"
    )), (this.addCartClass = $(
      ".variant-item-" + T + ".m-allow-cart"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this;
      C._initScroll();
    },
    _initScroll: function() {
      $(window).on("scroll", function() {
        var C = $("#shopify-section-product-variants-mobile").height();
        $(window).scrollTop() > C
          ? $(document.body).addClass("sticky-product-variants-mobile")
          : ($(document.body).removeClass("sticky-product-variants-mobile"), $(
              ".product-variants-mobile"
            ).hasClass("active") &&
              $(".product-variants-mobile").height(
                $(".variants-header").data("height")
              ));
      });
    },
    onUnload: function() {
      this.$container.off(this.wrapperNamspace);
    }
  })), y;
})()), (theme.Brands = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.brandsId = $("#brands-" + T)), (this.featuredBrands = $(
      ".featured-brands-" + T
    )), (this.brandsNamspace = "#brands-" + T), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this.featuredBrands.data("perview"),
        S = this.featuredBrands.data("autoplay"),
        T = this.featuredBrands.data("speed"),
        I = !1;
      "1" == S && (I = !0), this.featuredBrands
        .not(".slick-initialized")
        .slick({
          rtl: window.rtl,
          slidesToShow: C,
          slidesToScroll: 1,
          autoplaySpeed: T,
          autoplay: S,
          infinite: !0,
          prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
          nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
          responsive: [
            {
              breakpoint: 1200,
              settings: { slidesToShow: 4, slidesToScroll: 1 }
            },
            {
              breakpoint: 992,
              settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
              breakpoint: 767,
              settings: { slidesToShow: 2, slidesToScroll: 1 }
            }
          ]
        });
    },
    onUnload: function() {
      this.$container.off(this.brandsNamspace);
    }
  })), y;
})()), (theme.rvsVideo = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.rvsId = $("#shopify-section-" + T)), (this.rvsNamspace =
      "#rvsvideo-" + T + "_wrapper"), (this.rvsMain =
      "#rvsvideo-" + T), (this.placement_fullwidth = $(this.rvsNamspace).data(
      "placement_fullwidth"
    )), (this.delayTime = $(this.rvsNamspace).data("delaytime")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var z,
        C = this.sectionId,
        S = this.rvsMain,
        T = this.delayTime,
        I = this.placement_fullwidth,
        P = jQuery;
      P(document).ready(function() {
        void 0 == P(S).revolution
          ? revslider_showDoubleJqueryError(S)
          : ((z = P(S)
              .show()
              .revolution({
                sliderType: "carousel",
                jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                sliderLayout: "fullwidth",
                dottedOverlay: "none",
                delay: T,
                navigation: {
                  keyboardNavigation: "off",
                  keyboard_direction: "horizontal",
                  mouseScrollNavigation: "off",
                  mouseScrollReverse: "default",
                  onHoverStop: "off",
                  touch: {
                    touchenabled: "on",
                    touchOnDesktop: "off",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: !1
                  },
                  arrows: {
                    style: "gyges",
                    enable: !0,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    tmp: "",
                    left: {
                      h_align: "left",
                      v_align: "center",
                      h_offset: 20,
                      v_offset: 0
                    },
                    right: {
                      h_align: "right",
                      v_align: "center",
                      h_offset: 20,
                      v_offset: 0
                    }
                  },
                  tabs: {
                    style: "gyges",
                    enable: !0,
                    width: 250,
                    height: 80,
                    min_width: 250,
                    wrapper_padding: 30,
                    wrapper_color: "rgba(38,41,43,1)",
                    tmp: '<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
                    visibleAmount: 5,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    hide_delay: 200,
                    direction: "horizontal",
                    span: !0,
                    position: "outer-bottom",
                    space: 0,
                    h_align: "center",
                    v_align: "bottom",
                    h_offset: 0,
                    v_offset: 0
                  }
                },
                carousel: {
                  horizontal_align: "center",
                  vertical_align: "center",
                  fadeout: "on",
                  vary_fade: "on",
                  maxVisibleItems: 3,
                  infinity: "on",
                  space: 0,
                  stretch: "off",
                  showLayersAllTime: "off",
                  easing: "Power3.easeInOut",
                  speed: "800"
                },
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: 720,
                gridheight: 405,
                lazyType: "none",
                shadow: 0,
                spinner: "off",
                stopLoop: "on",
                stopAfterLoops: 0,
                stopAtSlide: 1,
                shuffle: "off",
                autoHeight: "off",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: !1,
                fallbacks: {
                  simplifyAll: "off",
                  nextSlideOnWindowFocus: "off",
                  disableFocusListener: !1
                }
              })), z.one("revolution.slide.onloaded", function() {
              "1" != I || window.sidebar || onFullWidthOption(C), z.revredraw();
            }));
      });
    },
    onUnload: function() {}
  })), y;
})()), (theme.rvsHighlight = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.rvshighlightId = $(
      "#shopify-section-" + T
    )), (this.rvshighlightNamspace =
      "#rvshighlight-" + T + "_wrapper"), (this.rvshighlightMain =
      "#rvshighlight-" + T), (this.placement_fullwidth = $(
      this.rvshighlightNamspace
    ).data("placement_fullwidth")), (this.delayTime = $(
      this.rvshighlightNamspace
    ).data("delaytime")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var z,
        C = this.sectionId,
        S = this.rvshighlightMain,
        T = this.delayTime,
        I = this.placement_fullwidth,
        P = jQuery;
      P(document).ready(function() {
        void 0 == P(S).revolution
          ? revslider_showDoubleJqueryError(S)
          : ((z = P(S)
              .show()
              .revolution({
                sliderType: "standard",
                jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                sliderLayout: "auto",
                dottedOverlay: "none",
                delay: T,
                navigation: {
                  keyboardNavigation: "off",
                  keyboard_direction: "horizontal",
                  mouseScrollNavigation: "off",
                  mouseScrollReverse: "default",
                  onHoverStop: "off",
                  touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: !1
                  },
                  tabs: {
                    style: "zeus",
                    enable: !0,
                    width: 100,
                    height: 30,
                    min_width: 100,
                    wrapper_padding: 0,
                    wrapper_color: "transparent",
                    wrapper_opacity: "0",
                    tmp: '<span class="tp-tab-title">{{title}}</span>',
                    visibleAmount: 3,
                    hide_onmobile: !0,
                    hide_under: 480,
                    hide_onleave: !1,
                    hide_delay: 200,
                    direction: "horizontal",
                    span: !0,
                    position: "inner",
                    space: 1,
                    h_align: "left",
                    v_align: "top",
                    h_offset: 30,
                    v_offset: 30
                  }
                },
                viewPort: {
                  enable: !0,
                  outof: "pause",
                  visible_area: "90%",
                  presize: !1
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1230, 1024, 767, 480],
                gridheight: [720, 720, 480, 360],
                lazyType: "none",
                parallax: {
                  type: "scroll",
                  origo: "enterpoint",
                  speed: 400,
                  levels: [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    35,
                    40,
                    45,
                    50,
                    46,
                    47,
                    48,
                    49,
                    50,
                    55
                  ],
                  type: "scroll"
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: !1,
                fallbacks: {
                  simplifyAll: "off",
                  nextSlideOnWindowFocus: "off",
                  disableFocusListener: !1
                }
              })), z.one("revolution.slide.onloaded", function() {
              "1" != I || window.sidebar || onFullWidthOption(C), z.revredraw();
            }));
      });
    },
    onUnload: function() {}
  })), y;
})()), (theme.rvsProducts = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.rvsproductsId = $(
      "#shopify-section-" + T
    )), (this.rvsproductsNamspace =
      "#rvsproducts-" + T + "_wrapper"), (this.rvsproductsMain =
      "#rvsproducts-" + T), (this.placement_fullwidth = $(
      this.rvsproductsNamspace
    ).data("placement_fullwidth")), (this.delayTime = $(
      this.rvsproductsNamspace
    ).data("delaytime")), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var z,
        C = this.sectionId,
        S = this.rvsproductsMain,
        T = this.delayTime,
        I = this.placement_fullwidth,
        P = jQuery;
      P(document).ready(function() {
        void 0 == P(S).revolution
          ? revslider_showDoubleJqueryError(S)
          : ((z = P(S)
              .show()
              .revolution({
                sliderType: "standard",
                jsFileLocation: "https://storage.googleapis.com/revolutionslider/revolution/js/",
                sliderLayout: "auto",
                dottedOverlay: "none",
                delay: T,
                navigation: {
                  keyboardNavigation: "off",
                  keyboard_direction: "horizontal",
                  mouseScrollNavigation: "off",
                  mouseScrollReverse: "default",
                  onHoverStop: "on",
                  touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 50,
                    swipe_direction: "horizontal",
                    drag_block_vertical: !1
                  },
                  arrows: {
                    style: "gyges",
                    enable: !0,
                    hide_onmobile: !1,
                    hide_onleave: !1,
                    tmp: "",
                    left: {
                      h_align: "right",
                      v_align: "bottom",
                      h_offset: 40,
                      v_offset: 0
                    },
                    right: {
                      h_align: "right",
                      v_align: "bottom",
                      h_offset: 0,
                      v_offset: 0
                    }
                  }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1200, 1024, 778, 480],
                gridheight: [600, 600, 600, 600],
                lazyType: "single",
                parallax: {
                  type: "scroll",
                  origo: "slidercenter",
                  speed: 400,
                  levels: [
                    5,
                    10,
                    15,
                    20,
                    25,
                    30,
                    35,
                    40,
                    45,
                    46,
                    47,
                    48,
                    49,
                    50,
                    51,
                    55
                  ],
                  type: "scroll"
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: !1,
                fallbacks: {
                  simplifyAll: "off",
                  nextSlideOnWindowFocus: "off",
                  disableFocusListener: !1
                }
              })), z.one("revolution.slide.onloaded", function() {
              "1" != I || window.sidebar || onFullWidthOption(C), z.revredraw();
            }));
      });
    },
    onUnload: function() {}
  })), y;
})()), (theme.YourCollections = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.latestCategoryId = $(
      "#shopify-section-" + T
    )), (this.latestCategoryNamspace = $(
      ".your-collections-" + T
    )), (this._limit = this.latestCategoryNamspace.data(
      "limit"
    )), (this._speed = this.latestCategoryNamspace.data(
      "speed"
    )), (this._autoplay = this.latestCategoryNamspace.data(
      "autoplay"
    )), (this.placement_fullwidth = this.latestCategoryNamspace.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this.sectionId,
        S = ".your-collections-wrapper .CollectionGrid-" + C;
      "1" != this.placement_fullwidth ||
        window.sidebar ||
        onFullWidthOption(C), $(S).slick({
        slidesToShow: this._limit,
        slidesToScroll: 1,
        autoplay: this._autoplay,
        autoplaySpeed: this._speed,
        prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
        nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
        rtl: window.rtl,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 1 } },
          { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 469, settings: { slidesToShow: 2, slidesToScroll: 1 } }
        ]
      }), roar.initLazyLoading(S, !0);
    },
    onUnload: function() {
      this.$container.off(this.latestCategoryNamspace);
    }
  })), y;
})()), (theme.CollectionsList = (function() {
  function y(C) {
    var S = (this.$container = $(C)),
      T = (this.sectionId = S.attr("data-section-id")),
      I = S.attr("data-section-type");
    (this.latestCollectionId = $(
      "#shopify-section-" + T
    )), (this.latestCollectionNamspace = $(
      ".collections-list-" + T
    )), (this._limit = this.latestCollectionNamspace.data(
      "limit"
    )), (this._total = this.latestCollectionNamspace.data(
      "count"
    )), (this._speed = this.latestCollectionNamspace.data(
      "speed"
    )), (this._autoplay = this.latestCollectionNamspace.data(
      "autoplay"
    )), (this.placement_fullwidth = this.latestCollectionNamspace.data(
      "placement_fullwidth"
    )), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      var C = this.sectionId, S = ".content-colection-list-" + this.sectionId;
      roar.initLazyLoading(S, !0), $(S).slick({
        slidesToShow: this._limit,
        slidesToScroll: 1,
        autoplay: this._autoplay,
        autoplaySpeed: this._speed,
        prevArrow: '<a class="prev-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-prev"></use></svg></a>',
        nextArrow: '<a class="next-button arrow-btn" href="#"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#global__symbols-next"></use></svg></a>',
        rtl: window.rtl,
        responsive: [
          { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 469, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
      });
    },
    onUnload: function() {
      this.$container.off(this.latestCollectionNamspace);
    }
  })), y;
})()), (theme.ShippingCalculator = (function() {
  function ShippingCalculator(y) {
    let C = (this.$container = $(y)), S = C.attr("data-section-id");
    (this.selectors = {
      shipping_btn: "#cart__shipping-btn-" + S,
      shipping_calculator: "#shipping__calculator-" + S,
      get_rates: "#shipping__calculator-btn-" + S,
      response: "#shipping__calculator-response-" + S,
      template: '<p id ="shipping-rates-feedback-' +
        S +
        '" class="shipping-rates-feedback"></p>',
      address_country: "address_country-" + S,
      address_province: "address_province-" + S,
      address_zip: "address_zip-" + S,
      address_province_label: "address_province_label-" + S,
      address_province_container: "address_province_container-" + S
    }), (this.strings = {
      submitButton: "Calculate shipping",
      submitButtonDisabled: "Calculating...",
      customerIsLoggedIn: !1,
      moneyFormat: "£{{amount}}"
    }), this._init();
  }
  return (ShippingCalculator.prototype = _.assignIn(
    {},
    ShippingCalculator.prototype,
    {
      _disableButtons: function() {
        let y = this.selectors, C = this.strings;
        $(y.get_rates)
          .text(C.submitButtonDisabled)
          .attr("disabled", "disabled")
          .addClass("disabled");
      },
      _enableButtons: function() {
        let y = this.selectors, C = this.strings;
        $(y.get_rates)
          .removeAttr("disabled")
          .removeClass("disabled")
          .text(C.submitButton);
      },
      _render: function(y) {
        let C = this.selectors,
          S = this.strings,
          T = $(C.template),
          I = $(C.response);
        if (I.length) {
          if (!y.success) T.addClass("error"), T.append(y.errorFeedback);
          else if ((T.addClass("success"), y.rates)) {
            T.append(y.rates);
            let P = y.rates;
            if (P[0]) {
              let z = P[0];
              T.append(
                'Rates start at <span class="money">' + z.price + "</span>."
              );
            }
          } else T.append("We do not ship to this destination.");
          T.appendTo(I), roar.currenciesCallbackSpecial(C.response + " .money");
        }
      },
      _formatRate: function(y) {
        function C(N, L) {
          return "undefined" == typeof N ? L : N;
        }
        function S(N, L, M, O) {
          if (
            ((L = C(L, 2)), (M = C(M, ",")), (O = C(O, ".")), isNaN(N) ||
              null == N)
          )
            return 0;
          N = (N / 100).toFixed(L);
          let q = N.split("."),
            E = q[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + M),
            B = q[1] ? O + q[1] : "";
          return E + B;
        }
        let T = this.selectors, I = this.strings;
        if ("function" == typeof Shopify.formatMoney)
          return Shopify.formatMoney(y, I.moneyFormat);
        "string" == typeof y && (y = y.replace(".", ""));
        let P = "", z = /\{\{\s*(\w+)\s*\}\}/, A = I.moneyFormat;
        switch (A.match(z)[1]) {
          case "amount":
            P = S(y, 2);
            break;
          case "amount_no_decimals":
            P = S(y, 0);
            break;
          case "amount_with_comma_separator":
            P = S(y, 2, ".", ",");
            break;
          case "amount_no_decimals_with_comma_separator":
            P = S(y, 0, ".", ",");
        }
        return A.replace(z, P);
      },
      _onCartShippingRatesUpdate: function(y, C) {
        let S = this, T = this.selectors, I = this.strings;
        S._enableButtons();
        let P = "";
        if (
          (C.zip && (P += C.zip + ", "), C.province &&
            (P += C.province + ", "), (P += C.country), y.length)
        )
          for (var z = 0; z < y.length; z++)
            y[z].price = S._formatRate(y[z].price);
        S._render({ rates: y, address: P, success: !0 }), $(
          T.response
        ).fadeIn();
      },
      _pollForCartShippingRatesForDestination: function(y) {
        let C = this,
          S = this.selectors,
          T = this.strings,
          I = function() {
            $.ajax("/cart/async_shipping_rates", {
              dataType: "json",
              success: function(P, z, A) {
                200 === A.status
                  ? C._onCartShippingRatesUpdate(P.shipping_rates, y)
                  : setTimeout(I, 500);
              },
              error: function(P, z) {
                C._onError(P, z, C);
              }
            });
          };
        return I;
      },
      _fullMessagesFromErrors: function(y) {
        let C = this.selectors, S = this.strings, T = [];
        return $.each(y, function(I, P) {
          $.each(P, function(z, A) {
            T.push(I + " " + A);
          });
        }), T;
      },
      _onError: function(XMLHttpRequest, textStatus, self) {
        let selectors = self.selectors, strings = self.strings;
        self._enableButtons();
        var feedback = "", data = eval("(" + XMLHttpRequest.responseText + ")");
        (feedback = data.message
          ? data.message + "(" + data.status + "): " + data.description
          : "Error : " +
              self._fullMessagesFromErrors(data).join("; ") +
              "."), "Error : country is not supported." == feedback &&
          (feedback = "We do not ship to this destination."), self._render({
          rates: [],
          errorFeedback: feedback,
          success: !1
        }), $(selectors.response).show();
      },
      _getCartShippingRatesForDestination: function(y) {
        let C = this, S = this.selectors, T = this.strings;
        $.ajax({
          type: "POST",
          url: "/cart/prepare_shipping_rates",
          data: $.param({ shipping_address: y }),
          success: C._pollForCartShippingRatesForDestination(y),
          error: function(I, P) {
            C._onError(I, P, C);
          }
        });
      },
      _init: function() {
        let y = this, C = this.selectors, S = this.strings;
        if ($(C.shipping_calculator).length) {
          new Shopify.CountryProvinceSelector(
            C.address_country,
            C.address_province,
            { hideElement: C.address_province_container }
          );
          let T = $("#" + C.address_country),
            I = $("#" + C.address_province_label).get(0);
          "undefined" != typeof Countries &&
            (Countries.updateProvinceLabel(T.val(), I), T.change(function() {
              Countries.updateProvinceLabel(T.val(), I);
            })), $(C.get_rates).click(function() {
            y._disableButtons(), $(C.response).empty().hide();
            let P = {};
            (P.zip =
              $("#" + C.address_zip).val() ||
              ""), (P.country = $("#" + C.address_country).val() || ""), (P.province = $("#" + C.address_province).val() || ""), y._getCartShippingRatesForDestination(P);
          }), S.customerIsLoggedIn &&
            $(C.get_rates + ":eq(0)").trigger("click"), $(
            C.shipping_btn
          ).click(function() {
            $(C.shipping_calculator).slideToggle();
          });
        }
      },
      onUnload: function() {}
    }
  )), ShippingCalculator;
})()), (theme.GalleryTemplate = (function() {
  function y(C) {
    let S = (this.$container = $(C)), T = S.attr("data-section-id");
    (this.selectors = { grid_gallery: "grid-gallery-" + T }), this._init();
  }
  return (y.prototype = _.assignIn({}, y.prototype, {
    _init: function() {
      new CBPGridGallery(document.getElementById(this.selectors.grid_gallery));
    },
    onUnload: function() {}
  })), y;
})());
function onFullWidthOption(y) {
  _force_full_width(y), $(window).resize(function() {
    _force_full_width(y);
  });
}
function _force_full_width(y) {
  var C = $(".standard-body .full-width #shopify-section-" + y);
  if (!window.rtl) {
    if (0 < C.size()) {
      C.width($("body").width()), C.css("left", "0px");
      var S = C.offset();
      C.css("left", "-" + S.left + "px"), C.find(".container").css(
        "padding-left",
        S.left
      ), C.find(".container").css("padding-right", S.left);
    }
  } else if (0 < C.size()) {
    C.width($("body").width()), C.css("right", "0px");
    var S = C.offset();
    C.css("right", "-" + -1 * S.left + "px"), C.find(".container").css(
      "padding-left",
      -1 * S.left
    ), C.find(".container").css("padding-right", -1 * S.left);
  }
  var T = $(".standard-body .fixed #shopify-section-" + y);
  if (!window.rtl) {
    if (0 < T.size()) {
      T.width($(".standard-body").width()), T.css("left", "0px");
      var S = T.offset(), I = $(".standard-body").offset(), P = S.left - I.left;
      T.css("left", "-" + P + "px"), T.find(".container").css(
        "padding-left",
        P
      ), T.find(".container").css("padding-right", P);
    }
  } else if (0 < T.size()) {
    T.width($(".standard-body").width()), T.css("right", "0px");
    var S = T.offset(), I = $(".standard-body").offset(), P = S.left - I.left;
    T.css("right", "-" + -1 * P + "px"), T.find(".container").css(
      "padding-left",
      -1 * P
    ), T.find(".container").css("padding-right", -1 * P);
  }
  var z = $(".standard-body .fixed2 #shopify-section-" + y);
  if (0 < z.size()) {
    z.width($("body").width()), z.css("left", "0px");
    var S = z.offset();
    z.css("left", "-" + S.left + "px"), z
      .find(".container")
      .css("padding-left", S.left), z
      .find(".container")
      .css("padding-right", S.left);
  }
  var A = $(".fixed-body #shopify-section-" + y);
  if (!window.rtl) {
    if (0 < A.size()) {
      A.width($(".fixed-body .main-fixed").width()), A.css("left", "0px");
      var S = A.offset(),
        I = $(".fixed-body .main-fixed").offset(),
        P = S.left - I.left;
      A.css("left", "-" + P + "px"), A.find(".container").css(
        "padding-left",
        P
      ), A.find(".container").css("padding-right", P);
    }
  } else if (0 < A.size()) {
    A.width($(".fixed-body .main-fixed").width()), A.css("right", "0px");
    var S = A.offset(),
      I = $(".fixed-body .main-fixed").offset(),
      P = S.left - I.left;
    A.css("right", "-" + -1 * P + "px"), A.find(".container").css(
      "padding-left",
      -1 * P
    ), A.find(".container").css("padding-right", -1 * P);
  }
}
$(document).ready(function() {
  var y = new theme.Sections();
  y.register(
    "product-template",
    theme.Product
  ), y.register("mega-menu", theme.MegaMenuSection), y.register("topblock-section", theme.TopBlockSection), y.register("custom-widget", theme.CustomWidgetSection), y.register("banner", theme.BannerSection), y.register("delivery-bar", theme.DeliveryBarSection), y.register("slideshow", theme.SlideShowSection), y.register("slideshow-with-html", theme.SlideShowSection), y.register("slideshow-with-megamenu", theme.SlideShowSection), y.register("sidebar", theme.SidebarSection), y.register("product-tab", theme.ProductTabSection), y.register("advanced-grid", theme.AdvancedGridSection), y.register("preface-footer", theme.PrefaceFooterSection), y.register("footer-top", theme.FooterTopSection), y.register("footer-bottom", theme.FooterBottomSection), y.register("footer-copyright", theme.FooterCopyRightSection), y.register("footer-column-1", theme.FooterColumn), y.register("footer-column-2", theme.FooterColumn), y.register("footer-column-3", theme.FooterColumn), y.register("footer-column-4", theme.FooterColumn), y.register("testimonial", theme.TestimonialSection), y.register("instafeed", theme.InstafeedSection), y.register("latest-blog", theme.LatestBlogSection), y.register("mobile-nav-section", theme.mobileNavSection), y.register("product-variant-mobile", theme.ProductVariantMobile), y.register("cart-variant-mobile", theme.CartVariantMobile), y.register("brands", theme.Brands), y.register("rvsvideo", theme.rvsVideo), y.register("rvshighlight", theme.rvsHighlight), y.register("rvsproducts", theme.rvsProducts), y.register("your-collections", theme.YourCollections), y.register("collections-list", theme.CollectionsList), y.register("shipping-calculator", theme.ShippingCalculator), y.register("collection-template", theme.Filters), y.register("search-template", theme.Filters), y.register("gallery-template", theme.GalleryTemplate);
});
