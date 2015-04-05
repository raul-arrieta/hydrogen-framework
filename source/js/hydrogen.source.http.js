/*exported HydrogenHttpSourceManager, HydrogenHttpSource */

var HydrogenHttpSourceManager = function(){

    var resourceManager = this;

    this._httpSources = [];

    this.HttpSource = function(parent, name, configuration){

        var source = new HydrogenHttpSource(parent, name, configuration);

        resourceManager._httpSources.push(source);

        return source;
    };
};

var HydrogenHttpSource = function(parent, name, configuration){

    var httpSource = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    // Configure defaults
    this.configuration = this.configuration || 'GET';
    this.configuration.on = this.configuration.on || {};

    this.fetch = function(callback){

        var source = this,
            urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;

        // If there is a function to apply before fetching data, we execute it here
        if(source.configuration.on.before){

            source.configuration.on.before(source.configuration.params);
        }

        var ajaxCall = $.ajax({
            method: source.configuration.method,
            url: urlFetch,
            data: source.configuration.params
        });

        ajaxCall.done(function(result) {

            // If there is a function to apply after fetching data, we execute it here
            if(source.configuration.on.after){

                // Continue execution
                callback(source.configuration.on.after(result));
            }
            else {

                // Continue execution
                callback(result);
            }
        });

        ajaxCall.error(function(error){

            console.error(error);
        });
    };
};