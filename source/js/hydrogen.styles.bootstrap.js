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
        applyStyles = function(){



        };


    return {

        applyStyles: applyStyles,

        init: init

    };
})();
