/*global hydrogen, Mustache, $ */
hydrogen.data = (function () {

    "use strict";

    var proccessDataWithTemplate = function (dataConfiguration, template, $container) {

        if (typeof (dataConfiguration) === "function") {

            // We need to run the funciton for getting data
            dataConfiguration(function (data) {

                $.ajax({ url: template }).
                    done(function (templateHtml) {

                        var dataTemplated = Mustache.render(templateHtml, data);
                        $container.html(dataTemplated);

                    });
            });

        } else if (typeof (dataConfiguration) === "string") {

            // It is a path. We should get data from that URL path and merge it with the template

            $.ajax({ url: dataConfiguration }).
                done(function (data) {

                    $.ajax({ url: template }).
                        done(function (templateHtml) {

                            var dataTemplated = Mustache.render(templateHtml, data);
                            $container.html(dataTemplated);

                        });
                });

        } else {
            // It is an Array, so we already have data

            $.ajax({ url: template }).
                done(function (templateHtml) {

                    var dataTemplated = Mustache.render(templateHtml, dataConfiguration);
                    $container.html(dataTemplated);

                });


        }

    };

    return {

        proccessDataWithTemplate: proccessDataWithTemplate

    };

})();
