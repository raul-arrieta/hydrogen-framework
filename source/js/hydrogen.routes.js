/*global hydrogen */

/**
 * Hosts all the functionallity refering to routes and redirections
 *
 * @module hydrogen.routes
 */
hydrogen.routes = (function () {

    "use strict";

    var
        /**
         * Array with all the routes that are stored by the application for redirecting.
         *
         * @property routeTable
         * @type {Array}
         */
        routeTable = [],

        /**
         * Path were all templates are. This is used for locating the templates that are configured.
         * in the routeTable
         *
         * @property templateBasePath
         * @type {String}
         * @default ""
         */
        templateBasePath = "",

        /**
         * Extension the template files have. Do not forget the dot.
         *
         * @property templateExtension
         * @type {String}
         * @default ".html"
         */
        templateExtension = ".html",

        beforeNavigationCallback,

        afterNavigationCallback,

        history = [],

        /**
         * Adds a routing configuration to the routeTable
         *
         * @method add
         * @param {Object} configuration Configuration for the new added route
         * @chainable
         */
        add = function (configuration) {

            configuration = configuration || {};

            var newRoute = {};

            if (configuration.url) {

                newRoute.url = configuration.url;

            }

            if (configuration.update) {

                newRoute.update = configuration.update;

            }

            routeTable.push(newRoute);

            return this;
        },

        /**
         * Configures a function to be runned every request, after navigation
         *
         * @method after
         * @param {Function} function to be called just after the routing is done
         * @chainable
         */
        after = function(callback){

            afterNavigationCallback = callback;
            return this;
        },

        /**
         * Configures a function to be runned every request, before any navigation
         *
         * @method before
         * @param {Function} function to be called just before the routing is done
         * @chainable
         */
        before = function(callback){

            beforeNavigationCallback = callback;
            return this;
        },

        /**
         * Returns current location of the application
         *
         * @method current
         * @return {String} The URL for the last navigation
         */
        current = function(){

            if(history.length > 0){

                return history[history.length - 1];

            } else{

                return "";

            }

        },

        /**
         * Navigates back to the previous URL
         *
         * @method back
         * @chainable
         */
        back = function(){

            var that = this;

            // At least 2 URL are required: current and previous
            if(history.length > 1){

                console.log("back to " + history[history.length - 2]);
                that.navigateTo(history[history.length - 2], true);

            }

            return this;
        },

        /**
         * Redirects the aplication to a new route, as configured in the routeTable
         *
         * @method navigateTo
         * @param {String} url Url to navigate to, as defined in the routeTable
         * @chainable
         */
        navigateTo = function (url, isGoingBack) {

            history = history || [];

            if(!isGoingBack){
                history.push(url);
            }else{
                // If we are going back, we remove the current URL from the hsitory, so user can go
                // back to the previous one
                history.splice(history.length - 1, 1);
            }

            beforeNavigationCallback();

            var routeCounter = 0, routeLength = routeTable.length;

            for ( ; routeCounter < routeLength; routeCounter++){

                var route = routeTable[routeCounter];

                if(route.url === url){

                    if(Array.isArray(route.update)){

                        var updateAreaCounter = 0, updateAreaLength = route.update.length;

                        // We have diferent areas to update
                        for( ; updateAreaCounter< updateAreaLength; updateAreaCounter++){

                            _updateArea(this, route.update[updateAreaCounter]);

                        }

                    }
                    else if(route.update){

                        // We have just one area to update
                        _updateArea(this, route.update);

                    }

                    break;
                }
            }

            afterNavigationCallback();

            return this;
        },

        _updateArea = function (context, updateConfiguration){

            if(updateConfiguration.container){

                var templateUrl = context.templateBasePath + updateConfiguration.template + context.templateExtension,
                    $container = $("#" + updateConfiguration.container),
                    dataSource = updateConfiguration.data;

                hydrogen.data.load(dataSource, templateUrl, $container);
            }

        };

    return {

        add: add,

        /**
         * Redirects the aplication to a new route, as configured in the routeTable
         *
         * @method navigateTo
         * @param {String} url Url to navigate to, as defined in the routeTable
         * @chainable
         */
        navigateTo: navigateTo,

        before: before,

        after: after,

        back: back,

        current: current,

        templateBasePath: templateBasePath,

        templateExtension: templateExtension

    };
})();
