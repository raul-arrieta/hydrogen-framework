/*global hydrogen, Mustache */
hydrogen.data = (function(){

    var proccessDataWithTemplate = function(dataConfiguration, template, $container){

        if(typeof(dataConfiguration) === "function"){

            // We need to run the funciton for getting data
            dataConfiguration(function(result){

                $.ajax({ url: template }).
                    done(function(templateHtml) {

                        var dataTemplated = Mustache.render(templateHtml, result);
                        $container.html(dataTemplated);

                    });
            });

        }
        else{
            // It is an Array, so we already have data

            $.ajax({ url: template }).
                done(function(templateHtml) {

                    var dataTemplated = Mustache.render(templateHtml, dataConfiguration);
                    $container.html(dataTemplated);

                });


        }

    };

    return {

        proccessDataWithTemplate: proccessDataWithTemplate

    };

})();
