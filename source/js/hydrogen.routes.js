/*global hydrogen */
hydrogen.routes = (function(){

    var routeTable = [],

        templateBasePath = "",

        templateExtension = "";

    var add = function(configuration){

        var newRoute = {};

        if(configuration.url){

            newRoute.url = configuration.url;

        }

        if(configuration.container){

            newRoute.container = configuration.container;

        }

        if(configuration.template){

            newRoute.template = configuration.template;

        }

        routeTable.push(newRoute);
    };

    var navigateTo = function(url){

        for(var routeCounter = 0; routeCounter < routeTable.length; routeCounter++){

            if(routeTable[routeCounter].url === url){

                if(routeTable[routeCounter].container){

                    $("#" + routeTable[routeCounter].container).load(this.templateBasePath + routeTable[routeCounter].template + this.templateExtension);

                }

            }

        }

    };

    return {

        add: add,

        navigateTo: navigateTo,

        templateBasePath: templateBasePath,

        templateExtension: templateExtension

    };
})();
