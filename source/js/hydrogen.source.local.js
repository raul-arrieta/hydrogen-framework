/*exported HydrogenLocalSourceManager, HydrogenHttpSource */

var HydrogenLocalSourceManager = function(){

    var resourceManager = this;

    this._localSources = [];

    this.LocalSource = function(name, configuration){

        var source = new HydrogenLocalSource(name, configuration);

        resourceManager._localSources.push(source);

        return source;
    };
};

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