/*global hydrogen, Mustache, $ */
hydrogen.data = (function () {

    "use strict";

    var load = function (dataConfiguration, template, $container) {

        if (typeof (dataConfiguration) === "function") {

            // We need to run the funciton for getting data
            dataConfiguration(function (data) {

                $.ajax({ url: template }).
                    done(function (templateHtml) {

                        merge(templateHtml, data, $container);

                    });
            });

        } else if (typeof (dataConfiguration) === "string") {

            // It is a path. We should get data from that URL path and merge it with the template

            $.ajax({ url: dataConfiguration }).
                done(function (data) {

                    $.ajax({ url: template }).
                        done(function (templateHtml) {

                            merge(templateHtml, data, $container);

                        });
                });

        } else {
            // It is an Array, so we already have data

            $.ajax({ url: template }).
                done(function (templateHtml) {

                    merge(templateHtml, dataConfiguration, $container);

                });
        }
    },

    merge = function(template, data, $container){

        var dataTemplated = Mustache.render(template, data);
        $container.html(dataTemplated);

    };

    return {

        load: load

    };

})();
