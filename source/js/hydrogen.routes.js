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

        /**
         * Adds a routing configuration to the routeTable
         *
         * @method add
         * @param {Object} configuration Configuration for the new added route
         * @chainable
         */
        add = function (configuration) {

            var newRoute = {};

            if (configuration.url) {

                newRoute.url = configuration.url;

            }

            if (configuration.container) {

                newRoute.container = configuration.container;

            }

            if (configuration.template) {

                newRoute.template = configuration.template;

            }

            if (configuration.data) {

                newRoute.data = configuration.data;

            }

            routeTable.push(newRoute);

            return this;
        },

        /**
         * Redirects the aplication to a new route, as configured in the routeTable
         *
         * @method navigateTo
         * @param {String} url Url to navigate to, as defined in the routeTable
         * @chainable
         */
        navigateTo = function (url) {

            for (var routeCounter = 0, length = routeTable.length; routeCounter < length; routeCounter++){

                if(routeTable[routeCounter].url === url){

                    if(routeTable[routeCounter].container){

                        var templateUrl = this.templateBasePath + routeTable[routeCounter].template + this.templateExtension,
                            $container = $("#" + routeTable[routeCounter].container),
                            dataSource = routeTable[routeCounter].data;

                        if(routeTable[routeCounter].data){

                            hydrogen.data.proccessDataWithTemplate(dataSource, templateUrl, $container);

                        }
                        else{

                            $("#" + routeTable[routeCounter].container).load(templateUrl);

                        }
                    }

                    break;
                }
            }

            return this;
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

        templateBasePath: templateBasePath,

        templateExtension: templateExtension

    };
})();
