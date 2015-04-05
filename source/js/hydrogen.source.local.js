/*exported HydrogenLocalSourceManager, HydrogenHttpSource */

/**
 * This represents the manager for local resources
 *
 * @class HydrogenLocalSourceManager
 * @constructor
 */
var HydrogenLocalSourceManager = function(){

    var resourceManager = this;

    this._localSources = [];

    this.LocalSource = function(name, configuration){

        var source = new HydrogenLocalSource(name, configuration);

        resourceManager._localSources.push(source);

        return source;
    };
};

/**
 * This represents a local resource. A local resource is a resource that returns data based on static data (arrays,
 * objects,...) or based on the execution of a function that does not require callback.
 *
 * You can distribute the code in your application through areas.
 *
 * @class HydrogenLocalSource
 * @param {String} name Name for the source
 * @param {Object} configuration Source's configuration
 * @constructor
 */
var HydrogenLocalSource = function(name, configuration){

    var localSource = this;

    this.name = name;
    this.configuration = configuration;

    this.fetch = function(callback){

        if(typeof localSource.configuration === 'function'){

            // Local data is the result of a function so we have to execute it to retrieve data
            callback(localSource.configuration());
        }
        else{
            // Local data is just an static data, return it
            callback(localSource.configuration);
        }
    };
};