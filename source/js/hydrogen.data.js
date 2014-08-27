/*global hydrogen, Mustache, $ */
hydrogen.data = (function () {

    "use strict";

    var load = function (dataConfiguration, template, $container) {

        if(dataConfiguration){

            if (typeof (dataConfiguration) === "function") {

                // We need to run the funciton for getting data
                dataConfiguration(function (data) {

                    loadAndMerge(template, data, $container);

                });

            } else if (typeof (dataConfiguration) === "string") {

                // It is a path. We should get data from that URL path and merge it with the template
                $.ajax({ url: dataConfiguration }).
                    done(function (data) {

                        loadAndMerge(template, data, $container);

                    });

            } else {
                // It is an Array, so we already have data
                loadAndMerge(template, dataConfiguration, $container);
            }
        }
        else{

            // No data has to be merged, but we let the next funciton to deal with it
            loadAndMerge(template, null, $container);

        }
    },

    loadAndMerge = function(templateUrl, data, $container){

        $.ajax({ url: templateUrl }).
            done(function (templateHtml) {
                merge(templateHtml, data, $container);
            });

    },

    merge = function(template, data, $container){

        var dataTemplated = template;

        if(data){

            // There is data, it has to be merged
            dataTemplated = Mustache.render(template, data);
        }

        // Surround the template with DIV to allow methods to find thing inside
        var $styledTemplate = hydrogen.styles.applyStyles($("<div>" + dataTemplated + "</div>"));

        // "Html" method will not return the newly added DIV
        $container.html($styledTemplate.html());

    };

    return {

        load: load

    };

})();
