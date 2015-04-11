/*exported HydrogenHttpSourceManager, HydrogenHttpSource */


var HydrogenHttpSourceTypes = {
    HttpSource : 'http',
    HttpRestFullSource : 'restfull'
};

var HydrogenHttpRestFullSource_EmptyOptions = {
    url: '',
    read: { //read
        method: 'GET',
        params: null,
    },
    create: { //create
        method: 'POST',
        params: null,
    },
    update: { //update
        method: 'PUT',
        params: null,
    },
    remove: { //delete
        method: 'DELETE',
        params: null,
    }
};

var HydrogenHttpSourceManager = function(){

    var resourceManager = this;

    this._httpSources = [];

    this.HttpSource = function(parent, name, configuration){
        var source;
        if (configuration){
            switch (configuration.sourcetype) {
                case HydrogenHttpSourceTypes.HttpRestFullSource:
                    source = new HydrogenHttpRestFullSource(parent, name, configuration);
                    break;
                default:
                    source = new HydrogenHttpSource(parent, name, configuration);
                    break;
            }
        } else {
            source = new HydrogenHttpSource(parent, name, configuration);
        }

        resourceManager._httpSources.push(source);

        return source;
    };
};

var HydrogenHttpSource = function(parent, name, configuration){

    var httpSource = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    this.sourcetype = HydrogenHttpSourceTypes.HttpSource,

    // Configure defaults
    this.configuration = this.configuration || {};
    this.configuration.method = this.configuration.method || 'GET';
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

var HydrogenHttpRestFullSource = function(parent, name, configuration){

    var httpSource = this;

    this.name = name;
    this.configuration = configuration;
    this.parent = parent;

    this.sourcetype = HydrogenHttpSourceTypes.HttpRestFullSource,
    
    // Configure defaults
    this.configuration = this.configuration || HydrogenHttpRestFullSource_EmptyOptions;

    if (this.configuration.read)
    {
        this.configuration.read.on   = this.configuration.read.on || {};

        this.read = function(callback) {
            var source = this;
            var urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;
            var _params = source.configuration.read.params;
            // If there is a function to apply before fetching data, we execute it here
            if(source.configuration.read.on.before){
                source.configuration.read.on.before(_params);
            }

            var ajaxCall = $.ajax({
                method: source.configuration.read.method,
                url: urlFetch,
                data: _params
            });

            ajaxCall.done(function(result) {
                // If there is a function to apply after fetching data, we execute it here
                if(source.configuration.read.on.after){
                    // Continue execution
                    callback(source.configuration.read.on.after(result));
                }
                else {
                    // Continue execution
                    callback(result);
                }
            });

            ajaxCall.error(function(error){
                //Error
                console.error(error);
            });
        };
    } else {
        this.configuration.read = {};
        this.configuration.read.on = {};
        this.read = function(callback) { 
            callback();
        };
    }

    if (this.configuration.create)
    {
        this.configuration.create.on = this.configuration.create.on || {};    

        this.create = function(callback) {
            var source = this;
            var urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;
            var _params = source.configuration.create.params;
            // If there is a function to apply before fetching data, we execute it here
            if(source.configuration.create.on.before){
                source.configuration.create.on.before(_params);
            }

            var ajaxCall = $.ajax({
                method: source.configuration.create.method,
                url: urlFetch,
                data: _params
            });

            ajaxCall.done(function(result) {
                // If there is a function to apply after fetching data, we execute it here
                if(source.configuration.create.on.after){
                    // Continue execution
                    callback(source.configuration.create.on.after(result));
                }
                else {
                    // Continue execution
                    callback(result);
                }
            });

            ajaxCall.error(function(error){
                //Error
                console.error(error);
            });
        };
    } else {
        this.create = function(callback) { 
            callback(); 
        };
    }
    
    if (this.configuration.update) {
        this.configuration.update.on = this.configuration.update.on || {};

        this.update = function(callback) {
            var source = this;
            var urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;
            var _params = source.configuration.update.params;
            // If there is a function to apply before fetching data, we execute it here
            if(source.configuration.update.on.before){
                source.configuration.update.on.before(_params);
            }

            var ajaxCall = $.ajax({
                method: source.configuration.update.method,
                url: urlFetch,
                data: _params
            });

            ajaxCall.done(function(result) {
                // If there is a function to apply after fetching data, we execute it here
                if(source.configuration.update.on.after){
                    // Continue execution
                    callback(source.configuration.update.on.after(result));
                }
                else {
                    // Continue execution
                    callback(result);
                }
            });

            ajaxCall.error(function(error){
                //Error
                console.error(error);
            });
        };
    }

    if (this.configuration.remove){
        this.configuration.remove.on = this.configuration.remove.on || {};
        this.remove = function(callback) {
            var source = this;
            var urlFetch = httpSource.parent.configuration.httpSourceBase + source.configuration.url;
            var _params = source.configuration.remove.params;
            // If there is a function to apply before fetching data, we execute it here
            if(source.configuration.remove.on.before){
                source.configuration.remove.on.before(_params);
            }

            var ajaxCall = $.ajax({
                method: source.configuration.remove.method,
                url: urlFetch,
                data: _params
            });

            ajaxCall.done(function(result) {
                // If there is a function to apply after fetching data, we execute it here
                if(source.configuration.remove.on.after){
                    // Continue execution
                    callback(source.configuration.remove.on.after(result));
                }
                else {
                    // Continue execution
                    callback(result);
                }
            });

            ajaxCall.error(function(error){
                //Error
                console.error(error);
            });
        };
    } else {
        this.remove = function (callback) {
            callback();
        };
    }


    this.fetch = function(callback) {
        this.read(callback);
    };





};

