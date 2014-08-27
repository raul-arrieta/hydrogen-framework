/*global hydrogen */

/**
 * Hosts all the functionallity refering to styling using Bootstrap framework
 *
 * @module hydrogen.styles.bootstrap
 */
hydrogen.styles.bootstrap = (function () {

    var
        init = function(){
           $("head").append("<link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootswatch/3.2.0/united/bootstrap.min.css'>");
        },


        _applyStylesToTopBody = function(){

            $("body").wrapInner("<div class='container'></div>");

        },

        _applyStylesToTopMenu = function(){

            var $menuContainer = $("div[data-control='top-menu']"),

                $menuItemsContainer = $("ul", $menuContainer).first();

            $menuContainer.
                addClass("container-fluid").
                prepend("<div class='navbar-header'>\
                  <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>\
                    <span class='sr-only'>Toggle navigation</span>\
                    <span class='icon-bar'></span>\
                    <span class='icon-bar'></span>\
                    <span class='icon-bar'></span>\
                  </button>\
                  <a class='navbar-brand' href='#'>Brand</a>\
                </div>\
                <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1' data-reference='menu-container'></div>");

            $menuItemsContainer.addClass("nav navbar-nav navbar-right");

            $("div[data-reference='menu-container']", $menuContainer).append($menuItemsContainer);

            $menuContainer.wrap("<nav class='navbar navbar-default' role='navigation'></nav>");

        },

        applyStyles = function(){

            _applyStylesToTopBody();

            _applyStylesToTopMenu();

        };


    return {

        applyStyles: applyStyles,

        init: init

    };
})();
